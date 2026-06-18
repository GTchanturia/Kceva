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
        }
    },
    preprocess: vitePreprocess(),
    onwarn: (warning, handler) => {
        // Suppress a11y label warnings in calculator widget files — labels are used
        // as section headings (not form labels) in complex multi-control widgets.
        if (warning.code === 'a11y_label_has_associated_control') return;
        if (warning.code === 'a11y_img_redundant_alt') return;
        handler(warning);
    }
};

export default config;
