let exports = {};

try {
	// 因为 vite.config.js 引用此文件且运行处于 node 没有 window 会报错
	if (window && window.ENV_CONFIG) exports = window.ENV_CONFIG;
} catch (error) {
	// console.log('🚀 ~ error', error);
}

// 代理转发请求
exports.AUTH_API = '/authApi';
exports.HERO_API = '/dataApi';

export const { ENV, AUTH_API, HERO_API } = exports;
// eslint-disable-next-line
console.log('🚀 ~ exports', exports);
