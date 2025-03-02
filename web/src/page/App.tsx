import React, {useEffect, useMemo, useState} from "react";
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";
import {useVisibility} from "../providers/VisibilityProvider";
import _ from "lodash";
import MailboxHeader from "../components/MailboxHeader";
import PaginationBar from "../components/Pagination";
import MailboxContent from "./MailboxContent";

debugData([
    {
        action: "setVisible",
        data: true
    }
]);

interface FetchNuiResponse {
    mailboxData: MessageTypes[];
    maxPage: number;
    totalMessages: number;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<MessageTypes[]>([]);
    const {isOpen} = useVisibility();
    const [mailContent, setMailContent] = useState<MessageTypes | null>(null);
    const [isMailOpen, setIsMailOpen] = useState(false);
    const [loading, setLoading] = useState({
        contentLoading: false,
        pageLoading: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [totalMessages, setTotalMessages] = useState(0);

    const getMessages = useMemo(() => {
        if (!messages) {
            return [] as MessageTypes[];
        }
        return messages;
    }, [messages]);

    // const handleAddMessage = () => {
    //     setLoading({
    //         pageLoading: true,
    //         contentLoading: false
    //     });
    //     fetchNui("addMailboxItem", [
    //         {
    //             type: "reward",
    //             title: "ของรางวัล",
    //             content:
    //                 "แข็งที่เกิดขึ้นตามธรรมชาติ ซึ่งเป็นสารผสมที่เกิดจากการเกาะตัวกันแน่นของแร่ตั้งแต่ 1 ชนิดขึ้นไป หรือ เป็นสารผสมของแร่กับแก้วภูเขาไฟ หรือ แร่กับซากดึกดำบรรพ์ หรือของแข็งอื่น ๆ",
    //             reward_name: "stone",
    //             reward_qty: 1
    //         }
    //     ])
    //         .then(() => {
    //             handleGetClientData();
    //         })
    //         .catch(e => {
    //             console.error("addMailboxItem error", e);
    //         })
    //         .finally(() => {
    //             delay();
    //         });
    // };

    const delay = _.debounce(() => {
        setLoading({
            pageLoading: false,
            contentLoading: false
        });
    }, 800);

    useEffect(() => {
        delay();
    }, [isMailOpen]);

    const handleGetClientData = () => {
        setLoading({
            pageLoading: true,
            contentLoading: false
        });
        fetchNui<FetchNuiResponse>("getMessagesEvt", {page: currentPage})
            .then(retData => {
                if (retData && Array.isArray(retData.mailboxData)) {
                    setMessages(retData.mailboxData);
                    setMaxPage(retData.maxPage);
                    setTotalMessages(retData.totalMessages);
                    if (mailContent) {
                        const findMail = retData.mailboxData.find(
                            m => m.id === mailContent.id
                        );

                        if (findMail) {
                            setMailContent(findMail);
                        } else {
                            setMailContent(null);
                        }
                    }
                } else {
                    setMessages([]);
                    setMaxPage(1);
                }
            })
            .catch(e => {
                console.error("getMessagesEvt error", e);
                setMessages([]);
                setMaxPage(1);
            })
            .finally(() => {
                delay();
            });
        return messages;
    };

    const handleContentOpen = async (m: MessageTypes) => {
        setIsMailOpen(false);
        await delay();
        setIsMailOpen(true);
        if (m.id === mailContent?.id) {
            // setLoading({
            //     pageLoading: false,
            //     contentLoading: true
            // });
            setMailContent(null);
        }
    };

    useEffect(() => {
        if (isOpen) handleGetClientData();
        else {
            setIsMailOpen(false);
        }
    }, [isOpen, currentPage]);

    useEffect(() => {
        if (!isOpen) setMailContent(null);
    }, [isOpen]);

    useEffect(() => {
        setLoading({
            pageLoading: true,
            contentLoading: false
        });
    }, [currentPage]);

    return (
        <div className="nui-wrapper">
            <div className="bg-[url(/assets/bg.png)] bg-no-repeat bg-center w-screen h-screen flex justify-center items-center flex-col -mt-16">
                <div className="relative w-[1128px] h-[830px]">
                    <MailboxHeader />
                    <MailboxContent
                        getMessages={getMessages}
                        totalMessages={totalMessages}
                        currentPage={currentPage}
                        messagesPerPage={4}
                        isMailOpen={isMailOpen}
                        loading={loading}
                        setIsMailOpen={setIsMailOpen}
                        setMailContent={setMailContent}
                        mailContent={mailContent}
                        handleContentOpen={handleContentOpen}
                        handleGetClientData={handleGetClientData}
                        setLoading={setLoading}
                    />
                    <PaginationBar
                        currentPage={currentPage}
                        maxPage={maxPage}
                        onPageChange={setCurrentPage}
                    />
                    {/* <button
                        onClick={handleAddMessage}
                        className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-md"
                    >
                        test add message
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default App;
