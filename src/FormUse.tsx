import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormWrapper from "./shadn-form/FormWrapper";
import FormInput from "./shadn-form/FormInput";
import FormPhone from "./shadn-form/FormPhone";
import { Button } from "./components/ui/button";

// 1. Zod şeması təyin edin
const formSchema = z.object({
    fullName: z.string().min(2, "Ad çox qısadır"),
    phoneNumber: z.string().min(1, "Telefon nömrəsi mütləqdir"),
    email: z.string().email("Email formatı düzgün deyil"),
});

// Tip təyini (opsional)
type FormValues = z.infer<typeof formSchema>;

export default function MyForm() {
    // 2. useForm hook-unu başladın
    const methods = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
        },
    });

    // 3. Submit funksiyası
    const onSubmit = (data: FormValues) => {
        console.log("Form məlumatları:", data);
    };

    return (
        <div className="p-10 max-w-md">
            {/* 4. FormWrapper ilə əhatə edin */}
            <FormWrapper
                methods={methods}
                schema={formSchema}
                onSubmit={onSubmit}
            >
                <div className="space-y-4">
                    {/* 5. Hazır form komponentlərini yerləşdirin */}
                    <FormInput
                        fieldName="fullName"
                        label="Tam Adınız"
                        placeholder="Məs: Əli Əliyev"
                    />
                    <FormInput
                        fieldName="email"
                        label="Email"
                        placeholder="Məs: [EMAIL_ADDRESS]"
                    />

                    <FormPhone
                        fieldName="phoneNumber"
                        label="Telefon"
                        placeholder="+994 (50) 000-00-00"
                    />

                    <Button type="submit" className="w-full">
                        Göndər
                    </Button>
                </div>
            </FormWrapper>
        </div>
    );
}
