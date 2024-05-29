import Image from "next/image";
import Stripe from "stripe";
import ProductCard from "./ProductCard";

// fetch data from stripe API

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? "", {
    apiVersion: "2024-04-10",
  });
  //products accessed by this code
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  const prices = res.data;
  return prices;
}

// getting static information, turn home page into async function also and call function pulled in severside before page gets rendered avoid clientside rendering

// returned a promise without await
export default async function Home() {
  const products = await getStripeProducts();
  //shows our info in the console
  console.log(products);

  return (
    //in console can see our products are an array map out our product cards
    //map over products array get the product and index
    <main className="p-4 flex flex-col">
      <div className="max-w-[1000px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* swap grid css for flex to define max width on the element so cards center and do not continue to get larger */}
        {products.map((product, productIndex) => {
          return (
            //return productcard give key equals index pass product down as prop
            <ProductCard key={productIndex} product={product} />
          );
          //import ProductCard file
        })}
      </div>
    </main>
  );
}
