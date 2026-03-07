import configPromise from '../payload.config'
import { getPayload, type Payload } from 'payload'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 * 
 * See: https://github.com/payloadcms/payload/blob/main/templates/website/src/getPayload.ts
 */
let cached: { client: Payload | null; promise: Promise<Payload> | null } = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export async function getPayloadClient(): Promise<Payload> {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: configPromise })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
