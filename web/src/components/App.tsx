// filepath: /Users/nattawutk./bubbot.com/fivem-mailbox/web/src/components/App.tsx
import React from "react";
import "./App.css";
import {debugData} from "../utils/debugData";
// import {fetchNui} from "../utils/fetchNui";

// import mailboxImage from "../assets/mailbox.png";
// import diamond from "../assets/Diamond.png";
// import line from "../assets/line.png";
// import paginationBack from "../assets/pagination-back.png";
// import paginationNext from "../assets/pagination-next.png";

debugData([
    {
        action: "setVisible",
        data: true
    }
]);

// interface ReturnClientDataCompProps {
//     data: unknown;
// }

// const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({data}) => (
//     <>
//         <h5>Returned Data:</h5>
//         <pre>
//             <code>{JSON.stringify(data, null)}</code>
//         </pre>
//     </>
// );

// interface ReturnData {
//     x: number;
//     y: number;
//     z: number;
// }

// const mockMails = [
//     {
//         id: 1,
//         title: "ของรางวัลรายวัน",
//         time: "TODAY, 10:03",
//         icon: diamond,
//         prizeName: "เหรียญทอง",
//         prizeAmount: 10,
//         content: "คุณได้รับเหรียญทอง 10 เหรียญจากการเข้าร่วมกิจกรรมวันนี้!"
//     },
//     {
//         id: 2,
//         title: "ของรางวัลพิเศษ",
//         time: "TODAY, 12:45",
//         icon: diamond,
//         prizeName: "ตั๋วชมภาพยนตร์",
//         prizeAmount: 2,
//         content: "คุณได้รับตั๋วชมภาพยนตร์ 2 ใบจากกิจกรรมพิเศษ"
//     },
//     {
//         id: 3,
//         title: "ของรางวัลรายวัน",
//         time: "YESTERDAY, 18:30",
//         icon: diamond,
//         prizeName: "เหรียญเงิน",
//         prizeAmount: 5,
//         content: "คุณได้รับเหรียญเงิน 5 เหรียญจากการเข้าร่วมกิจกรรมเมื่อวาน!"
//     },
//     {
//         id: 4,
//         title: "ของรางวัลรายวัน",
//         time: "YESTERDAY, 18:30",
//         icon: diamond,
//         prizeName: "เหรียญทอง",
//         prizeAmount: 3,
//         content: "คุณได้รับเหรียญทอง 3 เหรียญจากการเข้าร่วมกิจกรรมเมื่อวาน!"
//     },
//     {
//         id: 5,
//         title: "ของรางวัลรายวัน",
//         time: "YESTERDAY, 18:30",
//         icon: diamond,
//         prizeName: "บัตรกำนัล",
//         prizeAmount: 1,
//         content:
//             "คุณได้รับบัตรกำนัลมูลค่า 500 บาทจากการเข้าร่วมกิจกรรมเมื่อวาน!"
//     },
//     {
//         id: 6,
//         title: "ของรางวัลพิเศษ",
//         time: "TODAY, 14:15",
//         icon: diamond,
//         prizeName: "โทรศัพท์มือถือ",
//         prizeAmount: 1,
//         content: "คุณได้รับโทรศัพท์มือถือจากกิจกรรมพิเศษวันนี้!"
//     },
//     {
//         id: 7,
//         title: "ของรางวัลพิเศษ",
//         time: "TODAY, 15:00",
//         icon: diamond,
//         prizeName: "ตั๋วเครื่องบิน",
//         prizeAmount: 1,
//         content: "คุณได้รับตั๋วเครื่องบิน 1 ใบจากกิจกรรมพิเศษวันนี้!"
//     }
// ];

const App: React.FC = () => {
    // const [clientData, setClientData] = useState<ReturnData | null>(null);
    // const [selectedMail, setSelectedMail] = useState<any>(null);

    // const handleGetClientData = () => {
    //     fetchNui<ReturnData>("getClientData")
    //         .then(retData => {
    //             console.log("Got return data from client scripts:");
    //             console.dir(retData);
    //             setClientData(retData);
    //         })
    //         .catch(e => {
    //             console.error("Setting mock data due to error", e);
    //             setClientData({x: 500, y: 300, z: 200});
    //         });
    // };

    // const [currentPage, setCurrentPage] = useState(1);
    // const mailsPerPage = 4;
    // const totalPages = Math.ceil(mockMails.length / mailsPerPage);

    // const indexOfLastMail = currentPage * mailsPerPage;
    // const indexOfFirstMail = indexOfLastMail - mailsPerPage;
    // const currentMails = mockMails.slice(indexOfFirstMail, indexOfLastMail);

    return (
        <div className="nui-wrapper">
            <div className="popup-thing">
                <div className="grid grid-cols-3 p-8 pt-16 w-[1100px] h-[876px] mx-auto">
                    <div className="col-span-2 bg-green-300/20 h-full"></div>
                    <div className="col-span-1 bg-red-300/20 h-full"></div>
                </div>
            </div>
        </div>
    );
};

export default App;
