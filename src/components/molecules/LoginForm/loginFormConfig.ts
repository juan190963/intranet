export const inputProps = {
	email: {
		required: 'Debes ingresar un correo',
		pattern: {
			value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
			message: 'Correo electrónico invalido',
		},
	},
	password: {
		required: 'Debes ingresar una contraseña',
	},
	createPassword: {
		required: 'Debes ingresar una contraseña',
		pattern: {
			value: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
			message:
				'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un carácter especial.',
		},
	},
};
