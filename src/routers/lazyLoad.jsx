import { Component, Suspense } from 'react';
import { Spin, notification } from 'antd';
import { Link } from 'react-router-dom';
import { VIEW_HOME } from '@/constants';
import errorImage from '@/assets/images/error.svg';

const ErrorContainer = () => {
	return (
		<div className='card-container p-4 flex flex-col items-center'>
			<img className='w-2/4 max-w-2xl' src={errorImage} alt='error' />
			<span className='text-lg font-bold mt-1.5'>系统遇到意外错误 ~</span>
			<Link className='mt-1.5' to={VIEW_HOME}>
				返回
			</Link>
		</div>
	);
};

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, errorUrl: '' };
	}

	componentDidMount() {
		this.setState({ hasError: false });
	}

	componentDidCatch(error) {
		// 系统发布后用户当前（旧资源）尝试跳转懒加载的某页面找不到资源，因为资源已经被更新
		const isLaunch = error?.message.includes('Failed to fetch dynamically imported module');
		if (isLaunch) {
			notification.warning({
				duration: null,
				message: '系统有更新',
				description: '请按 Ctrl + F5 刷新页面获取最新内容'
			});
		}
		const currentUrl = window.location.href;
		this.setState({ hasError: true, errorUrl: currentUrl });
	}

	componentDidUpdate() {
		// 点击其他页面应退出 500
		const currentUrl = window.location.href;
		const { hasError, errorUrl } = this.state;
		if (hasError && currentUrl !== errorUrl) this.setState({ hasError: false, currentUrl: '' });
	}

	render() {
		if (this.state.hasError) {
			return <ErrorContainer />;
		}
		return this.props.children;
	}
}

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */
const lazyLoad = Comp => {
	const Loading = <Spin className='w-full' size='large' style={{ margin: '150px auto' }} />;
	return (
		<Suspense fallback={Loading}>
			<ErrorBoundary>
				<Comp />
			</ErrorBoundary>
		</Suspense>
	);
};

export default lazyLoad;
