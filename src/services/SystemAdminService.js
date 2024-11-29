import axios from '../utils/api';
import { accessToken } from "../utils/constant";

export async function getAllUsers() {
    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
        if (response.status == 200) {
        return response.data;
    } else {
        throw response.data.message;
    }
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
}
export async function deleteUserFromTheSystem(id) {

    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.post(`/users/${id}`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
        if (response.status == 200) {
        return response.data;
    } else {
        throw response.data.message;
    }
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
}