import $ from "jquery";

// export const baseURL = "https://blogtests.pythonanywhere.com/admin-api/";
// export const ImagesURL = "https://blogtests.pythonanywhere.com";

export const baseURL = "http://127.0.0.1:8000/admin-api/";
export const ImagesURL = "http://127.0.0.1:8000";

const is_authenticated = () => {
    return localStorage.getItem("token")!== null;
}

function baseAPI(url, method, data, success, error, multipart=false){
    let headers;
    if(is_authenticated()){
        headers = {
            "Authorization": "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        }
    } else{
        headers = {
            "Content-Type": "application/json",
        }
    }
    data = data || null;
    $.ajax({
        url: baseURL+url,
        type: method,
        headers: headers,
        data: data,
        processData:!multipart,
        contentType: multipart? false : "application/json",
        success: success,
        error: e=>{
            if(e.status===401){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                location.hash = '#/login';
            }
            error();
        },
    });
}


export default baseAPI;


export function uploadDocx(id, data, success, error){
    let headers;
    if(is_authenticated()){
        headers = {
            "Authorization": "Token " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        }
    } else{
        headers = {
            "Content-Type": "application/json",
        }
    }
    $.ajax({
        url: baseURL+"tests/"+id+"/upload-docx/",
        type: 'POST',
        headers: headers,
        data: data,
        processData:false,
        contentType: false,
        success: success,
        error: e=>{
            if(e.status===401){
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                location.hash = '#/login';
            }
            error();
        },
    });
}
