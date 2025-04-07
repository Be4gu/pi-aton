import { Button } from "@/components/ui/button";

export function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1E1E1E] rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4 text-primary-blue">Contactar</h3>
        <p className="mb-4 text-gray-300">Para contactar con este profesional, puedes utilizar los siguientes métodos:</p>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#33CCFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span className="text-gray-300">+34 69 69 69 69 en el culo se os mueve</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#33CCFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span className="text-gray-300">boteroscabrones@mis.cojoens</span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-[#33CCFF] hover:bg-primary-blue text-white">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}