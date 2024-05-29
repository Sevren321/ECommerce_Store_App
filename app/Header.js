'use client'
import Link from 'next/link'
//need to update shopping cart when adding an item
import React from 'react'
import useCart from './(store)/store'
import Modal from './Modal'

export default function Header() {
    const cartItems = useCart(state => state.cart)
    //obtain variable from storejs by useCart
    const openModal = useCart(state => state.openModal)
    const setOpenModal = useCart(state => state.setOpenModal)
    console.log(cartItems)
  return (
    <header className="sticky top-0 p-6 bg-white border-b border-solid border-blue-900 shadow-md z-50 text-2xl sm:text-3xl md:text-4xl sm:p-8 flex items-center justify-between">
        {/* render out model */}
        {openModal && (
            <Modal />
        )}
          <Link href={'/'}>
          <h1 className="uppercase cursor-pointer hover:scale-110">Fruit Shop</h1>
          </Link>
          {/* group means listen to parent hover state */}
          <div onClick={setOpenModal} className="relative cursor-pointer grid group place-items-center">
            {/* conditional logic if greater than 0 render out value*/}
            {cartItems.length > 0 && (
                <div className="absolute aspect-square h-5 pointer-events-none sm:h-6 top-0 bg-blue-400 text-white rounded-full right-0 grid place-items-center -translate-y-1/2 translate-x-1/2">
                    <p className='text-xs sm:text-sm'>{cartItems.length}</p>
                </div>
            )}
          <i class="fa-solid cursor-pointer group-hover:text-slate-500 fa-cart-shopping"></i>
          </div>
        </header>
  )
}
