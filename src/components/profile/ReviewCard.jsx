import { Star } from 'lucide-react';

export function ReviewCard({ author, rating, content, date }) {
  // Asegurar que los valores tengan un formato consistente
  const displayAuthor = author || 'Usuario anónimo';
  const displayRating = typeof rating === 'number' ? rating : 0;
  const displayContent = content || '';
  // Usar directamente el valor formateado desde el servidor 
  // El formato DD-MM-YYYY ya viene aplicado desde la API
  const displayDate = date || '';

  // Generar array de estrellas con soporte para valoraciones decimales
  const starsArray = Array.from({ length: 5 }).map((_, i) => {
    // Para cada estrella, determinar si está completamente llena, parcialmente llena o vacía
    if (i < Math.floor(displayRating)) {
      return { key: i, filled: true, partial: false }; // Estrella completa
    } else if (i === Math.floor(displayRating) && displayRating % 1 !== 0) {
      return { key: i, filled: true, partial: true, percentage: Math.round((displayRating % 1) * 100) }; // Estrella parcial
    } else {
      return { key: i, filled: false, partial: false }; // Estrella vacía
    }
  });

  return (
    <div className="border border-[#3A3A3A] rounded-md p-4 bg-[#1E1E1E]">
      <div className="flex justify-between mb-2">
        <div className="font-medium text-primary-blue">{displayAuthor}</div>
        <div className="text-sm text-gray-400">{displayDate}</div>
      </div>
      <div className="flex items-center mb-2">
        {starsArray.map(({ key, filled, partial }) => (
          <Star
            key={key}
            className={`w-4 h-4 ${
              filled ? 'fill-[#33CCFF] text-[#33CCFF]' : 'text-gray-600'
            } ${
              partial ? 'fill-[#33CCFF]/50' : ''
            }`}
          />
        ))}
      </div>
      <p className="text-gray-300 text-sm">{displayContent}</p>
    </div>
  );
}