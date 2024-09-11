import Link from 'next/link'
import React from 'react'

export default function Product() {
  return (

    <>
        <div>This is Product Page</div>
        <main className="w-full grid place-content-center">            
            <div className="flex justify-center items-center">List of Product</div>
            <ul>
            <Lin href="/products/21" className="text-blue-500">Electronic</Lin>
            <Link href="/products/22" className="text-red-500">Kitchen</Link>
            <Link href="/products/23" className="text-red-500">Bathroom</Link>
            <Link href="/products/24" className="text-red-500">Living</Link>
            <Link href="/products/25" className="text-red-500">Garden</Link>
            </ul>
        </main>
    </>
    
  )
}
