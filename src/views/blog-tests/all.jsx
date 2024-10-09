import React, { useState, useEffect } from "react";

import { getBlogTests } from "../../api/blog_tests";

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

export default function AllBlokTests(){

    const [blogTests, setBlogTests] = useState([]);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = React.useState("");

    const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            getBlogTests({'page':pageNumber}, data=>{
                setBlogTests(data)
            },
            error => {console.log(error)}
        )
    }


    useEffect(() => {
        getBlogTests(null, success=>{
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
                                <CTableHeaderCell style={{padding:'15px'}} scope="col" colSpan={"7"}>
                                    <CInputGroup className="mb-3">
                                        <CFormInput value={search} onChange={e=>{
                                            setSearch(e.target.value);
                                            getBlogTests({'search':e.target.value}, data=>{
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
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Test nomi</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Test davomiyligi</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Test fanlari</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Boshlanish vaqti</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Tugash vaqti</CTableHeaderCell>
                                <CTableHeaderCell style={{padding:'15px'}} scope="col">Guruh</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {blogTests.data.map((test, index) => (
                                <CTableRow key={index} style={{cursor:'pointer'}} onClick={e=>{navigate('/blog-tests/'+test.id)}}>
                                    <CTableHeaderCell scope="row">{test.id}</CTableHeaderCell>
                                    <CTableDataCell>{test.title}</CTableDataCell>
                                    <CTableDataCell>{test.countinuis_time}</CTableDataCell>
                                    <CTableDataCell>{test.scinces}</CTableDataCell>
                                    <CTableDataCell>{test.start_date}</CTableDataCell>
                                    <CTableDataCell>{test.end_date}</CTableDataCell>
                                    <CTableDataCell>{test.group.name?test.group.name:'-'}</CTableDataCell>
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