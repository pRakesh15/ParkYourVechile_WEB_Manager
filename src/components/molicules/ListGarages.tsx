import { useQuery } from '@apollo/client'
import { GaragesDocument, MyCompanyQuery } from '../../../../libs/Network/src/gql/generated'
import { useTakeSkip } from '../hook/pagination'
import { ShowData } from './ShowData'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'

export const ListGarages=({companyId,}:{
    companyId: MyCompanyQuery['myCompany']['id']
}
)=>{
    const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading, error } = useQuery(GaragesDocument, {
    variables: {
      skip,
      take,
      where: { companyId: { equals: companyId } },
    },
  })
  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
        setSkip,
        setTake,
      }}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
      title={
        <div className='flex items-center gap-4'>
<div>
  Garages
</div>
<Link href='/new-garage' className='rounded-full '>
<IconPlus/>
</Link>
        </div>
      }
    >
      {data?.garages.map((garage) => (
       <div key={garage.id}>{garage.displayName}</div>
      //  i have to create a card to  show the garages
      ))}
    </ShowData>
  )
}
