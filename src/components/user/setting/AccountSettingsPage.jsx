// AccountSettingsPage.jsx

import  { useState } from 'react';
import { FaUser, FaBell, FaUsers, FaSave } from 'react-icons/fa';
import './AccountSettingsPage.css';

const AccountSettingsPage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    username: 'John Doe',
    email: 'johndoe@example.com',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSaveChanges = () => {
    // حفظ التعديلات إلى الخادم
    console.log('Changes saved:', personalInfo);
    alert('تم حفظ التعديلات بنجاح');
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">إعدادات الحساب</h2>

      {/* معلومات المستخدم الشخصية */}
      <section className="settings-section">
        <h3><FaUser /> المعلومات الشخصية</h3>
        <div className="form-group">
          <label>اسم المستخدم</label>
          <input
            type="text"
            name="username"
            value={personalInfo.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>تغيير كلمة المرور</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleInputChange}
          />
        </div>
      </section>

      {/* إعدادات المجموعات */}
      <section className="settings-section">
        <h3><FaUsers /> إعدادات المجموعة</h3>
        <p>تحكم بالمجموعات التي تمتلكها والمجموعات التي تملك صلاحية الوصول إليها.</p>
        <button className="btn-view-groups">عرض المجموعات</button>
      </section>

      {/* إعدادات الإشعارات */}
      <section className="settings-section">
        <h3><FaBell /> إعدادات الإشعارات</h3>
        <label className="notification-setting">
          <input type="checkbox" defaultChecked />
          تلقي إشعارات عند حجز أو تحرير ملف
        </label>
        <label className="notification-setting">
          <input type="checkbox" defaultChecked />
          تلقي إشعارات عندما يتم تعديل حالة ملف
        </label>
      </section>

      {/* زر الحفظ */}
      <button className="btn-save" onClick={handleSaveChanges}>
        <FaSave /> حفظ التعديلات
      </button>
    </div>
  );
};

export default AccountSettingsPage;
