import React, {
	FC,
	Fragment,
	LazyExoticComponent,
	Suspense,
	lazy,
} from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AppLayoutProps } from '@/pages/Dashboard/Dashboard';
import { ProtectedRouteProps } from '@/routes/ProtectedRoute';
import { Spinner } from '@/components/atoms/Spinner/Spinner';

type NewType = FC<AppLayoutProps>;

interface RouteProps {
	path?: string;
	element?: LazyExoticComponent<FC<any>>;
	layout?: LazyExoticComponent<NewType>;
	guard?: LazyExoticComponent<FC<ProtectedRouteProps>>;
	children?: RouteProps[];
}

export const AppRoutes: React.FC = () => {
	const routes: RouteProps[] = [
		{
			path: '/login',
			element: lazy(async () => await import('@/pages/Login/Login')),
		},
		{
			layout: lazy(async () => await import('@/pages/Dashboard/Dashboard')),
			children: [
				{
					path: '/not-permission',
					element: lazy(
						async () => await import('@/pages/NotPermissions/NotPermissions'),
					),
				},
			],
		},
		// protected routes
		{
			guard: lazy(async () => await import('@/routes/ProtectedRoute')),
			children: [
				{
					path: '/',
					element: lazy(async () => await import('@/pages/Dashboard/Dashboard')),
				},
			],
		},
		{
			layout: lazy(async () => await import('@/pages/Dashboard/Dashboard')),
			guard: lazy(async () => await import('@/routes/ProtectedRoute')),
			children: [
				{
					path: '/meeting-room',
					element: lazy(async () => await import('@/pages/MeetingRoom/MeetingRoom')),
				},
			],
		},

		{
			path: '*',
			element: lazy(async () => await import('@/pages/NotFound/NotFound')),
		},
	];

	const renderRoutes = (routes: RouteProps[]) => {
		return routes.map((route, index) => {
			const Component = route.element || Fragment;
			const Layout = route.layout || Fragment;
			const Guard = route.guard || Fragment;
			return (
				<Route
					key={index}
					path={route.path}
					element={
						<Suspense fallback={<Spinner />}>
							<Guard>
								<Layout>{route.children ? <Outlet /> : <Component />}</Layout>
							</Guard>
						</Suspense>
					}
				>
					{route.children && renderRoutes(route.children)}
				</Route>
			);
		});
	};

	return (
		<BrowserRouter>
			<Routes>{renderRoutes(routes)}</Routes>
		</BrowserRouter>
	);
};
