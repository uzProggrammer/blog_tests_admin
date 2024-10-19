import React, { useState, useEffect } from "react";

import { getFeedbacks } from "../../api/feedbacks";

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

import { useNavigate } from "react-router-dom";

export default function FedbacksView(){

    const [blogTests, setBlogTests] = useState([]);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = React.useState("");

    const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            getFeedbacks({'page':pageNumber}, data=>{
                setBlogTests(data)
            },
            error => {console.log(error)}
        )
    }


    useEffect(() => {
        getFeedbacks(null, success=>{
            setBlogTests(success)
        }, error=>{
            console.error(error)
        })
    }, []);

    return(
        <>
            {blogTests.data && 
                <>
                    <CTable striped responsive hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col" colSpan={"6"}>
                                    <CInputGroup className="mb-3">
                                        <CFormInput value={search} onChange={e=>{
                                            setSearch(e.target.value);
                                            getFeedbacks({'search':e.target.value}, data=>{
                                                setBlogTests(data)
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
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">O'quvchi</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Test</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Savol</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Yuborilgan vaqt</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">O'rinli</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {blogTests.data.map((test, index) => (
                                <CTableRow key={index} style={{cursor:'pointer'}} onClick={e=>{navigate('/feedbacks/'+test.id)}}>
                                    <CTableHeaderCell scope="row">{test.id}</CTableHeaderCell>
                                    <CTableDataCell>{test.user.full_name}</CTableDataCell>
                                    <CTableDataCell>{test.quiz.title}</CTableDataCell>
                                    <CTableDataCell dangerouslySetInnerHTML={{__html:test.question.text}}></CTableDataCell>
                                    <CTableDataCell>{test.created_at}</CTableDataCell>
                                    <CTableDataCell>{test.is_true?<CIcon icon={cilCheckCircle} size="xl" style={{color:'var(--cui-info)'}} />:<CIcon icon={cilXCircle} size="xl" style={{color:'var(--cui-danger)'}}/>}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                        {blogTests.pages_count.length>1 && 
                            <CTableFoot>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={"6"}>
                                        <CPagination align="center" aria-label="Page navigation example">
                                            <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                            {blogTests.pages_count.length>1 && blogTests.pages_count.map((page, index) => (
                                                <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                            ))}
                                            <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===blogTests.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                        </CPagination>
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableFoot>
                        }
                    </CTable>
                </>
            }
        </>
    )
}