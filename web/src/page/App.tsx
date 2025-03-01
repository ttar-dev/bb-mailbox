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

const App: React.FC = () => {
    const [messages] = useState([]);
    const {isOpen} = useVisibility();

    const [isMailOpen, setIsMailOpen] = useState(false);
    const [isMailOpenAnimation, setIsMailOpenAnimation] = useState(false);
    const [loading, setLoading] = useState(false);

    const getMessages = useMemo(() => {
        if (!messages) {
            return [];
            // return [
            //     {
            //         id: 1,
            //         from: "John Doe",
            //         title: "Hello",
            //         content: "Hello, how are you?",
            //         date: "2021-09-01T12:00:00Z"
            //     },
            //     {
            //         id: 2,
            //         from: "Jane Doe",
            //         title: "Re: Hello",
            //         content: "I'm good, thank you!",
            //         date: "2021-09-01T12:05:00Z"
            //     },
            //     {
            //         id: 3,
            //         from: "John Doe",
            //         title: "Re: Re: Hello",
            //         content: "That's great to hear!",
            //         date: "2021-09-01T12:10:00Z"
            //     },
            //     {
            //         id: 4,
            //         from: "Jane Doe",
            //         title: "Re: Re: Re: Hello",
            //         content: "Yes, it is!",
            //         date: "2021-09-01T12:15:00Z"
            //     }
            // ];
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
            .then(retData => {
                console.log("Got return data from client scripts:");
                console.dir(retData);
                handleGetClientData();
                // if (retData) setMessages(retData);
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
        fetchNui("getMessagesEvt")
            .then(retData => {
                console.log("Got return data from client scripts:");
                console.dir(retData);
                // if (retData) setMessages(retData);
            })
            .catch(e => {
                console.error("getMessagesEvt error", e);
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
    }, [isOpen]);

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
                    <PaginationBar />
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
