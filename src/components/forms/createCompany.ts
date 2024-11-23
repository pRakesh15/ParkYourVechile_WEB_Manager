import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export const FormSchemaCreateCompany=z.object({
    displayName:z.string().min(1,{message:'company name is required'}),
    description:z.string(),
    managerId:z.string().min(1,{message:'Manager ID required'}),
    managerName:z.string(),

})

export type FormTypeCreateCompany=z.infer<typeof FormSchemaCreateCompany>

export const useFormCreateCompany=()=>
    useForm<FormTypeCreateCompany>({
        resolver:zodResolver(FormSchemaCreateCompany),
    })