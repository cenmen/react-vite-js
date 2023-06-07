import { Navigate } from 'react-router-dom';
import { VIEW_HOME, VIEW_404 } from '@/constants';
import errorRouter from './modules/error';
import heroRouter from './modules/hero';
import homeRouter from './modules/home';

/**
 * @description 路由配置项参数说明
 * @param {String} path 路由路径（React Router 参数）
 * @param {ReactNode} element 路由渲染组件（React Router 参数）
 * @param {ReactNode} icon 左侧菜单栏首级图标
 * @param {Boolean} isHide 是否在左侧菜单栏隐藏
 * @param {Boolean} noTabbar 不添加到 tabbar
 * @param {Boolean} keepAlive 是否 keepAlive (注：复用页面不建议使用)
 * @param {String} title 左侧菜单栏和 tabbar 名称
 * @param {String} redirect 路由重定向
 * @param {String} auth 页面权限值（!auth 为 true 即无需权限）
 * @remark 非 React Router 参数会在各个 layout 组件中被手动使用
 */
export const routers = [
	{
		path: '/',
		element: <Navigate to={VIEW_HOME} />,
		isHide: true
	},
	...homeRouter,
	...heroRouter,
	...errorRouter,
	{
		path: '*',
		element: <Navigate to={VIEW_404} />,
		isHide: true
	}
];
