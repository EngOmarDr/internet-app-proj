import { TiTick } from "react-icons/ti";

const SourceSafePlan = () => {
    return (
        <div className="flex flex-col items-center justify-center w-3/4 rounded p-4 bg-gray-200 mb-7 md:w-2/4 lg:w-1/4 bgGray200">
            <h3 className="text-3xl font-bold text-purple-900 textPurple2 mt-5">
                Source Safe Premium
            </h3>
            <strong className="text-3xl font-bold text-gray-900 my-5 textGray900">
                $9.99/mo
            </strong>
            <span className="bg-red-200 text-red-900 rounded-full px-2 py-1 font-semibold bgRed200 textRed900 mt-5">
                15% OFF
            </span>
            <div className="mt-6">
                <h5 className="text-2xl mb-1 font-semibold text-purple-700 textPurple">
                    Key Features
                </h5>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> Unlimited Repositories
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> 500 GB Storage
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> Advanced Security Features
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> Collaboration Tools
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> Continuous Integration Support
                </div>
                <div className="flex items-center text-green-700 mb-1 ps-3 textGreen">
                    <TiTick /> 24/7 Customer Support
                </div>
            </div>
            <button className="mt-5 border-2 border-gray-900 text-gray-900 text-2xl font-bold p-1 rounded-full hover:text-white hover:bg-gray-900 transition w-full borderGray900 textGray900">
                Buy Now 
            </button>
        </div>
    )
}

export default SourceSafePlan;
