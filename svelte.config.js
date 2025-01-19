// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { sveltePreprocess } from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// @smui did not work with sveltePreprocess
	// preprocess: sveltePreprocess({
	// 	scss: {
	// 		includePaths: ['./src', './node_modules']
	// 	}
	// }),

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess({
	}),
	kit: {
		// adapter: adapter({
		// 	precompress: false,
		// 	fallback: 'index.html'
		// })
		adapter: adapter()
	}
};

export default config;
