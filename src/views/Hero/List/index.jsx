import { Table, Space, Tag, Skeleton } from 'antd';
import { Link, generatePath } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { fetchHeroData } from '@/api';
import { VIEW_HERO_DETAIL } from '@/constants';

const columns = [
	{
		title: '英雄 ID',
		dataIndex: 'heroId'
	},
	{
		title: '昵称',
		dataIndex: 'name'
	},
	{
		title: '名字',
		dataIndex: 'title'
	},
	{
		title: '英文名字',
		dataIndex: 'alias'
	},
	{
		title: '相关词',
		dataIndex: 'keywords',
		render: items => (
			<Space>
				{items.split(',').map(val => (
					<Tag key={val}>{val}</Tag>
				))}
			</Space>
		)
	},
	{
		title: '操作',
		dataIndex: 'heroId',
		render: id => <Link to={generatePath(VIEW_HERO_DETAIL, { id })}>查看详情</Link>
	}
];

const DataList = () => {
	const { data, error, loading } = useRequest(fetchHeroData);

	if (error) {
		return <div>加载数据失败~</div>;
	}

	const { hero = [] } = data || {};

	return (
		<div className='card-container'>
			<Skeleton active loading={loading}>
				<Table rowKey='heroId' columns={columns} dataSource={hero} />
			</Skeleton>
		</div>
	);
};

export default DataList;
