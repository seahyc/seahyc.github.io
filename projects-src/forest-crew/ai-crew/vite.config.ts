import {defineConfig} from 'vite';
export default defineConfig(({mode})=>({base:mode==='public'?'/making/forest-crew-ai-crew/':'./',define:{'import.meta.env.VITE_PLAYTEST_BASE_URL':JSON.stringify('/projects/hand-walk/'),'import.meta.env.VITE_CREW_DEFAULT':JSON.stringify('1'),'import.meta.env.VITE_CREW_API_BASE':JSON.stringify('/api/forest-crew')}}));
