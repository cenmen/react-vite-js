import { useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { useOutlet, useLocation, useNavigate } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';
import { shallow } from 'zustand/shallow';
import { KeepAlive } from 'react-activation';
import { useLayoutStore, useAuthStore } from '@/store';
import LayoutMenu from '../Menu';
import LayoutHeader from '../Header';
import LayoutTabbar from '../Tabbar';
const { Sider, Content } = Layout;

const getTargetRouteItem = (pathname, routes) => {
	for (const item of routes) {
		if (item.path === pathname) return item;
		if (item.children) {
			const target = getTargetRouteItem(pathname, item.children);
			if (target) return target;
		}
	}
};

const Transition = props => {
	const animates = useSpring({ reset: true, to: { opacity: 1, translateX: 0 }, from: { opacity: 0, translateX: -150 } });
	return <animated.div style={animates}>{props.children}</animated.div>;
};

const LayoutIndex = props => {
	const { children } = props;
	const currentRouter = useAuthStore(state => state.currentRouter);
	const { isCollapse, updateLayoutStore } = useLayoutStore(
		state => ({ isCollapse: state.isCollapse, updateLayoutStore: state.updateLayoutStore }),
		shallow
	);
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// 监听窗口大小变化
	const listeningWindowResize = () => {
		window.addEventListener('resize', () => {
			let screenWidth = document.body.clientWidth;
			if (isCollapse === false && screenWidth < 1200) updateLayoutStore({ isCollapse: true });
		});
	};

	const currentRoute = useMemo(() => getTargetRouteItem(pathname, currentRouter), [pathname, currentRouter]);

	useEffect(() => {
		listeningWindowResize();
	}, []);

	useEffect(() => {
		if (currentRoute?.redirect) navigate(currentRoute.redirect);
	}, [currentRoute]);

	const childrenContent = children || outlet;

	return (
		<Layout className='h-screen'>
			<Sider trigger={null} collapsed={isCollapse} width={220} theme='dark'>
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader />
				<LayoutTabbar />
				<Content>
					<Transition>
						{currentRoute && !currentRoute.noKeepAlive ? (
							<KeepAlive name={pathname} id={pathname} path={pathname} saveScrollPosition='screen'>
								{childrenContent}
							</KeepAlive>
						) : (
							childrenContent
						)}
					</Transition>
				</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutIndex;
