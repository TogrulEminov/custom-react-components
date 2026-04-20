import IMask, { type InputMask, type MaskedDynamic, type Masked } from "imask";
import { FieldWrapper } from "./FieldsWrapper.tsx";
import { useEffect, useRef } from "react";
import { Input } from "../components/ui/input.tsx";
import { type FieldValues, type Path } from "react-hook-form";
import { cn } from "../lib/utils.ts";

interface PhoneMaskItem {
  mask: string;
  regex: string;
}

const PHONE_MASKS: PhoneMaskItem[] = [
  { mask: "+994 (00) 000-00-00", regex: "994" },
  { mask: "+90 (000) 000-00-00", regex: "90" },
  { mask: "+1 (000) 000-0000", regex: "1" },
  { mask: "+44 00 0000 0000", regex: "44" },
  { mask: "+49 000 00000000", regex: "49" },
  { mask: "+33 0 00 00 00 00", regex: "33" },
  { mask: "+7 (000) 000-00-00", regex: "7" },
  { mask: "+380 (00) 000-00-00", regex: "380" },
  { mask: "+995 (000) 00-00-00", regex: "995" },
  { mask: "+998 (00) 000-00-00", regex: "998" },
  { mask: "+86 000 0000 0000", regex: "86" },
  { mask: "+81 00-0000-0000", regex: "81" },
  { mask: "+91 00000-00000", regex: "91" },
  { mask: "+55 (00) 00000-0000", regex: "55" },
  { mask: "+39 000 000 0000", regex: "39" },
  { mask: "+34 000 00 00 00", regex: "34" },
  { mask: "+61 0 0000 0000", regex: "61" },
  { mask: "+966 0 000 0000", regex: "966" },
  { mask: "+971 00 000 0000", regex: "971" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  id: string;
  name: string;
  placeholder?: string;
  inputClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  invalid: boolean;
}

function PhoneInput({
  value,
  onChange,
  onBlur,
  id,
  name,
  placeholder,
  inputClassName,
  disabled,
  readOnly,
  invalid,
}: PhoneInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const maskRef = useRef<InputMask<any> | null>(null);
  const isInternalUpdate = useRef(false);

  useEffect(() => {
    if (!inputRef.current || maskRef.current) return;

    maskRef.current = IMask(inputRef.current, {
      mask: PHONE_MASKS,
      dispatch: (appended: string, dynamicMasked: MaskedDynamic): Masked => {
        const current = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundIndex = PHONE_MASKS.findIndex((m) =>
          current.startsWith(m.regex),
        );
        return dynamicMasked.compiledMasks[foundIndex !== -1 ? foundIndex : 0];
      },
    });

    maskRef.current.on("accept", () => {
      if (!isInternalUpdate.current && maskRef.current) {
        onChange(maskRef.current.value);
      }
    });

    return () => maskRef.current?.destroy();
  }, [onChange]);

  useEffect(() => {
    if (maskRef.current && value !== maskRef.current.value) {
      isInternalUpdate.current = true;
      maskRef.current.value = value ?? "";
      isInternalUpdate.current = false;
    }
  }, [value]);

  return (
    <Input
      ref={inputRef}
      id={id}
      name={name}
      type="tel"
      placeholder={placeholder ?? "+994 (00) 000-00-00"}
      disabled={disabled}
      readOnly={readOnly}
      onBlur={onBlur}
      className={cn(
        invalid
          ? "border-destructive focus-visible:ring-destructive"
          : "border-input focus-visible:ring-ring",
        "h-12 bg-[#FAFAFA] transition-all duration-200 ",
        inputClassName,
      )}
    />
  );
}

interface FormPhoneProps<T extends FieldValues> {
  fieldName: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  inputClassName?: string;
}

export default function FormPhone<T extends FieldValues>({
  label,
  fieldName,
  ...rest
}: FormPhoneProps<T>) {
  return (
    <FieldWrapper<T, Path<T>> fieldName={fieldName} label={label}>
      {(field, fieldState) => (
        <PhoneInput
          value={field.value as string}
          onChange={field.onChange}
          onBlur={field.onBlur}
          id={field.id}
          name={field.name}
          invalid={fieldState.invalid}
          {...rest}
        />
      )}
    </FieldWrapper>
  );
}
