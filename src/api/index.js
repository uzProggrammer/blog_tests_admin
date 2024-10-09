import $ from "jquery";

export const baseURL = "https://blogtests.pythonanywhere.com/admin-api/";
export const ImagesURL = "https://blogtests.pythonanywhere.com";

const is_authenticated = () => {
    return localStorage.getItem("token")!== null;
}

function baseAPI(url, method, data, success, error){
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
