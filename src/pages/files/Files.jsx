import { useEffect, useState } from "react";
import "./Files.css";
import "../groups/groups.css";
import { FaAlignRight, FaAngleLeft, FaAngleRight, FaArrowLeft, FaPencilAlt, FaRegArrowAltCircleRight, FaRegEdit, FaTimes, FaUserPlus } from "react-icons/fa";
import { indexFile, storeFile, downloadFile } from "../../services/fileService";
import { useParams } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput";
import { PiMouseRightClickDuotone } from "react-icons/pi";

const Files = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [showEditFile, setShowEditFile] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState();

    let { groupId } = useParams();
    useEffect(() => {
        getFiles(currentPage)
    }, [groupId]);

    async function getFiles(page) {
        // if (page < 1 || page > lastPage) return;
        try {
            console.log(page);

            const data = await indexFile(groupId, page)
            setFiles(data.data);
            setLastPage(15)
            setCurrentPage(data.meta.current_page)

        } catch (error) {
            console.error("Error fetching files:", error);
        }
    }

    const handleSelectFile = (file) => {
        setPreviewFile(file);
    };

    const handleInCheck = (file) => {
        alert(`${file.name} محجوز الآن`);
    };

    const handleMultiSelect = (fileId) => {
        setSelectedFiles((prevSelected) =>
            prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setNewFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newFile && fileName) {
            try {
                const result = await storeFile(groupId, fileName, newFile);
                // console.log(result);

                // const updatedFiles = await indexFile(groupId);
                setFiles([...files, { id: result.data.id, name: result.data.name }]);
                setShowUploadFile(false);
                setFileName("");
                setNewFile(null);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("يرجى إدخال اسم الملف والملف المراد تحميله.");
        }
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
        }
    };

    // eslint-disable-next-line no-unused-vars
    async function handleEditFile(groupId, fileId, newName) {
        try {
            // eslint-disable-next-line no-undef
            const res = await editFile(groupId, fileId, newName);
            // console.log(res);

        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    return (
        <div className="files-container">
            <table className="files-table">
                <thead>
                    <tr>
                        <th>اختيار</th>
                        <th>اسم الملف</th>
                        <th>الحالة</th>
                        <th>عمليات</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedFiles.includes(file.id)}
                                    onChange={() => handleMultiSelect(file.id)}
                                />
                            </td>
                            <td onClick={() => handleSelectFile(file)}>{file.name}</td>
                            <td className={`status ${file.active ? "active" : "inactive"}`}>
                                {file.active ? "محجوز" : "غير محجوز"}
                            </td>
                            <td>
                                {file.active && (
                                    <button className="button" onClick={() => handleInCheck(file)}>In-Check</button>
                                )}
                                {!file.active && (
                                    <button className="button" onClick={() => alert("Out-Check")}>Out-Check</button>
                                )}
                                <button className="button" onClick={() => handleDownload(file.id, file.name)}>تحميل</button>
                                <button className="button bg-blue-700 hover:bg-blue-900" onClick={() => setShowEditFile(true)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => getFiles(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => getFiles(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">

                    <nav aria-label="Pagination" className="flex isolate rounded-3xl shadow-sm">
                        <button
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => getFiles(currentPage - 1)}
                        >
                            <span className="sr-only">Previous</span>
                            <FaAngleLeft aria-hidden="true" className="h-5 w-5" />
                        </button>
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

                        <button
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            onClick={() => getFiles(currentPage + 1)}
                        >
                            <span className="sr-only">Next</span>
                            <FaAngleRight aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </nav>

                </div>
            </div>

            <div className="actions">
                <button className="button" onClick={() => alert("إجراء In-Check لجميع الملفات المحددة")}>
                    In-Check متعدد
                </button>
                <button className="button" onClick={() => setShowUploadFile(true)}>Upload File</button>
            </div>

            {previewFile && (
                <div className="file-preview">
                    <h3>معاينة سريعة - {previewFile.name}</h3>
                    <p>حجم: {previewFile.size}</p>
                    <p>تاريخ: {previewFile.date}</p>

                    <p>الحالة: {previewFile.active ? "غير محجوز" : "محجوز"}</p>
                    <button className="button" onClick={() => handleDownload(previewFile.id)}>
                        تحميل الملف
                    </button>
                    {previewFile.active && (
                        <button className="button" onClick={() => handleInCheck(previewFile)}>
                            حجز الملف
                        </button>
                    )}
                    <button className="button" onClick={() => setPreviewFile(null)}>إغلاق المعاينة</button>
                </div>
            )}

            {showUploadFile && (
                <div className="create-group-modal">
                    <div className="modal-content">
                        <FaTimes
                            className="close-modal"
                            onClick={() => setShowUploadFile(false)}
                        />
                        <h3>Upload New File</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                name="name"
                                placeholder="اسم الملف"
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="input-field"
                            />
                            <button className="action-button button" type="submit">
                                <FaUserPlus /> أضف ملف
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {showEditFile && (
                <div className="create-group-modal">
                    <div className="modal-content">
                        <FaTimes
                            className="close-modal"
                            onClick={() => setShowEditFile(false)}
                        />
                        <h3>Edit File</h3>
                        <form onSubmit={handleSubmit}>

                            <CustomInput
                                name="name"
                                placeholder="اسم الملف"
                                type="text"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                                className="input-field"
                            />
                            <button className="action-button m-0 button" type="submit">
                                <FaPencilAlt /> Edit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Files;
