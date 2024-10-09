import {useEffect, useState} from 'react';
import { getResults } from '../../api/blog_tests';
import { useParams, useNavigate } from 'react-router-dom';

import {
    CPagination,
    CPaginationItem
} from "@coreui/react";

export default function BlogResults(){
    let [results, setResults] = useState();
    let navigate = useNavigate();
    let {id} = useParams();

    useEffect(e=>{
        getResults(id,null, data=>{
            setResults(data)
        }, error=>{
            if (error.status === 404) {
                navigate("/404");
            } else {
                console.log(error);
            }
        })
    }, [id])


    const [currentPage, setCurrentPage] = useState(1);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        getResults(id, {'page':pageNumber}, data=>{
                setResults(data)
            },
            error => {console.log(error)}
        )
    }

    return (
        <>
            {results &&
                <>
                    <h5 className='mb-3 text-center'>{results.dtm.title} nomli blog testning natijalari</h5>
                    <div className="card table-responsive">
                        <table className='table table-stripted table-hover mb-0'>
                            <thead>
                                <tr>
                                    <th className='p-3'>O'rin</th>
                                    <th className='p-3'>O'quvchi</th>
                                    <th className='p-3'>Ball</th>
                                    <th className='p-3'>Sarflangan vaqt</th>
                                    <th className='p-3'>Yuborgan vaqti</th>
                                    <th className='p-3'>To'g'ri javoblar</th>
                                    <th className='p-3'>Nato'gri javoblar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.data.map((result, index)=>(
                                    <tr key={index} style={{cursor:'pointer'}} onClick={e=>{navigate('/blog-tests/'+id+'/results/'+result.id)}}>
                                        <td>{result.place}</td>
                                        <td>{result.user.full_name}</td>
                                        <td>{results.score}</td>
                                        <td>{result.time_token}</td>
                                        <td>{result.created_at}</td>
                                        <td>{result.correct_answers}</td>
                                        <td>{result.wrong_answers}</td>
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
        </>
    )
}