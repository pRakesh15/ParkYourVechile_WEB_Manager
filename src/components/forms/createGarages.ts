
import {z} from 'zod'
import { SlotType } from '../../../../libs/Network/src/gql/generated'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const formSchemaAddress=z.object({
    lat:z.number(),
    lng:z.number(),
    address:z.string(),
})

export const formSchemaCreateSlot=z.object({
    height:z.number(),
    width:z.number(),
    length:z.number(),
    pricePerHour:z.number(),
    count:z.number().min(1).max(10,{message:'maximum 10.'}),
    type:z.nativeEnum(SlotType),

})

export const formSchemaCreateGarage=z.object({
    displayName:z.string().min(1),
    description:z.string().min(1),
    images:z.any(),
    location:formSchemaAddress,
    slotTypes:z.array(formSchemaCreateSlot),
})

export type FormTypeCreateGarage=z.infer<typeof formSchemaCreateGarage>

export const useFormCreateGarage=()=>useForm<FormTypeCreateGarage>({
    resolver:zodResolver(formSchemaCreateGarage),
    defaultValues:{slotTypes:[]},
})


