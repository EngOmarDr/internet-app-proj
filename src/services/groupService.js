import axios from "axios";
import { accessToken } from "../utils/constant";
import axiosInstance from "../utils/axios";

const API_URL = "http://127.0.0.1:8000/api";

export async function storeGroup(name, userIds) {
  let token = localStorage.getItem(accessToken);
  console.log(token);
  
  try {
    const response = await axios.post(
      `${API_URL}/store_group`,
      {
        name: name,
        user_ids: userIds,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export async function indexGroup() {
  try {
    const response = await axiosInstance.get(`/index_group`)
   console.log(response);
   
    if (response.status == 200) {
        return response.data.data;
    } else {
        console.log(response);

        throw response.data.message
    }
} catch (error) {
    console.log(error);

    throw error.response ? error.response.data : new Error("Network Error");
}
 
}

export async function removeUserFromGroup(groupId, userId) {
  let token = localStorage.getItem(accessToken);

  try {
    const response = await axios.post(
      `${API_URL}/groups/${groupId}/users/${userId}`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
}

export async function updateGroup(groupId, name, addUserIds, removeUserIds) {
  let token = localStorage.getItem(accessToken);
  try {
    const response = await axios.post(
      `${API_URL}/update_group/${groupId}`,
      {
        name: name,
        add_user_ids: addUserIds,
        remove_user_ids: removeUserIds,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error updating group:", error);
    throw error.response ? error.response.data : new Error("Network Error");
  }
}
