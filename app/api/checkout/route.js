import { NextResponse } from "next/server";
import Stripe from "stripe"
//make asychronous function POST route and access the request 
export async function POST(request) {
    //parse the body of the request
    const body = await request.json()
    if (body.lineItems.length === 0) {

        return new Response('Error', {
            status: 405,
        });
    }
    // if we do have items try catch block try to intialize stripe
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
            apiVersion: '2024-04-10'
        })
        //Backend routing
        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
            line_items: body.lineItems,
            mode: 'payment'
        })
        return NextResponse.json({session})
    } catch (err) {
        console.log('BROKED')
        console.log(err)
        return new Response('Error', {
            status: 405,
        });
    }
}

//now construct in modal