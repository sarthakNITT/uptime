import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { PC } from '@repo/db/connect'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    if(eventType === "user.created"){
        console.log("user has been created");
        await PC.user.create({
            data: {
                username: evt.data.username ?? "",
                email: evt.data.email_addresses[0]?.email_address ?? ""
            }
        })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}