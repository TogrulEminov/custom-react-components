import type { ComponentProps } from "react";
import { Switch } from "../components/ui/switch.tsx";
import { FieldWrapper } from "./FieldsWrapper.tsx";

interface BaseFormInputProps extends Omit<ComponentProps<typeof Switch>, "onChange"> {
    className?: string;
    fieldName: string;
    label?: string | undefined;
}

export type FormProps = BaseFormInputProps;

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
                    {...rest}
                    id={field.id}
                    // Shadcn Switch 'checked' və 'onCheckedChange' istifadə edir
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    // Ref-i ötürmək React Hook Form üçün vacibdir
                    ref={field.ref}
                    className={`${className} ${
                        fieldState.invalid 
                        ? "border-destructive focus-visible:ring-destructive" 
                        : ""
                    }`}
                />
            )}
        </FieldWrapper>
    );
}

export default FormSwitch;