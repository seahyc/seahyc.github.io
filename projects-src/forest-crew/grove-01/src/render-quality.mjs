// Babylon's hardware scaling is the inverse of rendered pixels per CSS pixel.
// Keep a sharp base image; bound high-DPI fill cost instead of scaling backwards.
export function renderQuality({width,height,dpr=1,mobile=false,maxSamples=1}){
 const cssPixels=Math.max(1,width)*Math.max(1,height);
 const requested=Math.min(2,Math.max(1,Number.isFinite(dpr)?dpr:1));
 const budget=mobile?1_600_000:4_000_000;
 const pixelRatio=Math.max(1,Math.min(requested,Math.sqrt(budget/cssPixels)));
 const samples=!mobile&&maxSamples>=2?2:1;
 return {pixelRatio,hardwareScaling:1/pixelRatio,samples,fxaa:samples===1,
  reflectionSize:mobile?768:1024,ambientOcclusion:!mobile};
}
