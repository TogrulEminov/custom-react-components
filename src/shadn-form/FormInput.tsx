import type { ComponentProps } from "react";
import { FieldWrapper } from "./FieldsWrapper.tsx";
import { Input } from "../components/ui/input.tsx";

interface BaseFormInputProps extends ComponentProps<"input"> {
  className?: string;
  fieldName: string;
  label?: string | undefined;
  suffix?: React.ReactNode;
}

export type FormInputProps = BaseFormInputProps;

export default function FormInput({
  label,
  fieldName,
  className,
  type = "text",
  suffix,
  ...rest
}: FormInputProps) {
  return (
    <FieldWrapper fieldName={fieldName} label={label}>
      {(field, fieldState) => (
        <div className="relative flex items-center w-full">
          <Input
            {...field}
            {...rest}
            id={field.id}
            type={type}
            onChange={(e) => {
              const val = e.target.value;
              if (type === "number") {
                const numericValue = val === "" ? "" : Number(val);
                field.onChange(numericValue);
              } else {
                field.onChange(val);
              }
            }}
            className={`${className} ${
              fieldState.invalid
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            } ${suffix ? "pr-10" : ""}`}
          />
          {suffix && (
            <div className="absolute right-3 flex items-center pointer-events-none">
              {suffix}
            </div>
          )}
        </div>
      )}
    </FieldWrapper>
  );
}
