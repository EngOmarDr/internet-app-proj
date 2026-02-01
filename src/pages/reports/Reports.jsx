// Reports.js

import React, { useState } from 'react';
import './Reports.css';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';

const sampleReports = [
  { id: 1, date: '2024-10-10', file: 'Document1.pdf', user: 'User A', action: 'Created' },
  { id: 2, date: '2024-10-11', file: 'Document2.pdf', user: 'User B', action: 'Modified' },
  { id: 3, date: '2024-10-12', file: 'Document3.pdf', user: 'User C', action: 'Deleted' },
  // Add more report data as needed
];

const Reports = () => {
  const [filter, setFilter] = useState({ date: '', file: '', user: '' });
  const [filteredReports, setFilteredReports] = useState(sampleReports);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const applyFilter = () => {
    setFilteredReports(
      sampleReports.filter(
        (report) =>
          (filter.date ? report.date.includes(filter.date) : true) &&
          (filter.file ? report.file.includes(filter.file) : true) &&
          (filter.user ? report.user.includes(filter.user) : true)
      )
    );
  };

  const exportPDF = () => {
    const pdf = new jsPDF();
    pdf.text('Reports', 20, 10);
    filteredReports.forEach((report, i) => {
      pdf.text(`${i + 1}. ${report.date} - ${report.file} - ${report.user} - ${report.action}`, 10, 20 + i * 10);
    });
    pdf.save('reports.pdf');
  };

  return (
    <div className="reports-container">
      <h2>تقارير العمليات</h2>

      <div className="filter-container">
        <input
          type="date"
          name="date"
          value={filter.date}
          onChange={handleFilterChange}
          placeholder="تصفية حسب التاريخ"
        />
        <input
          type="text"
          name="file"
          value={filter.file}
          onChange={handleFilterChange}
          placeholder="تصفية حسب الملف"
        />
        <input
          type="text"
          name="user"
          value={filter.user}
          onChange={handleFilterChange}
          placeholder="تصفية حسب المستخدم"
        />
        <button onClick={applyFilter}>تطبيق التصفية</button>
      </div>

      <div className="reports-table">
        <table>
          <thead>
            <tr>
              <th>التاريخ</th>
              <th>الملف</th>
              <th>المستخدم</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.date}</td>
                <td>{report.file}</td>
                <td>{report.user}</td>
                <td>{report.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-buttons">
        <CSVLink data={filteredReports} filename="reports.csv" className="export-button">
          تصدير CSV
        </CSVLink>
        <button onClick={exportPDF} className="export-button">تصدير PDF</button>
      </div>
    </div>
  );
};

export default Reports;
