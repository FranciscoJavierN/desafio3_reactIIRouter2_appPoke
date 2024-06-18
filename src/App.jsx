import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navmenu from './components/Navmenu'
import Home from "./views/Home";
import Pokemones from "./views/Pokemones";
import Detalle from './views/Detalle';

function App() {

  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Navmenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemones" element={<Pokemones />} />
            <Route path="/pokemones/:name" element={<Detalle />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App;