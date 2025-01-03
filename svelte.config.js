import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ['./src', './node_modules']
		}
	}),
	kit: {
		adapter: adapter({
			precompress: false,
			fallback: 'index.html'
		})
	}
};

export default config;
