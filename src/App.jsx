import { Suspense } from 'react';
import { ConfigProvider, Spin } from 'antd';
import dayjs from 'dayjs';
import { AliveScope } from 'react-activation';
import zhCN from 'antd/es/locale/zh_CN';
import Router from '@/layout/Router';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const App = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<Suspense fallback={<Spin size='large' />}>
				<AliveScope>
					<Router />
				</AliveScope>
			</Suspense>
		</ConfigProvider>
	);
};

export default App;
