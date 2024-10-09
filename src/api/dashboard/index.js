import baseAPI from "..";


export const getDashboardData1 = (data,success, error) => {
    return baseAPI("stats/1/", 'GET', data=data, success, error);
}
export const getDashboardData2 = (data,success, error) => {
    return baseAPI("logs/", 'GET', data=data, success, error);
}