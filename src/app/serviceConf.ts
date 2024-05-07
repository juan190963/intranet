import axios, { AxiosInstance } from 'axios';

function createAxiosInstance(authorization: string): AxiosInstance {
	const instance: AxiosInstance = axios.create({
		baseURL: 'http://localhost:3000',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authorization}`,
		},
	});

	return instance;
}

export { createAxiosInstance };
