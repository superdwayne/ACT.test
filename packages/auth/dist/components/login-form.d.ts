import * as react_jsx_runtime from 'react/jsx-runtime';

interface LoginFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}
declare function LoginForm({ onSuccess, onError }: LoginFormProps): react_jsx_runtime.JSX.Element;

export { LoginForm };
