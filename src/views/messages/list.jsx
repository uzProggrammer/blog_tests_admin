import React from "react";
import './styles.scss'
import { useNavigate } from "react-router-dom";
import { messagesApi } from "../../api/messages";
import { ImagesURL } from "../../api";

export default function MessagesList(){

    let [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        messagesApi(null, data=>{setMessages(data)}, error=>{console.log(error)})
    }, [])

    let navigate = useNavigate()
    return (
        <div className="messages-container">
            {messages.data &&
                <>
                    <div className="chat-list not-chat">
                        <div className="mb-2 p-3">
                            <label htmlFor="search">Qidirish...</label>
                            <input type="text" className="form-control" placeholder="Qidirish.."/>
                        </div>
                        <div className="users">
                            {messages.data.map((message, index)=>(
                                <div key={index} className="user p-2 d-flex gap-1" onClick={e=>{navigate('/messages/'+message.id)}}>
                                    <img src={ImagesURL+message.user.image} alt="Profile_img" width={60} height={60} className="rounded-pill" />
                                    <div className="info">
                                        <div className="full_name">{message.user.full_name}</div>
                                        <div className="last_message">{message.last_message}</div>
                                    </div>
                                </div>
                            ))}
                        </div> 
                            
                    </div>
                    <div className="chat-messeges not-chat">
                        Suhbatlashishni boshlash uchun avval chatni tanlang
                    </div>
                </>
            }
        </div>
    )
}