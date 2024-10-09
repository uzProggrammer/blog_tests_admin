
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CRow, CCol, CCard, CButton } from "@coreui/react";
import { getResult } from "../../api/tests";

const Result = () => {
  const {id, id1} = useParams();
  const [result, setResult] = useState(0);
  
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
                <CCol md={4}>
                    <CCard className="p-3">
                        <h5>Natija</h5>
                        <div className="mb-3">Foydalanuvchi: <Link to={"/users/"+result.data.user.username}>{result.data.user.full_name}</Link></div>
                        <div className="mb-3">To'g'ri javoblar: {result.data.correct_answers}</div>
                        <div className="mb-3">Nato'g'ri javoblar: {result.data.wrong_answers}</div>
                        <div className="mb-3">Sarflangan vaqt: {result.data.time_token}</div>
                        <div className="mb-3">Yechilgan vaqt: {result.data.created_at}</div>
                        <div className="mb-3">Ball: {result.data.score}</div>
                    </CCard>
                </CCol>
                <CCol md={8}>
                    <CCard className="p-3">
                        <h5 className="mb-3">Javoblar</h5>
                        <div>
                            {result.data.answers.map((answer, index) => (
                                <CButton key={index} color={answer.is_correct? "success" : "danger"} className="me-2 mb-2">{index+1}</CButton>
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