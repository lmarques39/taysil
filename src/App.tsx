import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageLayout from './components/templates/PageLayout'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Produtos from './pages/Produtos'
import Catalogos from './pages/Catalogos'
import Contactos from './pages/Contactos'

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/catalogos" element={<Catalogos />} />
          <Route path="/contactos" element={<Contactos />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}
