import type { Name } from "@/types/name"

export default function Name({ params }: Name) {
  return (
    <>
      <div>Content of {params.name}</div>
    </>
  )
}