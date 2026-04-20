import React, { useId } from "react";
import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
  type ControllerRenderProps,
  type ControllerFieldState,
  type FieldName,
  type FieldErrors,
} from "react-hook-form";
import { ErrorMessage, type FieldValuesFromFieldErrors } from "@hookform/error-message";
import { isFieldRequired } from "../utils/isFieldRequired.ts";
import { useFormSchema } from "./FormContextType.tsx";
import { FaExclamationTriangle } from "react-icons/fa";

type RenderFieldProps<
  T extends FieldValues,
  K extends Path<T>,
> = ControllerRenderProps<T, K> & {
  id: string;
};

interface FieldWrapperProps<T extends FieldValues, K extends Path<T>> {
  fieldName: K;
  label?: string;
  children: (
    fieldProps: RenderFieldProps<T, K>,
    fieldState: ControllerFieldState,
  ) => React.ReactNode;
}

export function FieldWrapper<T extends FieldValues, K extends Path<T>>({
  fieldName,
  label,
  children,
}: FieldWrapperProps<T, K>) {
  const id = useId();
  const schema = useFormSchema();
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();
  const isRequired = isFieldRequired(schema, fieldName);

  return (
    <div className="flex flex-col gap-1 mb-6 relative">
      {label && (
        <label htmlFor={id} className="text-sm font-medium flex items-center">
          {label}
          {isRequired && (
            <span className="text-red-500 ml-1" title="Mütləq doldurulmalıdır">
              *
            </span>
          )}
        </label>
      )}

      <Controller
        name={fieldName}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {children(
              { ...(field as ControllerRenderProps<T, K>), id },
              fieldState,
            )}
          </>
        )}
      />

      <ErrorMessage
        errors={errors}
        name={
          fieldName as unknown as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<T>>
          >
        }
        render={({ message }) => (
          <div className="absolute top-full left-0 mt-2 z-20 pointer-events-none">
            <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 rotate-45" />

            <div className="flex items-center gap-2 p-2 px-3 rounded-lg bg-red-600 shadow-lg">
              <FaExclamationTriangle className="text-white text-[14px] shrink-0" />
              <span className="text-white text-[12px] font-medium whitespace-pre-line leading-tight">
                {message}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
}
