import { TiTick } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const SourceSafePlan = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center w-3/4 rounded p-4 bg-gray-200 mb-7 md:w-2/4 lg:w-1/4">
            <h3 className="text-3xl font-bold text-purple-900 textPurple2 mt-5">
                {t("premium_plan")}
            </h3>
            <strong className="text-3xl font-bold text-gray-900 my-5 textGray900">
                {t("price")}
            </strong>
            <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold bgRed200 textRed900 mt-5">
                {t("discount")}
            </span>
            <div className="mt-6">
                <h5 className="text-2xl mb-1 font-semibold text-purple-700 textPurple">
                    {t("key_features")}
                </h5>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("unlimited_repos")}
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("storage")}
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("security")}
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("collaboration_tool")}
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("ci_support")}
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> {t("customer_support")}
                </div>
            </div>
            <button className="mt-5 border-2 border-gray-900 text-gray-900 text-2xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-900 transition w-full borderGray900 textGray900">
                {t("buy_now")}
            </button>
        </div>
    );
};

export default SourceSafePlan;
