import React, {useState} from "react";
import {HiOutlineEnvelopeOpen} from "react-icons/hi2";
import {TfiReload} from "react-icons/tfi";
import {VscLoading} from "react-icons/vsc";
import PageWrapper from "../components/PageWrapper"; // Uncommented import statement
import {AnimatePresence} from "framer-motion";
import {fromNow, time} from "../utils/transform";
import LoadingIcon from "/public/assets/logo.png";
import DiamondIcon from "/public/assets/Diamond.png";
import {PiMailboxDuotone} from "react-icons/pi";
import {fetchNui} from "../utils/fetchNui";

interface MailboxContentProps {
    getMessages: MessageTypes[];
    isMailOpen: boolean;
    loading: {
        contentLoading: boolean;
        pageLoading: boolean;
    };
    totalMessages: number;
    currentPage: number;
    messagesPerPage: number;
    mailContent: MessageTypes | null;
    setMailContent: (mail: MessageTypes | null) => void;
    handleContentOpen: (m: MessageTypes) => void;
    handleGetClientData: () => void;
    setIsMailOpen: (isOpen: boolean) => void;
    setLoading: ({
        contentLoading,
        pageLoading
    }: {
        contentLoading: boolean;
        pageLoading: boolean;
    }) => void;
}

const MailboxContent: React.FC<MailboxContentProps> = ({
    getMessages,
    isMailOpen,
    loading,
    currentPage,
    messagesPerPage,
    mailContent,
    totalMessages,
    setMailContent,
    handleContentOpen,
    handleGetClientData
}) => {
    const [isDone, setIsDone] = useState<boolean>(false);
    const [rerender, setRerender] = useState<boolean>(false);
    const handleClaimReward = (m: MessageTypes) => {
        if (m.is_ack) return;
        setIsDone(false);
        setTimeout(() => {
            setRerender(true);
        }, 500);

        fetchNui("claimRewardEvt", m)
            .then(() => {
                handleGetClientData();
            })
            .catch(e => {
                console.error("claimRewardEvt", e);
                setMailContent(null);
            })
            .finally(() => {
                setTimeout(() => {
                    setRerender(false);
                    setIsDone(true);
                }, 1000);
            });
    };
    return (
        <div className="grid grid-cols-3 p-6 pt-10 mx-auto mt-[42px]">
            <div
                className={`transition-all duration-100 ${
                    totalMessages > 0 ? "col-span-2" : "col-span-3"
                }`}
            >
                <div className=" px-8 pt-14">
                    <div className="bg-[#101010] relative w-full h-[560px] mt-10 rounded-[30px] p-5 pb-0">
                        <div className="item-List flex flex-col gap-4">
                            {getMessages?.map((m: MessageTypes, i: number) => (
                                <div
                                    key={m.id}
                                    className={`bg-gradient-to-r hover:from-blue-400/80 hover:to-[#8bebff]/60 border-2 hover:border-[#8bebff] shadow hover:shadow-[#8bebff]/50 transition-all duration-100 ease-in-out rounded-3xl hover:scale-105 hover:bg-[#8bebff]/60 ${
                                        mailContent?.id === m.id
                                            ? "bg-gradient-to-r from-blue-400/80 to-[#8bebff]/60 border-2 border-[#8bebff] shadow-[#8bebff]/50"
                                            : ""
                                    }`}
                                >
                                    <button
                                        className="flex items-center justify-between w-full h-[115px] gap-3 rounded-3xl p-3 cursor-pointer bg-cover bg-right bg-[url('/assets/item-cover.png')]"
                                        onClick={() => {
                                            setMailContent(m);
                                            handleContentOpen(m);
                                            setIsDone(false);
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="min-w-[100px] p-4 bg-[#1e1e1e] rounded-3xl text-center">
                                                <span className="text-6xl text-white">
                                                    {i +
                                                        1 +
                                                        (currentPage - 1) *
                                                            messagesPerPage}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="max-w-[20em] w-fit px-3 pt-1 bg-[#1E1E1E] rounded-xl text-left flex items-center">
                                                    <p className="text-white font-noto text-lg font-bold">
                                                        {m.title}
                                                    </p>
                                                </div>
                                                <div className="max-w-[20em] w-fit px-3 pt-1 rounded-xl text-left flex items-center">
                                                    <div className="space-x-2">
                                                        <span className="text-white font-noto text-lg font-bold">
                                                            {fromNow(m.date)},
                                                        </span>
                                                        <span className="text-white font-noto text-lg font-bold">
                                                            {time(m.date)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="min-w-[100px] h-full p-4 bg-white/80 backdrop-blur-md rounded-3xl text-center flex justify-center items-center">
                                            <img
                                                src={DiamondIcon}
                                                alt="item"
                                                className="!grayscale-0"
                                            />
                                        </div>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {getMessages?.length === 0 && (
                            <div className="flex justify-center flex-col gap-3 items-center h-full">
                                <span className="text-white text-[4em] opacity-50">
                                    <PiMailboxDuotone />
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
                            className={`absolute top-0 left-0 w-full h-full bg-[#101010] bg-opacity-50 backdrop-blur-2xl rounded-[30px] transition-opacity duration-500 ease-in-out ${
                                loading.pageLoading
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

            <div
                className={`${
                    totalMessages > 0 ? "" : "hidden"
                } col-span-1 transition-all duration-100`}
            >
                <AnimatePresence>
                    <div className="pr-8 -mt-1 -ml-2 pt-[5em]">
                        <div className="bg-[#101010] relative w-full h-[560px] mt-5 rounded-[30px] p-5 pb-0 text-center">
                            {isMailOpen && !!mailContent ? (
                                <PageWrapper
                                    onAnimationComplete={() => {
                                        setIsDone(true);
                                    }}
                                >
                                    <div>
                                        <p className="py-1 mt-1 text-white font-noto text-2xl bg-gradient-to-r from-transparent via-[#4baaf8] to-transparent">
                                            {mailContent?.title}
                                        </p>
                                        <div className="mt-6 flex items-center gap-3">
                                            <div className="border w-1/4 rounded-full"></div>
                                            <div className="w-2/4 h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                                                <p className="text-white font-noto text-base">
                                                    รายละเอียด
                                                </p>
                                            </div>
                                            <div className="border w-1/4 rounded-full"></div>
                                        </div>
                                        <div className="max-h-[14em] min-h-[14em] overflow-x-hidden overflow-y-auto">
                                            <p className="mt-3 text-left text-white font-noto">
                                                {mailContent?.content}
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
                                        <div className="mt-4 bg-[linear-gradient(270deg,#2b2b2b_0%,#101010_100%),url(/assets/item-cover.png)] bg-cover bg-right bg-blend-color border-2 border-white w-full h-[88px] rounded-[20px] mb-2 p-[6px] px-2 flex items-center">
                                            <div className="w-[71px] h-[71px] bg-gradient-to-b from-[#A6F0FF] to-[#1181ED] rounded-xl flex items-center justify-center ">
                                                <img
                                                    src={DiamondIcon}
                                                    className="max-w-full max-h-full"
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="w-[120px] h-[27px] border-2 border-white bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                                                    <p className="text-white font-noto uppercase">
                                                        {
                                                            mailContent?.reward_name
                                                        }
                                                    </p>
                                                </div>
                                                <p className="mt-2 text-white text-left">
                                                    X{mailContent?.reward_qty}
                                                </p>
                                            </div>
                                        </div>

                                        {!rerender && (
                                            <div
                                                className={`z-20 absolute -bottom-10 left-0 w-full flex justify-center items-center fade-${
                                                    isDone ? "enter" : "exit"
                                                } ${
                                                    isDone
                                                        ? "fade-enter-active"
                                                        : "fade-exit-active"
                                                }`}
                                            >
                                                <ClaimButton
                                                    mailContent={mailContent}
                                                    handleClaimReward={
                                                        handleClaimReward
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </PageWrapper>
                            ) : (
                                <BlankContent />
                            )}

                            <div
                                className={`absolute top-0 left-0 w-full h-full bg-[#101010] bg-opacity-50 backdrop-blur-2xl rounded-[30px] transition-opacity duration-500 ease-in-out ${
                                    loading.contentLoading
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
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MailboxContent;

const BlankContent: React.FC = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <PageWrapper>
                <div className="flex justify-center items-center gap-4 flex-col">
                    <span className="text-white text-[4em] opacity-50">
                        <HiOutlineEnvelopeOpen />
                    </span>
                    <p className="text-white font-noto text-2xl font-bold opacity-50">
                        ยังไม่ได้เปิดข้อความ
                    </p>
                </div>
            </PageWrapper>
        </div>
    );
};

function ClaimButton({
    mailContent,
    handleClaimReward
}: {
    mailContent: MessageTypes;
    handleClaimReward: (m: MessageTypes) => void;
}) {
    return (
        <button
            className={`h-20 w-52 px-6 py-2 text-white text-2xl font-noto font-bold bg-[url('/assets/collect-bg.png')] bg-cover bg-top ${
                mailContent?.is_ack
                    ? "grayscale cursor-not-allowed"
                    : "grayscale-0 cursor-pointer"
            }`}
            disabled={mailContent?.is_ack}
            onClick={() => {
                handleClaimReward(mailContent);
            }}
        >
            <span>{mailContent?.is_ack ? "รับรางวัลแล้ว" : "รับรางวัล"}</span>
        </button>
    );
}
