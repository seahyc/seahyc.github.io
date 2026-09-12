import {defineConfig} from 'vite';
export default defineConfig(({mode})=>({base:mode==='public'?'/making/forest-crew-grove-01/':'./',define:mode==='public'?{'import.meta.env.VITE_PLAYTEST_BASE_URL':JSON.stringify('/projects/hand-walk/')}:undefined}));
