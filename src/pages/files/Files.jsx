// Files.js

import { useEffect, useState } from 'react';
import './Files.css';
import '../groups/groups.css'
import { FaTimes, FaUserPlus } from 'react-icons/fa';
import { indexFile, storeFile } from '../../services/fileService';
import { useParams } from 'react-router-dom';
import { CustomInput } from '../../components/CustomInput';

const Files = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [newFile, setNewFile] = useState();
  const [fileName, setfileName] = useState("");
  const [files, setFiles] = useState([]);
  let { groupId } = useParams();

  useEffect(() => {
    indexFile(groupId).then((groups) => console.log(groups))
  }, [])


  let file;
  const handleUploadFile = () => {
    console.log(newFile);

    setFiles([...filesData, { id: filesData.length + 1, name: file.name, status: 'حر', size: file.size + 'KB', date: Date.now() }]);
    setShowUploadFile(false);
  };

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
              <td className={`status ${file.status.toLowerCase()}`}>{file.status}</td>
              <td>
                {file.status === 'حر' && (
                  <button onClick={() => handleInCheck(file)}>In-Check</button>
                )}
                {file.status === 'محجوز' && (
                  <button onClick={() => alert('Out-Check')}>Out-Check</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        <button onClick={() => alert('إجراء In-Check لجميع الملفات المحددة')}>In-Check متعدد</button>
        <button onClick={() => setShowUploadFile(true)}>Upload File</button>
      </div>

      {previewFile && (
        <div className="file-preview">
          <h3>معاينة سريعة - {previewFile.name}</h3>
          <p>حجم: {previewFile.size}</p>
          <p>تاريخ: {previewFile.date}</p>
          <p>الحالة: {previewFile.status}</p>
          <button onClick={() => alert(`تحميل ${previewFile.name}`)}>تحميل الملف</button>
          {previewFile.status === 'حر' && (
            <button onClick={() => handleInCheck(previewFile)}>حجز الملف</button>
          )}
          <button onClick={() => setPreviewFile(null)}>إغلاق المعاينة</button>
        </div>
      )}
      {showUploadFile && (
        <div className="create-group-modal">
          <div className="modal-content">
            <FaTimes className="close-modal" onClick={() => setShowUploadFile(false)} />
            <h3>Upload New File</h3>
            <form  onSubmit={async (e) => {
              e.preventDefault()
              let d = await storeFile(groupId,file,fileName)
              console.log(d);
              
            }}>

              <CustomInput
                name='name'
                placeholder='name'
                type='text'
                value={fileName}
                onChange={setfileName}
              />
              <input
                type="file"
                value={newFile}
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  file = e.target.files[0]
                }}
                className="input-field"
              />
            <button className="action-button" type='submit'>
              <FaUserPlus /> Add File
            </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;
