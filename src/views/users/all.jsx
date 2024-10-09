import React from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTableFoot, CPagination, CPaginationItem, CButton } from "@coreui/react";

import { cilCheckCircle, cilXCircle, cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { usersApi } from "../../api/users";

import { useNavigate } from "react-router-dom";

export default function  Users(){
    let [users, setUsers] = React.useState([]);

    let navigate = useNavigate();


    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");

    const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            usersApi({'page':pageNumber}, data=>{
                setUsers(data)
            },
            error => {console.log(error)}
        )
    }

    const fetchUsers = (data=null)=>{
        usersApi(data, 
            data=>{
                setUsers(data);
            }, error=>{
                console.error(error);
            }
        )
    }

    React.useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <>
            {users.data && (
                <CTable striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col" className="p-3" colSpan={"6"}>
                                <label htmlFor="search">Qidirish</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="search" value={search} onChange={(e)=>{setSearch(e.target.value);fetchUsers({'search':e.target.value})}} />
                                    <CButton className="input-group-text border-secondary"><CIcon  icon={cilSearch}  /></CButton>
                                </div>
                            </CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col" className="p-3">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="p-3">Ism Familyasi</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="p-3">Email manzili</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="p-3">Adminlik huquqi</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="p-3">Tug'ilgan kuni</CTableHeaderCell>
                            <CTableHeaderCell scope="col" className="p-3">Bali</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {users.data.map((user, index) => (
                            <CTableRow key={user.id} style={{cursor: "pointer"}} onClick={e=>{navigate("/users/"+user.username)}}>
                                <CTableDataCell className="p-3">{index+1}</CTableDataCell>
                                <CTableDataCell className="p-3">{user.full_name}</CTableDataCell>
                                <CTableDataCell className="p-3">{user.email}</CTableDataCell>
                                <CTableDataCell className="p-3">{user.is_staff? <CIcon icon={cilCheckCircle} size="xl" color="success" /> : <CIcon icon={cilXCircle} size="xl" />}</CTableDataCell>
                                <CTableDataCell className="p-3">{user.date_brith}</CTableDataCell>
                                <CTableDataCell className="p-3">{user.ball}</CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                    {users.pages_count.length>1 && 
                        <CTableFoot>
                            <CTableRow>
                                <CTableHeaderCell colSpan={"6"}>
                                    <CPagination align="center" aria-label="Page navigation example">
                                        <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                        {users.pages_count.length>1 && users.pages_count.map((page, index) => (
                                            <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                        ))}
                                        <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===users.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                    </CPagination>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableFoot>
                    }
                </CTable>
            )}
        </>
    )
}