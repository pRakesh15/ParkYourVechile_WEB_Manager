import { BaseComponent } from '@/libs/utils'
import { useQuery } from '@apollo/client'
import React, { ReactNode } from 'react'
import { MyCompanyDocument } from '../../../../libs/Network/src/gql/generated'
import { LoaderPanel } from './Loader'
import CreateCompany from '../template/CreateCompany'

type RenderPropChild = (id: number) => ReactNode

export const IsManager = ({ children, }: {
    children: RenderPropChild | ReactNode
}) => {

    const { data, loading } = useQuery(MyCompanyDocument)
    if (loading) {
        return <LoaderPanel text='Loading company...'></LoaderPanel>
    }

    if (!data?.myCompany)
        return (
            <div>
                you dont have a company yet..
                <CreateCompany/>
            </div>
        )

    return (
        <>
            {
                typeof children === 'function' ?
                    (children as RenderPropChild)(data.myCompany.id) : children
            }
        </>
    )



}

