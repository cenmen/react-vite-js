// import http from '@/api/http';
import { AUTH_KEYS } from '@/constants';

/**
 * @namespace 登录模块
 */

/**
 * 获取权限列表
 * @returns {Promise<string[]>}
 */
export const fetchAuthInfo = () => {
	return new Promise(resolve => {
		setTimeout(() => {
			const data = Object.values(AUTH_KEYS);
			data.pop();
			resolve(data);
		}, 1500);
	});
};
