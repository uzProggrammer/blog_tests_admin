
import React from "react";
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CTableFoot,
    CFormInput,
    CButton,
    CInputGroup,

    CPagination,
    CPaginationItem
} from "@coreui/react";

import { cilCheckCircle, cilXCircle, cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import { getTests } from "../../api/tests";

import { useNavigate } from "react-router-dom";

export default function AllTests() {

    const navigate = useNavigate();

    const [tests, setTests] = React.useState([]);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");

    const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            getTests({'page':pageNumber}, data=>{
                setTests(data)
            },
            error => {console.log(error)}
        )
    }

    React.useEffect(() => {
        getTests(null, data=>{
            setTests(data)
        }),
        error => {
            console.log(error)
        }
    }, [])

    return (
        <>
           {tests.data && 
               <CTable striped responsive hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col" colSpan={"6"}>
                                <CInputGroup className="mb-3">
                                    <CFormInput value={search} onChange={e=>{
                                        setSearch(e.target.value);
                                        getTests({'search':e.target.value}, data=>{
                                            setTests(data)
                                        },
                                        error => {console.log(error)}
                                    )
                                    }} placeholder="Qidirish..." aria-label="Qidirish" aria-describedby="basic-addon2"/>
                                    <CButton className="input-group-text btn-outline-primary"><CIcon icon={cilSearch}/></CButton>
                                </CInputGroup>
                            </CTableHeaderCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">Test nomi</CTableHeaderCell>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">Test davomiyligi</CTableHeaderCell>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">Test fanlari</CTableHeaderCell>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">Yaratilgan vaqt</CTableHeaderCell>
                            <CTableHeaderCell style={{padding:'15px'}} scope="col">Ommaga taqdim etilgan</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {tests.data.map((test, index) => (
                            <CTableRow key={index} style={{cursor:'pointer'}} onClick={e=>{navigate('/tests/'+test.id)}}>
                                <CTableHeaderCell scope="row">{test.id}</CTableHeaderCell>
                                <CTableDataCell>{test.title}</CTableDataCell>
                                <CTableDataCell>{test.countinuis_time}</CTableDataCell>
                                <CTableDataCell>{test.scince}</CTableDataCell>
                                <CTableDataCell>{test.created_at}</CTableDataCell>
                                <CTableDataCell style={{textAlign:'center'}}>{test.is_public? <CIcon icon={cilCheckCircle} color="success" size="xl" /> : <CIcon icon={cilXCircle} color="danger" size="xl"/>}</CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                    {tests.pages_count.length>1 && 
                        <CTableFoot>
                            <CTableRow>
                                <CTableHeaderCell colSpan={"6"}>
                                    <CPagination align="center" aria-label="Page navigation example">
                                        <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                        {tests.pages_count.length>1 && tests.pages_count.map((page, index) => (
                                            <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                        ))}
                                        <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===tests.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                    </CPagination>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableFoot>
                    }
                </CTable>
            }
        </>
    )
}