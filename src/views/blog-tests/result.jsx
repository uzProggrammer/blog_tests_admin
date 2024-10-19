import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResult } from "../../api/blog_tests";

import CIcon from "@coreui/icons-react";
import { cilSearch, cilCheck, cilX } from "@coreui/icons";

import './styles.scss'

export default function BlogResult(){
    let{id,id1}=useParams()
    let navigate = useNavigate()

    let[result, setResult] = useState({})

    useEffect(e=>{
        getResult(id,id1, null, data=>{
            setResult(data)
        }, error=>{
            if(error.status===404){
                navigate('/404')
            } else{
                console.error(e)
            }
        })
    }, [id,id1])

    return (
        <>
            {result.data && 
                <>
                    <div className="text-center">
                        <button className="btn btn-outline-success btn-lg">{result.data.correct_answers} / {result.dtm.question_count}</button>
                        <button className="btn btn-outline-primary btn-lg ms-3">{result.data.time_token}</button>
                    </div>
                    <div className="card p-3 mt-3">
                        <div className="table-responsive" style={{width:"100%"}}>
                            <table className="table-bordered" style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th className="p-3">Fanlar</th>
                                        <th className="p-3">To'g'ri javoblar</th>
                                        <th className="p-3">Ball</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.data.quizs.map((quiz,index)=>(
                                        <tr key={index}>
                                            <th className="p-3">{quiz.title}</th>
                                            <td className="p-3">
                                                {result.trues[index]}
                                            </td>
                                            <td className="p-3">
                                                {result.balls[index]} b
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className="p-3">Jami:</th>
                                        <td className="p-3">{result.data.correct_answers}</td>
                                        <td className="p-3">{result.total_ball} b</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div>
                            <button className="btn btn-primary mt-3" onClick={()=>navigate('/blog-tests/'+id+'/results?similar_to='+id1)}><CIcon icon={cilSearch}/> O'xshashlarini qidirish</button>
                        </div>
                        <div className="mt-3">
                            {result.data.quizs.map((quiz,index)=>(
                                <div key={index} className="my-3">
                                    <h5>{quiz.title}</h5>
                                    <div className="mt-2 px-3">
                                        {result.data.answers.map((answer,index)=>(
                                            <>
                                                {answer.question.title===quiz.title &&
                                                    <div key={index}>
                                                        <div className="mt-2 d-flex align-items-center">
                                                            {index+1}. <div dangerouslySetInnerHTML={{__html:answer.variant.text}}></div>
                                                            <CIcon icon={answer.is_correct? cilCheck: cilX} className="ms-2" style={{color:answer.is_correct?'var(--cui-success)':'var(--cui-danger)'}} />
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
}