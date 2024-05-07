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
		<div className='text-xs text-red-700 mt-2'>
			{typeof error === 'string' && error}
		</div>
	) : null;

ErrorMessage.defaultProps = {
	error: '',
};
