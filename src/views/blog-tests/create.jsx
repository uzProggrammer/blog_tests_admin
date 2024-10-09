import React, { useEffect, useState } from "react";
import ReactSelect from "../../components/ReactSelect";

import { getGroups, createDTM } from "../../api/blog_tests";

import { useNavigate } from "react-router-dom";

export default function CreateBlogTest() {
    const [data, setData] = useState({});
    let navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    useEffect((e)=>{
        getGroups(null, data=>{
            setGroups(data.data)
        }, error=>{
            console.error(error)
        })
    }, [])

    return (
        <>
            {groups &&
                <div className="card p-3">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="title">Blog test nomi</label>
                            <input type="text" className="form-control" id="title" placeholder="Blog test nomini kiriting" onChange={(e) => setData({...data, title: e.target.value})} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="group">Guruhni tanlang</label>
                            <ReactSelect options={groups} onEdit={(e) => {setData({...data, group: e.value})}} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="start_date">Boshlanish sanasi</label>
                            <input type="datetime-local" className="form-control" id="start_date" onChange={(e) => setData({...data, start_date: e.target.value})} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="countinuis_time">Davomiyligi</label>
                            <input type="time" name="countinuis_time" id="countinuis_time" className="form-control" onChange={(e) => setData({...data, countinuis_time: e.target.value})} />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary" onClick={e=>{
                            createDTM(JSON.stringify(data), data=>{
                                navigate('/blog-tests/'+data.id)
                            }, error=>{
                                console.error(error)
                            })
                        }}>Saqlash</button>
                    </div>
                </div>
            }
        </>
    )
}