import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPlus

} from '@coreui/icons'

import { getDashboardData2 } from '../../api/dashboard'

const Dashboard = () => {
  let[data1,setData1] = React.useState([])

  React.useEffect(() => {
    getDashboardData2(null,
      data=>{
        setData1(data)
      },
      error=>{
        console.log(error)
      }
    )
  }, [])

  return (
    <>
      <CRow>
        <CCol md={8}>
          <CCard style={{padding:'10px'}}>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" colSpan={2}>Foydalanuvchilar:</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row"><Link to={'/users'}>Foydalanuvchilar</Link></CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row"><Link to={'/groups'}>Guruhlar</Link></CTableHeaderCell>
                  <CTableDataCell style={{textAlign:'end'}}><Link to={'/groups/add'}><CButton color="success"><CIcon icon={cilPlus}  /> Qo'shish </CButton></Link></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCard>
          <CCard style={{padding:'10px',marginTop:'20px',marginBottom:'20px'}}>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" colSpan={2}>Testlar:</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row"><Link to={'/tests'}>Testlar</Link></CTableHeaderCell>
                  <CTableDataCell style={{textAlign:'end'}}><Link to={'/tests/add'}><CButton color="success"><CIcon icon={cilPlus}  /> Qo'shish </CButton></Link></CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row"><Link to={'/blog-tests'}>Blog testlar</Link></CTableHeaderCell>
                  <CTableDataCell style={{textAlign:'end'}}><Link to={'/blog-tests/add'}><CButton color="success"><CIcon icon={cilPlus}  /> Qo'shish </CButton></Link></CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
        {data1.data&&
          <CCol md={4}>
            <CCard style={{padding:'10px'}}>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col" colSpan={3}>So'ngi harakatlar:</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data1.data.map((item,index)=>
                  <CTableRow key={index} style={{cursor:'pointer'}}>
                    <CTableHeaderCell scope="row">{item.user}</CTableHeaderCell>
                    <CTableHeaderCell scope="row"><p className={item.type==='create'?'text-success':item.type==='delete'?'text-danger':'text-warning'}>{item.action}</p></CTableHeaderCell>
                    <CTableHeaderCell scope="row"><p className='text-muted'>{item.created_at}</p></CTableHeaderCell>
                  </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCard>
          </CCol>
        }
      </CRow>
    </>
  )
}

export default Dashboard
