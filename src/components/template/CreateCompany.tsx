import React, { useEffect, useState } from 'react'
import { useFormCreateCompany } from '../forms/createCompany'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../web/src/components/ui/dialog'
import { Button } from '../../../../web/src/components/ui/button'
import { Input } from '../../../../web/src/components/ui/input'
import { Label } from '../../../../web/src/components/ui/label'
import { Textarea } from '../../../../web/src/components/ui/textarea'
import { useSession } from 'next-auth/react'
import { useMutation } from '@apollo/client'
import { CreateCompanyDocument, namedOperations } from '../../../../libs/Network/src/gql/generated'
const CreateCompany = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useFormCreateCompany()

    const session = useSession()

    const uid = session.data?.user?.uid
    const managerName=session.data?.user?.name

    const [createCompany, { loading, data }] = useMutation(CreateCompanyDocument)

    useEffect(() => {
        if (uid) {
            setValue('managerId', uid)
        }
        setValue('managerName',managerName as string)
    }, [uid])

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Company</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[660px] max-h-[115vh] bg-zinc-900 text-white overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between mr-7 -mt-3">
                            Create Company
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(async (data) => {
                        await createCompany({
                            variables: {
                                createCompanyInput: data,
                            },
                            awaitRefetchQueries: true,
                            refetchQueries: [namedOperations.Query.MyCompany],
                        })
                    })} >
                        <Label htmlFor="name">Company Name</Label>
                        <Input id="name"
                            type="name"
                            {...register('displayName')}
                            placeholder="Enter Company Name" />
                        <Label htmlFor="name">Description</Label>
                        <Textarea placeholder='Describe your parking company'
                            {...register('description')} />
                        <Label htmlFor="name">Manager Id</Label>
                        <Input id="id"
                            type="id"
                            {...register('managerId')}
                            readOnly />
                        <Label htmlFor="name">Manager name</Label>
                        <Input id="name"
                            type="name"
                            {...register('managerName')}
                            />
                        <Button type='submit'>{loading ? "loading" : "Submit"}</Button>

                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateCompany