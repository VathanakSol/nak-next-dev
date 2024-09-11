import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <main className="h-screen w-full grid place-content-center">
        <SignUp />
      </main>
    </>
  )
}

