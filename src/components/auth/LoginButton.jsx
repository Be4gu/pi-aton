'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function LoginButton() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  if (isLoading) {
    return (
      <Button variant='outline' disabled>
        Cargando...
      </Button>
    )
  }

  if (session) {
    return (
      <Button variant='outline' onClick={() => signOut()}>
        Cerrar sesión
      </Button>
    )
  }

  return (
    <Button variant='outline' onClick={() => signIn('twitch')}>
      Iniciar sesión con Twitch
    </Button>
  )
}