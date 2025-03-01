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
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<MessageTypes[]>([]);
    const {isOpen} = useVisibility();

    const [isMailOpen, setIsMailOpen] = useState(false);
    const [isMailOpenAnimation, setIsMailOpenAnimation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const getMessages = useMemo(() => {
        if (!messages) {
            return [];
        }
        return messages;
    }, [messages]);

    const handleAddMessage = () => {
        setLoading(true);
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
        setLoading(false);
    }, 800);

    useEffect(() => {
        delay();
    }, [isMailOpen]);

    const handleGetClientData = () => {
        setLoading(true);
        fetchNui<FetchNuiResponse>("getMessagesEvt", {
            page: currentPage
        })
            .then(retData => {
                if (retData && Array.isArray(retData.mailboxData)) {
                    setMessages(retData.mailboxData);
                } else {
                    setMessages([]);
                }
            })
            .catch(e => {
                console.error("getMessagesEvt error", e);
                setMessages([]);
            })
            .finally(() => {
                delay();
            });
    };

    const handleMailClick = () => {
        setIsMailOpen(true);
        handleGetClientData();
        setIsMailOpenAnimation(true);
    };

    const handleAnimationComplete = ({x}: {x: number}) => {
        if (x < 0) setIsMailOpenAnimation(false);
    };

    useEffect(() => {
        if (isOpen) handleGetClientData();
        else {
            setIsMailOpen(false);
            setIsMailOpenAnimation(false);
        }
    }, [isOpen, currentPage]);

    return (
        <div className="nui-wrapper">
            <div className="bg-[url(/assets/bg.png)] bg-no-repeat bg-center w-screen h-screen flex justify-center items-center flex-col -mt-16">
                <div className="relative w-[1128px] h-[830px]">
                    <MailboxHeader />
                    <MailboxContent
                        getMessages={getMessages}
                        isMailOpen={isMailOpen}
                        isMailOpenAnimation={isMailOpenAnimation}
                        loading={loading}
                        handleMailClick={handleMailClick}
                        handleGetClientData={handleGetClientData}
                        handleAnimationComplete={handleAnimationComplete}
                        setLoading={setLoading}
                    />
                    <PaginationBar
                        currentPage={currentPage}
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
