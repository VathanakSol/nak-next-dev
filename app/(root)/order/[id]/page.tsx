import type { Id } from '@/types/id'

export default function Name({params}: Id) {
  return (
    <div>You order {params.id} </div>
  )
}
