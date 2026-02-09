import { z } from "zod";

export const isFieldRequired = (schema: z.ZodObject<any>, fieldName: string) => {
    let field = schema.shape[fieldName];

    if (!field) return false;
    const isOptional = field.isOptional();
    if (!isOptional) {
        return true;
    }

    return false;
};