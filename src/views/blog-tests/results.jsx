import {useEffect, useState} from 'react';
import { getResults, deleteResults, changeResults } from '../../api/blog_tests';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import {ImagesURL} from '../../api';
import {
    CPagination,
    CPaginationItem, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilCheckCircle, cilXCircle, cilSave } from "@coreui/icons";
import { toast } from "react-toastify";

export default function BlogResults(){
    let [results, setResults] = useState();
    let navigate = useNavigate();
    let {id} = useParams();

    let[searchParams, setSearchParams] = useSearchParams();

    useEffect(e=>{
        if(searchParams.get('similar_to')){
            let data = {similar_to:searchParams.get('similar_to')}
            getResults(id, data, data=>{
                setResults(data)
            }, error=>{
                if (error.status === 404) {
                    navigate("/404");
                } else {
                    console.log(error);
                }
            })
        }
        else{
        getResults(id,null, data=>{
                setResults(data)
            }, error=>{
                if (error.status === 404) {
                    navigate("/404");
                } else {
                    console.log(error);
                }
            })
        }
    }, [id, searchParams])


    const [currentPage, setCurrentPage] = useState(1);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getResults(id, {'page':pageNumber}, data=>{
                setResults(data)
            },
            error => {console.log(error)}
        )
    }


    const [selecteds, setSelecteds] = useState([]);
    const [options, setOptions] = useState('change');
    const [delete_modal, setDeleteModal] = useState(false)

    const success_toast = msg=>toast.success(msg, {delay:4000})
    const error_toast = msg=>toast.error(msg, {delay:4000})

    const[edit_modal, setEditModal] = useState(false)
    const[edit_data, setEditData] = useState({is_cheater:false, remove_cheater:false})

    return (
        <>
            {results &&
                <>                    
                <h5 className='mb-3 text-center'>{results.dtm.title} nomli blog testning natijalari</h5>
                <div className="text-end">
                    <Link target='_blank' className='text-end' to={ImagesURL+'/blog-tests/'+id+'/results/'}>Asosiy platformada ochish</Link>
                </div>
                    {selecteds.length !== 0 &&
                        <div className="mb-2 mt-2">
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
                    <div className="table-responsive">
                        <table className='table table-stripted table-hover mb-0'>
                            <thead>
                                <tr>
                                    <th className='py-3 d-flex gap-2 align-items-center'>
                                        <input type="checkbox" checked={selecteds.length === results.data.length} className="form-check-input" onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelecteds(results.data.map(student => student.id));
                                            } else {
                                                setSelecteds([]);
                                            }
                                        }} />
                                        O'rin
                                    </th>
                                    <th className='p-3'>O'quvchi</th>
                                    <th className='p-3'>Ball</th>
                                    <th className='p-3'>Sarflangan vaqt</th>
                                    <th className='p-3'>Yuborgan vaqti</th>
                                    <th className='p-3'>To'g'ri javoblar</th>
                                    <th className='p-3'>Nato'gri javoblar</th>
                                    <th className='p-3'>Ko'chiruvchi</th>
                                    {results.similars_persent.length!==0 && <th className='p-3'>O'xshashlik</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {results.data.map((result, index)=>(
                                    <tr key={index} style={{cursor:'pointer'}} onClick={(e) => { e.target.className !== 'form-check-input me-2' && navigate(`/blog-tests/${id}/results/${result.id}`) }}>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>
                                            <input checked={selecteds.includes(result.id)} type="checkbox" className="form-check-input me-2" onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelecteds([...selecteds, result.id]);
                                                } else {
                                                    setSelecteds(selecteds.filter(id => id !== result.id));
                                                }
                                            }} />
                                            {result.place}
                                        </td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.user.full_name}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{results.score}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.time_token}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.created_at}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.correct_answers}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.wrong_answers}</td>
                                        <td className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{result.is_cheater?<CIcon size="xl" icon={cilCheckCircle} style={{color: "var(--cui-info)"}} />:<CIcon size="xl" icon={cilXCircle} style={{color: "var(--cui-danger)"}} />}</td>
                                        {results.similars_persent.length!==0 && <th className={searchParams.get('similar_to')?result.id===parseInt(searchParams.get('similar_to'))?'bg-success':'':""}>{results.similars_persent[index]}%</th>}
                                    </tr>
                                ))}
                            </tbody>
                            {results.pages_count.length>1 &&
                                <tfoot>
                                    <tr>
                                        <td colSpan={7}>
                                            <CPagination align="center" aria-label="Page navigation example">
                                                <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                                {results.pages_count.length>1 && results.pages_count.map((page, index) => (
                                                    <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                                ))}
                                                <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===results.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                            </CPagination>
                                        </td>
                                    </tr>
                                </tfoot>
                            }
                        </table>
                    </div>
                </>
            }

            {results &&
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
                                    getResults(id,null, data=>{
                                        setResults(data)
                                    }, error=>{
                                        if (error.status === 404) {
                                            navigate("/404");
                                        } else {
                                            console.log(error);
                                        }
                                    })
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

            {results &&
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
                                    getResults(id,null, data=>{
                                        setResults(data)
                                    }, error=>{
                                        if (error.status === 404) {
                                            navigate("/404");
                                        } else {
                                            console.log(error);
                                        }
                                    })
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
                        }}> <CIcon icon={cilSave} /> Saqlash</CButton>
                    </CModalFooter>
                </CModal>
            }
        </>
    )
}