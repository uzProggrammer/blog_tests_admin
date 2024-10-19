
import React, { useState } from "react";
import { useParams, Link, useNavigate,  } from "react-router-dom";
import { CRow, CCol, CCard, CButton } from "@coreui/react";
import { getResult } from "../../api/tests";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilX, cilSearch } from "@coreui/icons";
import '../fedbacks/styles.css'


const Result = () => {
  const {id, id1} = useParams();
  const [result, setResult] = useState(0);
  const navigate = useNavigate()
  function fetchResult() {
    getResult(id,id1, null, data=>{
        setResult(data);
    }, error=>{console.error(error);})
  };

  React.useEffect(() => {
    fetchResult();
  }, []);

  return (
    <>
        {result.data && 
            <CRow>
                <CCol md={12}>
                    <CCard className="p-3 mb-3">
                        <h5>Natija</h5>
                        <div className="mb-3">Foydalanuvchi: <Link to={"/users/"+result.data.user.username}>{result.data.user.full_name}</Link></div>
                        <div className="mb-3">To'g'ri javoblar: {result.data.correct_answers}</div>
                        <div className="mb-3">Nato'g'ri javoblar: {result.data.wrong_answers}</div>
                        <div className="mb-3">Sarflangan vaqt: {result.data.time_token}</div>
                        <div className="mb-3">Yechilgan vaqt: {result.data.created_at}</div>
                        <div className="mb-3">Ball: {result.data.score}</div>
                        <div>
                            <CButton color="primary" onClick={e=>{navigate('/tests/'+id+"/results?similar_to="+id1)}}> <CIcon icon={cilSearch} /> O'xshashlarini qidirish</CButton>
                        </div>
                    </CCard>
                </CCol>
                <CCol md={12}>
                    <CCard className="p-3">
                        <h5 className="mb-3">Javoblar</h5>
                        <div>
                            {result.data.answers.map((answer, index) => (
                                <div key={index}>
                                    <div className="d-flex" style={{alignItems:'center', flexDirection:"row",gap:'10px'}}>
                                        <div>{index+1}.</div>
                                        <div  className="d-flex" style={{alignItems:'center', flexDirection:"row",gap:'2px'}}>
                                            <div dangerouslySetInnerHTML={{__html:answer.variant.text}}></div>
                                            <CIcon size="lg" icon={answer.variant.is_correct?cilCheck:cilX} style={{color:answer.variant.is_correct?"var(--cui-success)":"var(--cui-danger)"}} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CCard>
                </CCol>
            </CRow>
        }
    </>
  )
}

export default Result;