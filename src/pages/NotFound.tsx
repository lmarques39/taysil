import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <title>Página não encontrada – Taysil</title>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <p className="text-7xl font-bold text-slate-200 mb-4">404</p>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Página não encontrada</h1>
        <p className="text-slate-500 mb-8">O endereço que procura não existe ou foi movido.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </>
  )
}
