import { VIEW_404 } from '@/constants';
import NotFound from '@/views/Error/404';

// 错误页面模块
const errorRouter = [
	{
		isHide: true,
		title: '404',
		path: VIEW_404,
		element: <NotFound />
	}
];

export default errorRouter;
