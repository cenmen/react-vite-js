import { message } from 'antd';
import { useState } from 'react';

export const useRequest = params => {
	const { request, defaultData = null, handleResponse, prefix } = params;
	const [data, setData] = useState(defaultData);
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const load = async (...params) => {
		try {
			setLoading(true);
			let response = await request(...params);
			if (handleResponse) response = handleResponse(response);
			// 默认接口返回格式，其他接口使用 handleResponse 自行兼容
			const { data, isSuccess, message: text } = response;
			if (!isSuccess) {
				message.error(`${prefix}${text}`);
				setIsError(true);
				setLoading(false);
				return { data, isSuccess, message: text };
			}
			setLoading(false);
			setData(data);
			return { data, isSuccess, message: text };
		} catch (error) {
			const text = error?.data?.message || error.message || '请求失败';
			message.error(text);
			setIsError(true);
			setLoading(false);
			return { data: error?.data || null, isSuccess: false, message: text };
		}
	};

	return { load, data, loading, isError };
};
