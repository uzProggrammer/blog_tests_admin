import React from "react";

import { CRow, CCol, CCard, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CFormSwitch, CSpinner } from "@coreui/react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { getBlogTest, editBlogTest, deleteQuestion, editQuestion, addQuestion, editTest, createScince } from "../../api/blog_tests";
import { cilXCircle, cilPencil, cilPlus, cilSave, cilChart } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import CKEDITOR from "../../components/quil";


import './styles.scss'
import { error } from "jquery";

export default function BlogTest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [test, setTest] = React.useState(null);

    const [edited_data, setEditedData] = React.useState({});
    const [loading_edit, setLoadingEdit] = React.useState(false);
    const [is_test_edit, setIsTestEdit] = React.useState(false);
    const [deleted_test_data, setDeletedTestData] = React.useState({});

    const [del_modal, setDelModal] = React.useState(false);

    
    const [edit_modal, setEditModal] = React.useState(false);
    const [test_edited_data, setTestEditedData] = React.useState({})


    const [add_question_modal, setAddQuestionModal] = React.useState(false);
    const [question_data, setQuestionData] = React.useState({
        text: "",
        ball: 0,
        variants:[
            {
                text: "",
                is_correct: false
            },
            {
                text: "",
                is_correct: false
            },
            {
                text: "",
                is_correct: false
            },
            {
                text: "",
                is_correct: false
            }
        ]
    });
    const[add_question_quiz, setAddQuestionQuiz] = React.useState(0);



    const [quiz_edit, setQuizEdit] = React.useState(false);
    const [quiz_data, setQuizData] = React.useState({});


    const [add_scince_modal, setAddScinceModal] = React.useState(false);
    const [scince_data, setScinceData] = React.useState({
        title: ""
    });


    
    React.useEffect(() => {
        getBlogTest(id, null,
            data => {
                setTest(data);
                setEditedData({ title: data.data.title, countinuis_time: data.data.countinuis_time, start_date: data.data.start_date, group: data.data.group.id });
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
                        {!is_test_edit &&
                            <CCard className="p-2 py-3">
                                <h5>{test.data.title}</h5>
                                <CRow>
                                    <CCol md={12}>
                                        <div className="d-flex justify-content-between align-items-center">Fan: <div>{test.data.scinces}</div></div>
                                    </CCol>
                                    <CCol md={12}>
                                        <div className="d-flex justify-content-between align-items-center">Davomiyligi: <div>{test.data.countinuis_time}</div></div>
                                    </CCol>
                                    <CCol md={12}>
                                        <div className="d-flex justify-content-between align-items-center">Test boshlanish vaqti: <div>{test.data.start_date}</div></div>
                                    </CCol>
                                    <CCol md={12}>
                                        <div className="d-flex justify-content-between align-items-center">Savollar soni: <div>{test.data.question_count}</div></div>
                                    </CCol>
                                    {test.data.group.length > 0 &&
                                        <CCol md={12}>
                                            <div className="d-flex justify-content-between align-items-center">Guruh: <div>{test.data.group.title}</div></div>
                                        </CCol>
                                    }
                                </CRow>
                                <div className="mt-3">
                                    <CButton className="btn btn-primary" color="primary" onClick={() => setIsTestEdit(!is_test_edit)}><CIcon icon={cilPencil} size="sm" /> Tahrirlash</CButton>
                                    <Link to={'/blog-tests/' + id + '/results/'} className="btn btn-primary ms-3" color="primary"><CIcon icon={cilChart} size="sm" /> Natijalar</Link>
                                </div>

                            </CCard>
                        }
                        {is_test_edit &&
                            <CCard className="p-2 py-3">
                                <div className="mb-3">
                                    <label htmlFor="title">Test nomi</label>
                                    <input type="text" name="title" onChange={e => setEditedData(prev => ({ ...prev, title: e.target.value }))} value={edited_data.title} id="title" className="form-control" placeholder="Test nomini kiriting" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="countinuis_time">Test davomiyligi:</label>
                                        <input type="time" name="countinuis_time" onChange={e => setEditedData(prev => ({ ...prev, countinuis_time: e.target.value }))} value={edited_data.countinuis_time} id="countinuis_time" className="form-control" placeholder="Test davomiyligini kiriting" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="start_date">Test boshlanish vaqti:</label>
                                        <input type="date" name="start_date" id="start_date" onChange={e => setEditedData(prev => ({ ...prev, start_date: e.target.value }))} value={edited_data.start_date} className="form-control" placeholder="Test boshlanish vaqti" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="group">Guruh:</label>
                                        <select name="group" id="group" className="form-select" onChange={e => setEditedData(prev => ({ ...prev, group: e.target.value }))} value={edited_data.group}>
                                            <option value="">Guruhni tanlang</option>
                                            {test.data.groups.map((group, index) => (
                                                <option key={index} value={group.id}>{group.name}</option>
                                            ))}
                                        </select>
                                        <span className="form-text">Agar blog test hamma uchun bo'lsa buning qiymatini tashlab keting</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={e => {
                                        setLoadingEdit(true);
                                        editBlogTest(id, JSON.stringify(edited_data), data => {
                                            console.log(data);
                                            setTest(data);
                                            setLoadingEdit(false);
                                            setEditedData({ title: data.data.title, countinuis_time: data.data.countinuis_time, start_date: data.data.start_date, group: data.data.group.id });
                                            setIsTestEdit(false);

                                        }, error => {
                                            console.error(error);
                                            setLoadingEdit(false);
                                            setIsTestEdit(false);

                                        })
                                    }}>{loading_edit ? <CSpinner color="primary" size="sm" /> : <CIcon icon={cilSave} size="sm" />} Saqlash</button>
                                    <button className="btn btn-secondary ms-3" onClick={e=>{
                                        setIsTestEdit(false);
                                        setLoadingEdit(false);
                                    }}><CIcon icon={cilXCircle} size="sm" /> Bekor qilish</button>
                                </div>
                            </CCard>
                        }
                    </CCol>
                    <CCol md={12}>
                        <CModal visible={del_modal} onClose={() => setDelModal(false)} alignment="center">
                            <CModalHeader>
                                <CModalTitle>Testni o'chirish</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <p>Rostdan ham ushbu testni o'chirmoqchimisiz?</p>
                                <div dangerouslySetInnerHTML={{ __html: deleted_test_data.text }}></div>
                                <div className="mt-3 text-center">
                                    <CButton className="btn btn-danger me-3" color="danger" onClick={() => {
                                        deleteQuestion(deleted_test_data.question, null, data=>{
                                            getBlogTest(id, null,
                                                data => {
                                                    setTest(data);
                                                    setEditedData({ title: data.data.title, countinuis_time: data.data.countinuis_time, start_date: data.data.start_date, group: data.data.group.id });
                                                },
                                                error => {
                                                    if (error.status === 404) {
                                                        navigate("/404");
                                                    } else {
                                                        console.log(error);
                                                    }
                                                }
                                            );
                                            setDelModal(false);
                                        }, error=>{
                                            console.error(error);
                                        })
                                    }}>O'chirish</CButton>
                                    <CButton className="btn btn-secondary" color="secondary" onClick={() => setDelModal(false)}>Yopish</CButton>
                                </div>
                            </CModalBody>
                        </CModal>
                        {edit_modal &&
                            <CModal visible={edit_modal} onClose={() => setEditModal(false)} alignment="center" backdrop={'static'} scrollable size="xl">
                                <CModalHeader>
                                    <CModalTitle>Testni tahrirlash</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <label htmlFor="text">Savolni kiriting:</label>
                                    <CKEDITOR
                                        value={test_edited_data.text}
                                        onChange={text => setTestEditedData(prev => ({ ...prev, text }))}
                                    />
                                    <label htmlFor="ball" className="mt-3">Ball:</label>
                                    <input type="number" name="ball" id="ball" className="form-control" value={test_edited_data.ball} onChange={e => setTestEditedData(prev => ({ ...prev, ball: e.target.value }))} />
                                    <div className="p-2">
                                        {test_edited_data.variants.map((variant, index) => (
                                            <div key={index} className="mb-2">
                                                <label htmlFor={"variant"+index}>{index+1} - variant</label>
                                                <CKEDITOR
                                                    value={variant.text}
                                                    onChange={text => setTestEditedData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === index ? ({...v, text}) : v) }))}
                                                />
                                                <div className="d-flex align-items-center gap-2 justify-content-end">
                                                    <input type="radio" id={"variant"+index+"_correct"} name={"variant"} value={index} className="form-check-input" checked={variant.is_correct} onChange={e => setTestEditedData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === index ? ({...v, is_correct: true}) : ({...v, is_correct: false})) }))} />
                                                    <label htmlFor={"variant"+index+"_correct"} className="mb-0 form-check-label">Ushbu javob to'g'ri</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CModalBody>
                                <CModalFooter>
                                    <div className="text-end">
                                        <CButton color="primary me-2" onClick={e=>{
                                            editQuestion(id, test_edited_data.id, JSON.stringify(test_edited_data), data => {
                                                getBlogTest(id, null, data=>{
                                                    setTest(data);
                                                    setEditedData({});
                                                    setEditModal(false);
                                                }, error=>{
                                                    if (error.status === 404) {
                                                        navigate("/404");
                                                    } else {
                                                        console.log(error);
                                                    }
                                                })
                                            }, error => {
                                                console.error(error)
                                            });
                                        }}><CIcon icon={cilSave} size="sm" /> Saqlash</CButton>
                                        <CButton color="secondary" onClick={() => setEditModal(false)}><CIcon icon={cilXCircle} size="sm" /> Yopish</CButton>
                                    </div>
                                </CModalFooter>
                            </CModal>
                        }
                        <CModal visible={add_question_modal} onClose={() => setAddQuestionModal(false)} alignment="center" backdrop={'static'} scrollable size="xl">
                            <CModalHeader>
                                <CModalTitle>Test qo'shish</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <label htmlFor="text">Savolni kiriting:</label>
                                <CKEDITOR
                                    value={question_data.text}
                                    onChange={text => setQuestionData(prev => ({ ...prev, text }))}
                                />
                                <label htmlFor="ball" className="mt-3">Ball:</label>
                                <input type="number" name="ball" id="ball" className="form-control" value={question_data.ball} onChange={e => setQuestionData(prev => ({ ...prev, ball: e.target.value }))} />
                                <div className="p-2">
                                    <div className="mb-2">
                                        <label htmlFor="variant1">1 - variant</label>
                                        <CKEDITOR
                                            value={question_data.variants[0].text}
                                            onChange={text => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 0 ? ({...v, text}) : v) }))}
                                        />
                                        <div className="d-flex align-items-center gap-2 justify-content-end">
                                            <input type="radio" id="variant1_correct" name="variant" value="1" className="form-check-input" checked={question_data.variants[0].is_correct} onChange={e => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 0 ? ({...v, is_correct: true}) : ({...v, is_correct: false}))}))} />
                                            <label htmlFor="variant1_correct" className="mb-0 form-check-label">Ushbu javob to'g'ri</label>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="variant2">2 - variant</label>
                                        <CKEDITOR
                                            value={question_data.variants[1].text}
                                            onChange={text => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 1 ? ({...v, text}) : v) }))}
                                        />
                                        <div className="d-flex align-items-center gap-2 justify-content-end">
                                            <input type="radio" id="variant2_correct" name="variant" value="2" className="form-check-input" checked={question_data.variants[1].is_correct} onChange={e => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 1 ? ({...v, is_correct: true}) : ({...v, is_correct: false})) }))} />
                                            <label htmlFor="variant2_correct" className="mb-0 form-check-label">Ushbu javob to'g'ri</label>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                            <label htmlFor="variant3">3 - variant</label>
                                        <CKEDITOR
                                            value={question_data.variants[2].text}
                                            onChange={text => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 2 ? ({...v, text}) : v) }))}
                                        />
                                        <div className="d-flex align-items-center gap-2 justify-content-end">
                                            <input type="radio" id="variant3_correct" name="variant" value="3" className="form-check-input" checked={question_data.variants[2].is_correct} onChange={e => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 2 ? ({...v, is_correct: true}) : ({...v, is_correct: false})) }))} />
                                            <label htmlFor="variant3_correct" className="mb-0 form-check-label">Ushbu javob to'g'ri</label>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                            <label htmlFor="variant4">4 - variant</label>
                                        <CKEDITOR
                                            value={question_data.variants[3].text}  
                                            onChange={text => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 3 ? ({...v, text}) : v) }))}
                                        />
                                        <div className="d-flex align-items-center gap-2 justify-content-end">
                                            <input type="radio" id="variant4_correct" name="variant" value="4" className="form-check-input" checked={question_data.variants[3].is_correct} onChange={e => setQuestionData(prev => ({ ...prev, variants: prev.variants.map((v, i) => i === 3 ? ({...v, is_correct: true}) : ({...v, is_correct: false})) }))} />
                                            <label htmlFor="variant4_correct" className="mb-0 form-check-label">Ushbu javob to'g'ri</label>
                                        </div>
                                    </div>
                                </div>
                            </CModalBody>
                            <CModalFooter>
                                <div className="text-end">
                                    <CButton color="primary me-2" onClick={e=>{
                                        addQuestion(id, add_question_quiz, JSON.stringify(question_data), data => {
                                            getBlogTest(id, null, data=>{
                                                setTest(data);
                                                setQuestionData(
                                                    {
                                                        text: "",
                                                        ball: 0,
                                                        variants:[
                                                            {
                                                                text: "",
                                                                is_correct: false
                                                            },
                                                            {
                                                                text: "",
                                                                is_correct: false
                                                            },
                                                            {
                                                                text: "",
                                                                is_correct: false
                                                            },
                                                            {
                                                                text: "",
                                                                is_correct: false
                                                            }
                                                        ]
                                                    }
                                                );
                                                setAddQuestionModal(false);
                                            }, error=>{
                                                if (error.status === 404) {
                                                    navigate("/404");
                                                } else {
                                                    console.log(error);
                                                }
                                            })
                                        }, error => {
                                            console.error(error)
                                        });
                                    }} ><CIcon icon={cilSave} size="sm"/> Saqlash</CButton>
                                    <CButton color="secondary" onClick={() => setAddQuestionModal(false)}><CIcon icon={cilXCircle} size="sm" /> Yopish</CButton>
                                </div>
                            </CModalFooter>
                        </CModal>
                        <CModal visible={add_scince_modal} onClose={() => setAddScinceModal(false)} alignment="center" backdrop={'static'} scrollable >
                            <CModalHeader>
                                Fan yaratish
                            </CModalHeader>
                            <CModalBody>
                                <label htmlFor="title">Fan nomi:</label>
                                <input type="text" name="title" id="title" className="form-control" value={scince_data.title} onChange={e => setScinceData(prev => ({ ...prev, title: e.target.value }))} />
                            </CModalBody>
                            <CModalFooter>
                                <div className="text-end">
                                    <CButton color="primary" className="me-2" onClick={e=>{
                                        createScince(id, JSON.stringify(scince_data), data => {
                                            getBlogTest(id, null, data=>{
                                                setTest(data);
                                                setScinceData({ title: "" });
                                                setAddScinceModal(false);
                                            }, error=>{
                                                console.error(error);
                                            });
                                        }, error=>{
                                            console.error(error);
                                        })
                                    }}>
                                        <CIcon icon={cilSave} size="sm"/> Saqlash
                                    </CButton>
                                        <CButton color="secondary" onClick={() => setAddScinceModal(false)}><CIcon icon={cilXCircle} size="sm" /> Yopish</CButton>
                                </div>
                            </CModalFooter>
                        </CModal>
                        <CCard className="p-2 py-3">
                            <div className="d-flex justify-content-between align-items-center mb-3 px-3">
                                <h4 className="mb-3 text-center">Savollar</h4>
                                <CButton color="primary" onClick={e=>{
                                    setAddScinceModal(true);
                                }}>
                                    <CIcon icon={cilPlus} size="sm"/> Fan qo'shish
                                </CButton>
                            </div>
                            {test.data.quizs.length > 0 &&
                                <>
                                    {test.data.quizs.map((quiz, index) => (
                                        <div key={index} className="mb-3">
                                            {!quiz_edit &&
                                                <h5 className="mb-3 text-center">
                                                    {quiz.title}
                                                    <CButton color="primary" className="ms-3" size="sm" onClick={e=>{
                                                        setQuizEdit(true);
                                                        setQuizData(quiz)
                                                    }}>
                                                        <CIcon icon={cilPencil} size="sm"/>
                                                    </CButton>
                                                </h5>
                                            }
                                            {quiz_edit && quiz.id === quiz_data.id &&
                                                <div className="mb-3">
                                                    <label htmlFor="title">Fan nomi</label>
                                                    <div className="input-group">
                                                        <input type="text" name="title" onChange={e => setQuizData(prev => ({ ...prev, title: e.target.value }))} value={quiz_data.title} id="title" className="form-control" placeholder="Fan nomini kiriting" />
                                                        <CButton color="success" className="input-group-text" onClick={e=>{
                                                            editTest(id, quiz_data.id, JSON.stringify(quiz_data), data=>{
                                                                getBlogTest(id, null, data=>{
                                                                    setTest(data);
                                                                    setQuizEdit(false);
                                                                    setQuizData({});
                                                                }, error=>{
                                                                }, error=>{
                                                                    console.error(error);
                                                                })
                                                            }, error=>{
                                                                console.error(error);
                                                            })
                                                        }}><CIcon icon={cilSave} size="sm"/> Saqlash</CButton>
                                                    </div>
                                                </div>
                                            }
                                            {quiz.questions.map((question, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="d-flex align-items-center gap-2"><span>{index + 1}.</span> <div dangerouslySetInnerHTML={{ __html: question.text }}></div></div>
                                                    <div className="variants p-2 px-3">
                                                        {question.variants.map((variant, index) => (
                                                            <div key={index}>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <input type="radio" id={"variant" + variant.id} className="form-check-input" checked={variant.is_correct} />
                                                                    <label htmlFor={"variant" + variant.id} className="mb-0 form-check-label" dangerouslySetInnerHTML={{ __html: variant.text }}></label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            Test bali: {question.ball} ball
                                                        </div>
                                                        <div>
                                                            <CButton className="btn btn-primary mx-3" color="primary" onClick={e=>{
                                                                setTestEditedData(question);
                                                                setEditModal(true);
                                                            }}><CIcon icon={cilPencil} size="sm" /></CButton>
                                                            <CButton className="btn btn-danger" color="danger" onClick={() => {
                                                                setDeletedTestData({ question: question.id, text: question.text });
                                                                setDelModal(true);
                                                            }}><CIcon icon={cilXCircle} size="sm" /></CButton>
                                                        </div>
                                                    </div>
                                                    <hr /></div>
                                            ))}
                                            <div className="mt-3 text-end">
                                                <CButton className="btn btn-primary" color="primary" onClick={e=>{
                                                    setAddQuestionModal(true);
                                                    setAddQuestionQuiz(quiz.id)
                                                }} ><CIcon icon={cilPlus} size="sm"/> Savol qo'shish</CButton>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }

                        </CCard>
                    </CCol>
                </CRow>
            }
        </>
    );
}