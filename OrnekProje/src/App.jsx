import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navi from './components/Navi';
import Anasayfa from './components/Anasayfa';
import Ilanlar from './components/Ilanlar';
import IlanDetay from './components/IlanDetay';
import Ilan from './components/Ilan';
import Forms from './components/Forms';
import { useContext } from 'react';
import DataContext from './context/DataContext';


function App() {


  const navHead = "Real Estate"
  const {state} = useContext(DataContext)
  return (

    <BrowserRouter>
      <Navi title={navHead} /> {/* Navi bileşenini her sayfada göstermek için burada yer alır */}
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/ilanlar" element={<Ilanlar />} />
        <Route path="/ilan/:ilanId" element={<IlanDetay />} /> {/* Dinamik parametre */}
        <Route path="/ilan" element={<Ilan />} />
        <Route path={"/forms"} element={<Forms />} />
        <Route path={"/forms/:ilanId"} element={<Forms />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App

