import baseAPI from ".."

const loginAPI = function (data, success, error){
    baseAPI(
        'login/',
        'POST',
        data,
        success,
        error
    )
}

export {loginAPI}

export const usersApi = (data, success, error)=>{
    baseAPI(
        'users/',
        'GET',
        data,
        success,
        error
    )
}

export const userApi = (username,  data, success, error)=>{
    baseAPI(
        `users/${username}/`,
        'GET',
        data,
        success,
        error
    )
}

export const updateUserApi = (username, data, success, error)=>{
    baseAPI(
        `users/${username}/update/`,
        'POST',
        data,
        success,
        error
    )
}

export const deleteUserApi = (username, data, success, error)=>{
    baseAPI(
        `users/${username}/delete/`,
        'POST',
        data,
        success,
        error
    )
}

export const updatePasswordApi = (username, data, success, error)=>{
    baseAPI(
        `users/${username}/update-password/`,
        'POST',
        data,
        success,
        error
    )
}

export const getDTMResults = (username, data, success, error)=>{
    baseAPI(
        `users/${username}/blog-tests-results/`,
        'GET',
        data,
        success,
        error
    )
}