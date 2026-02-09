import {FieldWrapper} from "./FieldsWrapper.tsx";
import {Checkbox, type CheckboxProps} from "antd";

interface BaseFormInputProps extends CheckboxProps {
    className?: string;
    fieldName: string;
    label?: string | undefined
}

export type FormFieldsProps = BaseFormInputProps

function FormCheckbox({label, fieldName, className, ...rest}: FormFieldsProps) {
    return (
        <FieldWrapper fieldName={fieldName} label={label}>
            {(field, fieldState) => (
                <Checkbox
                    {...field}
                    onClick={field.onChange}
                    {...rest}
                    id={field.id}
                    className={`${className} ${fieldState.invalid ? 'ant-input-status-error' : ''}`}
                    status={fieldState.invalid ? "error" : ""}
                />
            )}
        </FieldWrapper>
    );
}

export default FormCheckbox;