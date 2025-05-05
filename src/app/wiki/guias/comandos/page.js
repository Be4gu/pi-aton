'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ComandosPage() {
  const [activeTab, setActiveTab] = useState('bindeos')

  // Definición de categorías y comandos
  const categories = [
    { id: 'bindeos', name: 'Bindeos', icon: '⌨️' },
    { id: 'audio', name: 'Audio', icon: '🔊' },
    { id: 'gameplay', name: 'Jugabilidad', icon: '🎮' },
    { id: 'graphics', name: 'Gráficos', icon: '🖥️' },
    { id: 'performance', name: 'Rendimiento', icon: '⚡' },
    { id: 'crafting', name: 'Crafteos', icon: '🛠️' },
    { id: 'chat', name: 'Chat y Streaming', icon: '💬' }
  ]
  // Comandos organizados por categorías
  const commands = {
    bindeos: [
      {
        command: 'bind [tecla] [comando]',
        description: 'Asigna un comando a una tecla específica',
        example: 'bind z "~graphics.vm_fov_scale false;graphics.vm_fov_scale true"',
        tip: 'Para eliminar un bindeo usa: bind [tecla] ""',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      },
      {
        command: '~ (símbolo)',
        description: 'Combinar comandos para alternar entre estados al pulsar la misma tecla',
        example: '~mesh.quality 200;mesh.quality 0',
        tip: 'Útil para crear toggles que cambian de un estado a otro',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      },
      {
        command: '+ (símbolo)',
        description: 'El comando solo se activa mientras la tecla se mantiene pulsada',
        example: '+duck',
        tip: 'Se desactivará automáticamente al soltar la tecla',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      },
      {
        command: '; (símbolo)',
        description: 'Separador para combinar varios comandos en un mismo bindeo',
        example: 'bind [tecla] "+map;+focusmap"',
        tip: 'Permite ejecutar múltiples acciones con una sola tecla',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      },
      {
        command: '[ ] (símbolos)',
        description: 'Para crear combinaciones de teclas',
        example: 'bind [leftcontrol+mouse1] "+input.sensitivity 0.6;input.sensitivity 0.44;"',
        tip: 'Lista completa de teclas disponible en wiki.facepunch.com',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      }
    ],
    audio: [
      {
        command: 'audio.master',
        description: 'Ajusta/silencia el volumen general',
        example: 'bind [tecla] ~audio.master 0;audio.master 1',
        tip: 'Útil para mutear/desmutear todo el sonido con una tecla',
        videoUrl: 'https://www.youtube.com/@rustmodocalvo'
      },
      { command: 'audio.effects', description: 'Ajusta el volumen de los efectos de sonido (0-100)', example: 'audio.effects 70' },
      { command: 'audio.music', description: 'Ajusta el volumen de la música de fondo (0-100)', example: 'audio.music 50' },
      { command: 'audio.voice', description: 'Ajusta el volumen de las voces del juego (0-100)', example: 'audio.voice 90' },
      { command: 'audio.mute', description: 'Silencia todos los sonidos del juego', example: 'audio.mute true', tip: 'Usa "audio.mute false" para volver a activar el sonido' }
    ],
    gameplay: [
      { command: 'bind', description: 'Asigna una acción a una tecla', example: 'bind [tecla] attack.primary', tip: 'Útil para personalizar los controles a tu gusto' },
      { command: 'sensitivity', description: 'Ajusta la sensibilidad del ratón (0.1-10.0)', example: 'sensitivity 2.5' },
      { command: 'fov', description: 'Cambia el campo de visión (60-120)', example: 'fov 90', tip: 'Un FOV más alto te permite ver más del entorno' },
      { command: 'crosshair.size', description: 'Ajusta el tamaño de la mira (0-30)', example: 'crosshair.size 5' },
      {
        command: 'crosshair.color',
        description: 'Cambia el color de la mira (formato RGB)',
        example: 'crosshair.color 255 0 0',
        tip: 'Este ejemplo establece la mira en color rojo'
      }
    ],
    graphics: [
      { command: 'graphics.quality', description: 'Ajusta la calidad general de los gráficos (0-5)', example: 'graphics.quality 4' },
      { command: 'graphics.shadows', description: 'Ajusta la calidad de las sombras (0-3)', example: 'graphics.shadows 2', tip: 'Reducir este valor mejora el rendimiento' },
      { command: 'graphics.draw_distance', description: 'Ajusta la distancia de renderizado (100-5000)', example: 'graphics.draw_distance 2500' },
      { command: 'graphics.textures', description: 'Ajusta la calidad de las texturas (0-3)', example: 'graphics.textures 2' },
      {
        command: 'graphics.vsync',
        description: 'Activa/desactiva la sincronización vertical',
        example: 'graphics.vsync true',
        tip: 'Desactivar puede aumentar FPS pero causar tearing'
      }
    ],
    performance: [
      {
        command: 'gc.buffer',
        description: 'Aumenta el tamaño del buffer para evitar freezeos',
        example: 'gc.buffer 2048',
        tip: 'Para 16GB RAM usar 2048, para 32GB o más usar 4096 (valor por defecto: 256)'
      },
      {
        command: 'gc.collect',
        description: 'Limpia la caché de memoria',
        example: 'gc.collect',
        tip: 'Útil cuando notas bajadas de rendimiento o FPS'
      },
      {
        command: 'client.headlerp_inertia',
        description: 'Mejora la velocidad de recuperación de la vista al mirar a los lados',
        example: 'client.headlerp_inertia false',
        tip: 'Hace que la vista vuelva rápido al frente al soltar la tecla Alt'
      },
      {
        command: 'input.holdtime',
        description: 'Reduce el delay de la tecla E para interactuar más rápido',
        example: 'input.holdtime 0.15',
        tip: 'El valor por defecto es 0.2, no recomendable poner menos de 0.15'
      },
      {
        command: 'consoletoggle;console.clear;combatlog',
        description: 'Abre el combatlog directamente',
        example: 'bind [tecla] "consoletoggle;console.clear;combatlog 100"',
        tip: 'El 100 muestra los últimos 100 hits en servidores que tengan esta opción activada'
      },
      {
        command: 'combatlog_outgoing',
        description: 'Muestra solo tus hits en el combatlog',
        example: 'combatlog_outgoing',
        tip: 'Útil para ver sólo el daño que tú causas'
      }
    ],
    chat: [
      {
        command: 'global.streamermode',
        description: 'Activa/desactiva el modo streamer',
        example: 'bind [tecla] ~global.streamermode true;global.streamermode false',
        tip: 'Oculta información sensible durante transmisiones'
      },
      {
        command: 'chat.say',
        description: 'Envía un texto predefinido al chat',
        example: 'bind [tecla] "chat.say "Vamos a por raid!""',
        tip: 'Útil para mensajes comunes como spam de la tienda o comandos en servidores modificados'
      },
      {
        command: 'chat.add',
        description: 'Muestra un mensaje solo para ti en el chat',
        example: 'bind [tecla] "client.lookatradius 0.1;chat.add 0 0 PRECISIÓN ACTIVADA"',
        tip: 'Formato: chat.add 0 0 "TEXTO"'
      },
      {
        command: 'gametip.showgametip',
        description: 'Muestra un mensaje personalizado en pantalla',
        example: 'bind [tecla] "+attack2;+gametip.hidegametip;gametip.showgametip "<#ff0000>APUNTANDO <#00ff00>AHORA""',
        tip: 'Permite usar colores en formato HTML'
      },
      {
        command: 'meta.exec',
        description: 'Ejecuta comandos con retroalimentación en el chat',
        example: '~meta.exec "client.lookatradius 0.1" "chat.add 0 0 MIN-0.1";meta.exec "client.lookatradius 20" "chat.add 0 0 MAX-20"',
        tip: 'Formato avanzado para combinar comandos con mensajes de confirmación'
      }
    ],
    misc: [
      { command: 'chat.filter', description: 'Activa/desactiva el filtro de lenguaje en el chat', example: 'chat.filter true' },
      { command: 'screenshot', description: 'Toma una captura de pantalla', example: 'screenshot', tip: 'Las capturas se guardan en la carpeta /screenshots' },
      { command: 'clear', description: 'Limpia la consola de comandos', example: 'clear' },
      { command: 'quit', description: 'Cierra el juego', example: 'quit' },
      {
        command: 'help',
        description: 'Muestra la lista de comandos disponibles',
        example: 'help [nombre_comando]',
        tip: 'Añade un nombre de comando específico para ver más detalles'
      }
    ]
  }

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-bold mb-6 text-white'>Comandos de Consola</h1>
      <p className='text-lg text-gray-300 mb-8'>
        Estos comandos te permiten personalizar diferentes aspectos del juego directamente desde la consola. Para abrir la consola, presiona la tecla{' '}
        <kbd className='px-2 py-1 bg-gray-800 rounded text-sm'>~</kbd> o <kbd className='px-2 py-1 bg-gray-800 rounded text-sm'>F1</kbd>.
      </p>

      {/* Selector de categorías */}
      <div className='flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-4'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-4 py-2 rounded-md flex items-center ${
              activeTab === category.id ? 'bg-[#33CCFF] text-black font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className='mr-2'>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Contenido de la categoría activa */}
      <div className='bg-[#141414] border border-gray-700 rounded-lg p-4'>
        <h2 className='text-2xl font-bold text-[#33CCFF] mb-4 flex items-center'>
          <span className='mr-2'>{categories.find((c) => c.id === activeTab)?.icon}</span>
          Comandos de {categories.find((c) => c.id === activeTab)?.name}
        </h2>{' '}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='text-left py-3 px-4 text-gray-300'>Comando</th>
                <th className='text-left py-3 px-4 text-gray-300'>Descripción</th>
                <th className='text-left py-3 px-4 text-gray-300'>Ejemplo</th>
                <th className='text-center py-3 px-4 text-gray-300' style={{ width: '60px' }}>
                  Video
                </th>
              </tr>
            </thead>
            <tbody>
              {commands[activeTab]?.map((cmd, index) => (
                <tr key={index} className='border-b border-gray-800 hover:bg-gray-900'>
                  <td className='py-3 px-4'>
                    <code className='bg-gray-800 px-2 py-1 rounded text-[#33CCFF] font-mono'>{cmd.command}</code>
                  </td>
                  <td className='py-3 px-4 text-gray-300'>{cmd.description}</td>
                  <td className='py-3 px-4'>
                    <div>
                      <code className='bg-gray-800 px-2 py-1 rounded text-green-400 font-mono'>{cmd.example}</code>
                      {cmd.tip && <div className='mt-1 text-xs text-yellow-500'>💡 {cmd.tip}</div>}
                    </div>
                  </td>
                  <td className='py-3 px-4 text-center'>
                    {cmd.videoUrl && (
                      <a href={cmd.videoUrl} target='_blank' rel='noopener noreferrer' className='inline-block' title='Ver video explicativo'>
                        <span className='bg-red-600 hover:bg-red-700 transition-colors text-white p-1.5 rounded-md flex items-center justify-center'>
                          <svg width='20' height='20' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
                          </svg>
                        </span>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-8 bg-gray-800 border-l-4 border-[#33CCFF] p-4 text-gray-300'>
        <h3 className='font-bold text-white'>Consejo Pro</h3>
        <p>
          Puedes crear un archivo <code className='bg-gray-900 px-2 py-0.5 rounded'>autoexec.cfg</code> en la carpeta raíz del juego con tus comandos favoritos para que se ejecuten
          automáticamente al iniciar el juego.
        </p>
      </div>
    </div>
  )
}
