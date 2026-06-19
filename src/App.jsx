import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Produtos from './pages/Produtos'
import Catalogos from './pages/Catalogos'
import Contactos from './pages/Contactos'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/catalogos" element={<Catalogos />} />
            <Route path="/contactos" element={<Contactos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
