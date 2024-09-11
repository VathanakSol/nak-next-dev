import type { Id } from '@/types/id'

export default function Product({params}: Id) {
  return (
    <div>Product {params.id}</div>
  )
}
