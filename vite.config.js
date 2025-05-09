import { sync } from "glob";
import { resolve } from "path";
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer'
import combineSelectors from 'postcss-combine-duplicated-selectors';
import combineMediaQueries from 'postcss-combine-media-query';
import includeHtml from "vite-plugin-include-html";

// NODE_ENV=production gulp
// --> process.env.NODE_ENV === 'production'

const root = resolve(__dirname, 'src');
// const outDir = resolve(__dirname, '../build');

export default defineConfig({
	root,
	resolve: {
		alias: {
			"@js": resolve(__dirname, "src/assets/js"),
			"@scss": resolve(__dirname, "src/scss"),
			"@font": resolve(__dirname, "src/assets/fonts"),
			"@images": resolve(__dirname, "src/assets/images"),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // 또는 "modern", "legacy"
				additionalData: `@use "@scss/base" as a;
`,
			},
		},
		postcss: {
			plugins: [
				autoprefixer(),
				combineMediaQueries(),
				combineSelectors({ removeDuplicatedValues: true })
			]
		}
	},
	build: {
		outDir: "../build",
		emptyOutDir: true,
		rollupOptions: {
			input: sync("./src/**/*.html".replace(/\\/g, "/")),
		},
	},
	plugins:[ includeHtml() ]
});