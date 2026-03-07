import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '@/payload.config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = async ({ params, searchParams }: Args) => {
  return (
    <NotFoundPage
      config={configPromise}
      importMap={importMap}
      params={params}
      searchParams={searchParams}
    />
  )
}

export default NotFound
