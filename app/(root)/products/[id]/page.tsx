import React from 'react'
import { Name } from '@/types/dynamic'

export default function Product({params}: Name) {
  return (
    <div>Product {params.id}</div>
  )
}
