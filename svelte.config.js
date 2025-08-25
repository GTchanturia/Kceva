import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter(),
        alias: {
            $components: 'src/components',
            $lib: 'src/lib',
            $routes: 'src/routes'
        },
        serviceWorker: {
            // აქ შეგიძლია მიუთითო შენი service-worker სქრიპტი
            register: true,
            files: (filepath) => !/\.DS_Store/.test(filepath)
        }
    },
    preprocess: vitePreprocess()
};

export default config;