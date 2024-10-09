import React, { useState } from "react";
import { createGroupApi } from "../../api/groups";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    return (
        <div className="card p-3">
            <div className="mb-3">
                <label className="form-label">Guruh nomi</label>
                <input type="text" className="form-control" placeholder="Guruh nomini kiriting" onChange={(e) => setData({...data, name: e.target.value})} />
            </div>
            <div className="mb-3">
                <label className="form-label">Guruh haqida ma'lumot</label>
                <textarea className="form-control" placeholder="Guruh haqida ma'lumotini kiriting" onChange={(e) => setData({...data, description: e.target.value})}></textarea>
            </div>
            <div>
                <button type="submit" className="btn btn-primary" onClick={() => {
                    createGroupApi(JSON.stringify(data), data=>{
                        navigate("/groups/"+data.data.id);
                    }, error=>{
                        console.error(error)
                    })
                }}>Saqlash</button>
            </div>
        </div>
    )
}