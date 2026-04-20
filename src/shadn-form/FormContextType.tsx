import { z } from "zod";
import { createContext, useContext } from "react";

type AnyZodObject = z.ZodObject<z.ZodRawShape>;

interface FormSchemaContextType {
    schema: AnyZodObject;
}

const FormSchemaContext = createContext<FormSchemaContextType | undefined>(undefined);

export const useFormSchema = (): AnyZodObject => {
    const context = useContext(FormSchemaContext);
    if (!context) throw new Error("useFormSchema FormProvider daxilində istifadə edilməlidir!");
    return context.schema;
};

export { FormSchemaContext };