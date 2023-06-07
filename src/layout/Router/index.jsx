import { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { fetchAuthInfo } from '@/api';
import { routers } from '@/routers';
import { useAuthStore } from '@/store';

// 默认父级菜单下没有子菜单则过滤掉父菜单
const getAuthRoutes = (authInfo, routes) => {
	return routes.reduce((total, cur) => {
		if (cur.children) cur.children = getAuthRoutes(authInfo, cur.children);
		return !cur.auth || authInfo.includes(cur.auth) ? [...total, cur] : total;
	}, []);
};

const Router = () => {
	const updateAuthStore = useAuthStore(state => state.updateAuthStore);
	const [authRoutes, setAuthRoutes] = useState(null);

	const loadAuthInfo = async () => {
		const authInfo = await fetchAuthInfo();
		const routes = getAuthRoutes(authInfo, routers);
		setAuthRoutes(routes);
		updateAuthStore({ authInfo, currentRouter: routes });
	};

	useEffect(() => {
		loadAuthInfo();
	}, []);

	const AuthRouter = props => useRoutes(props.routes);

	return <BrowserRouter>{authRoutes && <AuthRouter routes={authRoutes} />}</BrowserRouter>;
};

export default Router;
