//not a particular component use rfc
"use client";
//use client for Router client component for server

import React from "react";
import { useRouter } from "next/navigation";
import useCart from "./(store)/store";

//recieve some props
export default function ProductCard(props) {
  const { product } = props;
  // destructure out of product look in console info needed is id and the others and rename
  const { id: price_id, unit_amount: cost, product: productInfo } = product;
  const { name, description } = productInfo;

  //import useCart method from our (store) access the state and return state of setProduct
  const setProduct = useCart(state => state.setProduct);

  const router = useRouter();

  function onProductClick() {
    //1 now define it and set product to new product
    const newProduct = {
      name,
      description,
      price_id,
      cost,
      productInfo,
    };

    //0 can now call set product method
    setProduct({newProduct});
    //push to a new route slash product, query add id as parameter
    router.push("/product?price_id=" + price_id);
  }
  return (
    <div
      // assign onClick to card to route to product folder pagejs file page
      onClick={onProductClick}
      className="flex flex-col shadow bg-white hove:shadow-lg cursor-pointer"
    >
      {/* aquire image through productInfo images and index first is 0 */}
      <img
        src={productInfo.images[0]}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h3>{name}</h3>
          <p>${cost / 100}</p>
        </div>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
