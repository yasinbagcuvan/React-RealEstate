import React, { useContext , useEffect, useState} from 'react'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom'
import '../assets/style/detay.scss'
import AuthContext from '../context/AuthContext'

const IlanDetay = () => {
    const{state} = useContext(DataContext)
    const{authState,getIlanUser} = useContext(AuthContext)
    const{ilanKisiFullName,ilanKisiTel,ilanKisiFoto,ilanKisiMail} = authState
    const {ilanId} = useParams();
    const {ilanlar} = state

    useEffect(()=>{
      const userId = ilanlar[ilanId-1].ilanKisi
      getIlanUser(userId)
    },[])
    return (
      ilanlar.length !==0 &&
      <>
        <div className="detay-container">
          <div className="detay-resim">
            <img className="detay-resim-img" src={ilanlar[ilanId-1].ilanResmi} alt="" />
          </div>
          <div className="detay-bilgiler">
            <h3 className="detay-baslik">{ilanlar[ilanId-1].ilanBaslik}</h3>
            <p className="detay-aciklama">{ilanlar[ilanId-1].ilanAciklama}</p>
            <div className="detay-ozellikler">
            <p><strong>Daire Tipi:</strong> {ilanlar[ilanId-1].ilanDaireTipi}</p>
            <p><strong>Kategori:</strong> {ilanlar[ilanId-1].ilanKategorisi}</p>
            <p><strong>Fiyat:</strong> {ilanlar[ilanId-1].ilanFiyat}$</p>
            <div className="ilan-sahibi">
              <img className="ilan-sahibi-foto" src={ilanKisiFoto} alt="ilanKisi_foto" />
                <div className="ilan-sahibi-bilgiler">
                  <p><strong>İlan Adı Soyadı:</strong> {ilanKisiFullName}</p>
                  <p><strong>İlan Sahibi Mail:</strong> {ilanKisiMail}</p>
                  <p><strong>İlan Sahibi Telefon Numarası:</strong> {ilanKisiTel}</p>
                </div>
             </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default IlanDetay