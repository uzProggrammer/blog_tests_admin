import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,

  CToast,
  CToastBody,
  CToastClose,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginAPI } from '../../../api/users'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  let [show_toast, setShowToast] = useState(false);
  let [error_message, setErrorMessage] = useState('');

  let[is_sending, setIsSending] = useState(false)

  function handleLogin(e) {
    e.preventDefault();
    setIsSending(true)
    loginAPI(JSON.stringify({'username': username, 'password': password}), 
      (data) => {
        if(data.status==='ok'){ localStorage.setItem('token', data.token);localStorage.setItem('user', JSON.stringify(data.user));navigate('/dashboard');}
        else{ setErrorMessage(data.error);setShowToast(true);setIsSending(false)}
      },
      error => {setErrorMessage('Tizimda xatolik yuz berdi. Iltimos adminga murojat qiling.');setShowToast(true);setIsSending(false)}
    )
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CToast color='danger' style={{position: 'fixed', top: 50, right: 50, zIndex: 1000}} autohide={true} visible={show_toast} className="align-items-center">
        <div className="d-flex">
          <CToastBody>{error_message}</CToastBody>
          <CToastClose className="me-2 m-auto" />
        </div>
      </CToast>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Tizimga kirish</h1>
                    <p className="text-body-secondary">Admin panelga kirish</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Foydalanuvchi nomi" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Parol"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" disabled={is_sending}>
                          {is_sending && 
                            <CSpinner size="sm" className='me-2' />
                          }
                          Kirish
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
