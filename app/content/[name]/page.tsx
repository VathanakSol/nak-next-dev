import { Name } from "@/types/dynamic"

export default function Name({ params }: Name) {
  return (
    <>
      <div>Content of {params.name}</div>
    </>
  )
}