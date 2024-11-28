import axios from "axios";
import { accessToken, baseUrl } from "../utils/constant";

export async function indexFile(groupId, pageId) {
    let token = localStorage.getItem(accessToken)

    try {
        const response = await axios.get(
            `${baseUrl}/groups/${groupId}/files?page=${pageId}`,
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
    let token = localStorage.getItem(accessToken)
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
    let token = localStorage.getItem(accessToken);
    console.log(`${baseUrl}/groups/${groupId}/files/${fileId}/download?version=${version}`);

    try {
        const response = await axios.get(`${baseUrl}/groups/${groupId}/files/${fileId}/download?version=${version}`, {
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
    let token = localStorage.getItem(accessToken);
    try {
        const response = await axios.post(`${baseUrl}/groups/${groupId}/files/${fileId}?name=${fileName}`,
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

export async function checkIn(groupId, files) {
    try {
        const response = await axios.post(
            `${baseUrl}/groups/${groupId}/files/check_in`,
            { "files": files },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(accessToken)}`,
                    'Accept': 'application/json',
                },
            });
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error.response ? error.response.data : new Error("Network Error");
    }

}

export async function checkOut(groupId, fileId, file) {
    const data = new FormData();
    data.append('file', file);
    data.append('file_id', fileId);

    console.log(`${baseUrl}/groups/${groupId}/files/check_out'`);
    

    try {
        const response = await axios.post(
            `${baseUrl}/groups/${groupId}/files/check_out`,
             data,
            {
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
                },
            });
        console.log(JSON.stringify(response.data));
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error.response ? error.response.data : new Error("Network Error");
    }
}

export async function fileVersions(groupId, fileId) {
    let token = localStorage.getItem(accessToken)

    try {
        const response = await axios.get(
            `${baseUrl}/groups/${groupId}/files/${fileId}/versions`,
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

export async function showFile(groupId, fileId) {
    let token = localStorage.getItem(accessToken)

    try {
        const response = await axios.get(
            `${baseUrl}/groups/${groupId}/files/${fileId}`,
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