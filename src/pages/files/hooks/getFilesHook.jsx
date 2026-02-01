import { useEffect, useState } from 'react'
import { indexFile } from '../../../services/fileService';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function useFiles(groupId) {
  const [files, setFiles] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const getFiles = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/api/groups/${groupId}/files`, {
  //       params: { page }, // Assuming your API supports pagination
  //     });
  //     setFiles(response.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  async function getFiles(page) {
    try {
      const data = await indexFile(groupId, page)
      setFiles(data.data);
      setLastPage(data.last_page)
      setCurrentPage(data.current_page)
    } catch (error) {
      console.error("Error fetching files:", error);
      Toastify({
        text: "Error fetching files: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        // style: {
        //     backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)"
        // },
        stopOnFocus: true,
      }).showToast();
    }
  }

  useEffect(() => {
    if (groupId) {
      getFiles(currentPage);
    }
  }, [groupId, currentPage]);

  return { files, currentPage, lastPage, setFiles , getFiles };

}

export default useFiles