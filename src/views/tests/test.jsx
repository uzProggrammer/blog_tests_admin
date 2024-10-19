import React from "react";

import { CRow, CCol, CCard, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CFormSwitch, CSpinner } from "@coreui/react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { getTest, createTest, deleteTest, updateTest, updateQuiz } from "../../api/tests";

import { baseURL } from "../../api";
import $ from "jquery";

import { cilCheckCircle, cilXCircle, cilPencil, cilPlus, cilSave, cilChart } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import CKEDITOR from "../../components/quil";

import { toast } from "react-toastify";

export default function Test() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = React.useState(null);
    const [is_create, setIsCreate] = React.useState(false);

    const error_toast = (m)=>toast.error(m, {autoClose: 5000, });
    const success_toast = (m)=>toast.success(m, {autoClose: 5000, });

    const [test_text, setTestText] = React.useState("");
    const [test_answer1, setTestAnswer1] = React.useState("");
    const [test_answer2, setTestAnswer2] = React.useState("");
    const [test_answer3, setTestAnswer3] = React.useState("");
    const [test_answer4, setTestAnswer4] = React.useState("");
    const [test_is_correct, setTestIsCorrect] = React.useState(1);
    const [ball, setBall] = React.useState(null);


    const [visible, setVisible] = React.useState(false);
    const [deleted, setDeleted] = React.useState('');
    const [deleted_id, setDeletedId] = React.useState('');

    const [visible1, setVisible1] = React.useState(false);
    const [edited, setEdited] = React.useState(false);
    const [edited_id, setEditedId] = React.useState('');

    const [test_edit, setTestEdit] = React.useState(null);
    const [test_data, setTestData] = React.useState(null);


    const docx_file_input_ref = React.useRef(null);
    const[is_uploading, setIsUploading] = React.useState(false);

    React.useEffect(() => {
        getTest(id, null,
            data => {
                setTest(data);
            },
            error => {
                if (error.status === 404) {
                    navigate("/404");
                } else {
                    console.log(error);
                }
            }
        )
    }, [id]);


    return (
        <>
            {test &&
                <CRow className="mb-3">
                    <CCol md={12} xs={12} className="mb-3">
                        <CCard className="p-2 py-3">
                            {!test_edit &&
                                <>
                                    <h5>{test.data.title}</h5>
                                    <CRow>
                                        <CCol md={12}>
                                            <div className="d-flex justify-content-between align-items-center">Fan: <div>{test.data.scince}</div></div>
                                        </CCol>
                                        <CCol md={12}>
                                            <div className="d-flex justify-content-between align-items-center">Davomiyligi: <div>{test.data.countinuis_time}</div></div>
                                        </CCol>
                                        <CCol md={12}>
                                            <div className="d-flex justify-content-between align-items-center">Yaratilgan vaqt: <div>{test.data.created_at}</div></div>
                                        </CCol>
                                        <CCol md={12}>
                                            <div className="d-flex justify-content-between align-items-center">Ommaga taqdim etilgan: {test.data.is_public ? <CIcon icon={cilCheckCircle} color="success" size="xl" /> : <CIcon icon={cilXCircle} color="danger" size="xl" />}</div>
                                        </CCol>
                                    </CRow>
                                    <div className="mt-3">
                                        <CButton onClick={() => {setTestEdit(true);setTestData({scince:test.data.scince,title:test.data.title,countinuis_time:test.data.countinuis_time,is_public:test.data.is_public,id:id})}} className="btn btn-primary" color="primary"><CIcon icon={cilPencil} size="sm" /> Tahrirlash</CButton>
                                        <Link to={'/tests/'+id+'/results/'} className="btn btn-primary ms-3" color="primary"><CIcon icon={cilChart} size="sm" /> Natijalar</Link>
                                    </div>
                                </>
                            }
                            {test_edit &&
                                <>
                                    <h5 className="mb-3">Testni tahrirlash</h5>
                                    <div className="mb-3">
                                        <label>Test nomi</label>
                                        <input type="text" className="form-control" value={test_data.title} onChange={(e) => setTestData({...test_data,title:e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Davomiyligi</label>
                                        <input type="time" className="form-control" value={test_data.countinuis_time} onChange={(e) => setTestData({...test_data,countinuis_time:e.target.value})} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Fan</label>
                                        <input type="text" className="form-control" value={test_data.scince} onChange={(e) => setTestData({...test_data,scince:e.target.value})} />
                                    </div>
                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <label htmlFor="is_public">Ommaviy</label>
                                        <CFormSwitch id="is_public" defaultChecked={test_data.is_public} onChange={(e) => setTestData({...test_data,is_public:e.target.checked})} />
                                    </div>
                                    <div className="mt-3">
                                        <CButton className="btn btn-primary" color="primary" onClick={() => {
                                            updateQuiz(id, JSON.stringify(test_data), data => {
                                                getTest(id, null,
                                                    data => {
                                                        setTest(data);
                                                    },
                                                    error => {
                                                        if (error.status === 404) {
                                                            navigate("/404");
                                                        } else {
                                                            console.log(error);
                                                        }
                                                    }
                                                );
                                                setTestEdit(false);
                                                setTestData(null);
                                            }, error => {console.error(error)})
                                        }}> <CIcon icon={cilSave} size="sm" /> Saqlash</CButton>
                                    </div>
                                </>
                            }
                        </CCard>
                    </CCol>
                    <CCol md={12}>
                        <CModal
                        
                            alignment="center"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="VerticallyCenteredExample"
                        >
                            <CModalHeader>
                                <CModalTitle id="VerticallyCenteredExample">Testni o'chirish</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                Rostdan ham quyidagi tetni o'chirmoqchimisiz:
                                <div dangerouslySetInnerHTML={{ __html: deleted }}></div>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                    Yo'q
                                </CButton>
                                <CButton color="danger" onClick={() => {
                                    deleteTest(id, JSON.stringify({id:deleted_id}), data => {
                                        getTest(id, null,
                                            data => {
                                                setTest(data);
                                            },
                                            error => {
                                                if (error.status === 404) {
                                                    navigate("/404");
                                                } else {
                                                    console.log(error);
                                                }
                                            }
                                        );
                                        setVisible(false);
                                        setDeleted('');
                                        setDeletedId('');
                                    }, error => {
                                        console.error(error);
                                    })
                                }}>O'chirish</CButton>
                            </CModalFooter>
                        </CModal>
                        <CModal
                            scrollable
                            fullscreen
                            visible={visible1}
                            onClose={() => setVisible1(false)}
                            aria-labelledby="VerticallyCenteredExample"
                        >
                            <CModalHeader>
                                <CModalTitle id="VerticallyCenteredExample">Testni tahrirlash</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                            <div className="mt-3">
                                        <label>Savol</label>
                                        <CKEDITOR value={test_text} onChange={(data) => setTestText(data)} />
                                        <div className="my-3">
                                            <label>Savol bali</label>
                                            <input type="number" className="form-control" value={ball} onChange={(e) => setBall(e.target.value)} />
                                        </div>
                                        <div className="p-3 pt-3">
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer1} onChange={(data) => setTestAnswer1(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={1} checked={test_is_correct === 1} onChange={(e) => setTestIsCorrect(1)} type="radio" name="is_correct" id="is_correct1" />
                                                    <label htmlFor="is_correct1">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer2} onChange={(data) => setTestAnswer2(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={2} checked={test_is_correct === 2} onChange={(e) => setTestIsCorrect(2)} type="radio" name="is_correct" id="is_correct2" />
                                                    <label htmlFor="is_correct2">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer3} onChange={(data) => setTestAnswer3(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={3} checked={test_is_correct === 3} onChange={(e) => setTestIsCorrect(3)} type="radio" name="is_correct" id="is_correct3" />
                                                    <label htmlFor="is_correct3">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer4} onChange={(data) => setTestAnswer4(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={4} checked={test_is_correct === 4} onChange={(e) => setTestIsCorrect(4)} type="radio" name="is_correct" id="is_correct4" />
                                                    <label htmlFor="is_correct4">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisible1(false)}>
                                    Bekor qilsih
                                </CButton>
                                <CButton color="primary"  onClick={() => {
                                            updateTest(id, JSON.stringify({
                                                text: test_text,
                                                1: test_answer1,
                                                2: test_answer2,
                                                3: test_answer3,
                                                4: test_answer4,
                                                correct: test_is_correct,
                                                ball: ball,
                                                id: edited_id
                                            }), data => {
                                                getTest(id, null,
                                                    data => {
                                                        setTest(data);
                                                    },
                                                    error => {
                                                        if (error.status === 404) {
                                                            navigate("/404");
                                                        } else {
                                                            console.log(error);
                                                        }
                                                    }
                                                );
                                                setIsCreate(false);
                                                setTestText("");
                                                setTestAnswer1("");
                                                setTestAnswer2("");
                                                setTestAnswer3("");
                                                setTestAnswer4("");
                                                setTestIsCorrect(1);
                                                setBall(null);
                                                setVisible1(false);
                                                setEdited(false);
                                                setEditedId('');
                                            }, error => {
                                                console.error(error);
                                            })
                                        }}><CIcon icon={cilSave} size="sm" /> Saqlash</CButton>
                            </CModalFooter>
                        </CModal>
                        <CCard className="p-2 py-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-3 text-center">Savollar</h5>
                                <CButton color="primary" onClick={() => {setIsUploading(true);docx_file_input_ref.current.click()}}>{is_uploading && <CSpinner size="sm" />} Docx yuklash</CButton>
                                <input type="file" accept=".doc, .docx" hidden ref={docx_file_input_ref} onChange={e=>{
                                    console.log(e.target.files[0]);
                                    const formData = new FormData();
                                    formData.append("file", e.target.files[0]);
                                    $.ajax({
                                        url: baseURL+"tests/"+id+"/upload-docx/",
                                        type: 'POST',
                                        headers: {
                                            "Authorization": "Token " + localStorage.getItem("token"),
                                        },
                                        data: formData,
                                        processData:false,
                                        contentType: false,
                                        success: data=>{
                                            console.log(data);
                                            if(data.status!=='ok'){
                                                error_toast(data.error);
                                            }
                                            else{
                                                getTest(id, null,
                                                    data => {
                                                        setTest(data);
                                                    },
                                                    error => {
                                                        if (error.status === 404) {
                                                            navigate("/404");
                                                        } else {
                                                            console.log(error);
                                                        }
                                                    }
                                                );
                                                setIsUploading(false);
                                                e.target.value = "";
                                                success_toast('Testlar yaratildi!')
                                            }
                                        },
                                        error: e=>{
                                            if(e.status===401){
                                                localStorage.removeItem('user');
                                                localStorage.removeItem('token');
                                                location.hash = '#/login';
                                            }
                                            console.error(e);
                                            setIsUploading(false);
                                            e.target.value = "";
                                            error_toast("Docx yuklashda xatolik yuz berdi");
                                        },
                                    });
                                }} />
                            </div>
                            {test.questions_data.map((question, index) => (
                                <div key={index} style={{ borderBottom: "1px solid #ccc" }}>
                                    <div className="title d-flex align-items-center mb-3 gap-2">
                                        <span>{index + 1}. </span>
                                        <div dangerouslySetInnerHTML={{ __html: question.text }}></div>
                                    </div>
                                    <div className="p-3 pt-0">
                                        {question.variants.map((variant, index) => (
                                            <div key={index} className="d-flex align-items-center gap-2">
                                                <input readOnly checked={variant.is_correct} className="form-check-input" type="radio" name={question.id} id={`question${index + 1}-${variant.id}`} />
                                                <label htmlFor={`question${index + 1}-${variant.id}`} dangerouslySetInnerHTML={{ __html: variant.text }}></label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-end mt-2 mb-2">
                                        <CButton onClick={(e) => {setVisible1(true);setEdited(true);setEditedId(question.id);setTestText(question.text);setTestAnswer1(question.variants[0].text);setTestAnswer2(question.variants[1].text);setTestAnswer3(question.variants[2].text);setTestAnswer4(question.variants[3].text);setTestIsCorrect(question.variants[0].is_correct? 1 : (question.variants[1].is_correct ? 2 : (question.variants[2].is_correct ? 3 : 4)));setBall(question.ball);}} className="btn btn-primary" style={{ marginRight: "10px" }} color="primary"><CIcon icon={cilPencil} size="sm" /> Tahrirlash</CButton>
                                        <CButton color="danger" onClick={() => {setVisible(true);setDeleted(question.text);setDeletedId(question.id);}}>  O'chirish</CButton>
                                    </div>
                                </div>
                            ))}
                            {!is_create &&
                                <div className="mt-3 text-end">
                                    <CButton className="btn btn-primary" color="primary" onClick={() => setIsCreate(true)}><CIcon icon={cilPlus} size="sm" /> Savol qo'shish</CButton>
                                </div>
                            }
                            {is_create &&
                                <>
                                    <div className="mt-3">
                                        <label>Savol</label>
                                        <CKEDITOR value={test_text} onChange={(data) => setTestText(data)} />
                                        <div className="my-3">
                                            <label>Savol bali</label>
                                            <input type="number" className="form-control" value={ball} onChange={(e) => setBall(e.target.value)} />
                                        </div>
                                        <div className="p-3 pt-3">
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer1} onChange={(data) => setTestAnswer1(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={1} onChange={(e) => setTestIsCorrect(1)} type="radio" name="is_correct" id="is_correct1" />
                                                    <label htmlFor="is_correct1">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer2} onChange={(data) => setTestAnswer2(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={2} onChange={(e) => setTestIsCorrect(2)} type="radio" name="is_correct" id="is_correct2" />
                                                    <label htmlFor="is_correct2">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer3} onChange={(data) => setTestAnswer3(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={3} onChange={(e) => setTestIsCorrect(3)} type="radio" name="is_correct" id="is_correct3" />
                                                    <label htmlFor="is_correct3">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <CKEDITOR value={test_answer4} onChange={(data) => setTestAnswer4(data)} />
                                                <div className="text-end">
                                                    <input className="form-check-input" value={4} onChange={(e) => setTestIsCorrect(4)} type="radio" name="is_correct" id="is_correct4" />
                                                    <label htmlFor="is_correct4">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                        </div>
                                        <CButton color="primary" onClick={() => {
                                            createTest(id, JSON.stringify({
                                                text: test_text,
                                                1: test_answer1,
                                                2: test_answer2,
                                                3: test_answer3,
                                                4: test_answer4,
                                                correct: test_is_correct,
                                                ball: ball
                                            }), data => {
                                                getTest(id, null,
                                                    data => {
                                                        setTest(data);
                                                    },
                                                    error => {
                                                        if (error.status === 404) {
                                                            navigate("/404");
                                                        } else {
                                                            console.log(error);
                                                        }
                                                    }
                                                );
                                                setIsCreate(false);
                                                setTestText("");
                                                setTestAnswer1("");
                                                setTestAnswer2("");
                                                setTestAnswer3("");
                                                setTestAnswer4("");
                                                setTestIsCorrect(1);
                                                setBall(null);

                                            }, error => {
                                                console.error(error);
                                            })
                                        }}><CIcon icon={cilSave} size="sm" /> Saqlash</CButton>
                                    </div>
                                </>
                            }
                        </CCard>
                    </CCol>
                </CRow>
            }
        </>
    );
}