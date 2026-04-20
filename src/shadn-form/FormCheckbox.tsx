import { FieldWrapper } from "./FieldsWrapper.tsx";
import { Checkbox } from "../components/ui/checkbox.tsx";
import type { ComponentProps } from "react";

interface BaseFormInputProps extends Omit<
  ComponentProps<typeof Checkbox>,
  "onChange"
> {
  className?: string;
  fieldName: string;
  label?: string | undefined;
}

export type FormFieldsProps = BaseFormInputProps;

function FormCheckbox({
  label,
  fieldName,
  className,
  ...rest
}: FormFieldsProps) {
  return (
    <FieldWrapper fieldName={fieldName} label={label}>
      {(field, fieldState) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            {...rest}
            id={field.id}
            checked={field.value}
            onCheckedChange={field.onChange}
            ref={field.ref}
            className={`${className} ${
              fieldState.invalid
                ? "border-destructive ring-offset-background focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>
      )}
    </FieldWrapper>
  );
}

export default FormCheckbox;
