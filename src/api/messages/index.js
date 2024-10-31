import baseAPI from ".."

export const messagesApi = (data, success, error)=>{
    baseAPI(
        'messages/',
        'GET',
        data,
        success,
        error
    )
}
export const messageApi = (id,data, success, error)=>{
    baseAPI(
        'messages/'+id+"/",
        'GET',
        data,
        success,
        error
    )
}

export const sendMessageApi = (id,data, success, error)=>{
    baseAPI(
        'messages/'+id+"/send-message/",
        'POST',
        data,
        success,
        error
    )
}