import baseAPI from ".."

export const groupsApi = (data, success, error)=>{
    baseAPI(
        'groups/',
        'GET',
        data,
        success,
        error
    )
}

export const getGroupApi = (id, success, error)=>{
    baseAPI(
        `groups/${id}/`,
        'GET',
        null,
        success,
        error
    )
}

export const getDTMS = (id, data, success, error)=>{
    baseAPI(
        `groups/${id}/blog-tests/`,
        'GET',
        data,
        success,
        error
    )
}

export const addStudent = (id, method, data, success, error)=>{
    baseAPI(
        `groups/${id}/add-user/`,
        method,
        data,
        success,
        error
    )
}

export const removeStudent = (id, data, success, error)=>{
    baseAPI(
        `groups/${id}/remove-user/`,
        'POST',
        data,
        success,
        error
    )
}

export const UpdateGroupApi = (id, data, success, error)=>{
    baseAPI(
        `groups/${id}/update/`,
        'POST',
        data,
        success,
        error
    )
}

export const createGroupApi = (data, success, error)=>{
    baseAPI(
        `groups/create/`,
        'POST',
        data,
        success,
        error
    )
}