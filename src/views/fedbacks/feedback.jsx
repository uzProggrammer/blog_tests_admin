import React from "react";
import { useParams } from "react-router-dom";
import { getFeedback, changeFeedback } from "../../api/feedbacks";
import './styles.css'
import CIcon from "@coreui/icons-react";

import { cilSave } from "@coreui/icons";

export default function FeedbackView(){
    let {id} = useParams()
    let[fe,setFe] = React.useState({})

    let[data,setData] =React.useState({
        'is_true':false,
        'send_ball': false,
    })

    React.useEffect(e=>{
        getFeedback(id, null, data=>{
            setFe(data);
            setData({
                'is_true': data.data.is_true,
                'send_ball':data.data.send_ball
            })
        }, error=>{
            console.error(e)
        })
    }, [id])

    return (
        <>
            {fe.data && 
                <>
                    <div className="p-3">
                        <h4 className="text-center">Foydalanuvchi E'tirozi</h4>
                        <div className="row mt-3">
                            <div className="col-md-6 mb-3">
                                <div className="card p-3 h-100">
                                    <h6 className="text-center">Test haqida</h6>
                                    <div>Test nomi: {fe.data.quiz.title}</div>
                                    <div>Test davomiyligi: {fe.data.quiz.countinuis_time}</div>
                                    <div>Test fanlari: {fe.data.quiz.scince}</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="card p-3 h-100">
                                    <h6 className="text-center">Savol haqida</h6>
                                    <div className="question mt-2">
                                        <div dangerouslySetInnerHTML={{__html:fe.data.question.text}}></div>
                                        <div className="p-3">
                                            {fe.data.question.variants.map((el,index)=>(
                                                <div className="d-flex align-items-center gap-2" key={index}>
                                                    <input type="radio" className="form-check-input" name="varaint" id="variant1" checked={el.is_correct} />
                                                    <label htmlFor="variant1" dangerouslySetInnerHTML={{__html:el.text}}></label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="card p-3">
                                    <h6>Etiroz:</h6>
                                    <div>{fe.data.text}</div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card p-3">
                                <h6>Form:</h6>
                                <div>
                                    <input type="checkbox" checked={data.is_true} onChange={e=>{setData(data=>{return {send_ball:e.target.checked, is_true:e.target.checked}})}} value={1} className="form-check-input me-2" name="is_true" id="is_true" />
                                    <label htmlFor="is_true">To'g'ri deb belgilash</label>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={e=>{setData(data=>{return {...data, send_ball:e.target.checked}})}} value={1} disabled={!data.is_true} checked={data.send_ball} className="form-check-input me-2" name="send_ball" id="send_ball" />
                                    <label htmlFor="send_ball">O'quvchiga bal berish</label>
                                </div>
                                <div className="mt-3">
                                    <button className="btn btn-primary" onClick={e=>{
                                        changeFeedback(id, JSON.stringify(data), data=>{
                                            console.log(data)
                                        }, error=>{
                                            console.error(error)
                                        })
                                    }} > <CIcon icon={cilSave}/> Saqlash</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}