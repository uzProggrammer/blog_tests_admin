import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CTableFoot, CButton, CSpinner } from "@coreui/react";
import { addStudent } from "../../api/groups";

import CIcon from "@coreui/icons-react";
import { cilSearch, cilPlus } from "@coreui/icons";

const AddStudent = () => {
    const [students, setStudents] = useState("");
    const navigate = useNavigate();
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");

    const [is_sending, setIsSending] = React.useState(false);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        addStudent(id, "GET", {search: search, page: pageNumber}, data=>{
            setStudents(data);
        }, error=>{
            console.error(error);
        })
    }

    const {id} = useParams();

    const [selecteds, setSelecteds] = useState([]);

    React.useEffect(() => {
        addStudent(id, "GET", null, data=>{
            setStudents(data);
        }, error=>{
            console.error(error);
        })
    }, []);

    return (
        <>
            {students && (
                <>
                    <CTable responsive striped hover>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="p-3" colSpan={"4"}>
                                    <label htmlFor="search">Qidirish</label>
                                    <div className="input-group">
                                        <input type="text" value={search} className="form-control" id="search" onChange={(e) => {
                                            setSearch(e.target.value);
                                            addStudent(id, "GET", {search: e.target.value}, data=>{
                                                navigate('/groups/'+id)
                                            }, error=>{
                                                console.error(error);
                                            })
                                        }} />
                                        <button className="btn btn-primary input-group-text"><CIcon icon={cilSearch} /></button>
                                    </div>
                                </CTableHeaderCell>
                            </CTableRow>
                            {selecteds.length>0 && 
                                <CTableRow>
                                    <CTableHeaderCell colSpan={"4"} className="text-end">
                                        <CButton color="primary" onClick={() => {
                                            setIsSending(true);
                                            addStudent(id, "POST", JSON.stringify({data: selecteds}), data=>{
                                                navigate('/groups/'+id)
                                                setIsSending(false);
                                            }, error=>{
                                                console.error(error);
                                            })
                                        }}>{is_sending? <CSpinner size="sm"/> : <CIcon icon={cilPlus} />}  {is_sending? "Qo'shilmoqda..." : "Qo'shish"}</CButton>
                                    </CTableHeaderCell>
                                </CTableRow>
                            }
                            <CTableRow>
                                <CTableHeaderCell className="p-3 d-flex gap-4 align-items-center"><input type="checkbox" checked={selecteds.length === students.data.length} className="form-check-input" onChange={(e) => {
                                    if(e.target.checked){
                                        setSelecteds(students.data.map(student=>student.id));
                                    }else{
                                        setSelecteds([]);
                                    }
                                }} /> Ismi</CTableHeaderCell>
                                <CTableHeaderCell className="p-3">Guruhi</CTableHeaderCell>
                                <CTableHeaderCell className="p-3">Bali</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {students.data.map((student, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell className="p-3 d-flex gap-4 align-items-center"><input checked={selecteds.includes(student.id)} type="checkbox" className="form-check-input" onChange={(e) => {
                                        if(e.target.checked){
                                            setSelecteds([...selecteds, student.id]);
                                        }else{
                                            setSelecteds(selecteds.filter(id=>id!==student.id));
                                        }
                                    }} /> {student.full_name}</CTableDataCell>
                                    <CTableDataCell className="p-3">{student.guruhlar.length? student.guruhlar[0].name: '-'}</CTableDataCell>
                                    <CTableDataCell className="p-3">{student.ball}</CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                        {students.pages_count.length>1 && 
                        <CTableFoot>
                            <CTableRow>
                                <CTableHeaderCell colSpan={"4"}>
                                    <CPagination align="center" aria-label="Page navigation example">
                                        <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                        {students.pages_count.length>1 && students.pages_count.map((page, index) => (
                                            <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                        ))}
                                        <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===students.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                    </CPagination>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableFoot>
                    }
                    </CTable>
                </>
            )}
        </>
    )
}

export default AddStudent;