import { memo } from 'react';
import { useLayoutStore } from '@/store';
import logo from '@/assets/images/logo.png';

const Logo = () => {
	const isCollapse = useLayoutStore(state => state.isCollapse);
	return (
		<div className='flex justify-center items-center h-14'>
			<img src={logo} alt='logo' className='w-7 m-0' />
			{!isCollapse ? <span className='ml-2 text-2xl font-black text-gray-300 truncate'>I&apos;m Logo</span> : null}
		</div>
	);
};

export default memo(Logo);
