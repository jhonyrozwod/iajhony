import { NextRequest, NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import {
  queryPineconeVectorStoreAndQueryLLM,
} from '../../../utils'
import { indexName } from '../../../config'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const client = new PineconeClient()
  await client.init({
    apiKey: '8dd9ad8a-114f-4553-adb0-78b48425530c' || '',
    environment: 'gcp-starter' || ''
  })

  const text = await queryPineconeVectorStoreAndQueryLLM(client, indexName, body)

  return NextResponse.json({
    data: text
  })
}