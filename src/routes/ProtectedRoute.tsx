// import { useAuthStore, usePermissionsStore } from '@/store/auth';
// import React, { ReactNode, useEffect, useState } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// export interface ProtectedRouteProps {
// 	children?: ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
// 	const [listPermissions, setListPermissions] = useState<Array<string>>([]);
// 	const { isAuthenticated, user, token } = useAuthStore();
// 	const { getPrmissions } = usePermissionsStore();
// 	const location = useLocation();

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			if (!user || !token) {
// 				return;
// 			}
// 			try {
// 				const permissons = await getPrmissions(token, user.roles);
// 				console.log('permissons', permissons);
// 				setListPermissions(permissons);
// 			} catch (error) {
// 				// Manejar errores si es necesario
// 				console.error('Error al obtener los permisos:', error);
// 			}
// 		};

// 		fetchData();
// 	}, [user, token]);

// 	const getLocation = () => {
// 		if (location.pathname !== '/') {
// 			return location.pathname.replace('/', '');
// 		}

// 		return 'home';
// 	};

// 	if (!isAuthenticated) {
// 		return <Navigate to={'/login'} />;
// 	}

// 	if (!listPermissions.includes(getLocation())) {
// 		return <Navigate to={'/not-permission'} />;
// 	}

// 	return children ? children : <Outlet />;
// };

// export default ProtectedRoute;
import { useAuthStore, usePermissionsStore } from '@/store/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps {
	children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const [listPermissions, setListPermissions] = useState<Array<string>>([]);
	const { isAuthenticated, user, token } = useAuthStore();
	const { getPermissions } = usePermissionsStore();
	// const location = useLocation();

	const locationPath = getLocation();

	useEffect(() => {
		const fetchData = async () => {
			if (!user || !token) {
				return;
			}
			try {
				const permissions = await getPermissions(token, user.roles);
				console.log('permissions', permissions);
				setListPermissions(permissions);
			} catch (error) {
				console.error('Error al obtener los permisos:', error);
				// Manejar errores aquí, posiblemente notificar al usuario
			}
		};

		fetchData();
	}, [user, token]);

	if (!isAuthenticated) {
		return <Navigate to={'/login'} />;
	}

	// if (!listPermissions.includes(locationPath)) {
	// 	return <Navigate to={'/not-permission'} />;
	// }

	return children || <Outlet />;
};

const getLocation = () => {
	const location = useLocation();
	if (location.pathname !== '/') {
		return location.pathname.replace('/', '');
	}
	return 'home';
};

export default ProtectedRoute;
