import * as react_jsx_runtime from 'react/jsx-runtime';

interface SignupFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}
declare function SignupForm({ onSuccess, onError }: SignupFormProps): react_jsx_runtime.JSX.Element;

export { SignupForm };
