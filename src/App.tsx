import React from 'react';
import '@/styles/main.scss';

import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => {
	return (
		<>
			<ToastContainer theme='light' />
			<AppRoutes />
		</>
	);
};

export default App;
