import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface ErrorMessageProps {
	error?:
		| string
		| FieldError
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
	error ? (
		<div className='text-xs  mt-2 errorMessage'>
			{typeof error === 'string' && error}
		</div>
	) : null;

ErrorMessage.defaultProps = {
	error: '',
};
