import baseAPI from "..";

export const getBlogTests = (data, success, error) => {
    baseAPI("blog-tests/", 'GET', data, success, error);
}

export const getBlogTest = (id,data, success, error) => {
    baseAPI("blog-tests/"+id+"/", 'GET', data, success, error);
}

export const editBlogTest = (id, data, success, error) => {
    baseAPI("blog-tests/"+id+"/edit/", 'POST', data, success, error);
}

export const deleteQuestion = (id, data, success, error) => {
    baseAPI("blog-tests/delete-question/"+id+"/", 'POST', data, success, error);
}

export const getResults = (id, data, success, error) => {
    baseAPI("blog-tests/"+id+"/results/", 'GET', data, success, error);
}

export const getResult = (id, id1, data, success, error) => {
    baseAPI("blog-tests/"+id+"/results/"+id1+'/', 'GET', data, success, error);
}

export const editQuestion = (id, id1, data, success, error) => {
    baseAPI("blog-tests/"+id+"/edit-question/"+id1+'/', 'POST', data, success, error);
}
export const addQuestion = (id, id1, data, success, error) => {
    baseAPI("blog-tests/"+id+"/add-question/"+id1+'/', 'POST', data, success, error);
}

export const editTest = (id, id1, data, success, error) => {
    baseAPI("blog-tests/"+id+"/edit/"+id1+'/', 'POST', data, success, error);
}

export const createScince = (id, data, success, error) => {
    baseAPI("blog-tests/"+id+"/create-scince/", 'POST', data, success, error);
}

export const getGroups = (data, success, error) => {
    baseAPI("blog-tests/get-groups/", 'GET', data, success, error);
}

export const createDTM = (data, success, error) => {
    baseAPI("blog-tests/create/", 'POST', data, success, error);
}

export const deleteResults = (id, data, success, error) => {
    baseAPI("blog-tests/"+id+"/results/delete/", 'POST', data, success, error);
}
export const changeResults = (id, data, success, error) => {
    baseAPI("blog-tests/"+id+"/results/change/", 'POST', data, success, error);
}