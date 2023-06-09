import { Avatar, Menu, Dropdown, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store';

const AvatarIcon = () => {
	const resetAuthStore = useAuthStore(state => state.resetAuthStore);
	// 退出登录
	const logout = () => {
		setTimeout(() => {
			resetAuthStore();
		}, 0);
		message.success('已退出登录');
		// navigate('/login');
	};

	const menuList = [
		{
			key: 'logout',
			label: <span className='dropdown-item'>退出登录</span>,
			icon: <LogoutOutlined />,
			onClick: logout
		}
	];

	const menu = <Menu items={menuList}></Menu>;

	return (
		<Dropdown menu={menu} placement='bottomRight' arrow>
			<Avatar size='large' src='../../../assets/images/logo.png' />
		</Dropdown>
	);
};

export default AvatarIcon;
