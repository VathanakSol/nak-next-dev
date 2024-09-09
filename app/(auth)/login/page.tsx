import React from 'react'

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Login() {
  return (
    <>    
      <main className="w-full h-screen grid place-content-center bg-blue-500 text-lg">
        <div>This is Login Page</div>       
          <SignedIn>
            <SignInButton />
          </SignedIn>      
      </main>
    </>  
  )
}
