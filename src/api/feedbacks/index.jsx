import baseAPI from "..";

export const getFeedbacks = (data, success, error) => {
    baseAPI("feedbacks/", 'GET', data, success, error);
}

export const getFeedback = (id, data, success, error) => {
    baseAPI("feedbacks/"+id+'/', 'GET', data, success, error);
}

export const changeFeedback = (id, data, success, error) => {
    baseAPI("feedbacks/"+id+'/change/', 'POST', data, success, error);
}