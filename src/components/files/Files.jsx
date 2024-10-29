// Files.js

import { useState } from 'react';
import './Files.css';

const filesData = [
  { id: 1, name: 'Document1.pdf', size: '2MB', date: '2024-10-15', status: 'حر' },
  { id: 2, name: 'Image1.jpg', size: '1MB', date: '2024-10-10', status: 'محجوز' },
  { id: 3, name: 'Presentation.pptx', size: '5MB', date: '2024-10-05', status: 'في حالة الاستخدام' },
  // Add more files as needed
];

const Files = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

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
          {filesData.map((file) => (
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
    </div>
  );
};

export default Files;
