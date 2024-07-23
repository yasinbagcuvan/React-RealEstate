import React, { useContext, useEffect } from 'react';
import '../assets/style/forms.scss';
import DataContext from '../context/DataContext';
import {  useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Forms = () => {
  const { ilanId } = useParams();
  const { handleSubmit, state, dispatch,kartDuzenle } = useContext(DataContext);
  const {authState } = useContext(AuthContext);
  const {secilenIlan, ilanKategorisi, ilanBaslik, ilanAciklama, ilanResmi, ilanFiyat, ilanDaireTipi, kategoriler, daireTipi, ilanlar,ilanKisi } = state;
  const {currentUser} = authState

  const isFormValid = ilanBaslik !== "" && ilanAciklama !== "" && ilanFiyat !== "" && ilanKategorisi !== "Seçiniz" && ilanDaireTipi !== "";

  // useEffect(() => {
  //   if (currentUser) {
  //     dispatch({ type: "ilanKisi", payload: currentUser.id });
  //   }
  //   else{
  //     dispatch({type:"resetForm"})
  //   }
  //   return () => {
  //     dispatch({ type: "resetSecilenIlan" });
  //   };
  // }, [ilanId, ilanlar]);

  useEffect(() => {
    {dispatch({type:"ilanKisi", payload: currentUser.id})} 
    if (ilanId) {
        kartDuzenle(ilanId)    
       
    }
    else{
      dispatch({type:"resetForm"})
    }
    return () => {
      dispatch({ type: "resetSecilenIlan" });
    };
  }, [ilanId, ilanlar,dispatch]);



  const handleInputChange = (e, type) => {
    dispatch({ type, payload: e.target.value });
  };

  if (ilanId && !secilenIlan) {
    return dispatch({type:"resetForm"})
  }

  useEffect(() => {
    if (secilenIlan) {
      dispatch({ type: "ilanBaslik", payload: secilenIlan.ilanBaslik });
      dispatch({ type: "ilanAciklama", payload: secilenIlan.ilanAciklama });
      dispatch({ type: "ilanFiyat", payload: secilenIlan.ilanFiyat });
      dispatch({ type: "ilanKategorisi", payload: secilenIlan.ilanKategorisi });
      dispatch({ type: "ilanDaireTipi", payload: secilenIlan.ilanDaireTipi });
      dispatch({ type: "ilanResmi", payload: secilenIlan.ilanResmi });
    }
  }, [secilenIlan, dispatch]);

  return (
   
    <form onSubmit={handleSubmit}>
      <h3>{secilenIlan ? "Ev Düzenle" : "Ev Ekle"}</h3>
      <input
        value={ilanBaslik}
        onChange={e => handleInputChange(e, "ilanBaslik")}
        type='text'
        placeholder='İlan Başlığı'
        maxLength={45}
      />
      <input
        value={ ilanAciklama}
        onChange={e => handleInputChange(e, "ilanAciklama")}
        type='text'
        placeholder='İlan Açıklama'
        maxLength={500}
      />
      <input
        value={ilanFiyat}
        onChange={e => handleInputChange(e, "ilanFiyat")}
        type='number'
        placeholder='İlan Fiyat'
      />
      <select
        value={ ilanKategorisi}
        onChange={e => handleInputChange(e, "ilanKategorisi")}
      >
        {kategoriler.map(kategori =>
          <option key={kategori.id}>{kategori.kategoriAdi}</option>
        )}
      </select>
      <select
        value={ilanDaireTipi}
        onChange={e => handleInputChange(e, "ilanDaireTipi")}
      >
        {daireTipi.map(dt =>
          <option key={dt.id}>{dt.daireTipi}</option>
        )}
      </select>
      <input
        value={ilanResmi}
        onChange={e => handleInputChange(e, "ilanResmi")}
        type="url"
        placeholder='Image(url)'
      />
      <input
        disabled={!isFormValid}
        type="submit"
        value={secilenIlan ? "Düzenle" : "Ekle"}
      />

    </form>
  );
};

export default Forms;
