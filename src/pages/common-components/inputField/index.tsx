import { InputFieldProps } from '../../../types/propTypes.ts';
import { Container, Input, Label } from './inputFieldElements.ts';

const InputField = ({ label, type }: InputFieldProps) => {
    return (
        <Container>
            <Input type={type} placeholder=" " />
            <Label>{label}</Label>
        </Container>
    );
};

export default InputField;
