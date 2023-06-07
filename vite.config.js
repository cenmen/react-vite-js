import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import eslintPlugin from 'vite-plugin-eslint';
import reactNodeKey from 'react-node-key/vite';
import { AUTH_API, HERO_API } from './src/config/env';

// 将纯字符串配置转换类型
const toTransformConfig = config => {
	const isNumberKeys = ['VITE_PORT'];
	return Object.entries(config).reduce((total, cur) => {
		const [key, value] = cur;
		if (value === 'true') return { ...total, [key]: true };
		if (value === 'false') return { ...total, [key]: false };
		if (isNumberKeys.includes(key)) return { ...total, [key]: Number(value) };
		return { ...total, [key]: value };
	}, {});
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
	const env = loadEnv(mode, process.cwd());
	const IS_BUILD = command === 'build';
	const { VITE_PORT, VITE_OPEN, VITE_APP_TITLE, VITE_REPORT, VITE_SOURCE_MAP } = toTransformConfig(env);

	return {
		// base: "/",
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		server: {
			cors: true,
			port: VITE_PORT,
			open: VITE_OPEN,
			// https: false,
			proxy: {
				[AUTH_API]: {
					target: `http://api.${mode}.com`,
					changeOrigin: true,
					rewrite: path => path.replace(RegExp(`^${AUTH_API}`), '')
				},
				[HERO_API]: {
					target: `https://game.gtimg.cn/images/lol`,
					changeOrigin: true,
					rewrite: path => path.replace(new RegExp(`^${HERO_API}`), '')
				}
			}
		},
		plugins: [
			react(),
			reactNodeKey(),
			// EsLint 报错信息显示在浏览器界面上
			eslintPlugin({
				include: ['src/**/*.js', 'src/**/*.jsx', 'src/*.js', 'src/*.jsx']
			}),
			createHtmlPlugin({
				inject: {
					data: {
						title: VITE_APP_TITLE,
						injectScript: IS_BUILD
							? `<script src="/script.${mode}.js?t=${Date.now()}"></script>`
							: `<script src="/public/script.${mode}.js"></script>`
					}
				}
			}),
			VITE_REPORT && visualizer()
		],
		build: {
			sourcemap: VITE_SOURCE_MAP,
			minify: 'esbuild',
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			}
		}
	};
});
