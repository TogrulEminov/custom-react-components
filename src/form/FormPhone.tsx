import React, {useEffect, useRef, useState} from "react";
import IMask, {type InputMask} from "imask";
import {FieldWrapper} from "./FieldsWrapper.tsx";
interface PhoneMaskItem {
    mask: string;
    regex: string;
}

const PHONE_MASKS: PhoneMaskItem[] = [
    {mask: "+994 (00) 000-00-00", regex: "994"},
    {mask: "+90 (000) 000-00-00", regex: "90"}, // Türkiyə
    {mask: "+1 (000) 000-0000", regex: "1"}, // ABŞ/Kanada
    {mask: "+44 00 0000 0000", regex: "44"}, // Böyük Britaniya
    {mask: "+49 000 00000000", regex: "49"}, // Almaniya
    {mask: "+33 0 00 00 00 00", regex: "33"}, // Fransa
    {mask: "+7 (000) 000-00-00", regex: "7"}, // Rusiya/Qazaxıstan
    {mask: "+380 (00) 000-00-00", regex: "380"}, // Ukrayna
    {mask: "+995 (000) 00-00-00", regex: "995"}, // Gürcüstan
    {mask: "+998 (00) 000-00-00", regex: "998"}, // Özbəkistan
    {mask: "+86 000 0000 0000", regex: "86"}, // Çin
    {mask: "+81 00-0000-0000", regex: "81"}, // Yaponiya
    {mask: "+91 00000-00000", regex: "91"}, // Hindistan
    {mask: "+55 (00) 00000-0000", regex: "55"}, // Braziliya
    {mask: "+39 000 000 0000", regex: "39"}, // İtaliya
    {mask: "+34 000 00 00 00", regex: "34"}, // İspaniya
    {mask: "+61 0 0000 0000", regex: "61"}, // Avstraliya
    {mask: "+966 0 000 0000", regex: "966"}, // Səudiyyə Ərəbistanı
    {mask: "+971 00 000 0000", regex: "971"}, // BƏƏ
];

interface FormPhoneProps {
    fieldName: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    inputClassName?: string;
    styles?: { input?: React.CSSProperties };
}

function PhoneInput({
                        value,
                        onChange,
                        id,
                        fieldName,
                        placeholder,
                        inputClassName,
                        styles,
                        disabled,
                        readOnly,
                        invalid
                    }: any) {
    const inputRef = useRef<HTMLInputElement>(null);
    const maskRef = useRef<InputMask<any> | null>(null);
    const isInternalUpdate = useRef(false);
    const [isFocused, setIsFocused] = useState(false);

    // 1. Mask-ı yaradırıq
    useEffect(() => {
        if (!inputRef.current || maskRef.current) return;

        maskRef.current = IMask(inputRef.current, {
            mask: PHONE_MASKS,
            dispatch: (appended: string, dynamicMasked: any) => {
                const current = (dynamicMasked.value + appended).replace(/\D/g, "");
                const foundIndex = PHONE_MASKS.findIndex(m => current.startsWith(m.regex));
                return dynamicMasked.compiledMasks[foundIndex !== -1 ? foundIndex : 0];
            }
        });

        maskRef.current.on("accept", () => {
            if (!isInternalUpdate.current) onChange(maskRef.current?.value);
        });

        return () => maskRef.current?.destroy();
    }, [onChange]);
    useEffect(() => {
        if (maskRef.current && value !== maskRef.current.value) {
            isInternalUpdate.current = true;
            maskRef.current.value = value || "";
            isInternalUpdate.current = false;
        }
    }, [value]);

    const baseStyles: React.CSSProperties = {
        background: "#FAFAFA",
        border: invalid ? "1px solid #ff4d4f" : (isFocused ? "1px solid #1BAFBF" : "1px solid #E0E0E0"),
        height: "44px",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        width: "100%",
        outline: "none",
        transition: "border 0.2s",
        ...styles?.input,
    };

    return (
        <input
            ref={inputRef}
            id={id}
            name={fieldName}
            type="tel"
            placeholder={placeholder || "+994 (00) 000-00-00"}
            disabled={disabled}
            readOnly={readOnly}
            style={baseStyles}
            className={inputClassName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}

export default function FormPhone({label, fieldName, ...rest}: FormPhoneProps) {
    return (
        <FieldWrapper fieldName={fieldName as any} label={label}>
            {(field, fieldState) => (
                <PhoneInput
                    {...field}
                    {...rest}
                    invalid={fieldState.invalid}
                    id={field.id}
                    fieldName={fieldName}
                />
            )}
        </FieldWrapper>
    );
}