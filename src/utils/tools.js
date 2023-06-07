import { useAuthStore } from '@/store';

export const getToken = () => {
	const tokenInfo = useAuthStore.getState().tokenInfo;
	return tokenInfo && tokenInfo.access_token;
};

export const delay = timeout => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
};
