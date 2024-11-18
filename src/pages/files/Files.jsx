import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { indexFile, downloadFile } from "../../services/fileService";
import { useParams } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { UploadFileModal } from "./components/UploadFileModal";
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { AiOutlineDownload } from "react-icons/ai";
import { EditFileModal } from "./components/EditFileModal";

const Files = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState();

    const handleStoreFile = (data) => {
        setFiles((prev) => [...prev, data]);
    };

    const handleEditFile = (newFile) => {
        const updatedItems = files.map(file => {
            if (file.id === newFile.id) {
                return newFile;
            }
            return file;
        });
        setFiles(updatedItems)
    };

    let { groupId } = useParams();
    useEffect(() => {
        getFiles(currentPage)
    }, [groupId]);

    async function getFiles(page) {
        try {
            const data = await indexFile(groupId, page)
            setFiles(data.data);
            setLastPage(data.meta.last_page)
            setCurrentPage(data.meta.current_page)
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

    const handleInCheck = (file) => {
        alert(`${file.name} محجوز الآن`);
    };

    const handleMultiSelect = (fileId) => {
        setSelectedFiles((prevSelected) => {
            return prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id != fileId)
                : [...prevSelected, fileId]
        });
    };



    const handleDownload = async (fileId, fileName) => {
        try {
            const fileData = await downloadFile(groupId, fileId);
            const url = window.URL.createObjectURL(new Blob([fileData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error("Error downloading file:", error);
            Toastify({
                text: "Error downloading file: " + error.message,
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
                stopOnFocus: true,
            }).showToast();
        }
    };

    return (
        <div className="px-5">
            <div className="actions flex flex-row gap-1 py-5 justify-between items-center">
                <div className="flex flex-row gap-1">
                    <Button
                        size="sm"
                        color="success"
                        onClick={() => alert("إجراء In-Check لجميع الملفات المحددة")}>
                        Check Out
                    </Button>

                    <Button
                        size="sm"
                        color="success"
                        className={`transition duration-300 ${selectedFiles.length > 0 ? "opacity-100" : "opacity-0 "} `}
                        onClick={() => alert("إجراء out-Check لجميع الملفات المحددة")}>
                        Check In
                    </Button>
                </div>
                <UploadFileModal groupId={groupId} handlStoreFile={handleStoreFile} />
            </div>

            {/* Start Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <Table hoverable striped>
                    <TableHead >
                        <TableHeadCell className="p-4 bg-slate-200 rounded-ss-lg rounded-tl-none">
                            <Checkbox onChange={(e) => {
                                if (e.target.checked) {
                                    const allFileIds = files.map((file) => file.id);
                                    setSelectedFiles(allFileIds);
                                } else {
                                    setSelectedFiles([]);
                                }
                            }} />
                        </TableHeadCell>
                        <TableHeadCell className="bg-slate-200">name</TableHeadCell>
                        <TableHeadCell className="bg-slate-200">status</TableHeadCell>
                        <TableHeadCell className="bg-slate-200">actions</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {files.map((file) => (
                            <TableRow key={file.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4">
                                    <Checkbox
                                        checked={selectedFiles.includes(file.id)}
                                        onChange={() => handleMultiSelect(file.id)}
                                    />
                                </TableCell>
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {file.name}
                                </TableCell>
                                <TableCell className={`status ${file.active ? "active" : "inactive"}`}>
                                    {!file.active ? "محجوز" : "غير محجوز"}</TableCell>
                                <TableCell className="flex items-center gap-1 ">
                                    {file.active && (
                                        <Button size="sm" onClick={() => handleInCheck(file)}>Check In</Button>
                                    )}
                                    {!file.active && (
                                        <Button size="sm" onClick={() => alert("Out-Check")}>Check Out</Button>
                                    )}
                                    <Button size="sm" onClick={() => handleDownload(file.id, file.name)}><AiOutlineDownload className="h-5 w-5" /></Button>
                                    <EditFileModal handlEditFile={handleEditFile} groupId={groupId} file={file} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {/* End Table */}

            {/* Start Pagination */}
            <nav aria-label="Pagination" className="flex justify-end py-5">
                <Button
                    outline
                    color="light"
                    size="xs"
                    className="rounded-e-none border-2 !bg-transparent"
                    disabled={currentPage == 1}
                    onClick={() => getFiles(currentPage - 1)}
                >
                    {/* <span className="sr-only">Previous</span> */}
                    <FaAngleLeft aria-hidden="true" className="h-5 w-5" />
                </Button>
                {Array.from({ length: lastPage }, (_, index) => (
                    (index + 1 > currentPage - 3 && index + 1 < currentPage + 3) ?
                        <button
                            key={index + 1}
                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold 
                                        ${currentPage == index + 1
                                    ? 'bg-indigo-600 text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                }'}`}
                            onClick={() => getFiles(index + 1)}
                        >
                            {index + 1}
                        </button>
                        : null
                ))}

                <Button
                    outline
                    color="light"
                    size="xs"
                    className="rounded-s-none border-2 !bg-transparent"
                    onClick={() => getFiles(currentPage + 1)}
                    disabled={currentPage == lastPage}
                >
                    {/* <span className="sr-only">Next</span> */}
                    <FaAngleRight aria-hidden="true" className="h-5 w-5" />
                </Button>
            </nav>
            {/* End Pagination */}
        </div>
    );
};

export default Files;
