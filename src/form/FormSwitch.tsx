import {Switch, type SwitchProps} from "antd";
import {FieldWrapper} from "./FieldsWrapper.tsx";

interface BaseFormInputProps extends SwitchProps {
    className?: string;
    fieldName: string;
    label?: string | undefined
}

export type FormProps = BaseFormInputProps

function FormSwitch({
                        label,
                        fieldName,
                        className,
                        ...rest
                    }: FormProps) {
    return (
        <FieldWrapper fieldName={fieldName} label={label}>
            {(field, fieldState) => (
                <Switch
                    {...field}
                    {...rest}
                    id={field.id}
                    className={`${className} ${fieldState.invalid ? 'ant-input-status-error' : ''}`}
                    status={fieldState.invalid ? "error" : ""}
                />
            )}
        </FieldWrapper>
    );
}

export default FormSwitch;