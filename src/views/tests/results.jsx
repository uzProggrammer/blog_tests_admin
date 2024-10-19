import React, { useState } from "react";
import { CRow, CCol, CTable, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton, CPagination, CPaginationItem, CTableFoot} from "@coreui/react";

import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import { resultsQuiz, deleteResults, changeResults } from "../../api/tests";

import CIcon from "@coreui/icons-react";
import { cilCheckCircle, cilXCircle, cilSave } from "@coreui/icons";
import { toast } from "react-toastify";

const Results = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [results, setResults] = useState(0);

    const [selecteds, setSelecteds] = useState([]);
    
    const [options, setOptions] = useState('change')

    const [delete_modal, setDeleteModal] = useState(false)

    const[edit_modal, setEditModal] = useState(false)
    const[edit_data, setEditData] = useState({is_cheater:false, remove_cheater:false})

    const success_toast = msg=>toast.success(msg, {delay:4000})
    const error_toast = msg=>toast.error(msg, {delay:4000})
    
    let[searchParams, setSearchParams] = useSearchParams()

    const [currentPage, setCurrentPage] = React.useState(1);


    const [similars, setSimilars] = useState(false)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        resultsQuiz(id, {'page':pageNumber}, data=>{
            setResults(data)
        },
        error => {
            if(error.status===404){
                navigate('/404')
            }
            console.error(error)
        }
    )
}

    function getData(similar_to=null) {
        resultsQuiz(id, similar_to?{similar_to:similar_to}:null, data => {
            setResults(data);
        }, error => {
            if(error.status===404){
                navigate('/404')
            }
            console.error(error);
        })
    }

    React.useEffect(() => {
        if(searchParams.get('similar_to')){
            setSimilars(true)
            getData(searchParams.get('similar_to'))
        }
        else{
            getData()
        }
    }, [id, searchParams]);

    return (
        <>
            {results.data &&
                <>
                    {selecteds.length !== 0 &&
                        <div className="mb-2">
                            <label htmlFor="options">Belgilangalarni </label>
                            <div className="input-group">
                                <select id="options" value={options} onChange={e => { setOptions(e.target.value) }} className="form-select">
                                    <option value="change">O'zgartirish</option>
                                    <option value="delete">O'chirish</option>
                                </select>
                                <button className="btn btn-primary" onClick={e=>{
                                    if(options==='delete'){
                                        setDeleteModal(true)
                                    } else{
                                        setEditModal(true)
                                    }
                                }} ><CIcon icon={cilCheckCircle} /></button>
                            </div>
                        </div>
                    }
                    <CTable responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell className="p-3 d-flex gap-4 align-items-center"><input type="checkbox" checked={selecteds.length === results.data.length} className="form-check-input" onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelecteds(results.data.map(student => student.id));
                                    } else {
                                        setSelecteds([]);
                                    }
                                }} />#</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">Foydalanuvchi</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">To'g'ri javoblar</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">Noto'g'ri javoblar</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">Sarflangan vaqt</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">Ball</CTableHeaderCell>
                                <CTableHeaderCell className="p-3" scope="col">Ko'chiruvchi</CTableHeaderCell>
                                {similars && <CTableHeaderCell scope="col">O'xshashlik foizi</CTableHeaderCell>}
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {results.data.map((item, index) => (
                                <CTableRow key={index} style={{ cursor: "pointer" }} onClick={(e) => { e.target.className !== 'form-check-input me-2' && navigate(`/tests/${id}/results/${item.id}`) }}>
                                    <CTableDataCell className="p-3"><input checked={selecteds.includes(item.id)} type="checkbox" className="form-check-input me-2" onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelecteds([...selecteds, item.id]);
                                        } else {
                                            setSelecteds(selecteds.filter(id => id !== item.id));
                                        }
                                    }} />{item.id}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.user.full_name}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.correct_answers}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.wrong_answers}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.time_token}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.score}</CTableDataCell>
                                    <CTableDataCell className="p-3">{item.is_cheater?<CIcon size="xl" icon={cilCheckCircle} style={{color: "var(--cui-info)"}} />:<CIcon size="xl" icon={cilXCircle} style={{color: "var(--cui-danger)"}} />}</CTableDataCell>
                                    
                                    {similars && <CTableDataCell>{results.similars_persent[index]} %</CTableDataCell>}
                                </CTableRow>
                            ))}
                        </CTableBody>
                        {results.pages_count.length>1 && 
                            <CTableFoot>
                                <CTableRow>
                                    <CTableHeaderCell colSpan={similars?"7":'8'}>
                                        <CPagination align="center" aria-label="Page navigation example">
                                            <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                            {results.pages_count.length>1 && results.pages_count.map((page, index) => (
                                                <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                            ))}
                                            <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===results.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                        </CPagination>
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableFoot>
                        }
                    </CTable>
                </>
            }
            {results.data &&
                <CModal

                    alignment="center"
                    visible={delete_modal}
                    onClose={() => setDeleteModal(false)}
                    aria-labelledby="VerticallyCenteredExample"
                >
                    <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">Natijalarni o'chirish</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        Rostdan ham quyidagi natijalarni o'chirmoqchimisiz:
                        {results.data.map((el,index)=>(
                            <div key={index}>
                                {selecteds.includes(el.id) &&
                                    <div className="mb-3">
                                        {el.user.full_name} - {el.score} b
                                    </div>
                                }
                            </div>
                        ))}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setDeleteModal(false)}>
                            Yo'q
                        </CButton>
                        <CButton color="danger" onClick={e=>{
                            deleteResults(id, JSON.stringify(selecteds), data=>{
                                if(data.status==='ok'){
                                    getData()
                                    success_toast(data.msg)
                                } else{
                                    error_toast(data.msg)
                                }
                                setSelecteds([])
                                setDeleteModal(false)
                            }, error=>{
                                console.error(error)
                            })
                        }}>O'chirish</CButton>
                    </CModalFooter>
                </CModal>
            }

            {results.data &&
                <CModal

                    alignment="center"
                    visible={edit_modal}
                    onClose={() => setEditModal(false)}
                    aria-labelledby="VerticallyCenteredExample"
                >
                    <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">Natijalarni tahrirlash</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <div className="mb-3">
                            <input type="checkbox" name="cheater" id="cheater" className="form-check-input" checked={edit_data.is_cheater} onChange={e=>setEditData({remove_cheater:false, is_cheater:e.target.checked})} />
                            <label htmlFor="cheater" className="form-label ms-2">Belgilangan natijalarni ko'chiruvchi deb belgilash</label>
                        </div>
                        <div className="mb-3">
                            <input type="checkbox" name="remove_cheater" id="remove_cheater" className="form-check-input" checked={edit_data.remove_cheater} onChange={e=>setEditData({is_cheater: false, remove_cheater:e.target.checked})} />
                            <label htmlFor="remove_cheater" className="form-label ms-2">Belgilangan natijalardan ayblovni olib tashlash</label>
                        </div>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setEditModal(false)}>
                            Yopish
                        </CButton>
                        <CButton color="success" onClick={e=>{
                            changeResults(id, JSON.stringify({selecteds:selecteds, is_cheater:edit_data.is_cheater, remove_cheater:edit_data.remove_cheater}), data=>{
                                if(data.status==='ok'){
                                    getData()
                                    success_toast(data.msg)
                                } else{
                                    error_toast(data.msg)
                                }
                                setSelecteds([])
                                setEditModal(false)
                                setEditData(
                                    {
                                        is_cheater:false,
                                        remove_cheater:false
                                    }
                                )
                            }, error=>{
                                console.error(error)
                            })
                        }}> <CIcon icon={cilSave} /> Salqash</CButton>
                    </CModalFooter>
                </CModal>
            }
        </>
    )
};

export default Results;