import { useEffect } from 'react';
import { Button, Tag, Popover } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { cloneDeep } from 'lodash-es';
import { routers } from '@/routers';
import { useLayoutStore } from '@/store';

const getTargetRouteItem = (pathname, routes) => {
	for (const item of routes) {
		if (item.path === pathname) return item;
		if (item.children) {
			const target = getTargetRouteItem(pathname, item.children);
			if (target) return target;
		}
	}
};

const Tabbar = () => {
	const { currentTabList, updateLayoutStore } = useLayoutStore(
		state => ({ currentTabList: state.currentTabList, updateLayoutStore: state.updateLayoutStore }),
		shallow
	);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const onCloseTag = item => {
		const tabs = cloneDeep(currentTabList);
		if (item.active) tabs.forEach(tab => delete tab.active);
		const filters = tabs.filter(val => val.pathname !== item.pathname);
		setTimeout(() => {
			updateLayoutStore({ currentTabList: filters });
		}, 0);
		if (item.active) {
			filters[0].active = true;
			const firstPathname = filters[0].pathname;
			navigate(firstPathname);
		}
	};

	const onClickTag = item => {
		const { pathname } = item;
		navigate(pathname);
	};

	const onCloseTagItemOnOther = index => {
		let tabs = cloneDeep(currentTabList);
		const activeItemIndex = tabs[index];
		activeItemIndex.active = true;
		navigate(activeItemIndex.pathname);
		tabs = [activeItemIndex];
		setTimeout(() => {
			updateLayoutStore({ currentTabList: tabs });
		}, 0);
	};

	const onCloseTagItemOnRight = index => {
		let tabs = cloneDeep(currentTabList);
		const activeItemIndex = tabs.findIndex(val => val.active);
		tabs.splice(index + 1);
		// 若关闭右侧包含当前高亮则跳转到第一个 tab
		if (activeItemIndex > index) {
			tabs[0].active = true;
			const shouldPath = tabs[0].pathname;
			navigate(shouldPath);
		}
		setTimeout(() => {
			updateLayoutStore({ currentTabList: tabs });
		}, 0);
	};

	useEffect(() => {
		const tabs = cloneDeep(currentTabList);
		tabs.forEach(tab => delete tab.active);
		let currentItem = tabs.find(val => val.pathname === pathname);
		if (!currentItem) {
			const target = getTargetRouteItem(pathname, routers);
			if (target) currentItem = { pathname: target.path, name: target.title };
			if (currentItem) {
				tabs.push(currentItem);
			}
		}
		if (!currentItem) return;
		currentItem.active = true;
		updateLayoutStore({ currentTabList: tabs });
	}, [pathname]);

	const PopoverContent = props => {
		const { index } = props;
		return (
			<div>
				<Button block type='text' onClick={() => onCloseTagItemOnOther(index)}>
					关闭其他
				</Button>
				<Button block type='text' onClick={() => onCloseTagItemOnRight(index)}>
					关闭右侧
				</Button>
			</div>
		);
	};

	return (
		<div className='bg-white p-1 overflow-x-auto box-content min-h-[28px] overflow-y-hidden shadow-sm'>
			{currentTabList.map((item, index) => (
				<Popover
					trigger='contextMenu'
					overlayStyle={{ margin: 0, width: '100px' }}
					content={<PopoverContent index={index} />}
					key={item.pathname}
				>
					<Tag
						closable
						className='cursor-default align-top'
						color={item.active ? 'processing' : 'default'}
						key={item.pathname}
						onClick={() => onClickTag(item)}
						onClose={() => onCloseTag(item)}
					>
						{item.name}
					</Tag>
				</Popover>
			))}
		</div>
	);
};

export default Tabbar;
