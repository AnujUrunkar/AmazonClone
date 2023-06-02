import React from 'react';
import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const Checkout = ({ id, title, description, price, rating, category, image, hasPrime }) => {

  const items = useSelector(selectItems);
  const totalitem = useSelector(selectTotal);
  const session = useSession();

  const createCheckoutSession = () => {

  }


  return (
    <div className='bg-[#EAEDED]'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        {/* Left Section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src='https://res.cloudinary.com/djfdsdzxo/image/upload/v1685350764/Prime-day-banner_civgld.png'
            alt='BannerImage'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <div className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Cart is Empty' : 'Shopping Cart'}
            </div>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                price={item.price}
                hasPrime={item.hasPrime}
                image={item.image}
                rating={item.rating}
              />
            ))}
          </div>
        </div>


        {/* Right Section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <div className="whitespace-nowrap">
                Total ({items.length}items) : {" "}
                <span className='font-bold'>
                  Total Price: &#8377;{totalitem}
                </span>
              </div>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
                {!session ? 'SignIn to Checkout' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>

      </main >

    </div >
  )
}

export default Checkout;