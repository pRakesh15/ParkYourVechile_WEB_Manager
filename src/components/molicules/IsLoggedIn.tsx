'use client'
import { ReactNode } from 'react'
import { useSession } from 'next-auth/react'

import Link from 'next/link'
import { LoaderPanel } from './Loader'
import { AlertSection } from './AlertSection'

type RenderPropChild = (uid: string) => ReactNode

export const IsLoggedIn = ({
  children,
  notLoggedIn,
}: {
  children: RenderPropChild | ReactNode
  notLoggedIn?: ReactNode
}) => {
  const { status, data } = useSession()
  console.log(data)

  if (status === 'loading') {
    return <LoaderPanel text="Loading user..." />
  }

  if (!data?.user?.email) {
    if (notLoggedIn) {
      return <>{notLoggedIn}</>
    } else {
      return (
        <AlertSection title="You are not logged in.">
          <Link href="/login">Login</Link>
        </AlertSection>
      )
    }
  }

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.user.email)
        : children}
    </>
  )
}
