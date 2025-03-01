import React, {useState} from "react";
import iconBack from "/public/assets/pagination-back.png";
import iconNext from "/public/assets/pagination-next.png";
const PaginationBar: React.FC = () => {
    const [page, setPage] = useState(1);

    const handlePrev = () => {
        setPage(prev => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="absolute -bottom-4 bg-[url(/assets/pagination-bg.png)] bg-no-repeat bg-center w-full h-24 flex justify-center items-center">
            <div className=" px-8 py-2 rounded-t-lg flex items-center gap-8">
                <button
                    onClick={handlePrev}
                    className="text-white opacity-80 hover:opacity-100 transition cursor-not-allowed"
                    disabled
                >
                    <img src={iconBack} alt="Next" />
                </button>
                <div className="bg-black text-white px-10 py-1 rounded-full text-lg font-semibold">
                    {page}
                </div>
                <button
                    onClick={handleNext}
                    className="text-white opacity-80 hover:opacity-100 transition cursor-not-allowed"
                    disabled
                >
                    <img src={iconNext} alt="Next" />
                </button>
            </div>
        </div>
    );
};

export default PaginationBar;
