import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = ({className}) => {
  const { i18n,t } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n.language])

  return (
    <div className={className}>
      <select onChange={changeLanguage} value={i18n.language}>
        <option value="en">{t("en")}</option>
        <option value="ar">{t("ar")}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;