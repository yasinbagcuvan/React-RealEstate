import React, { useContext } from 'react'
import Ilanlar from './Ilanlar'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import DataContext from '../context/DataContext'

const Anasayfa = () => {
  const {state} = useContext(DataContext)
  const {authState} = useContext(AuthContext)
  return (
    <>
    <Outlet/>
    </>
  )
}

export default Anasayfa