import React from "react";
import iconBack from "/public/assets/pagination-back.png";
import iconNext from "/public/assets/pagination-next.png";

interface PaginationBarProps {
    currentPage: number;
    onPageChange: (newPage: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
    currentPage,
    onPageChange
}) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="absolute -bottom-4 bg-[url(/assets/pagination-bg.png)] bg-no-repeat bg-center w-full h-24 flex justify-center items-center">
            <div className="px-8 py-2 rounded-t-lg flex items-center gap-8">
                <button
                    onClick={handlePrev}
                    className={`text-white opacity-80 hover:opacity-100 transition ${
                        currentPage === 1 ? "cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage === 1}
                >
                    <img src={iconBack} alt="Previous" />
                </button>
                <div className="bg-black text-white px-10 py-1 rounded-full text-lg font-semibold">
                    {currentPage}
                </div>
                <button
                    onClick={handleNext}
                    className="text-white opacity-80 hover:opacity-100 transition"
                >
                    <img src={iconNext} alt="Next" />
                </button>
            </div>
        </div>
    );
};

export default PaginationBar;
