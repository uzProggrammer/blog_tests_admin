import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTabs, CTabList, CTab} from "@coreui/react";
import { getGroupApi, removeStudent, getDTMS, UpdateGroupApi } from "../../api/groups";
import '../users/styles.scss';
import { FaGear } from "react-icons/fa6";
import CIcon from "@coreui/icons-react";
import { cilMinus, cilPlus, cilSave } from "@coreui/icons";

export default function Group() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState([]);
    let [active_key, setActiveKey] = useState(1);

    const [selecteds, setSelecteds] = useState([]);

    
    const [group_title, setGroupTitle] = useState('');
    const [group_password, setGroupPassword] = useState('');

    const [dtms, setDTMS] = useState([]);

    useEffect(() => {
        getDTMS(id, null, data=>{
            setDTMS(data)
        }, error=>{console.error(error)})
        getGroupApi(id, data => {
            setGroup(data);
            setGroupTitle(data.data.name);
            setGroupPassword(data.data.password);
        }, error => {
            if(error.response.status === 404) {
                navigate('/404')
            } else {
                console.error(error);
            }
        });
    }, [id]);


    return (
        <>
            {group.data && 
                <>
                    <div className="card p-3">
                        <div className="row">
                            <div className="col-md">
                                <h1 className="h3 mb-0 text-gray-800">{group.data.name}</h1>
                            </div>
                            <div className="col-md">
                                <CTabs activeItemKey={1}>
                                    <CTabList variant="tabs" layout="fill">
                                        <CTab aria-controls="home-tab-pane" onClick={() => setActiveKey(1)} itemKey={1}>Foydalanuvchilar</CTab>
                                        <CTab aria-controls="profile-tab-pane" onClick={() => setActiveKey(2)} itemKey={2}>Blog testlar</CTab>
                                        <CTab aria-controls="profile-tab-pane" onClick={() => setActiveKey(3)} itemKey={3}><FaGear /></CTab>
                                    </CTabList>
                                </CTabs>
                            </div>
                        </div>
                        <div className={active_key === 1? "a-o mt-3 d-block" : "d-none"}>
                            <div className="row mt-3">
                                <h5 className="mb-3 col-md">Guruh a'zolari</h5>
                                <div className="col-md text-end">
                                    {selecteds.length===0?
                                        <Link to={'/groups/'+id+'/add-student'} className="btn btn-primary"> <CIcon icon={cilPlus} /> Foydalanuvchi qo'shish </Link>
                                    :
                                        <button className="btn btn-danger" onClick={() => {
                                            removeStudent(id, JSON.stringify({data:selecteds}), success=>{
                                                setSelecteds([]);
                                                getGroupApi(id, data => {
                                                    setGroup(data);
                                                }, error => {
                                                    if(error.response.status === 404) {
                                                        navigate('/404')
                                                    } else {
                                                        console.error(error);
                                                    }
                                                });
                                            }, error=>{
                                                console.error(error);
                                            })
                                        }}><CIcon icon={cilMinus} /> Tanlanganlarni guruhdan chiqarish</button>
                                    }
                                </div>
                            </div>
                            <CTable responsive striped hover>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell className="p-3 d-flex gap-4 align-items-center" scope="col"><input type="checkbox" checked={selecteds.length === group.data.students.length} className="form-check-input" onChange={(e) => {
                                    if(e.target.checked){
                                        setSelecteds(group.data.students.map(student=>student.id));
                                    }else{
                                        setSelecteds([]);
                                    }
                                }} /> Ism</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className="p-3">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className="p-3">Bali</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {group.data.students.map(user => (
                                        <CTableRow key={user.id} style={{cursor: 'pointer'}} onClick={(e) => {
                                                if(e.target.className === 'form-check-input'){}
                                                else navigate(`/users/${user.username}`)
                                            }}>
                                            <CTableDataCell className="p-3 d-flex gap-4 align-items-center">
                                            <input checked={selecteds.includes(user.id)} type="checkbox" className="form-check-input" onChange={(e) => {
                                                if(e.target.checked){
                                                    setSelecteds([...selecteds, user.id]);
                                                }else{
                                                    setSelecteds(selecteds.filter(id=>id!==user.id));
                                                }
                                            }} />
                                                {user.full_name}</CTableDataCell>
                                            <CTableDataCell>{user.email}</CTableDataCell>
                                            <CTableDataCell>{user.ball}</CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                        </div>
                        <div className={active_key === 2? "a-o mt-3 d-block" : "d-none"}>
                            <h5>Blog testlar</h5>
                            {dtms.data && 
                                <CTable responsive striped hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col" className="p-3">Test nomi</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className="p-3">Testni boshlanish vaqti</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className="p-3">Testni davomiyligi</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className="p-3">Savollar soni</CTableHeaderCell>
                                            
                                            <CTableHeaderCell scope="col" className="p-3">Fanlar</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {dtms.data.map(dtm => (
                                            <CTableRow key={dtm.id} onClick={() => navigate(`/blog-tests/${dtm.id}`)} style={{cursor: 'pointer'}}>
                                                <CTableDataCell className="p-3">{dtm.title}</CTableDataCell>
                                                <CTableDataCell className="p-3">{dtm.start_date}</CTableDataCell>
                                                <CTableDataCell className="p-3">{dtm.countinuis_time}</CTableDataCell>
                                                <CTableDataCell className="p-3">{dtm.question_count}</CTableDataCell>
                                                
                                                <CTableDataCell className="p-3">{dtm.scinces}</CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                </CTable>
                            }
                        </div>

                        <div className={active_key === 3? "a-o mt-3 d-block" : "d-none"}>
                            <h5 className="mb-3">Sozlamalar</h5>
                            <div className="mb-3">
                                <label htmlFor="title">Guruh nomi</label>
                                <input type="text" name="title" id="title" className="form-control" value={group_title} onChange={(e) => {
                                    setGroupTitle(e.target.value)
                                }} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Guruhga qo'shilish paroli</label>
                                <input type="text" readOnly name="password" id="password" className="form-control" value={group_password} />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={e=>{
                                    UpdateGroupApi(id, JSON.stringify({title: group_title}), data=>{
                                        if(data.status==='ok'){
                                            getGroupApi(id, data=>{
                                                setGroup(data);
                                                setGroupTitle(data.data.name);
                                                setGroupPassword(data.data.password);
                                            }, error=>{
                                                console.error(error);
                                            })
                                        }
                                    }, error=>{
                                        console.error(error);
                                    })
                                }}><CIcon icon={cilSave} /> Saqlash</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}