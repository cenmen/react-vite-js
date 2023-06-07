import { HomeOutlined } from '@ant-design/icons';
import { VIEW_HOME } from '@/constants';
import LayoutIndex from '@/layout/Layout';
import Home from '@/views/Home';

// 首页模块
const homeRouter = [
	{
		title: '首页',
		path: VIEW_HOME,
		icon: <HomeOutlined />,
		element: (
			<LayoutIndex>
				<Home />
			</LayoutIndex>
		)
	}
];

export default homeRouter;
