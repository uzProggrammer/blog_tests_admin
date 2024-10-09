import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CImage, CCol, CTabs, CTabList, CTab, CFormSwitch, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CTableFoot, CPagination, CPaginationItem } from "@coreui/react";

import CoverImage from '../../assets/images/profile_cover.jpg'
import { ImagesURL } from "../../api";
import { userApi, updateUserApi, updatePasswordApi, deleteUserApi, getDTMResults } from "../../api/users";
import { toast } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { cilSave } from "@coreui/icons";

import './styles.scss'

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const [dtm_results, setDtmResults] = useState()

    useEffect(e=>{
        getDTMResults(username, null, data=>{
            setDtmResults(data)
        }, error=>{
            if (error.response.status === 404) {
                navigate('/404')
            }
            else { console.error(error) }
        })
    }, [])

    const [activeKey, setActiveKey] = useState(1);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let toast_id = React.useRef(null);

    const password_change = () => toast_id.current = toast.info('Parol o\'zgartirilmoqda')
    const password_change_done = () => toast.update(toast_id.current, { render: 'Parol o\'zgartirildi!', type: 'success', autoClose: 5000 })

    function fetchUser(username1 = null) {
        userApi(username1 || username, null, data => setUser(data), error => {
            if (error.response.status === 404) {
                navigate('/404')
            }
            else { console.error(error) }
        })
    };


    let [visible, setVisible] = useState(false)

    useEffect(() => {
        fetchUser();
    }, [username]);


    const [currentPage, setCurrentPage] = React.useState(1);
    const [search, setSearch] = React.useState("");

    const paginate = (pageNumber) => {
            setCurrentPage(pageNumber);
            userApi(username, {'page':pageNumber}, data=>{
                setUser(data)
            },
            error => {console.error(error)}
        )
    }

    return (
        <div>
            {user.data &&
                <>
                    <CImage src={CoverImage} height={250} width={'100%'} className="bg-gradient-primary" style={{ objectFit: 'cover', borderRadius: '10px', filter: 'blur(1px)' }} />
                    <div className="position-relative">
                        <div className="card p-3 mb-4" style={{ position: 'absolute', top: '-50px', left: '10px', right: '10px' }}>
                            <div className="row">
                                <CCol md={6}>
                                    <div className="d-flex align-items-center gap-2">
                                        <CImage src={ImagesURL + user.data.image} width={60} height={60} className="rounded-circle" />
                                        <div>
                                            <h4 className="mb-0">{user.data.full_name}</h4>
                                            <span className="text-muted" style={{ fontSize: '14px' }}>{user.data.email}</span>
                                        </div>
                                    </div>
                                </CCol>
                                <CCol md={6}>
                                    <CTabs activeItemKey={1}>
                                        <CTabList variant="tabs" layout="fill">
                                            <CTab aria-controls="home-tab-pane" onClick={() => setActiveKey(1)} itemKey={1}>Ma'lumotlar</CTab>
                                            <CTab aria-controls="profile-tab-pane" onClick={() => setActiveKey(2)} itemKey={2}>Natijalar</CTab>
                                            <CTab aria-controls="profile-tab-pane" onClick={() => setActiveKey(3)} itemKey={3}>Blog test natijalari</CTab>
                                        </CTabList>
                                    </CTabs>
                                </CCol>
                            </div>
                            <div className={activeKey === 1 ? "d-block a-o my-3" : "d-none a-o my-3"}>
                                <h4 className="mb-3">Asosiy ma'lumotlar:</h4>
                                <div className="mb-3">
                                    <label htmlFor="username">Foydalanuvchi nomi:</label>
                                    <input type="text" className="form-control" id="username" value={user.data.username} onChange={e => setUser({ ...user, data: { ...user.data, username: e.target.value } })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Elektron pochta manzili:</label>
                                    <input type="email" className="form-control" id="email" value={user.data.email} onChange={e => setUser({ ...user, data: { ...user.data, email: e.target.value } })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="full_name">Ismi Sharifi</label>
                                    <input type="text" className="form-control" id="full_name" value={user.data.full_name} onChange={e => setUser({ ...user, data: { ...user.data, full_name: e.target.value } })} />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="jins">Jins:</label>
                                        <select className="form-select" id="jins" value={user.data.jins} onChange={e => setUser({ ...user, data: { ...user.data, jins: e.target.value } })}>
                                            <option value="erkak">Erkak</option>
                                            <option value="ayol">Ayol</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="date_brith">Tug'ilgan kuni:</label>
                                        <input type="date" className="form-control" id="date_brith" value={user.data.date_brith} onChange={e => setUser({ ...user, data: { ...user.data, date_brith: e.target.value } })} />
                                    </div>
                                </div>
                                <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label htmlFor="is_staff">Adminlik xuquqi:</label>
                                    <CFormSwitch id="is_staff" checked={user.data.is_staff} onChange={e => setUser({ ...user, data: { ...user.data, is_staff: e.target.checked } })} />
                                </div>
                                <div className="mb-3">
                                    <CButton color="primary" onClick={e => {
                                        updateUserApi(username, JSON.stringify(user.data), data1 => {
                                            let user1 = JSON.parse(localStorage.getItem('user'))
                                            if(user.username===username){
                                                localStorage.setItem('user', JSON.stringify(data1.data));
                                            }
                                            navigate('/users/' + data1.username)
                                        }, error => { console.error(error) })
                                    }}><CIcon icon={cilSave}></CIcon> Saqlash</CButton>
                                </div><hr />
                                <h4 className="mb-3 mt-4">Xavsizlik ma'lumotlari:</h4>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="password">Parol:</label>
                                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="confirm_password">Parolni tasdiqlang:</label>
                                        <input type="password" className={password !== confirmPassword ? "form-control is-invalid" : "form-control"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <CButton color="primary" disabled={password !== confirmPassword} onClick={e => {
                                            password_change()
                                            updatePasswordApi(username, JSON.stringify({ password: password }), data => {
                                                let user = JSON.parse(localStorage.getItem('user'))
                                                if(user.username===username){
                                                    localStorage.removeItem('token');
                                                    localStorage.removeItem('user');
                                                    navigate('/login')
                                                }
                                                password_change_done()
                                                setPassword('')
                                                setConfirmPassword('')
                                            }, error => { console.error(error) })
                                        }}><CIcon icon={cilSave}></CIcon> Saqlash</CButton>
                                    </div><hr />
                                    <div className="mb-3 mt-5">
                                        <h4 className="text-danger mb-3">Profilni o'chirish</h4>
                                        <div className="mb-2 text-danger">Ushbu akkountni o'chirib tashlamoq</div>
                                        <CButton onClick={() => setVisible(true)} color="danger" variant="outline">Profilni o'chirish</CButton>
                                        <CModal
                                            visible={visible}
                                            onClose={() => setVisible(false)}
                                            aria-labelledby="LiveDemoExampleLabel"
                                            alignment="center"
                                        >
                                            <CModalHeader>
                                                <CModalTitle id="LiveDemoExampleLabel">Rostdan ham ushbu akkountni o'chirib tashlamoqchimisiz?</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody>
                                                <p className="mb-3 text-danger">Agarda ushbu akkountni o'chirib tashlasangiz uning barcha test yechgan natijalari ma'lumotlari o'chib ketadi!</p>

                                                <div className="mb-3">
                                                    <label htmlFor="password">Parolni kiriting:</label>
                                                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                                </div>
                                            </CModalBody>
                                            <CModalFooter>
                                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                                    Yopish
                                                </CButton>
                                                <CButton color="danger" onClick={e=>{
                                                    deleteUserApi(username, null, JSON.stringify({password: password}), data => {
                                                        let user = JSON.parse(localStorage.getItem('user'))
                                                        if(user.username===username){
                                                            localStorage.removeItem('token');
                                                            localStorage.removeItem('user');
                                                            navigate('/login')
                                                        }
                                                        else if(data.status==='ok'){
                                                            navigate('/users')
                                                        }
                                                        else if(data.status==='error'){
                                                            toast.error(data.message)
                                                        }
                                                    }, error => { console.error(error) })
                                                }}>O'chirish</CButton>
                                            </CModalFooter>
                                        </CModal>
                                    </div>
                                </div>
                            </div>
                            <div className={activeKey === 2 ? "d-block a-o my-3" : "d-none a-o my-3"}>
                                <CTable responsive striped hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell className="p-3" scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Test nomi</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Ball</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Sarflangan vaqti</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">To'g'ri javoblar</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Nato'gri javoblar</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Yuborilgan sana</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {user.data.results.map((item, index) => (
                                            <CTableRow key={index} style={{cursor:"pointer"}} onClick={()=>navigate(`/tests/${item.quiz.id}/results/${item.id}`)}>
                                                <CTableHeaderCell className="p-3" scope="row">{item.id}</CTableHeaderCell>
                                                <CTableDataCell className="p-3">{item.quiz.title}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.score}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.time_token}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.correct_answers}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.wrong_answers}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.created_at}</CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                    {user.pages_count.length>1 && 
                                        <CTableFoot>
                                            <CTableRow>
                                                <CTableHeaderCell colSpan={"7"}>
                                                    <CPagination align="center" aria-label="Page navigation example">
                                                        <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                                        {user.pages_count.length>1 && user.pages_count.map((page, index) => (
                                                            <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                                        ))}
                                                        <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===user.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                                    </CPagination>
                                                </CTableHeaderCell>
                                            </CTableRow>
                                        </CTableFoot>
                                    }
                                </CTable>
                            </div>

                            <div className={activeKey === 3 ? "d-block a-o my-3" : "d-none a-o my-3"}>
                                <CTable responsive striped hover>
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell className="p-3" scope="col">#</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Test nomi</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Ball</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Sarflangan vaqti</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">To'g'ri javoblar</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Nato'gri javoblar</CTableHeaderCell>
                                            <CTableHeaderCell className="p-3" scope="col">Yuborilgan sana</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {dtm_results && dtm_results.data.map((item, index) => (
                                            <CTableRow key={index} style={{cursor:"pointer"}} onClick={()=>navigate(`/blog-tests/${item.dtm.id}/results/${item.id}`)}>
                                                <CTableHeaderCell className="p-3" scope="row">{item.place}</CTableHeaderCell>
                                                <CTableDataCell className="p-3">{item.dtm.title}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.score}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.time_token}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.correct_answers}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.wrong_answers}</CTableDataCell>
                                                <CTableDataCell className="p-3">{item.created_at}</CTableDataCell>
                                            </CTableRow>
                                        ))}
                                    </CTableBody>
                                    {user.pages_count.length>1 && 
                                        <CTableFoot>
                                            <CTableRow>
                                                <CTableHeaderCell colSpan={"7"}>
                                                    <CPagination align="center" aria-label="Page navigation example">
                                                        <CPaginationItem disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Previous</CPaginationItem>
                                                        {user.pages_count.length>1 && user.pages_count.map((page, index) => (
                                                            <CPaginationItem style={{cursor:'pointer'}} key={index} active={currentPage===page} onClick={()=>paginate(page)}>{page}</CPaginationItem>
                                                        ))}
                                                        <CPaginationItem style={{cursor:'pointer'}} disabled={currentPage===user.pages_count} onClick={()=>paginate(currentPage+1)}>Next</CPaginationItem>
                                                    </CPagination>
                                                </CTableHeaderCell>
                                            </CTableRow>
                                        </CTableFoot>
                                    }
                                </CTable>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
};

export default Profile;