import { useEffect, useState } from "react";
import "./Files.css";
import "../groups/groups.css";
import { FaPencilAlt, FaRegEdit, FaTimes, FaUserPlus } from "react-icons/fa";
import { indexFile, storeFile, downloadFile } from "../../services/fileService";
import { useParams } from "react-router-dom";
import { RiPencilLine } from "react-icons/ri";
import { CustomInput } from "../../components/CustomInput";

const Files = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [showEditFile, setShowEditFile] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState([]);
    let { groupId } = useParams();

    useEffect(() => {
        indexFile(groupId)
            .then((files) => {
                setFiles(files);
            })
            .catch((error) => {
                console.error("Error fetching files:", error);
            });
    }, [groupId]);

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
                console.log(result);

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

    async function handleEditFile(groupId, fileId, newName) {
        try {
            const res = await editFile(groupId, fileId, newName);
            console.log(res);

        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    return (
        <div className="files-container">
            <h2>قائمة الملفات</h2>
            <table className="files-table">
                <thead>
                    <tr>
                        <th>اختيار</th>
                        <th>اسم الملف</th>
                        <th>الحجم</th>
                        <th>التاريخ</th>
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
                            <td>{file.size}</td>
                            <td>{file.date}</td>
                            <td className={`status ${file.active ? "active" : "inactive"}`}>
                                {file.active ? "غير محجوز" : "محجوز"}
                            </td>
                            <td>
                                {file.active && (
                                    <button onClick={() => handleInCheck(file)}>In-Check</button>
                                )}
                                {!file.active && (
                                    <button onClick={() => alert("Out-Check")}>Out-Check</button>
                                )}
                                <button onClick={() => handleDownload(file.id, file.name)}>تحميل</button>
                                <button className="bg-blue-700 hover:bg-blue-900" onClick={() => setShowEditFile(true)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="actions">
                <button onClick={() => alert("إجراء In-Check لجميع الملفات المحددة")}>
                    In-Check متعدد
                </button>
                <button onClick={() => setShowUploadFile(true)}>Upload File</button>
            </div>

            {previewFile && (
                <div className="file-preview">
                    <h3>معاينة سريعة - {previewFile.name}</h3>
                    <p>حجم: {previewFile.size}</p>
                    <p>تاريخ: {previewFile.date}</p>
                    <p>الحالة: {previewFile.active ? "غير محجوز" : "محجوز"}</p>
                    <button onClick={() => handleDownload(previewFile.id)}>
                        تحميل الملف
                    </button>
                    {previewFile.active && (
                        <button onClick={() => handleInCheck(previewFile)}>
                            حجز الملف
                        </button>
                    )}
                    <button onClick={() => setPreviewFile(null)}>إغلاق المعاينة</button>
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
                            <button className="action-button" type="submit">
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
                            <button className="action-button m-0" type="submit">
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
