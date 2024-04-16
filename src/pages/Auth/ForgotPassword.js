import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { FaQuestion } from "react-icons/fa";
import axiosClient from './../../libraries/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email,setEmail]= useState("")
  const [newPassword,setNewPassword]= useState("")
  const navigate = useNavigate()
 
  const [question,setQuestion]= useState("")



  //form function
  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const res = await axiosClient.post('admin/employees/forgot-password',
              {email,newPassword,question}
          );
          if(res && res.success){
              console.log(res.success)
              alert('Reset password success!')
              toast.success( res && res.message);
              navigate("/login");
          }else{
              toast.error(res.message)
          }
      } catch (error) {
          console.log(error)
          toast.error("Something went wrong");
      }
      
  }
  return (
    <div className="bg-forgot min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow card2 p-5">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1 className='text-center text-white mb-3'>RESET PASSWORD</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"  value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                  </CInputGroup>
                 
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <FaQuestion/>
                    </CInputGroupText>
                    <CFormInput
                      type="answer"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Answer"
                      autoComplete="answer"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New-Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="primary">RESET</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
