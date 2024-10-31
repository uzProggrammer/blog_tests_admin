import React from "react";
import './styles1.scss'
import { useNavigate } from "react-router-dom";
import { messageApi, sendMessageApi } from "../../api/messages";
import { ImagesURL } from "../../api";
import { useParams } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { toast, ToastContainer } from "react-toastify";

export default function Messenger(){
    let { id } = useParams()
    let [messages, setMessages] = React.useState([]);
    let[message1, setMessage] = React.useState([]);
    const containerRef = React.useRef(null);
    let[text, setText] = React.useState("")

    

    React.useEffect(() => {
        messageApi(id,null, data=>{setMessages(data);setMessage(data.data)}, error=>{console.log(error)});
        setText("");
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [id])
    function sendMessage(e){
        e.preventDefault();
        sendMessageApi(id, JSON.stringify({message:text, chat_id:id}), data=>{
            if (data.status==='error'){
                toast.error(data.message);
            } else{
                messageApi(id,null, data=>{setMessages(data);setMessage(data.data)}, error=>{console.log(error)});
                setText("");
            }
            if(containerRef.current){
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        })
    }

    let navigate = useNavigate()
    return (
        <div className="messages-container">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {messages.data &&
                <>
                    <div className="chat-list">
                        <div className="mb-2 p-3">
                            <label htmlFor="search">Qidirish...</label>
                            <input type="text" className="form-control" placeholder="Qidirish.."/>
                        </div>
                        <div className="users">
                            {messages.all_chats.map((message, index)=>(
                                <div key={index} className={message1.id===message.id?"user p-2 d-flex gap-1 active":"user p-2 d-flex gap-1"} onClick={e=>{navigate('/messages/'+message.id)}}>
                                    <img src={ImagesURL+message.user.image} alt="Profile_img" width={60} height={60} className="rounded-pill" />
                                    <div className="info">
                                        <div className="full_name">{message.user.full_name}</div>
                                        <div className="last_message">{message.last_message}</div>
                                    </div>
                                </div>
                            ))}
                        </div> 
                            
                    </div>
                    <div className="chat-messeges position-relative">
                        <div className="chat-header">
                            {/* <HiArrowSmallLeft style={{cursor:'pointer'}} onClick={()=>navigate('/messages')} /> */}
                            <img src={ImagesURL+message1.user.image} alt="Profile_img" width={40} height={40} className="rounded-pill" />
                            <div className="chat-name">{message1.user.full_name}</div>
                        </div>
                        <div className="chat-logs" ref={containerRef}>
                            {message1.messages.map((message, index)=>(
                                <div key={index}>
                                    {message.is_admin_message &&
                                        <div id={'cm-msg-'+message.id} className="chat-msg self">
                                            <span className="msg-avatar">
                                                <img width={40} height={40} src={message.user.image?ImagesURL+message.user.image:"https://banner2.cleanpng.com/20180816/syp/78f04442f328b673e733de33b6c8a781.webp"} />
                                                
                                                <span className="ms-date">{message.created_at}</span>
                                            </span>
                                            <div className="cm-msg-text">
                                                {message.message}
                                            </div>
                                        </div>
                                    }
                                    {!message.is_admin_message &&
                                        <div id={'cm-msg-'+message.id} className="chat-msg user">
                                            <span className="msg-avatar">
                                                <img width={40} height={40}  src={message.user.image?ImagesURL+message.user.image:"https://banner2.cleanpng.com/20180816/syp/78f04442f328b673e733de33b6c8a781.webp"} />
                                                
                                                <span className="ms-date">{message.created_at}</span>
                                            </span>
                                            <div className="cm-msg-text">
                                                {message.message}
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <form onSubmit={e=>{sendMessage(e)}}>
                                <input type="text" id="chat-input" placeholder="Xabar yuborish" value={text} onChange={(e)=>setText(e.target.value)} />
                                <button type="submit" className="chat-submit" id="chat-submit" onClick={e=>{sendMessage(e)}}>
                                    <svg className="svg-inline--fa fa-paper-plane fa-w-16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}