// FNV-1a 32-bit — stable across sessions, used to pin the seed to the inputs.
export function hashSeed(input) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < input.length; i += 1) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
export function mulberry32(seed) {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
export function normal(rng, mean = 0, sd = 1) {
    const u1 = Math.max(rng(), 1e-12);
    const u2 = rng();
    return mean + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
// Multiplier with E[x] = 1: exp(N(-sigma^2/2, sigma)).
export function lognormalMultiplier(rng, sigma) {
    return Math.exp(normal(rng, -(sigma * sigma) / 2, sigma));
}
