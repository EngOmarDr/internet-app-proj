import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

export async function indexFile(groupId, pageId) {
    let token = localStorage.getItem('authToken')

    try {
        const response = await axios.get(
            `${API_URL}/groups/${groupId}/files?page=${pageId}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`

                },
            });
        if (response.status == 200) {
            return response.data;
        } else {
            throw response.data.message
        }
    } catch (error) {
        console.log(error);
        
        throw error.response ? error.response.data : new Error("Network Error");
    }
}

export const storeFile = async (groupId, fileName, file) => {
    let token = localStorage.getItem('authToken')
    const data = new FormData();
    data.append('name', fileName);
    data.append('path', file);
    data.append('group_id', groupId);

    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/groups/${groupId}/files`, data, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                "Content-Type": 'multipart/form-data;'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const downloadFile = async (groupId, fileId, version) => {
    let token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${API_URL}/groups/${groupId}/files/${fileId}/download?${version}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};

export async function editFile(groupId, fileId, fileName) {
    let token = localStorage.getItem('authToken');
    try {
        const response = await axios.put(`${API_URL}/groups/${groupId}/files/${fileId}`,
            {
                'name': fileName,
            },
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};