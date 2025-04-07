'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Twitch, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { LoginButton } from '@/components/auth/LoginButton'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'
  console.log('TWITCH_CLIENT_ID:', process.env.TWITCH_CLIENT_ID);
  console.log('TWITCH_CLIENT_SECRET:', process.env.TWITCH_CLIENT_SECRET);

  return (
    <header className='sticky top-0 z-50 w-full flex justify-center border-b border-[#3A3A3A] bg-[#121212]/95 backdrop-blur-md'>
      <div className='container flex h-20 items-center px-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' className='h-10 w-10 text-primary-blue hover:text-[#33CCFF] md:hidden'>
              <Menu className='h-20 w-20 text-2xl' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='bg-[#1E1E1E]'>
            <nav className='flex flex-col gap-4 h-full'>
              <Link href='/' className='mr-6 flex items-center space-x-2'>
                <span className='text-2xl font-bold text-primary-blue'>PIÑATON</span>
              </Link>
              <Link href='/' className='text-lg font-semibold text-primary-blue hover:text-[#33CCFF] transition-colors'>
                Home
              </Link>
              <Link href='/tienda' className='text-lg font-semibold text-primary-blue hover:text-[#33CCFF] transition-colors'>
                Tienda
              </Link>
              <div className='md:hidden absolute bottom-6 items-center gap-2'>
                {session ? (
                  <div className='flex flex-col items-start gap-2'>
                    <div className='flex items-center gap-2'>
                      {session.user.image ? (
                        <div className='rounded-full overflow-hidden h-8 w-8 border border-primary-blue'>
                          <Image 
                            src={session.user.image} 
                            alt={`${session.user.name}'s profile`}
                            width={32}
                            height={32}
                          />
                        </div>
                      ) : (
                        <div className='rounded-full overflow-hidden h-8 w-8 bg-primary-blue flex items-center justify-center'>
                          <span className='text-white font-semibold text-sm'>
                            {session.user.name?.charAt(0) || "U"}
                          </span>
                        </div>
                      )}
                      <span className='text-primary-blue font-medium'>{session.user.name}</span>
                    </div>
                    <LoginButton 
                      variant='outline' 
                      
                      className='border-primary-blue text-primary-blue hover:bg-primary-blue/10 w-full'
                    >
                      Cerrar sesión
                    </LoginButton>
                  </div>
                ) : (
                  <LoginButton
                    
                    className='bg-primary-blue text-white hover:bg-[#33CCFF]'
                  >
                    Iniciar sesión
                  </LoginButton>
                )}
              </div>
              <LoginButton className='hidden md:flex' />
            </nav>
          </SheetContent>
        </Sheet>

        <Link href='/' className='mr-6 items-center space-x-2 hidden md:flex'>
          <span className='text-2xl font-bold text-primary-blue'>PIÑATON</span>
        </Link>
        <nav className='flex-1 items-center gap-8 text-base hidden md:flex'>
          <Link href='/' className='text-primary-blue hover:text-[#33CCFF] transition-colors font-medium'>
            Home
          </Link>
          <Link href='/tienda' className='text-primary-blue hover:text-[#33CCFF] transition-colors font-medium'>
            Tienda
          </Link>
        </nav>

        <div className='hidden md:flex items-center gap-3'>
          {isLoading ? (
            <div className='h-10 w-24 bg-slate-700/20 animate-pulse rounded'></div>
          ) : session ? (
            <div className='relative'>
              <div 
                className='flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-slate-800/30'
                onClick={() => document.getElementById('userMenu').classList.toggle('hidden')}
              >
                {session.user.image ? (
                  <div className='rounded-full overflow-hidden h-8 w-8 border border-primary-blue'>
                    <Image 
                      src={session.user.image} 
                      alt={`${session.user.name}'s profile`}
                      width={32}
                      height={32}
                    />
                  </div>
                ) : (
                  <div className='rounded-full overflow-hidden h-8 w-8 bg-primary-blue flex items-center justify-center'>
                    <span className='text-white font-semibold text-sm'>
                      {session.user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <span className='text-primary-blue font-medium'>{session.user.name}</span>
                <ChevronDown size={16} className='text-primary-blue' />
              </div>
              
              <div 
                id="userMenu" 
                className='absolute hidden top-full right-0 mt-1 w-48 bg-[#1E1E1E] border border-[#3A3A3A] rounded-md shadow-lg p-2 z-50'
              >
                <Button 
                  variant='outline' 
                  onClick={() => {
                    document.getElementById('userMenu').classList.add('hidden');
                    signOut();
                  }}
                  className='border-primary-blue text-primary-blue hover:bg-primary-blue/10 w-full'
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => signIn('twitch')}
              className='bg-primary-blue text-white hover:bg-[#33CCFF]'
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
