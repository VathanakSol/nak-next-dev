import Link from 'next/link'

export default function Order() {
  return (
    <>
    <main className="grid place-content-center">
        <div>Order Page</div>
        <div>List of Food & Drink</div>
        <ul>
          <Link href="/order/24" className="text-blue-500">Bread</Link>
          <Link href="/order/25" className="text-red-500">Juice Drink</Link>
        </ul>
    </main>
    </>
  )
}
