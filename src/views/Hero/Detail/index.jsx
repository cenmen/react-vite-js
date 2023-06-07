import { useEffect } from 'react';
import { Image, Descriptions, message } from 'antd';
import { useParams } from 'react-router-dom';

const DataDetail = props => {
	const { currentHeroItem } = props;
	const { id } = useParams();

	const loadHeroItemDetail = async () => {};

	useEffect(() => {
		const hide = message.loading('正在加载英雄详情...', 0);
		loadHeroItemDetail(id, hide);
	}, [id]);

	const { title, name, shortBio, allytips, enemytips } = currentHeroItem?.hero || {};
	const { mainImg } = currentHeroItem?.skins[0] || {};

	return (
		<div className='card-container'>
			{currentHeroItem?.hero && (
				<>
					<Descriptions title='英雄详情' bordered column={1} labelStyle={{ width: 120 }}>
						<Descriptions.Item label='英雄图片'>
							<Image width={500} src={mainImg} />
						</Descriptions.Item>
						<Descriptions.Item label='名称'>
							{title} - {name}
						</Descriptions.Item>
						<Descriptions.Item label='故事'>{shortBio}</Descriptions.Item>
						<Descriptions.Item label='攻略'>
							{allytips.map(val => (
								<div key={val}>{val}</div>
							))}
						</Descriptions.Item>
						<Descriptions.Item label='克制'>
							{enemytips.map(val => (
								<div key={val}>{val}</div>
							))}
						</Descriptions.Item>
					</Descriptions>
				</>
			)}
		</div>
	);
};

export default DataDetail;
