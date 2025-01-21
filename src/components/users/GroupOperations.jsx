import React, { useState } from "react";
import { getOperationsAsCSV, getOperationsAsPDF } from "../../services/users";
import { useTranslation } from "react-i18next";

const GroupOperations = ({ groupId, userId }) => {
  const [loading, setLoading] = useState({ csv: false, pdf: false });
  const { t } = useTranslation();

  const handleDownloadCSV = async () => {
    setLoading((prev) => ({ ...prev, csv: true }));

    try {
      const response = await getOperationsAsCSV(groupId, userId);

      // إنشاء رابط لتحميل الملف
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user_operations_${userId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download CSV:", error);
      alert("Failed to download CSV. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, csv: false }));
    }
  };

  const handleDownloadPDF = async () => {
    setLoading((prev) => ({ ...prev, pdf: true }));

    try {
      const response = await getOperationsAsPDF(groupId, userId);

      // إنشاء رابط لتحميل الملف
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `user_operations_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, pdf: false }));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        className={`px-4 py-2 text-sm rounded-md font-medium text-white ${
          loading.csv
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
        } shadow-md transition-transform transform hover:scale-105`}
        onClick={handleDownloadCSV}
        disabled={loading.csv}
      >
        {loading.csv ? t("downloading_csv") : t("download_csv")}
      </button>
      <button
        className={`px-4 py-2 text-sm rounded-md font-medium text-white ${
          loading.pdf
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
        } shadow-md transition-transform transform hover:scale-105`}
        onClick={handleDownloadPDF}
        disabled={loading.pdf}
      >
        {loading.pdf ? t("downloading_pdf") : t("download_pdf")}
      </button>
    </div>
  );
};

export default GroupOperations;
