import {TreeSelect, type TreeSelectProps} from "antd";
import {FieldWrapper} from "./FieldsWrapper.tsx";

interface BaseFormSelectProps extends TreeSelectProps {
    className?: string;
    fieldName: string;
    label?: string;
}

export type FormSelectProps = BaseFormSelectProps;

export default function FormTreeSelect({
                                           label,
                                           fieldName,
                                           className,
                                           ...rest
                                       }: FormSelectProps) {

    return (
        <FieldWrapper fieldName={fieldName} label={label}>
            {(field, fieldState) => (
                <TreeSelect
                    placeholder={label}
                    treeLine={true}
                    showSearch
                    status={fieldState.invalid ? "error" : ""}
                    style={{width: "100%"}}
                    allowClear={true}
                    {...field}
                    {...rest}
                    id={field.id}
                />
            )}
        </FieldWrapper>
    );
}