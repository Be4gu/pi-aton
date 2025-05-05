'use client'

export default function QueEsPinatonPage() {
  return (
    <>
      <h1 className='text-4xl font-bold mb-6 text-white'>¿Qué es Piñaton?</h1>

      <div className='text-gray-300 space-y-6'>
        <p className='text-xl'>
          Piñaton es una plataforma especializada que conecta a jugadores con profesionales expertos en servicios relacionados con videojuegos de supervivencia.
        </p>

        <div className='bg-[#1a1a1a] border border-[#333] p-6 rounded-lg my-8'>
          <h2 className='text-2xl font-semibold mb-4 text-[#33CCFF]'>Nuestra misión</h2>
          <p>
            Facilitar a los jugadores el acceso a servicios especializados que mejoren su experiencia de juego, mientras creamos oportunidades para que expertos puedan monetizar
            sus habilidades.
          </p>
        </div>

        <h2 className='text-2xl font-semibold mb-3 text-[#33CCFF] border-b border-[#333] pb-2'>Lo que nos diferencia</h2>

        <div className='grid md:grid-cols-3 gap-6 mt-6'>
          <div className='bg-[#141414] rounded-lg p-5 border border-[#222]'>
            <h3 className='font-medium text-xl mb-2 text-white'>Profesionalidad</h3>
            <p className='text-gray-400'>Trabajamos únicamente con expertos verificados que cumplen con nuestros estándares de calidad.</p>
          </div>

          <div className='bg-[#141414] rounded-lg p-5 border border-[#222]'>
            <h3 className='font-medium text-xl mb-2 text-white'>Seguridad</h3>
            <p className='text-gray-400'>Implementamos medidas para garantizar transacciones seguras y experiencias positivas.</p>
          </div>

          <div className='bg-[#141414] rounded-lg p-5 border border-[#222]'>
            <h3 className='font-medium text-xl mb-2 text-white'>Comunidad</h3>
            <p className='text-gray-400'>Fomentamos una comunidad colaborativa donde jugadores y profesionales pueden crecer juntos.</p>
          </div>
        </div>

        <h2 className='text-2xl font-semibold mb-3 text-[#33CCFF] border-b border-[#333] pb-2 mt-8'>Nuestra historia</h2>

        <p>
          Piñaton nació de la identificación de una necesidad clara en el mundo de los videojuegos de supervivencia: muchos jugadores buscan ayuda especializada para ciertas
          tareas, mientras que otros jugadores tienen habilidades excepcionales que podrían monetizar.
        </p>

        <p>
          Fundada en 2023, nuestra plataforma ha estado creciendo constantemente, incorporando más profesionales y expandiendo la gama de servicios disponibles para satisfacer las
          necesidades de una comunidad cada vez mayor.
        </p>

        <h2 className='text-2xl font-semibold mb-3 text-[#33CCFF] border-b border-[#333] pb-2 mt-8'>Tipos de servicios</h2>

        <ul className='list-disc pl-6 space-y-2'>
          <li>
            <span className='font-semibold text-white'>Raids y Counter-Raids:</span> Servicios para operaciones ofensivas y defensivas.
          </li>
          <li>
            <span className='font-semibold text-white'>Entrenamiento PvP:</span> Mejora tus habilidades de combate con sesiones personalizadas.
          </li>
          <li>
            <span className='font-semibold text-white'>Diseño de Bases:</span> Optimiza tus construcciones con asesoramiento experto.
          </li>
          <li>
            <span className='font-semibold text-white'>Recolección de Recursos:</span> Delega las tareas más tediosas a profesionales eficientes.
          </li>
          <li>
            <span className='font-semibold text-white'>Escoltas VIP:</span> Protección durante tus desplazamientos en entornos hostiles.
          </li>
        </ul>

        <div className='bg-[#1a1a1a] border-l-4 border-[#33CCFF] p-4 rounded-r-lg my-8'>
          <p className='italic'>
            Piñaton no solo es una plataforma de servicios, es un ecosistema que potencia tanto a jugadores como a profesionales, creando un entorno donde todos pueden
            beneficiarse.
          </p>
          <p className='text-right text-sm text-[#33CCFF] mt-2'>— Fundador de Piñaton</p>
        </div>

        <h2 className='text-2xl font-semibold mb-3 text-[#33CCFF] border-b border-[#333] pb-2'>Primeros pasos con Piñaton</h2>

        <p>
          Para conocer más sobre cómo comenzar a utilizar nuestros servicios, consulta nuestra guía de
          <a href='/wiki/primeros-pasos' className='text-[#33CCFF] hover:underline'>
            {' '}
            Primeros Pasos
          </a>
          .
        </p>

        <p>
          Si estás interesado en convertirte en un profesional de Piñaton, visita nuestra sección de
          <a href='/wiki/recursos/profesionales' className='text-[#33CCFF] hover:underline'>
            {' '}
            Recursos para Profesionales
          </a>
          .
        </p>
      </div>
    </>
  )
}
