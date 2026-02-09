import React, {useId} from 'react';
import {useFormContext, Controller, type FieldValues, type Path} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {isFieldRequired} from "../utils/isFieldRequired.ts";
import {useFormSchema} from "./FormContextType.tsx";

interface FieldWrapperProps<T extends FieldValues> {
    fieldName: Path<T>;
    label?: string;
    children: (fieldProps: any, fieldState: any) => React.ReactNode;
}

export function FieldWrapper<T extends FieldValues>({
                                                        fieldName,
                                                        label,
                                                        children
                                                    }: FieldWrapperProps<T>) {
    const id = useId();
    const schema = useFormSchema();
    const {control, formState: {errors}} = useFormContext<T>();
    const isrequired = isFieldRequired(schema, fieldName)
    return (
        <div className="flex flex-col gap-1 mb-4">
            {label && (
                <label htmlFor={id} className="text-sm font-medium flex items-center">
                    {label}
                    {isrequired && (
                        <span className="text-red-500 ml-1" title="Mütləq doldurulmalıdır">*</span>
                    )}
                </label>
            )}

            <Controller
                name={fieldName}
                control={control}
                render={({field, fieldState}) => (
                    <>{children({...field, id}, fieldState)}</>
                )}
            />
            <ErrorMessage
                errors={errors}
                name={fieldName as any}
                render={({message}) => (
                    <span className="text-red-400 text-xs italic mt-1">{message}</span>
                )}
            />
        </div>
    );
}