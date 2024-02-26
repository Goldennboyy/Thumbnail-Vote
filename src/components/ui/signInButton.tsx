import { Button } from '@/components/ui/button';
import { type Session } from 'next-auth';
import Link from 'next/link';
import React from 'react'


type buttonProps = {
  session: Session | null
}

const SignInButton = async ({ session }: buttonProps) => {


  return (
    <Button variant='default' type='button'>
      <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
        {session ? "Sign Out" : "Sign In"}
      </Link>
    </Button>)
}

export default SignInButton