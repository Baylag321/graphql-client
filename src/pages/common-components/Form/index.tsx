import { FormProps } from '../../../types/propTypes.ts';
import { FormContainer, FormTitle } from './formElements.ts';

const Form = ({ children }: FormProps) => {
    return (
        <FormContainer>
            <FormTitle>Login</FormTitle>
            {children}
        </FormContainer>
    );
};

export default Form;
