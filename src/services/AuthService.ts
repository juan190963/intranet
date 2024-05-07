import { createAxiosInstance } from '@/app/serviceConf';
import { AuthResponse, PermissionsResponse } from '@/types/authTypes';
import { END_POINTS } from '@/utils/constants/api';
import { AxiosInstance } from 'axios';

export const authenticate = async (email: string, password: string) => {
	const axiosInstance: AxiosInstance = createAxiosInstance('');
	const body = {
		email,
		password,
	};
	return axiosInstance
		.post<AuthResponse>(END_POINTS.LOGIN, body)
		.then(response => response.data);
};

export const getPermissions = async (token: string, role: string[]) => {
	const axiosInstance: AxiosInstance = createAxiosInstance(token);
	return axiosInstance
		.get<PermissionsResponse>(`${END_POINTS.PERMISSIONS}/${role}`)
		.then(response => response.data);
};
