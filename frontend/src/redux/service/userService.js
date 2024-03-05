import axios from "axios";
const API_URL = "http://localhost:8000";
const token = localStorage.getItem("token");

export async function loginReq(
    data
) {
    const response = await axios.post(
        API_URL + "/login",
        data
    );
    return response.data;
}

export async function addDetailsReq(
    data
) {
    const response = await axios.post(
        API_URL + "/AddDetails",
        data,{ headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "true",
            "x-access-token": localStorage.getItem("token"),
            "Authorization" : `Bearer ${token}`
          },}
    );
    return response.data;
}

export async function getDetailsReq(
    data
) {
    const response = await axios.post(
        API_URL + "/getemployeedetails", data,
        { headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "true",
            "x-access-token": localStorage.getItem("token"),
            "Authorization" : `Bearer ${token}`
          },}
    );
    return response.data;
}

export async function deleteDetailsReq(
    data
) {
    const response = await axios.post(
        API_URL + "/deleteDetails", data,
        { headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "true",
            "x-access-token": localStorage.getItem("token"),
            "Authorization" : `Bearer ${token}`
          },}
    );
    return response.data;
}