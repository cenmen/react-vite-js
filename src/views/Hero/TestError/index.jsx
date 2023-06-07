import { useEffect } from 'react';

const DataList = () => {
	useEffect(() => {
		const test = null;
		test.map(val => val);
	}, []);

	return <div className='card-container'>🍈🍉🍓🍒开发中 - DataError</div>;
};

export default DataList;
