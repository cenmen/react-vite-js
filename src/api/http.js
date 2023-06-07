import axios from 'axios';
import { message } from 'antd';
import { getToken } from '@/utils';

const errorHandler = error => {
	const { status, statusText } = error.response;
	const noAuth = /(401)/;
	// const notFound = /(404)/;
	if (noAuth.test(status)) {
		message.error('登录失效！请您重新登录');
		return;
	} else {
		message.error(statusText);
	}
};

const config = {};

const instance = axios.create(config);

instance.interceptors.request.use(request => {
	const token = getToken();
	request.headers['Authorization'] = `Bearer ${token}`;
	return request;
});

instance.interceptors.response.use(
	response => response.data,
	err => {
		errorHandler(err);
		return Promise.reject(err);
	}
);

export default instance;
