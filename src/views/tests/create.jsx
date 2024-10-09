import React, { useState } from "react";
import { createQuiz } from "../../api/tests";
import { useNavigate } from "react-router-dom";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [countinuis_time, setContinuesTime] = useState("");
  const [scince, setScince] = useState("");

  const navigate = useNavigate();

  return (
    <>
        <div className="row">
            <div className="col-md-6 mb-3">
                <label htmlFor="title">Test nomi</label>
                <input type="text" className="form-control" id="title" placeholder="Test nomi" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="col-md-6 mb-3">
                <label htmlFor="countinuis_time">Test davomiyligi</label>
                <input type="time" className="form-control" id="countinuis_time" placeholder="Test davomiyligi" value={countinuis_time} onChange={(e) => setContinuesTime(e.target.value)} />
            </div>
            <div className="col-md-12 mb-3">
                <label htmlFor="scince">Test fanlari</label>
                <input type="text" className="form-control" id="scince" placeholder="Test fanlari" value={scince} onChange={(e) => setScince(e.target.value)} />
                <span className="text-small text-muted">Fanlarni nomini proble bilan ajratilgan holdakiriting.</span>
            </div>
            <div className="col-md-12">
                <button type="submit" className="btn btn-primary" onClick={e=>{
                    createQuiz(JSON.stringify({
                        title: title,
                        continues_time: countinuis_time,
                        scince: scince
                    }), data=>{
                        navigate("/tests/"+data.id);
                    }, error=>{
                        console.error(error);
                    })
                }}>Saqlash</button>
            </div>
        </div>
    </>
  )
};

export default CreateTest;