"use strict";
import React, {useEffect, useMemo, useState} from "react";
import "./App.css";
import {debugData} from "../utils/debugData";
import {HiOutlineEnvelopeOpen} from "react-icons/hi2";
import {fetchNui} from "../utils/fetchNui";
import {useVisibility} from "../providers/VisibilityProvider";
import {PiMailboxDuotone} from "react-icons/pi";

debugData([
    {
        action: "setVisible",
        data: true
    }
]);

const App: React.FC = () => {
    const [messages] = useState([]);
    const {isOpen} = useVisibility();
    // const [selectedMail, setSelectedMail] = useState<any>(null);
    const getMessages = useMemo(() => {
        if (!messages) {
            return [];
        }
        return messages;
    }, [messages]);

    const handleGetClientData = () => {
        fetchNui("getMessages")
            .then(retData => {
                console.log("Got return data from client scripts:");
                console.dir(retData);
                // if (retData) setMessages(retData);
            })
            .catch(e => {
                console.error("Setting mock data due to error", e);
            });
    };

    useEffect(() => {
        if (isOpen) handleGetClientData();
    }, [isOpen]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const mailsPerPage = 4;
    // const totalPages = Math.ceil(mockMails.length / mailsPerPage);

    // const indexOfLastMail = currentPage * mailsPerPage;
    // const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    // const currentMails = mockMails.slice(indexOfFirstMail, indexOfLastMail);

    return (
        <div className="nui-wrapper">
            <div className="bg-[url(/assets/bg.png)] bg-no-repeat bg-center w-screen h-screen flex justify-center items-center flex-col -mt-16">
                <div className="w-[1128px] h-[830px]">
                    <div className="grid grid-cols-3 p-6 pt-10 mx-auto mt-[42px]">
                        <div className="col-span-2">
                            <div className="px-8 pt-14">
                                <div className="bg-[#1b1b1b] w-full h-[560px] mt-10 rounded-[30px] p-5 pb-0">
                                    <div className="item-List">
                                        {getMessages.map(
                                            (mail: {
                                                id: number;
                                                title: string;
                                                time: string;
                                                icon: string;
                                            }) => (
                                                <button
                                                    key={mail.id}
                                                    className="bg-[linear-gradient(270deg,#2b2b2b_0%,#101010_100%),url(/assets/MaskGroup.png)] bg-cover bg-right bg-blend-color border-2 border-white w-full h-[88px] rounded-2xl mb-2 p-[6px] px-2 flex items-center"
                                                >
                                                    {/* Run number */}
                                                    <div className="w-[71px] h-[71px] bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                                                        <p className="text-6xl text-white">
                                                            1
                                                        </p>
                                                    </div>
                                                    {/* Title */}
                                                    <div className="ml-4">
                                                        <div className="w-[155px] h-[27px] bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                                                            <p className="text-white font-noto">
                                                                {mail.title}
                                                            </p>
                                                        </div>
                                                        <p className="mt-2 text-white text-left">
                                                            {mail.time}
                                                        </p>
                                                    </div>
                                                    {/* Img */}
                                                    <div className="w-[71px] h-[71px] bg-[#F4f5f6] rounded-xl flex items-center justify-center ml-auto">
                                                        <img
                                                            src={mail.icon}
                                                            alt={mail.title}
                                                            className="max-w-full max-h-full"
                                                        />
                                                    </div>
                                                </button>
                                            )
                                        )}
                                    </div>
                                    {getMessages?.length === 0 && (
                                        <div className="flex justify-center flex-col gap-3 items-center h-full opacity-50">
                                            <span className="text-white text-[4em]">
                                                <HiOutlineEnvelopeOpen />
                                            </span>

                                            <p className="text-white font-noto text-2xl font-bold">
                                                ไม่มีข้อความ
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-header-mail-box gap-2 items-center mt-[20px] text-white text-3xl -ml-3">
                                <span className="text-4xl text-[#56c0fb]">
                                    <PiMailboxDuotone />
                                </span>
                                <p className="mt-1 bg-gradient-to-r from-[#56c0fb] to-[#80ddff] bg-clip-text text-transparent">
                                    MAILBOX
                                </p>
                            </div>
                            <div className="pr-8 -mt-1 -ml-2">
                                <div className="bg-[#1b1b1b] w-full h-[560px] mt-5 rounded-[30px] p-5 pb-0 text-center">
                                    <p className="py-1 mt-1 text-white font-noto text-2xl bg-gradient-to-r from-transparent via-[#4baaf8] to-transparent">
                                        ของรางวัลรายวัน
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">
                                        {/* divide */}
                                        <div className="border w-1/4 rounded-full"></div>
                                        <div className="w-2/4 h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                                            <p className="text-white font-noto text-base">
                                                รายละเอียดสินค้า
                                            </p>
                                        </div>
                                        <div className="border w-1/4 rounded-full"></div>
                                    </div>

                                    <p className="mt-3 h-40 text-left text-white font-noto line-clamp-5">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Animi quibusdam neque,
                                        vero accusantium voluptatum dignissimos
                                        quasi illum optio totam dolores placeat
                                    </p>

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
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 bg-red-400/20 h-[78px]">
                            <div className="flex justify-center items-center h-full">
                                ddd
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
