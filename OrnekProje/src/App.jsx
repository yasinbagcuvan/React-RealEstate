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
import DataContext, { DataProvider } from './context/DataContext';
import PrivateRoute from './services/PrivateRoute';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import Ilanlarim from './components/Ilanlarim';
import RegisterPage from './components/RegisterPage';


function App() {


  const navHead = "Real Estate"
  return (
<DataProvider>
<BrowserRouter>
      <Navi title={navHead} /> {/* Navi bileşenini her sayfada göstermek için burada yer alır */}
      <Routes>
      <Route path='/' element={<Anasayfa/>}>
            <Route path="forms" element={<PrivateRoute element={<Forms/>}/>}/>
            <Route path="forms/:ilanId" element={<PrivateRoute element={<Forms/>}/>}/>
            <Route path="ilanlarim" element={<PrivateRoute element={<Ilanlarim/>}/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path="/ilanlar" element={<Ilanlar />} />
        <Route path="/ilan/:ilanId" element={<IlanDetay />} /> {/* Dinamik parametre */}
        <Route path="/ilan" element={<Ilan />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
</DataProvider>
    
  )
}
export default App

