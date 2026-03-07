import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '../../../../payload.config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = async ({ params, searchParams }: Args) => {
  return (
    <NotFoundPage
      config={await configPromise}
      importMap={importMap}
      params={await params}
      searchParams={await searchParams}
    />
  )
}

export default NotFound
