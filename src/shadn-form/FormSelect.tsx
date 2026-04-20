import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.tsx";
import { cn } from "../lib/utils.ts";
import { FieldWrapper } from "./FieldsWrapper.tsx";

interface FormSelectProps {
  label?: string;
  fieldName: string;
  className?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
  disabled?: boolean;
}

export default function FormSelect({
  label,
  fieldName,
  className,
  options,
  placeholder = "Seçim edin",
  disabled,
}: FormSelectProps) {
  return (
    <FieldWrapper fieldName={fieldName} label={label}>
      {(field, fieldState) => (
        <Select
          onValueChange={field.onChange}
          value={field.value?.toString()} // Radix Select adətən string gözləyir
          disabled={disabled}
        >
          <SelectTrigger
            id={field.id}
            className={cn(
              "h-12 w-full bg-[#FAFAFA] transition-all duration-200",
              fieldState.invalid
                ? "border-destructive focus:ring-destructive"
                : "border-input focus:ring-ring",
              className,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FieldWrapper>
  );
}
