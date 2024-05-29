//useCart is server rendered component must use client
"use client";
//main page export
import useCart from "../(store)/store";

//now get price id as a query and can access product component or page by receiving the props
export default function ProductPage(props) {
  const { searchParams } = props;
  //destructure out price id here info saved in query parameter if want dynamic path circulating any new folders inside square brackets within app folder [varName] that would destructure in same way
  const { price_id } = searchParams;
  //2 now access our set product /import useCart
  const product = useCart(state => state.product);
  //destructure from product again accept id already have ad name and description but new reassignment
  //just like how we accessed product we access addItemToCart function
  const addItemToCart = useCart(state => state.addItemToCart);
  const { cost, productInfo, name, description } = product;
  console.log(productInfo);
  
//refresh lose info to page, dont have access to name or rest of product send back to home
if (!product?.name) {
  window.location.href = '/'
}

//const what it expects newItem give quantity and price id then pass newItem inside of an object to addItem function store method will destructure and set it to cart
function handleAddToCart() {
  const newItem = {
    quantity: 1,
    price_id: price_id,
    name,
    cost
  }
  addItemToCart({newItem})
}


  return (
  <div className="flex flex-col p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
      <div className="md:p-2 md:shadow">
      <img  src={productInfo.images[0]} alt={name} className="w-full h-full object-cover" />
      </div>
    <div className="flex flex-col gap-2 p-4">
      <div className="flex text-xl md:flex-col md:items-start sm:items-center justify-between gap-2">
      <h3>{name}</h3>
      <p className="md:text-base">${cost / 100}</p>
      </div>
      <p className="text-sm flex-1">{description}</p>
      <button onClick={handleAddToCart} className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto px-4 py-2">Add to Cart</button>
    </div>

    </div>

  </div>
  )
}

//initiate global state for project using Zustand set a product we select to our global state then read in second project by creating new folder (store) circle brackets make it so app does not recognize as a route
