'use client'
import React from 'react'
import ReactDom from 'react-dom'
import useCart from './(store)/store'
import { useRouter } from 'next/navigation'


// to see items in our cart we will need a modal to display them
//target portal and says where to creat the portal
export default function Modal() {
    const closeModal= useCart(state => state.setOpenModal)
    const cartItems = useCart(state => state.cart)
    const router = useRouter()

    async function checkout() {
        const lineItems = cartItems.map(cartItem => {
            return {
                price: cartItem.price_id,
                quantity: 1
            }
        })
        const res = await fetch('api/checkout', {
            method: 'POST',
            body: JSON.stringify({ lineItems})
        }) 
        const data = await res.json()
        router.push(data.session.url)
    }


  return ReactDom.createPortal(
    //jsx that gets rendered
    <div className='fixed top-0 left-0 w-screen h-scree z-50'>
        <div onClick={closeModal} className="bg-transparent absolute inset-0"></div>
        <div className="flex flex-col bg-slate-900 absolute right-0 top-0 h-screen shadow-lg w-screen sm:w-96 max-w-screen gap-4">
            <div className='flex items-center p-6 text-white justify-between text-xl relative'>
                <h1>Cart</h1>
                <i onClick={closeModal} className="fa-solid cursor-pointer hover:opacity-60 fa-xmark"></i>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-300 w-2/3 "></div>
            </div>
            {/* conditional display for items in the cart */}
            <div className='p-4 flex overflow-scroll flex-1 flex-col gap-4'>
                {cartItems.length === 0 ? (
                    <p>There is nothing in your Cart :(</p>
                ) : (
                    // return in react fragments
                    <>
                        {cartItems.map((cartItem, itemIndex) => {
                            return (
                                <div key={itemIndex} className='flex flex-col border-l border-solid border-slate-700 px-2 gap-2'>
                                    <div className="flex items-center justify-between">
                                    <h2 className='text-white'>
                                        {cartItem.name}
                                    </h2>   
                                    <p className='text-white'>${cartItem.cost / 100}</p> 
                                    </div>
                                    <p className='text-white text-sm'>Quantity: 1</p>
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
            <div onClick={checkout} className="border border-solid border-slate-700 text-xl m-4 p-6 uppercase text-white grid place-items-center hover:opacity-60 cursor-pointer">Checkout</div>
        </div>
    </div>,
    document.getElementById('portal')
  )
}
