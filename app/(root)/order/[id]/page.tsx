import React from 'react'
import { Name } from '@/types/dynamic'

export default function Name({params}: Name) {
  return (
    <div>You order {params.id} </div>
  )
}
