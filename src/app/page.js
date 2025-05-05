// import Image from 'next/image'

import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
// import Footer from '@/components/footer'
import Link from 'next/link'
import { LoginButton } from '@/components/auth/LoginButton'
import { ArrowRight, Shield, Clock, CreditCard, Headphones } from 'lucide-react'

export default function Home() {
  return (
    <div className='min-h-screen '>
      <Navbar />

      <main className='container mx-auto px-4 py-16'>
        <section className='text-center max-w-5xl mx-auto mb-20'>
          <h1 className='text-4xl sm:text-5xl md:text-7xl sm:text- font-bold text-primary-blue mb-8 tracking-tight'>¡EN PIÑATON.COM!</h1>

          <div className='bg-dark-gray rounded-xl p-8 mb-10 text-white text-center border border-light-gray shadow-lg"'>
            <p className='text-lg hidden lg:block  leading-relaxed'>
              ¿No puedes ni matar un 🐣 en Rust? ¿Ese roofcamper hijo de la gran pu@#$% te tiene hasta los 🥚🥚? ¡Relájate! Nosotros tenemos a los mejores actores listos para
              conseguir ese loot que tanto necesitas. Por un precio que no te hará llorar (demasiado), nuestros profesionales te ayudarán a conseguier lo que necesitas (sin
              levantar sospechas de que has pagado), para wipear bases como si fueras el 👑 del server .
            </p>
            <p className='text-sm sm:text-base md:text-lg lg:hidden leading-relaxed'>
              ¿No puedes ni matar un 🐣 en Rust? ¿Ese roofcamper hijo de la gran pu@#$% te tiene hasta los 🥚🥚? ¡Relájate! Nosotros tenemos a los mejores actores listos para
              conseguir ese loot que tanto necesitas.
            </p>
          </div>
          <Link href='/tienda'>
            <Button className='gradient-btn text-white text-lg px-8 py-6 rounded-xl font-medium inline-flex items-center gap-2'>
              Explorar Servicios
              <ArrowRight className='w-5 h-5' />
            </Button>
          </Link>
        </section>

        <section className='flex justify-center mb-24'>
          <div className='bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-1 rounded-2xl shadow-xl max-w-3xl w-full'>
            <div className='bg-[#181818] rounded-2xl p-8 flex flex-col items-center text-center'>
              <h2 className='text-2xl md:text-3xl font-extrabold text-yellow-400 mb-4 drop-shadow'>¡Descubre la nueva WIKI de Piñaton!</h2>
              <p className='text-white mb-6'>
                Consulta guías, trucos, estrategias y toda la sabiduría de la comunidad Piñaton en un solo lugar. ¡Aprende, comparte y conviértete en un auténtico pro!
              </p>
              <Link
                href='/wiki'
                className='mt-2 px-6 py-2 rounded-md font-bold text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg border-2 border-yellow-400 hover:from-yellow-500 hover:to-yellow-700 transition-all animate-pulse text-center text-lg'
              >
                WIKI
              </Link>
            </div>
          </div>
        </section>

        <section className='grid md:grid-cols-2 gap-10 mb-24'>
          <div className='bg-dark-gray p-10 rounded-xl border border-light-gray card-hover'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary-blue mb-6'>Nuestros Servicios</h2>
            <ul className='space-y-4 text-primary-white'>
              <li className='flex items-center gap-3 text-sm md:text-base lg:text-lg'>
                <span className='text-primary-blue'>✦</span> Raids y Counter-Raids profesionales
              </li>
              <li className='flex items-center gap-3 text-sm md:text-base  lg:text-lg'>
                <span className='text-primary-blue'>✦</span> Entrenamiento PvP personalizado
              </li>
              <li className='flex items-center gap-3 text-sm md:text-base lg:text-lg'>
                <span className='text-primary-blue'>✦</span> Diseño de bases seguras
              </li>
              <li className='flex items-center gap-3 text-sm md:text-base lg:text-lg'>
                <span className='text-primary-blue'>✦</span> Farming y recolección de recursos
              </li>
              <li className='flex items-center gap-3 text-sm md:text-base lg:text-lg'>
                <span className='text-primary-blue'>✦</span> Escoltas y protección VIP
              </li>
            </ul>
          </div>

          <div className='bg-dark-gray p-10 rounded-xl border border-light-gray card-hover'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary-blue mb-6'>Por Qué Elegirnos</h2>
            <ul className='space-y-4 text-primary-white'>
              <li className='flex items-center gap-4 text-sm md:text-base lg:text-lg'>
                <Shield className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-blue' />
                Más de 5000 horas de experiencia
              </li>
              <li className='flex items-center gap-4 text-sm md:text-base lg:text-lg'>
                <Clock className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-blue' />
                Servicio 24/7
              </li>
              <li className='flex items-center gap-4 text-sm md:text-base lg:text-lg'>
                <CreditCard className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-blue' />
                Métodos de pago seguros
              </li>
              <li className='flex items-center gap-4 text-sm md:text-base lg:text-lg'>
                <Headphones className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-blue' />
                Soporte premium por Discord
              </li>
            </ul>
          </div>
        </section>

        <div className='section-divider' />

        <section className='text-center max-w-5xl mx-auto mb-24'>
          <h2 className='text-3xl font-bold text-primary-blue mb-10'>Futuros eventos</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                title: 'Agarramiento de banana',
                description: 'Premio: 500€ en servicios',
                date: '15 Abril 2024'
              },
              {
                title: 'Bedwars inverso',
                description: 'El que primero pone una cama pierde',
                date: '22 Junio 2024'
              },
              {
                title: 'Bellum',
                description: 'El que no llora porque juegan PROS, GANA🎉',
                date: '25 Junio 2024'
              }
            ].map((event, index) => (
              <div key={index} className='bg-dark-gray p-8 rounded-xl border border-light-gray card-hover'>
                <h3 className='text-xl font-bold text-white mb-3'>{event.title}</h3>
                <p className='text-primary-white mb-4'>{event.description}</p>
                <p className='text-primary-blue font-medium'>{event.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
