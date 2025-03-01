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

    const handleAddMessage = () => {
        setLoading({
            pageLoading: true,
            contentLoading: false
        });
        fetchNui("addMailboxMessageEvt", {
            type: "reward",
            title: "New Message",
            content: "This is a new message",
            reward_name: "stone",
            reward_qty: 1
        })
            .then(() => {
                handleGetClientData();
            })
            .catch(e => {
                console.error("addMailboxMessageEvt error", e);
            })
            .finally(() => {
                delay();
            });
    };

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
    };

    const handleMailClick = (m: MessageTypes) => {
        setIsMailOpen(true);
        setLoading({
            pageLoading: false,
            contentLoading: true
        });
        if (m.id === mailContent?.id) {
            setMailContent(null);
        }
        delay();
    };

    useEffect(() => {
        if (isOpen) handleGetClientData();
        else {
            setIsMailOpen(false);
        }
    }, [isOpen, currentPage]);

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
                        setMailContent={setMailContent}
                        mailContent={mailContent}
                        handleMailClick={handleMailClick}
                        handleGetClientData={handleGetClientData}
                        setLoading={setLoading}
                    />
                    <PaginationBar
                        currentPage={currentPage}
                        maxPage={maxPage}
                        onPageChange={setCurrentPage}
                    />
                    <button
                        onClick={handleAddMessage}
                        className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-md"
                    >
                        test add message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
