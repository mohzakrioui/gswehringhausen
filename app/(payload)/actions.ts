'use server'

import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from './admin/importMap'

export const handleServerFunctions = async (args: any) => {
  return payloadHandleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
