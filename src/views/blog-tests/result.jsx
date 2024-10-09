import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResult } from "../../api/blog_tests";

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
                        <button className="btn btn-outline-success btn-lg">{result.data.correct_answers} / {result.data.quizs.length}</button>
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
                        <div className="mt-3">
                            {result.data.quizs.map((quiz,index)=>(
                                <div key={index} className="my-3">
                                    {quiz.title}
                                    <div className="mt-2">
                                        {result.data.answers.map((answer,index)=>(
                                            <>
                                                {answer.question.title===quiz.title &&
                                                    <button className={answer.is_correct?"btn btn-primary me-2":"btn btn-danger me-2"} key={index}>{index+1}</button>
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