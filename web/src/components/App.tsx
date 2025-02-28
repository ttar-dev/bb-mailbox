// filepath: /Users/nattawutk./bubbot.com/fivem-mailbox/web/src/components/App.tsx
import React, {useEffect, useState} from "react";
import "./App.css";
import {debugData} from "../utils/debugData";
import {fetchNui} from "../utils/fetchNui";
import {useVisibility} from "../providers/VisibilityProvider";

debugData([
    {
        action: "setOpen",
        data: true
    }
]);

interface ReturnClientDataCompProps {
    data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({data}) => (
    <>
        <h5>Returned Data:</h5>
        <pre>
            <code>{JSON.stringify(data, null)}</code>
        </pre>
    </>
);

interface ReturnData {
    x: number;
    y: number;
    z: number;
}

const App: React.FC = () => {
    const [clientData, setClientData] = useState<ReturnData | null>(null);
    // const [selectedMail, setSelectedMail] = useState<unknown>(null);

    const handleGetClientData = () => {
        fetchNui<ReturnData>("getMessages")
            .then(retData => {
                console.log("Got return data from client scripts:");
                console.dir(retData);
                setClientData(retData);
            })
            .catch(e => {
                console.error("Setting mock data due to error", e);
                setClientData({x: 500, y: 300, z: 200});
            });
    };

    // const [currentPage, setCurrentPage] = useState(1);
    // const mailsPerPage = 4;
    // const totalPages = Math.ceil(mockMails.length / mailsPerPage);

    // const indexOfLastMail = currentPage * mailsPerPage;
    // const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    // const currentMails = mockMails.slice(indexOfFirstMail, indexOfLastMail);

    const {isOpen} = useVisibility();

    useEffect(() => {
        handleGetClientData();
    }, [isOpen]);

    return (
        <div className="nui-wrapper">
            <div className="popup-thing">
                <div className="grid grid-cols-3 w-full h-full">
                    <div className="col-span-2 bg-green-300/20"></div>
                    <div className="col-span-1 bg-red-300/20 h-full"></div>
                </div>
            </div>
        </div>
    );
};

export default App;
