import { RootLayout } from '@payloadcms/next/layouts'
import { handleServerFunctions } from './actions'
import '@payloadcms/next/css'
import React from 'react'

import configPromise from '../../payload.config'
import { importMap } from './admin/importMap'
import './layout.css'

type Args = {
  children: React.ReactNode
}

const Layout = async ({ children }: Args) => {
  const config = await configPromise

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={handleServerFunctions}>
      {children}
    </RootLayout>
  )
}

export default Layout

