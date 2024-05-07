import { authenticate, getPermissions } from '@/services/AuthService';
import { AuthState, PermissionsState } from '@/types/authTypes';
import create from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
	persist<AuthState>(
		set => ({
			isAuthenticated: false,
			user: null,
			token: null,
			login: async (username: string, password: string) => {
				const authData = await authenticate(username, password);
				if (!authData) {
					throw new Error('Failed to authenticate');
				}
				set({
					isAuthenticated: true,
					user: authData.user,
					token: authData.token,
				});
			},
			logout: async () => {
				set({
					isAuthenticated: false,
					user: null,
					token: null,
				});
			},
		}),
		{
			name: 'authState',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export const usePermissionsStore = create(
	persist<PermissionsState>(
		set => ({
			listPermissions: [],
			getPermissions: async (token: string, rol: string[]) => {
				const permissions = await getPermissions(token, rol);
				set({
					listPermissions: permissions.permissions,
				});

				return permissions.permissions;
			},
		}),
		{
			name: 'Permissions',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
