import Image from 'next/image'

export default function Proximamente() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full py-8'>
      <h1 className='text-5xl md:text-6xl font-bold text-[#33CCFF] mb-4 tracking-wider'>¡PRÓXIMAMENTE!</h1>
      <p className='text-xl text-gray-300 mb-8 max-w-2xl text-center'>Estoy trabajando para traer pronto el contenido</p>
      <div className='max-w-4xl w-full px-4 relative'>
        <Image src='/proximamente.png' alt='Próximamente' width={1200} height={800} className='w-full h-auto object-contain rounded-lg shadow-lg' priority />
      </div>
    </div>
  )
}
