import ReactDOM from 'react-dom';
import { memo, useEffect, useRef, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';

export const KeepAliveContext = createContext({ destroy: () => {}, isActive: false });

// 渲染 当前匹配的路由 不匹配的 利用 createPortal 移动到 document.createElement('div') 里面
const Component = ({ active, children, name, renderDiv }) => {
	const [targetElement] = useState(() => document.createElement('div'));
	const activatedRef = useRef(false);
	activatedRef.current = activatedRef.current || active;

	useEffect(() => {
		if (active) {
			// 渲染匹配的组件
			if (renderDiv.current?.firstChild) {
				renderDiv.current?.replaceChild(targetElement, renderDiv.current?.firstChild);
			} else {
				renderDiv.current?.appendChild(targetElement);
			}
		}
	}, [active]);

	useEffect(() => {
		// 添加一个 id 作为标识 并没有什么太多作用
		targetElement.setAttribute('id', name);
	}, [name]);

	// 把 vnode 渲染到 document.createElement('div') 里面
	return <>{ReactDOM.createPortal(children, targetElement)}</>;
};
export const KeepAliveComponent = memo(Component);

const KeepAlive = ({ children, include = [], exclude = [], maxLen = 15 }) => {
	const containerRef = useRef(null);
	const components = useRef([]);
	const { pathname } = useLocation();

	//销毁缓存的路由
	const destroy = destroyName => {
		components.current = components.current.filter(item => item.name !== destroyName);
	};

	// 缓存超过上限的 干掉第一个缓存
	if (components.current.length >= maxLen) {
		components.current = components.current.slice(1);
	}
	components.current = components.current.filter(item => {
		let isAlive = false;
		if (exclude && exclude.includes(item.name)) isAlive = false;
		if (include) isAlive = include.includes(item.name);
		return isAlive;
	});
	const component = components.current.find(item => item.name === pathname);
	if (!component) {
		components.current = [
			...components.current,
			{
				name: pathname,
				renderElement: children
			}
		];
	}

	const context = {
		destroy,
		isActive: !!component
	};

	return (
		<>
			<div ref={containerRef}></div>
			<KeepAliveContext.Provider value={context}>
				{components.current.map(item => (
					<Component active={item.name === pathname} renderDiv={containerRef} name={item.name} key={item.name}>
						{item.renderElement}
					</Component>
				))}
			</KeepAliveContext.Provider>
		</>
	);
};
export default memo(KeepAlive);
