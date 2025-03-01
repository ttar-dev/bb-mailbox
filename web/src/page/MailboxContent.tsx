import React from "react";
import {HiOutlineEnvelopeOpen} from "react-icons/hi2";
import {TfiReload} from "react-icons/tfi";
import {VscLoading} from "react-icons/vsc";
import PageWrapper from "../components/PageWrapper";
import {AnimatePresence} from "framer-motion";
import {fromNow, time} from "../utils/transform";
import LoadingIcon from "/public/assets/logo.png";

interface MailboxContentProps {
    getMessages: MessageTypes[];
    isMailOpen: boolean;
    isMailOpenAnimation: boolean;
    loading: boolean;
    handleMailClick: () => void;
    handleGetClientData: () => void;
    handleAnimationComplete: ({x}: {x: number}) => void;
    setLoading: (loading: boolean) => void;
}

const MailboxContent: React.FC<MailboxContentProps> = ({
    getMessages,
    isMailOpen,
    isMailOpenAnimation,
    loading,
    handleMailClick,
    handleGetClientData,
    handleAnimationComplete
}) => {
    return (
        <div className="grid grid-cols-3 p-6 pt-10 mx-auto mt-[42px]">
            <div
                className={`transition-all duration-300 ${
                    isMailOpenAnimation ? "col-span-2" : "col-span-3"
                }`}
            >
                <div className=" px-8 pt-14">
                    <div className="bg-[#101010] relative w-full h-[560px] mt-10 rounded-[30px] p-5 pb-0">
                        <div className="item-List flex flex-col gap-4">
                            {getMessages?.map(
                                (mail: MessageTypes, i: number) => (
                                    <div
                                        key={mail.id}
                                        className="bg-gradient-to-r hover:from-blue-400/80 hover:to-[#8bebff]/60 border-2 hover:border-[#8bebff] shadow hover:shadow-[#8bebff]/50 transition-all duration-300 ease-in-out rounded-3xl hover:scale-105 hover:bg-[#8bebff]/60"
                                    >
                                        <button
                                            className="flex items-center justify-between w-full h-[115px] gap-3 rounded-3xl p-3 cursor-pointer bg-cover bg-right bg-[url('/assets/Maskgroup.png')]"
                                            onClick={() => {
                                                handleMailClick();
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="min-w-[100px] p-4 bg-[#1e1e1e] rounded-3xl text-center">
                                                    <span className="text-6xl text-white">
                                                        {i + 1}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="max-w-[20em] w-fit px-3 pt-1 bg-[#1E1E1E] rounded-xl text-left flex items-center">
                                                        <p className="text-white font-noto text-lg font-bold">
                                                            {mail.title}
                                                        </p>
                                                    </div>
                                                    <div className="max-w-[20em] w-fit px-3 pt-1 rounded-xl text-left flex items-center">
                                                        <div className="space-x-2">
                                                            <span className="text-white font-noto text-lg font-bold">
                                                                {fromNow(
                                                                    mail.date
                                                                )}
                                                                ,
                                                            </span>
                                                            <span className="text-white font-noto text-lg font-bold">
                                                                {time(
                                                                    mail.date
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="min-w-[100px] h-full p-4 bg-white/80 backdrop-blur-md rounded-3xl text-center flex justify-center items-center">
                                                <img
                                                    src="/assets/Diamond.png"
                                                    alt="item"
                                                    className="!grayscale-0"
                                                />
                                            </div>
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                        {getMessages?.length === 0 && (
                            <div className="flex justify-center flex-col gap-3 items-center h-full">
                                <span className="text-white text-[4em] opacity-50">
                                    <HiOutlineEnvelopeOpen />
                                </span>
                                <p className="text-white font-noto text-2xl font-bold opacity-50">
                                    ไม่มีข้อความ
                                </p>
                                <button
                                    className="flex items-center gap-3 bg-[#56c0fb] text-white font-noto text-xl px-4 py-2 rounded-3xl"
                                    onClick={handleGetClientData}
                                >
                                    <TfiReload />
                                    รีเฟรช
                                </button>
                            </div>
                        )}
                        <div
                            className={`absolute top-0 left-0 w-full h-full bg-[#101010] bg-opacity-50 backdrop-blur rounded-[30px] transition-opacity duration-500 ease-in-out ${
                                loading && !isMailOpen
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none"
                            }`}
                        >
                            <div className="flex justify-center items-center w-full h-full flex-col">
                                <img
                                    src={LoadingIcon}
                                    alt="loading"
                                    width={96}
                                    className="animate-bounce"
                                />
                                <VscLoading className="animate-spin text-white text-4xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMailOpen && (
                    <div className="col-span-1 transition-all duration-300">
                        <PageWrapper
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onAnimationComplete={handleAnimationComplete}
                        >
                            <div className="pr-8 -mt-1 -ml-2 pt-[5em]">
                                <div className="bg-[#101010] relative w-full h-[560px] mt-5 rounded-[30px] p-5 pb-0 text-center">
                                    <p className="py-1 mt-1 text-white font-noto text-2xl bg-gradient-to-r from-transparent via-[#4baaf8] to-transparent">
                                        ของรางวัลรายวัน
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <div className="border w-1/4 rounded-full"></div>
                                        <div className="w-2/4 h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                                            <p className="text-white font-noto text-base">
                                                รายละเอียดสินค้า
                                            </p>
                                        </div>
                                        <div className="border w-1/4 rounded-full"></div>
                                    </div>
                                    <div className="max-h-[12em] min-h-[8em] overflow-x-hidden overflow-y-auto">
                                        <p className="mt-3 text-left text-white font-noto">
                                            Lorem ipsum, dolor sit amet
                                            consectetur adipisicing elit. Cum,
                                            doloremque. Error temporibus, ab ea
                                            illo non quasi eaque accusamus eius
                                            modi quaerat itaque deserunt odit
                                            harum alias eum? Laudantium,
                                            deleniti. Lorem, ipsum dolor sit
                                            amet consectetur adipisicing elit.
                                            Nam rem non consectetur, laborum vel
                                            ducimus eaque atque dicta quasi
                                            velit ipsum cum? Laborum quo minima
                                            ratione, omnis rem mollitia sint!
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="border w-1/4 rounded-full"></div>
                                        <div className="w-2/4 h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                                            <p className="text-white font-noto text-xl">
                                                ของรางวัล
                                            </p>
                                        </div>
                                        <div className="border w-1/4 rounded-full"></div>
                                    </div>
                                    <div className="mt-4 bg-[linear-gradient(270deg,#2b2b2b_0%,#101010_100%),url(/assets/MaskGroup.png)] bg-cover bg-right bg-blend-color border-2 border-white w-full h-[88px] rounded-[20px] mb-2 p-[6px] px-2 flex items-center">
                                        <div className="w-[71px] h-[71px] bg-gradient-to-b from-[#A6F0FF] to-[#1181ED] rounded-xl flex items-center justify-center ">
                                            <img
                                                src={"/assets/Diamond.png"}
                                                className="max-w-full max-h-full"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="w-[120px] h-[27px] border-2 border-white bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                                                <p className="text-white font-noto">
                                                    DIAMOND
                                                </p>
                                            </div>
                                            <p className="mt-2 text-white text-left">
                                                X100
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute top-0 left-0 w-full h-full bg-[#101010] bg-opacity-50 backdrop-blur rounded-[30px] transition-opacity duration-500 ease-in-out ${
                                            loading
                                                ? "opacity-100"
                                                : "opacity-0 pointer-events-none"
                                        }`}
                                    >
                                        <div className="flex justify-center items-center flex-col w-full h-full">
                                            <img
                                                src={LoadingIcon}
                                                alt="loading"
                                                width={96}
                                                className="animate-bounce"
                                            />
                                            <VscLoading className="animate-spin text-white text-4xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PageWrapper>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MailboxContent;
