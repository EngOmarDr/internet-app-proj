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

export const storeFile = async (groupId, file) => {
    let token = localStorage.getItem('authToken')
    const data = new FormData();
    data.append('path', file);

    try {
        const response = await axios.post(`http://127.0.0.1:8000/api/groups/${groupId}/files`,
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": 'multipart/form-data;'
                }
            });
        if (response.status === 200)
            return response.data;
        else
            return response.data.message
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const downloadFile = async (groupId, fileId, version = '') => {
    let token = localStorage.getItem('authToken');
    console.log(`${API_URL}/groups/${groupId}/files/${fileId}/download?version=${version}`);

    try {
        const response = await axios.get(`${API_URL}/groups/${groupId}/files/${fileId}/download?version=${version}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            // responseType: 'blob'
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
        const response = await axios.post(`${API_URL}/groups/${groupId}/files/${fileId}?name=${fileName}`,
            undefined,
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

export async function checkIn(groupId, fileIds) {
    let data = JSON.stringify({
        "file_ids": fileIds,
        "versions": {
            "1": 1
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_URL}/groups/${groupId}/files/check_in'`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken')
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error.response ? error.response.data : new Error("Network Error");
    }

}

export async function checkOut(groupId, fileIds) {
    throw 'UnImplemented'
    // let data = JSON.stringify({
    //     "file_ids": fileIds,
    //     "versions": {
    //         "1": 1
    //     }
    // });

    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${API_URL}/groups/${groupId}/files/check_in'`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': localStorage.getItem('authToken')
    //     },
    //     data: data
    // };

    // try {
    //     const response = await axios.request(config);
    //     console.log(JSON.stringify(response.data));
    //     return response.data;
    // }
    // catch (error) {
    //     console.log(error);
    //     throw error.response ? error.response.data : new Error("Network Error");
    // }

}

export async function showFile(groupId, fileId) {
    let token = localStorage.getItem('authToken')

    try {
        const response = await axios.get(
            `${API_URL}/groups/${groupId}/files/${fileId}`,
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