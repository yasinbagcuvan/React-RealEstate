import React, { useContext, useState } from 'react'
import '../assets/style/forms.scss'
import DataContext from '../context/DataContext'

const Forms = () => {

  const{handleSubmit,state,dispatch} = useContext(DataContext)

  const{secilenIlan,ilanKategorisi,ilanBaslik,ilanAciklama,ilanResmi,ilanFiyat,ilanDaireTipi,kategoriler,daireTipi} = state

  const isFormValid = ilanBaslik !== "" && ilanAciklama !== "" && ilanFiyat !== "" && ilanKategorisi !== "Seçiniz" && ilanDaireTipi !== "";


  return (
    <>
    <form onSubmit={handleSubmit}>
        <h3>{"Ev Ekle"}</h3>
        <input value={ilanBaslik} onChange={e=>dispatch({type:"ilanBaslik",payload:e.target.value})} type='text' placeholder='İlan Başlığı' />
        <input value={ilanAciklama} onChange={e=>dispatch({type:"ilanAciklama",payload:e.target.value})} type='text' placeholder='İlan Açıklama' />
        <input value={ilanFiyat} onChange={e=>dispatch({type:"ilanFiyat",payload:e.target.value})} type='number' placeholder='İlan Fiyat' />
        <select  value={ilanKategorisi} onChange={e=>dispatch({type:"ilanKategorisi",payload:e.target.value})} >
        {kategoriler.map(kategori =>
            <option key={kategori.id}>{kategori.kategoriAdi} </option>
          )}
        </select>
          
        <select  value={ilanDaireTipi} onChange={e=>dispatch({type:"ilanDaireTipi",payload:e.target.value})} >
          {daireTipi.map(daireTipi =>
            <option key={daireTipi.id}>{daireTipi.daireTipi} </option>
          )}
        </select>
        <input value={ilanResmi} onChange={e=>dispatch({type:"ilanResmi",payload:e.target.value})} type="url" placeholder='Image(url)' />
        <input
                disabled={!isFormValid}
                type="submit"
                value={secilenIlan ? "Duzenle" : "Ekle"}
        />
    </form>
    </>
    
  )
}

export default Forms