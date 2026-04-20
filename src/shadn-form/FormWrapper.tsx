import React from 'react';
import {
    type FieldValues,
    type SubmitHandler,
    type UseFormReturn,
    FormProvider as HookFormProvider
} from "react-hook-form";
import { FormSchemaContext } from "./FormContextType.tsx";
import { z } from "zod";

type AnyZodObject = z.ZodObject<z.ZodRawShape>;
interface Props<T extends FieldValues, S extends AnyZodObject> {
    children: React.ReactNode;
    methods: UseFormReturn<T>;
    schema: S;
    onSubmit?: SubmitHandler<T>;
}

export default function FormWrapper<T extends FieldValues, S extends AnyZodObject>({
    children,
    methods,
    schema,
    onSubmit
}: Props<T, S>) {
    return (
        <FormSchemaContext.Provider value={{ schema }}>
            <HookFormProvider {...methods}>
                <form
                    className="w-full"
                    onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
                >
                    {children}
                </form>
            </HookFormProvider>
        </FormSchemaContext.Provider>
    );
}