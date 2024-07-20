import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../reducer/reducer";
import { toast, Zoom } from "react-toastify";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({children}) =>  {

    const [state,dispatch] = useReducer(reducer,initialState)

    const{secilenIlan,ilanBaslik,ilanAciklama,ilanResmi,ilanDaireTipi,ilanKategorisi,ilanFiyat,ilanlar} = state

    const ilanEkle = async(yeni) =>{
        let url = "http://localhost:3005/ilanlar";
        if(!secilenIlan) {
            yeni.id = (Number(ilanlar[ilanlar.length-1].id)+1).toString()
            dispatch({type:"ilanEkle",yeni})
            toast.success('Yeni İlan Başarıyla Eklendi!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                });
            const response = await axios.post(url,yeni)
        }
        else{
            url+=`/${secilenIlan.id}`;
            const response2 = await axios.put(url,yeni)
            yeni.id = secilenIlan.id;
            dispatch({type:"ilanDuzenle",yeni})
            toast.info(' İlan Başarıyla Düzenlendi!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
                });
        }
    }

    const ilanSil = async(id) => {
        dispatch({type:"ilanSil",id})
        toast.error('İlan Başarıyla Silindi!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
            });
        const url =`http://localhost:3005/ilanlar/${id}`
        const response = await axios.patch(url,{isDeleted:true})
    }

    const ilanlariGetir = async () =>{
        let url ="http://localhost:3005/ilanlar"
        const response = await axios.get(url)
        const ilanlar = await response.data;
        dispatch({type:"ilanlariGetir",payload:ilanlar})
    }

    const kategorileriGetir = async ()=>{
        const url = "http://localhost:3000/kategoriler";
      const response = await axios.get(url);
      const kategoriler = await response.data;
      dispatch({type:"kategorileriGetir",payload:kategoriler})
    }
    const daireTipleriGetir = async ()=>{
        const url = "http://localhost:3000/daireTipi";
      const response = await axios.get(url);
      const daireTipleri = await response.data;
      dispatch({type:"daireTipleriGetir",payload:daireTipleri})
    }

    const kartDuzenle =  (id) => {
        dispatch({type:"kartDuzenle",id})
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        ilanEkle({
          id: (Number(ilanlar[ilanlar.length-1].id)+1).toString(),
          ilanBaslik: ilanBaslik,
          ilanAciklama: ilanAciklama,
          ilanFiyat: ilanFiyat,
          ilanResmi: ilanResmi,
          ilanKategorisi: ilanKategorisi,
          ilanDaireTipi: ilanDaireTipi
        });
        dispatch({type:"resetForm"})
      }

      useEffect(()=>{
        kategorileriGetir();
        ilanlariGetir();
        daireTipleriGetir();
      },[])

      return <DataContext.Provider value={{
        handleSubmit,ilanSil,kartDuzenle,state,dispatch,ilanlariGetir
      }}>
            {children}
      </DataContext.Provider>
}

export default DataContext