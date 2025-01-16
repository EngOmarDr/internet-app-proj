import { accessToken, baseUrl } from "../utils/constant";
import axiosInstance from "../utils/axios";
import axios from "axios";

export async function indexFile(groupId, pageId) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/files?page=${pageId}`)
        if (response.status == 200) {
            return response.data;
        } else {
            console.log(response);

            throw response.data.message
        }
    } catch (error) {
        console.log(error);

        throw error.response ? error.response.data : new Error("Network Error");
    }
}

export const storeFile = async (groupId, file) => {
    const data = new FormData();
    data.append('path', file);

    try {
        const response = await axiosInstance.post(
            `/groups/${groupId}/files`,
            data,
            {
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.status === 200)
            return response.data;
        else
            return response.data.message
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const downloadFile = async (groupId, fileId, fileName, version, showFile = false) => {
    try {
        console.log(version);

        const response = await axiosInstance.get(`/groups/${groupId}/files/${fileId}/download?version=${version}`);
        if (response.status == 200) {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            if (!showFile) {
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${fileName}`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }
            return url;
        }
        throw (response.data.message)
    } catch (error) {
        console.error("Error downloading file:", error);
        throw error;
    }
};


export async function checkIn(groupId, files) {
    try {
        // console.log(axios.defaults.headers);
        // console.log(files);

        const response = await axiosInstance.post(
            `/groups/${groupId}/files/check_in`,
            { "files": files },
            {
                responseType: 'blob',
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
                // },
            }
        );
        console.log(response);
        if (response.status === 200) {

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'files.zip');
            document.body.appendChild(link);
            link.click();

            // Clean up and remove the link
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url); // Free up memory

            return files.map((file) => {
                file.is_locked = true;
                return file
            });
        } else {
            throw response;
        }
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

    try {
        const response = await axiosInstance.post(
            `/groups/${groupId}/files/check_out`,
            data,
            {
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem(accessToken)}`
                },
            }
        );

        return response.data.data;
    }
    catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
}

export async function fileVersions(groupId, fileId) {
    try {
        const response = await axiosInstance.get(
            `/groups/${groupId}/files/${fileId}/versions`,
        );
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
    try {
        const response = await axiosInstance.get(
            `/groups/${groupId}/files/${fileId}`,
        );
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

export const fetchOperations = async (groupId, fileId) => {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/files/${fileId}/operations`);
        return response.data;
    } catch (error) {
        console.error('Error fetching operations:', error);
        throw error;
    }
};

export async function fileOperationCsv(groupId, fileId, fileName) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/files/${fileId}/operations/csv`, {
            responseType: 'blob', // Important for handling binary data
            headers: {
                'Content-Type': 'text/csv', // Adjust if necessary
            },
        });
        console.log(response);

        // Create a blob from the response
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}-operations.csv`); // Set the file name

        // Append to the body
        document.body.appendChild(link);
        link.click(); // Trigger the download

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url); // Free up memory
    } catch (error) {
        console.error('Error downloading the CSV file:', error);
    }
}

export async function fileOperationPdf(groupId, fileId, fileName) {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}/files/${fileId}/operations/pdf`, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/pdf',
            },
        });

        if (response.status !== 200) {
            throw new Error(response);
        }

        // Create a blob from the response
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}-operations.pdf`); // Set the file name

        // Append to the body
        document.body.appendChild(link);
        link.click(); // Trigger the download

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url); // Free up memory
    } catch (error) {
        console.log(error)
        return error;
    }
}
