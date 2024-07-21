import React, { useContext, useEffect } from 'react';
import '../assets/style/forms.scss';
import DataContext from '../context/DataContext';
import {  useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Forms = () => {
  const { ilanId } = useParams();
  const { handleSubmit, state, dispatch,kartDuzenle } = useContext(DataContext);
  const {  authState,getCurrentUser } = useContext(AuthContext);
  const { secilenIlan, ilanKategorisi, ilanBaslik, ilanAciklama, ilanResmi, ilanFiyat, ilanDaireTipi, kategoriler, daireTipi, ilanlar,ilanKisi } = state;
  const {currentUser,isAuthenticated} = authState

  const isFormValid = ilanBaslik !== "" && ilanAciklama !== "" && ilanFiyat !== "" && ilanKategorisi !== "Seçiniz" && ilanDaireTipi !== "";

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

  return (
   
    <form onSubmit={handleSubmit}>
      <h3>{secilenIlan ? "Ev Düzenle" : "Ev Ekle"}</h3>
      <input
        value={secilenIlan ? secilenIlan.ilanBaslik : ilanBaslik}
        onChange={e => handleInputChange(e, "ilanBaslik")}
        type='text'
        placeholder='İlan Başlığı'
        maxLength={45}
      />
      <input
        value={secilenIlan ? secilenIlan.ilanAciklama : ilanAciklama}
        onChange={e => handleInputChange(e, "ilanAciklama")}
        type='text'
        placeholder='İlan Açıklama'
        maxLength={500}
      />
      <input
        value={secilenIlan ? secilenIlan.ilanFiyat : ilanFiyat}
        onChange={e => handleInputChange(e, "ilanFiyat")}
        type='number'
        placeholder='İlan Fiyat'
      />
      <select
        value={secilenIlan ? secilenIlan.ilanKategorisi : ilanKategorisi}
        onChange={e => handleInputChange(e, "ilanKategorisi")}
      >
        {kategoriler.map(kategori =>
          <option key={kategori.id}>{kategori.kategoriAdi}</option>
        )}
      </select>
      <select
        value={secilenIlan ? secilenIlan.ilanDaireTipi : ilanDaireTipi}
        onChange={e => handleInputChange(e, "ilanDaireTipi")}
      >
        {daireTipi.map(dt =>
          <option key={dt.id}>{dt.daireTipi}</option>
        )}
      </select>
      <input
        value={secilenIlan ? secilenIlan.ilanResmi : ilanResmi}
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
