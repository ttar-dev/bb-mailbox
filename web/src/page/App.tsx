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
        // if (!messages) {
        return [
            {
                id: 1,
                from: "John Doe",
                title: "Hello",
                content: "Hello, how are you?",
                date: "2021-09-01T12:00:00Z"
            },
            {
                id: 2,
                from: "Jane Doe",
                title: "Re: Hello",
                content: "I'm good, thank you!",
                date: "2021-09-01T12:05:00Z"
            },
            {
                id: 3,
                from: "John Doe",
                title: "Re: Re: Hello",
                content: "That's great to hear!",
                date: "2021-09-01T12:10:00Z"
            },
            {
                id: 4,
                from: "Jane Doe",
                title: "Re: Re: Re: Hello",
                content: "Yes, it is!",
                date: "2021-09-01T12:15:00Z"
            }
        ];
        // }
        // return messages;
    }, [messages]);

    const delay = _.debounce(() => {
        setLoading(false);
    }, 800);

    useEffect(() => {
        delay();
    }, [isMailOpen]);

    const handleGetClientData = () => {
        setLoading(true);
        fetchNui("getMessages")
            .then(retData => {
                console.log("Got return data from client scripts:");
                console.dir(retData);
                // if (retData) setMessages(retData);
            })
            .catch(e => {
                console.error("Setting mock data due to error", e);
            })
            .finally(() => {
                delay();
            });
    };

    const handleMailClick = () => {
        setIsMailOpen(true);
    };

    const handleAnimationComplete = ({x}: {x: number}) => {
        if (x < 0) setIsMailOpenAnimation(false);
    };

    useEffect(() => {
        if (isOpen) handleGetClientData();
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
                </div>
            </div>
        </div>
    );
};

export default App;
