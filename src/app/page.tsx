'use client'

import { Spin } from 'antd'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const RootPage = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <Spin spinning />
  }

  if (session) {
    redirect("/menu")
  } else {
    redirect("/login")
  }

  return null
}

export default RootPage
