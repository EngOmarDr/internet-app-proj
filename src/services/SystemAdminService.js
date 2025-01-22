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
export async function getAllGroups() {
    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/groups`, {
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
export async function deleteGroupFromTheSystem(id) {

    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.post(`/groups/${id}/delete_with_files`,{}, {
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
export async function getGroupFiles(groupId) {

    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/groups/${groupId}/files`, {
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
export async function deleteFileFromSystem(fileId) {

    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.post(`/files/${fileId}/delete_with_locks`,{}, {
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
// Statistics
export async function getMostActiveUser() {
    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/most_joined_user`, {
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

export async function groupWithMostUsers() {
    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/group_with_most_users`, {
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

export async function groupWithMostFiles() {
    let token = localStorage.getItem(accessToken);

    try {
        const response = await axios.get(`/group_with_most_files`, {
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