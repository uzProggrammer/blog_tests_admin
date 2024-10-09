import React, { useState } from "react";
import { CRow, CCol, CTable, CTableHead, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";

import { useParams, useNavigate } from "react-router-dom";

import { resultsQuiz } from "../../api/tests";

const Results = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState(0);


  function getData(){
    resultsQuiz(id, null, data=>{
        setResults(data);
    }, error=>{
        console.error(error);
    })
  }

  React.useEffect(() => {
    getData()
  }, []);

  return (
    <>
        {results.data &&
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Foydalanuvchi</CTableHeaderCell>
                        <CTableHeaderCell scope="col">To'g'ri javoblar</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Noto'g'ri javoblar</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sarflangan vaqt</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ball</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {results.data.map((item, index) => (
                        <CTableRow key={index} style={{cursor:"pointer"}} onClick={()=>navigate(`/tests/${id}/results/${item.id}`)}>
                            <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                            <CTableDataCell>{item.user.full_name}</CTableDataCell>
                            <CTableDataCell>{item.correct_answers}</CTableDataCell>
                            <CTableDataCell>{item.wrong_answers}</CTableDataCell>
                            <CTableDataCell>{item.time_token}</CTableDataCell>
                            <CTableDataCell>{item.score}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        }
    </>
  )
};

export default Results;