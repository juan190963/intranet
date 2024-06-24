export interface LoginData {
	email: string;
	password: string;
	confirmPassword: string;
}

export interface User {
	fullName: string;
	email: string;
	roles: string[];
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	token: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

export interface PermissionsState {
	listPermissions: string[];
	getPermissions: (
		token: string,
		rol: string[],
	) => Promise<string[]>;
}

export interface User {
	fullName: string;
	email: string;
	roles: string[];
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface PermissionsResponse {
	permissions: string[];
}
