import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useLayoutStore } from '@/store';
import { shallow } from 'zustand/shallow';

const CollapseIcon = () => {
	const { isCollapse, updateLayoutStore } = useLayoutStore(
		state => ({ isCollapse: state.isCollapse, updateLayoutStore: state.updateLayoutStore }),
		shallow
	);
	return (
		<div className='mr-5 cursor-pointer flex' onClick={() => updateLayoutStore({ isCollapse: !isCollapse })}>
			{isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		</div>
	);
};

export default CollapseIcon;
