import Image from 'next/image'
import Link from 'next/link'
 
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <Image 
            src="/logo_ecommerce.svg"
            alt="ecommerce logo"
            width={250}
            height={250}
        />
        <h1 className='mb-6 mt-20 text-5xl font-bold'>PAGE NOT FOUND</h1>
        <h5 className='mb-10'>Its either the page is still under construction or the page just isnt there!</h5>
        <Link href="/menu">
            <button
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
            >
                Return Home
            </button>
        </Link>
    </div>
  )
}

export default NotFound