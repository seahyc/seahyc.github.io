import {
  Color3,
  Color4,
  DynamicTexture,
  Mesh,
  MeshBuilder,
  ParticleSystem,
  PointLight,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';

type FirePatchSnapshot = {
  id: string;
  x: number;
  z: number;
  radius: number;
  heat: number;
  wetness: number;
  extinguished: boolean;
};

type FireSnapshot = {patches?: FirePatchSnapshot[]};
type SprayState = {active: boolean; origin: Vector3; impact: Vector3 | null};

type PatchEffects = {
  outerFlame: ParticleSystem;
  coreFlame: ParticleSystem;
  smoke: ParticleSystem;
  embers: ParticleSystem;
  light: PointLight;
  ground: Mesh;
  groundMaterial: StandardMaterial;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function makeTexture(
  scene: Scene,
  name: string,
  painter: (context: CanvasRenderingContext2D, size: number) => void,
): DynamicTexture {
  const size = 128;
  const texture = new DynamicTexture(name, {width: size, height: size}, scene, false);
  const context = texture.getContext() as CanvasRenderingContext2D;
  context.clearRect(0, 0, size, size);
  painter(context, size);
  texture.hasAlpha = true;
  texture.wrapU = Texture.CLAMP_ADDRESSMODE;
  texture.wrapV = Texture.CLAMP_ADDRESSMODE;
  texture.update(true, false);
  return texture;
}

function radialSprite(
  scene: Scene,
  name: string,
  stops: Array<[number, string]>,
  stretch = 1,
): DynamicTexture {
  return makeTexture(scene, name, (context, size) => {
    context.save();
    context.translate(size / 2, size / 2);
    context.scale(1, stretch);
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, size * 0.48);
    for (const [offset, color] of stops) gradient.addColorStop(offset, color);
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, size * 0.48, 0, Math.PI * 2);
    context.fill();
    context.restore();
  });
}

function flameSprite(scene: Scene, name: string, core: boolean): DynamicTexture {
  return makeTexture(scene, name, (context, size) => {
    const gradient = context.createLinearGradient(0, size, 0, 0);
    if (core) {
      gradient.addColorStop(0, 'rgba(255,245,180,.98)');
      gradient.addColorStop(0.34, 'rgba(255,216,52,.98)');
      gradient.addColorStop(0.72, 'rgba(255,104,4,.72)');
      gradient.addColorStop(1, 'rgba(255,55,0,0)');
    } else {
      gradient.addColorStop(0, 'rgba(255,192,18,.94)');
      gradient.addColorStop(0.35, 'rgba(255,87,4,.9)');
      gradient.addColorStop(0.72, 'rgba(196,26,0,.58)');
      gradient.addColorStop(1, 'rgba(90,0,0,0)');
    }
    context.save();
    context.fillStyle = gradient;
    context.shadowColor = core ? 'rgba(255,190,30,.65)' : 'rgba(255,55,0,.48)';
    context.shadowBlur = core ? size * 0.055 : size * 0.075;
    context.beginPath();
    context.moveTo(size * 0.16, size * 0.94);
    context.bezierCurveTo(size * 0.04, size * 0.7, size * 0.34, size * 0.59, size * 0.25, size * 0.38);
    context.bezierCurveTo(size * 0.2, size * 0.22, size * 0.45, size * 0.22, size * 0.52, size * 0.04);
    context.bezierCurveTo(size * 0.72, size * 0.26, size * 0.55, size * 0.38, size * 0.74, size * 0.49);
    context.bezierCurveTo(size * 0.96, size * 0.65, size * 0.86, size * 0.86, size * 0.78, size * 0.94);
    context.closePath();
    context.fill();
    context.restore();

    // Feather every edge of the silhouette. A vertical-only color gradient leaves
    // an opaque, flat base which reads as the boundary of the particle quad.
    context.globalCompositeOperation = 'destination-in';
    const horizontalFade = context.createLinearGradient(0, 0, size, 0);
    horizontalFade.addColorStop(0, 'rgba(255,255,255,0)');
    horizontalFade.addColorStop(0.16, 'rgba(255,255,255,.72)');
    horizontalFade.addColorStop(0.34, 'rgba(255,255,255,1)');
    horizontalFade.addColorStop(0.72, 'rgba(255,255,255,.96)');
    horizontalFade.addColorStop(0.9, 'rgba(255,255,255,.38)');
    horizontalFade.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = horizontalFade;
    context.fillRect(0, 0, size, size);
    const verticalFade = context.createLinearGradient(0, 0, 0, size);
    verticalFade.addColorStop(0, 'rgba(255,255,255,0)');
    verticalFade.addColorStop(0.1, 'rgba(255,255,255,.75)');
    verticalFade.addColorStop(0.3, 'rgba(255,255,255,1)');
    verticalFade.addColorStop(0.78, 'rgba(255,255,255,.92)');
    verticalFade.addColorStop(0.94, 'rgba(255,255,255,.3)');
    verticalFade.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = verticalFade;
    context.fillRect(0, 0, size, size);
    context.globalCompositeOperation = 'source-over';
  });
}

function setEmitterBox(system: ParticleSystem, radius: number, low: number, high: number): void {
  system.minEmitBox.set(-radius, low, -radius);
  system.maxEmitBox.set(radius, high, radius);
}

export function createFireEffects(scene: Scene): {
  update(dt: number, t: number, snapshot: FireSnapshot, spray: SprayState): void;
  dispose(): void;
} {
  const outerFlameTexture = flameSprite(scene, 'procedural irregular flame edge', false);
  const coreFlameTexture = flameSprite(scene, 'procedural hot flame core', true);
  const smokeTexture = radialSprite(scene, 'procedural smoke sprite', [
    [0, 'rgba(92,83,78,.32)'],
    [0.55, 'rgba(71,67,66,.17)'],
    [1, 'rgba(50,48,48,0)'],
  ]);
  const emberTexture = radialSprite(scene, 'procedural ember sprite', [
    [0, 'rgba(255,255,225,1)'],
    [0.2, 'rgba(255,190,40,1)'],
    [0.65, 'rgba(255,66,2,.55)'],
    [1, 'rgba(255,30,0,0)'],
  ]);
  const waterTexture = radialSprite(scene, 'procedural water droplet', [
    [0, 'rgba(255,255,255,1)'],
    [0.34, 'rgba(225,245,255,.95)'],
    [0.72, 'rgba(172,214,232,.46)'],
    [1, 'rgba(150,210,235,0)'],
  ], 1.8);
  const groundTexture = radialSprite(scene, 'procedural scorch falloff', [
    [0, 'rgba(255,255,255,.95)'],
    [0.58, 'rgba(255,255,255,.7)'],
    [1, 'rgba(255,255,255,0)'],
  ]);

  const patches = new Map<string, PatchEffects>();

  const makePatch = (patch: FirePatchSnapshot): PatchEffects => {
    const emitter = new Vector3(patch.x, 0.05, patch.z);
    const outerFlame = new ParticleSystem(`irregular flame edges ${patch.id}`, 95, scene);
    outerFlame.particleTexture = outerFlameTexture;
    outerFlame.emitter = emitter;
    setEmitterBox(outerFlame, patch.radius * 0.64, 0, 0.1);
    outerFlame.direction1.set(-0.22, 1.18, -0.2);
    outerFlame.direction2.set(0.25, 1.75, 0.22);
    outerFlame.minEmitPower = 0.6;
    outerFlame.maxEmitPower = 1.18;
    outerFlame.minLifeTime = 0.42;
    outerFlame.maxLifeTime = 0.88;
    outerFlame.minSize = 0.34;
    outerFlame.maxSize = 0.88;
    outerFlame.minScaleX = 0.48;
    outerFlame.maxScaleX = 0.82;
    outerFlame.minScaleY = 1.15;
    outerFlame.maxScaleY = 1.75;
    outerFlame.minAngularSpeed = -0.42;
    outerFlame.maxAngularSpeed = 0.42;
    outerFlame.color1 = new Color4(1, 0.62, 0.12, 0.95);
    outerFlame.color2 = new Color4(1, 0.17, 0.015, 0.78);
    outerFlame.colorDead = new Color4(0.28, 0.01, 0, 0);
    outerFlame.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    outerFlame.gravity.set(0.04, 0.42, -0.025);
    outerFlame.updateSpeed = 0.011;
    outerFlame.addSizeGradient(0, 0.28, 0.42);
    outerFlame.addSizeGradient(0.28, 1, 1.22);
    outerFlame.addSizeGradient(0.72, 0.68, 0.9);
    outerFlame.addSizeGradient(1, 0.05);
    outerFlame.start();

    const coreFlame = new ParticleSystem(`white hot flame cores ${patch.id}`, 62, scene);
    coreFlame.particleTexture = coreFlameTexture;
    coreFlame.emitter = emitter;
    setEmitterBox(coreFlame, patch.radius * 0.47, 0, 0.08);
    coreFlame.direction1.set(-0.1, 1.25, -0.1);
    coreFlame.direction2.set(0.11, 1.62, 0.1);
    coreFlame.minEmitPower = 0.45;
    coreFlame.maxEmitPower = 0.88;
    coreFlame.minLifeTime = 0.28;
    coreFlame.maxLifeTime = 0.58;
    coreFlame.minSize = 0.22;
    coreFlame.maxSize = 0.58;
    coreFlame.minScaleX = 0.4;
    coreFlame.maxScaleX = 0.68;
    coreFlame.minScaleY = 1.05;
    coreFlame.maxScaleY = 1.48;
    coreFlame.minAngularSpeed = -0.28;
    coreFlame.maxAngularSpeed = 0.28;
    coreFlame.color1 = new Color4(1, 1, 0.78, 1);
    coreFlame.color2 = new Color4(1, 0.67, 0.06, 0.94);
    coreFlame.colorDead = new Color4(1, 0.12, 0, 0);
    coreFlame.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    coreFlame.gravity.set(-0.02, 0.32, 0.02);
    coreFlame.updateSpeed = 0.01;
    coreFlame.addSizeGradient(0, 0.3);
    coreFlame.addSizeGradient(0.35, 1);
    coreFlame.addSizeGradient(1, 0.04);
    coreFlame.start();

    const smoke = new ParticleSystem(`soft shaped smoke ${patch.id}`, 22, scene);
    smoke.particleTexture = smokeTexture;
    smoke.emitter = emitter;
    setEmitterBox(smoke, patch.radius * 0.48, 0.45, 0.85);
    smoke.direction1.set(-0.12, 0.58, -0.08);
    smoke.direction2.set(0.18, 0.9, 0.12);
    smoke.minEmitPower = 0.35;
    smoke.maxEmitPower = 0.65;
    smoke.minLifeTime = 1.5;
    smoke.maxLifeTime = 2.6;
    smoke.minSize = 0.4;
    smoke.maxSize = 1.05;
    smoke.minScaleX = 0.75;
    smoke.maxScaleX = 1.18;
    smoke.minScaleY = 0.82;
    smoke.maxScaleY = 1.25;
    smoke.minAngularSpeed = -0.18;
    smoke.maxAngularSpeed = 0.18;
    smoke.color1 = new Color4(0.2, 0.18, 0.17, 0.2);
    smoke.color2 = new Color4(0.47, 0.43, 0.4, 0.09);
    smoke.colorDead = new Color4(0.5, 0.5, 0.5, 0);
    smoke.blendMode = ParticleSystem.BLENDMODE_STANDARD;
    smoke.gravity.set(0.025, 0.08, 0.01);
    smoke.addSizeGradient(0, 0.38);
    smoke.addSizeGradient(0.55, 0.9, 1.15);
    smoke.addSizeGradient(1, 1.35);
    smoke.start();

    const embers = new ParticleSystem(`restrained embers ${patch.id}`, 24, scene);
    embers.particleTexture = emberTexture;
    embers.emitter = emitter;
    setEmitterBox(embers, patch.radius * 0.72, 0.08, 0.38);
    embers.direction1.set(-0.34, 0.7, -0.34);
    embers.direction2.set(0.34, 1.5, 0.34);
    embers.minEmitPower = 0.3;
    embers.maxEmitPower = 0.85;
    embers.minLifeTime = 0.45;
    embers.maxLifeTime = 1.2;
    embers.minSize = 0.025;
    embers.maxSize = 0.075;
    embers.color1 = new Color4(1, 0.85, 0.15, 1);
    embers.color2 = new Color4(1, 0.18, 0.01, 0.8);
    embers.colorDead = new Color4(0.35, 0.02, 0, 0);
    embers.blendMode = ParticleSystem.BLENDMODE_ADD;
    embers.gravity.set(0, -0.18, 0);
    embers.start();

    const light = new PointLight(`warm fire light ${patch.id}`, new Vector3(patch.x, 0.7, patch.z), scene);
    light.diffuse = new Color3(1, 0.31, 0.055);
    light.specular = new Color3(1, 0.5, 0.12);
    light.range = Math.max(3.8, patch.radius * 4.2);
    light.intensity = 0;

    const ground = MeshBuilder.CreateGround(
      `wet scorch ${patch.id}`,
      {width: patch.radius * 2.2, height: patch.radius * 2.2, subdivisions: 1},
      scene,
    );
    ground.position.set(patch.x, 0.012, patch.z);
    ground.isPickable = false;
    ground.receiveShadows = false;
    const groundMaterial = new StandardMaterial(`wet scorch material ${patch.id}`, scene);
    groundMaterial.diffuseColor = new Color3(0.055, 0.038, 0.032);
    groundMaterial.specularColor = new Color3(0.22, 0.25, 0.25);
    groundMaterial.diffuseTexture = groundTexture;
    groundMaterial.opacityTexture = groundTexture;
    groundMaterial.useAlphaFromDiffuseTexture = true;
    groundMaterial.zOffset = -2;
    ground.material = groundMaterial;
    return {outerFlame, coreFlame, smoke, embers, light, ground, groundMaterial};
  };

  const jetOrigin = new Vector3();
  const jet = new ParticleSystem('hose silver droplet arc', 100, scene);
  jet.particleTexture = waterTexture;
  jet.emitter = jetOrigin;
  jet.minEmitBox.setAll(0);
  jet.maxEmitBox.setAll(0);
  jet.minLifeTime = 0.5;
  jet.maxLifeTime = 0.5;
  jet.minSize = 0.025;
  jet.maxSize = 0.055;
  jet.color1 = new Color4(1, 1, 1, 0.95);
  jet.color2 = new Color4(0.67, 0.86, 0.96, 0.78);
  jet.colorDead = new Color4(0.72, 0.88, 0.96, 0);
  jet.blendMode = ParticleSystem.BLENDMODE_ADD;
  jet.gravity.set(0, -9.2, 0);
  jet.updateSpeed = 0.01;

  const splashOrigin = new Vector3();
  const splash = new ParticleSystem('hose ground splash', 75, scene);
  splash.particleTexture = waterTexture;
  splash.emitter = splashOrigin;
  splash.minEmitBox.set(-0.1, 0, -0.1);
  splash.maxEmitBox.set(0.1, 0.03, 0.1);
  splash.direction1.set(-0.75, 0.45, -0.75);
  splash.direction2.set(0.75, 1.1, 0.75);
  splash.minEmitPower = 0.45;
  splash.maxEmitPower = 1.4;
  splash.minLifeTime = 0.18;
  splash.maxLifeTime = 0.48;
  splash.minSize = 0.035;
  splash.maxSize = 0.095;
  splash.color1 = new Color4(0.9, 0.97, 1, 0.9);
  splash.color2 = new Color4(0.58, 0.79, 0.9, 0.62);
  splash.colorDead = new Color4(0.65, 0.82, 0.9, 0);
  splash.blendMode = ParticleSystem.BLENDMODE_ADD;
  splash.gravity.set(0, -5.5, 0);
  splash.updateSpeed = 0.012;

  const mist = new ParticleSystem('hose fine spray plume', 80, scene);
  mist.particleTexture = waterTexture;
  mist.emitter = jetOrigin;
  mist.minEmitBox.set(-0.025, -0.025, -0.025);
  mist.maxEmitBox.set(0.025, 0.025, 0.025);
  mist.minLifeTime = 0.25;
  mist.maxLifeTime = 0.55;
  mist.minSize = 0.018;
  mist.maxSize = 0.065;
  mist.color1 = new Color4(0.92, 0.98, 1, 0.5);
  mist.color2 = new Color4(0.68, 0.85, 0.94, 0.22);
  mist.colorDead = new Color4(0.72, 0.9, 1, 0);
  mist.blendMode = ParticleSystem.BLENDMODE_ADD;
  mist.gravity.set(0, -4.2, 0);
  mist.updateSpeed = 0.011;
  mist.addSizeGradient(0, 0.22);
  mist.addSizeGradient(0.55, 0.8, 1.2);
  mist.addSizeGradient(1, 0.08);

  const steam = new ParticleSystem('water impact steam', 45, scene);
  steam.particleTexture = smokeTexture;
  steam.emitter = splashOrigin;
  steam.minEmitBox.set(-0.22, 0, -0.22);
  steam.maxEmitBox.set(0.22, 0.08, 0.22);
  steam.direction1.set(-0.12, 0.55, -0.12);
  steam.direction2.set(0.12, 1.05, 0.12);
  steam.minEmitPower = 0.3;
  steam.maxEmitPower = 0.7;
  steam.minLifeTime = 0.55;
  steam.maxLifeTime = 1.15;
  steam.minSize = 0.2;
  steam.maxSize = 0.55;
  steam.color1 = new Color4(0.9, 0.92, 0.9, 0.22);
  steam.color2 = new Color4(0.66, 0.69, 0.68, 0.1);
  steam.colorDead = new Color4(0.78, 0.8, 0.8, 0);
  steam.blendMode = ParticleSystem.BLENDMODE_STANDARD;
  steam.gravity.set(0.02, 0.14, 0);
  steam.updateSpeed = 0.012;
  steam.addSizeGradient(0, 0.35);
  steam.addSizeGradient(0.65, 1);
  steam.addSizeGradient(1, 1.2);

  let waterRunning = false;

  const updateWater = (spray: SprayState, impactHeat: number): void => {
    if (!spray.active || !spray.impact || !spray.origin ||
        !Number.isFinite(spray.origin.x) || !Number.isFinite(spray.origin.y) || !Number.isFinite(spray.origin.z) ||
        !Number.isFinite(spray.impact.x) ||
        !Number.isFinite(spray.impact.y) || !Number.isFinite(spray.impact.z)) {
      if (waterRunning) {
        jet.stop();
        splash.stop();
        mist.stop();
        steam.stop();
        waterRunning = false;
      }
      return;
    }

    jetOrigin.copyFrom(spray.origin);
    splashOrigin.copyFrom(spray.impact);
    splashOrigin.y += 0.035;
    const displacement = spray.impact.subtract(spray.origin);
    const distance = displacement.length();
    const flightTime = Math.max(0.32, Math.min(0.72, distance / 13));
    const velocity = displacement.scale(1 / flightTime);
    velocity.y += 4.6 * flightTime;
    const speed = velocity.length();
    const direction = velocity.scale(1 / Math.max(speed, 0.001));
    jet.direction1.copyFrom(direction);
    jet.direction2.copyFrom(direction);
    jet.direction1.x -= 0.012;
    jet.direction2.x += 0.012;
    jet.direction1.z -= 0.012;
    jet.direction2.z += 0.012;
    jet.minEmitPower = speed * 0.98;
    jet.maxEmitPower = speed * 1.02;
    jet.minLifeTime = flightTime * 0.93;
    jet.maxLifeTime = flightTime * 1.06;
    jet.emitRate = 155;
    splash.emitRate = 105;
    mist.direction1.copyFrom(direction);
    mist.direction2.copyFrom(direction);
    mist.direction1.x -= 0.035;
    mist.direction1.y -= 0.025;
    mist.direction1.z -= 0.035;
    mist.direction2.x += 0.035;
    mist.direction2.y += 0.035;
    mist.direction2.z += 0.035;
    mist.minEmitPower = speed * 0.72;
    mist.maxEmitPower = speed * 0.96;
    mist.minLifeTime = flightTime * 0.65;
    mist.maxLifeTime = flightTime * 1.05;
    mist.emitRate = 110;
    steam.emitRate = 36 * clamp01(impactHeat);
    if (!waterRunning) {
      jet.start();
      splash.start();
      mist.start();
      steam.start();
      waterRunning = true;
    }
  };

  const update = (dt: number, t: number, snapshot: FireSnapshot, spray: SprayState): void => {
    if (!Number.isFinite(dt) || dt <= 0 || !Number.isFinite(t)) return;
    const seen = new Set<string>();
    for (const patch of snapshot?.patches ?? []) {
      if (!patch || typeof patch.id !== 'string' || !Number.isFinite(patch.heat)) continue;
      seen.add(patch.id);
      const effects = patches.get(patch.id) ?? makePatch(patch);
      if (!patches.has(patch.id)) patches.set(patch.id, effects);
      effects.ground.setEnabled(true);
      const heat = clamp01(patch.heat);
      const wetness = clamp01(patch.wetness);
      const flicker = 0.88 + 0.12 * Math.sin(t * 12.7 + patch.x * 3.1 + patch.z);
      const secondFlicker = 0.82 + 0.18 * Math.sin(t * 17.3 + patch.x * 1.7 - patch.z * 0.4);
      effects.outerFlame.emitRate = heat > 0.005 ? 118 * heat * flicker : 0;
      effects.outerFlame.minSize = 0.22 + heat * 0.18;
      effects.outerFlame.maxSize = 0.34 + heat * 0.7;
      effects.outerFlame.maxEmitPower = 0.52 + heat * 0.78;
      effects.coreFlame.emitRate = heat > 0.015 ? 82 * heat * secondFlicker : 0;
      effects.coreFlame.minSize = 0.16 + heat * 0.1;
      effects.coreFlame.maxSize = 0.26 + heat * 0.43;
      effects.coreFlame.maxEmitPower = 0.38 + heat * 0.58;
      effects.smoke.emitRate = heat > 0.42 ? 10 * (heat - 0.38) : 0;
      effects.embers.emitRate = heat > 0.16 ? 7 * heat : 0;
      effects.light.intensity = heat > 0.01 ? heat * (0.48 + 0.13 * flicker + 0.09 * secondFlicker) : 0;
      effects.groundMaterial.alpha = 0.055 + 0.12 * heat + 0.1 * wetness;
      effects.groundMaterial.specularPower = 24 + wetness * 72;
    }

    for (const [id, effects] of patches) {
      if (seen.has(id)) continue;
      effects.outerFlame.emitRate = 0;
      effects.coreFlame.emitRate = 0;
      effects.smoke.emitRate = 0;
      effects.embers.emitRate = 0;
      effects.light.intensity = 0;
      effects.ground.setEnabled(false);
    }
    let impactHeat = 0;
    if (spray?.impact) {
      for (const patch of snapshot?.patches ?? []) {
        const distance = Math.hypot(spray.impact.x - patch.x, spray.impact.z - patch.z);
        if (distance <= patch.radius + 0.8) impactHeat = Math.max(impactHeat, clamp01(patch.heat));
      }
    }
    updateWater(spray, impactHeat);
  };

  const dispose = (): void => {
    for (const effects of patches.values()) {
      effects.outerFlame.dispose();
      effects.coreFlame.dispose();
      effects.smoke.dispose();
      effects.embers.dispose();
      effects.light.dispose();
      effects.ground.dispose(false, true);
    }
    patches.clear();
    jet.dispose();
    splash.dispose();
    mist.dispose();
    steam.dispose();
    outerFlameTexture.dispose();
    coreFlameTexture.dispose();
    smokeTexture.dispose();
    emberTexture.dispose();
    waterTexture.dispose();
    groundTexture.dispose();
  };

  return {update, dispose};
}
