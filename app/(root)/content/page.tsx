import Link from 'next/link'

export default function Content() {
  return (
    <>
    <main className="grid place-content-center">
        <div>Content Page</div>
        <div>List of Subjects</div>
        <ul>
          <Link href="/content/cybersecurity" className="text-blue-500">CyberSecurity</Link>
          <Link href="/content/devops" className="text-red-500">DevOps</Link>
        </ul>
    </main>
    </>
  )
}
