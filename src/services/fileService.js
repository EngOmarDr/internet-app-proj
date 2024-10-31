import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

export async function storeFile(groupId, file, name) {
    let token = localStorage.getItem('authToken')
    console.log(token);
    
    try {
        const formData = new FormData();
        formData.append('path', file);
        formData.append('name', name);
        formData.append('group_id', groupId);
console.log(file);

        const response = await axios.post(
            `${API_URL}/groups/${groupId}/files`,
            formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(response);
            
        if (response.status == 200) {
            return response.data.data;
        } else {
            return response.data.message
        }
    } catch (error) {console.log(error);
    

        throw error.response ? error.response.data : new Error("Network Error");
    }
}

export async function indexFile(groupId) {
    let token = localStorage.getItem('authToken')

    try {
        const response = await axios.get(
            `${API_URL}/groups/${groupId}/files`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`

                },
            });
        if (response.status == 200) {
            return response.data.data;
        } else {
            throw response.data.message
        }
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
}
