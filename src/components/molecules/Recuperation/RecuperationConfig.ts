export const inputProps = {
	
	password: {
		required: 'Debes ingresar una contraseña',
	},

	confirmPassword: {
		required: 'Debes confirmar tu contraseña',
		validate: (value: string, context: any) => value === context.watch('password') || 'Las contraseñas no coinciden'
	},
	
};




