import { defineConfig } from 'vite';
import path from 'path';
import sass from 'sass';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		modules: {
			// Agrega las opciones de los módulos CSS aquí si es necesario
			localsConvention: 'camelCase', // Opcional: convención de nombres de clases
		},
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
		preprocessorOptions: {
			sass: {
				additionalData: '@import "@/styles/main";',
				implementation: sass,
			},
		},
	},
});
