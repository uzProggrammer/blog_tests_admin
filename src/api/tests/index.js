import baseAPI from "..";

export const getTests = (data, success, error) => {
    baseAPI("tests/", 'GET', data, success, error);
}

export const getTest = (id,data, success, error) => {
    baseAPI("tests/"+id+'/', 'GET', data, success, error);
}

export const createTest = (id, data, success, error) => {
    baseAPI("tests/"+id+"/create/", 'POST', data, success, error);
}

export const deleteTest = (id, data, success, error) => {
    baseAPI("tests/"+id+"/delete/", 'POST', data, success, error);
}

export const updateTest = (id, data, success, error) => {
    baseAPI("tests/"+id+"/update/", 'POST', data, success, error);
}

export const updateQuiz = (id, data, success, error) => {
    baseAPI("tests/"+id+"/update-quiz/", 'POST', data, success, error);
}

export const createQuiz = (data, success, error) => {
    baseAPI("tests/create/", 'POST', data, success, error);
}

export const resultsQuiz = (id, data, success, error) => {
    baseAPI("tests/"+id+"/results/", 'GET', data, success, error);
}

export const getResult = (id,id1, data, success, error) => {
    baseAPI("tests/"+id+"/results/"+id1+"/", 'GET', data, success, error);
}

export const uploadDocx = (id,id1, data, success, error) => {
    baseAPI("tests/"+id+"/upload-docx/", 'POST', data, success, error, true);
}