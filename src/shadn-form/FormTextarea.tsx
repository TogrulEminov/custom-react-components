import type { ComponentProps } from "react";
import { FieldWrapper } from "./FieldsWrapper.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { cn } from "../lib/utils.ts";

interface BaseFormInputProps extends ComponentProps<"textarea"> {
  className?: string;
  fieldName: string;
  label?: string | undefined;
}

export type FormInputProps = BaseFormInputProps;

export default function FormTextarea({
  label,
  fieldName,
  className,
  ...rest
}: FormInputProps) {
  return (
    <FieldWrapper fieldName={fieldName} label={label}>
      {(field, fieldState) => (
        <Textarea
          {...field}
          {...rest}
          id={field.id}
          className={cn(
            "min-h-25 w-full bg-[#FAFAFA] transition-all duration-200",
            fieldState.invalid
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input focus-visible:ring-ring",
            className,
          )}
        />
      )}
    </FieldWrapper>
  );
}
