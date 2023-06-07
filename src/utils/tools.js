export const getToken = () => {
	// const auth = store.getState().auth;
	// return auth.tokenInfo && auth.tokenInfo.access_token;
};

export const delay = timeout => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
};
