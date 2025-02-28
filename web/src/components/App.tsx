// filepath: /Users/nattawutk./bubbot.com/fivem-mailbox/web/src/components/App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import mailboxImage from "../../public/assets/mailbox.png";
import diamond from "../../public/assets/Diamond.png";
import line from "../../public/assets/line.png";
// import {fetchNui} from "../utils/fetchNui";

// import mailboxImage from "../assets/mailbox.png";
// import diamond from "../assets/Diamond.png";
// import line from "../assets/line.png";
// import paginationBack from "../assets/pagination-back.png";
// import paginationNext from "../assets/pagination-next.png";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

interface ReturnClientDataCompProps {
  data: unknown;
}

const ReturnClientDataComp: React.FC<ReturnClientDataCompProps> = ({
  data,
}) => (
  <>
    <h5>Returned Data:</h5>
    <pre>
      <code>{JSON.stringify(data, null)}</code>
    </pre>
  </>
);

// interface ReturnData {
//     x: number;
//     y: number;
//     z: number;
// }

const mockMails = [
  {
    id: 1,
    title: "ของรางวัลรายวัน",
    time: "TODAY, 10:03",
    icon: diamond,
    prizeName: "เหรียญทอง",
    prizeAmount: 10,
    content: "คุณได้รับเหรียญทอง 10 เหรียญจากการเข้าร่วมกิจกรรมวันนี้!",
  },
  {
    id: 2,
    title: "ของรางวัลพิเศษ",
    time: "TODAY, 12:45",
    icon: diamond,
    prizeName: "ตั๋วชมภาพยนตร์",
    prizeAmount: 2,
    content: "คุณได้รับตั๋วชมภาพยนตร์ 2 ใบจากกิจกรรมพิเศษ",
  },
  {
    id: 3,
    title: "ของรางวัลรายวัน",
    time: "YESTERDAY, 18:30",
    icon: diamond,
    prizeName: "เหรียญเงิน",
    prizeAmount: 5,
    content: "คุณได้รับเหรียญเงิน 5 เหรียญจากการเข้าร่วมกิจกรรมเมื่อวาน!",
  },
  {
    id: 4,
    title: "ของรางวัลรายวัน",
    time: "YESTERDAY, 18:30",
    icon: diamond,
    prizeName: "เหรียญทอง",
    prizeAmount: 3,
    content: "คุณได้รับเหรียญทอง 3 เหรียญจากการเข้าร่วมกิจกรรมเมื่อวาน!",
  },
  {
    id: 5,
    title: "ของรางวัลรายวัน",
    time: "YESTERDAY, 18:30",
    icon: diamond,
    prizeName: "บัตรกำนัล",
    prizeAmount: 1,
    content: "คุณได้รับบัตรกำนัลมูลค่า 500 บาทจากการเข้าร่วมกิจกรรมเมื่อวาน!",
  },
  //   {
  //     id: 6,
  //     title: "ของรางวัลพิเศษ",
  //     time: "TODAY, 14:15",
  //     icon: diamond,
  //     prizeName: "โทรศัพท์มือถือ",
  //     prizeAmount: 1,
  //     content: "คุณได้รับโทรศัพท์มือถือจากกิจกรรมพิเศษวันนี้!",
  //   },
  //   {
  //     id: 7,
  //     title: "ของรางวัลพิเศษ",
  //     time: "TODAY, 15:00",
  //     icon: diamond,
  //     prizeName: "ตั๋วเครื่องบิน",
  //     prizeAmount: 1,
  //     content: "คุณได้รับตั๋วเครื่องบิน 1 ใบจากกิจกรรมพิเศษวันนี้!",
  //   },
];

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
        <div className="grid grid-cols-3 p-8 pt-16 w-[1128px] h-[830px] mx-auto mt-[42px]">
          <div className="col-span-2 bg-green-300/20 h-full px-8 pt-14 pb-24">
            <div className="bg-[#1b1b1b] w-full h-[512px] mt-10 rounded-[30px] p-5 pb-0">
              <div className="item-List">
                {/* วนลูป mockMails และแสดงปุ่มสำหรับแต่ละอีเมล */}
                {mockMails.map((mail) => (
                  <button
                    key={mail.id}
                    className="bg-[linear-gradient(270deg,#2b2b2b_0%,#101010_100%),url('../../public/assets/MaskGroup.png')] bg-cover bg-right bg-blend-color border-2 border-white w-full h-[88px] rounded-2xl mb-2 p-[6px] px-2 flex items-center"
                  >
                    {/* Run number */}
                    <div className="w-[71px] h-[71px] bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                      <p className="text-6xl text-white">1</p>
                    </div>
                    {/* Title */}
                    <div className="ml-4">
                      <div className="w-[155px] h-[27px] bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                        <p className="text-white font-noto">{mail.title}</p>
                      </div>
                      <p className="mt-2 text-white text-left">{mail.time}</p>
                    </div>
                    {/* Img */}
                    <div className="w-[71px] h-[71px] bg-[#F4f5f6] rounded-xl flex items-center justify-center ml-auto">
                      <img
                        src={mail.icon}
                        alt={mail.prizeName}
                        className="max-w-full max-h-full"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-red-300/20 h-full">
            <div className="bg-header-mail-box mt-5 text-white text-3xl">
              <img
                src={mailboxImage}
                style={{ marginRight: "10px" }}
                alt="Mailbox"
              />
              <p className="mt-1">MAILBOX</p>
            </div>
            <div className="pr-9">
              <div className="bg-[#1b1b1b] w-full h-[512px] mt-5 rounded-[30px] p-5 pb-0 text-center">
                <p className="mt-1 text-white font-noto text-2xl bg-gradient-to-r from-transparent via-[#4baaf8] to-transparent">
                  ของรางวัลรายวัน
                </p>
                <div className="mt-6 flex items-center">
                  <img
                    src={line}
                    style={{ marginRight: "10px", width: "30px" }}
                    alt="Mailbox"
                  />
                  <div className="w-[200px] h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                    <p className="text-white font-noto text-2xl">
                      รายละเอียดสินค้า
                    </p>
                  </div>
                  <img
                    src={line}
                    style={{ marginLeft: "10px", width: "30px" }}
                    alt="Mailbox"
                  />
                </div>
                <p className="mt-3 h-40 text-left text-white font-noto">
                  บราาาาาาาาา
                </p>
                <div className="flex items-center">
                  <img
                    src={line}
                    style={{ marginRight: "10px", width: "30px" }}
                    alt="Mailbox"
                  />
                  <div className="w-[200px] h-[41px] bg-[#1E1E1E] border-2 border-white rounded-3xl flex items-center justify-center">
                    <p className="text-white font-noto text-2xl">ของรางวัล</p>
                  </div>
                  <img
                    src={line}
                    style={{ marginLeft: "10px", width: "30px" }}
                    alt="Mailbox"
                  />
                </div>
                <div className="mt-4 bg-[linear-gradient(270deg,#2b2b2b_0%,#101010_100%),url('../../public/assets/MaskGroup.png')] bg-cover bg-right bg-blend-color border-2 border-white w-full h-[88px] rounded-[20px] mb-2 p-[6px] px-2 flex items-center">
                  <div className="w-[71px] h-[71px] bg-gradient-to-b from-[#A6F0FF] to-[#1181ED] rounded-xl flex items-center justify-center ">
                    <img src={diamond} className="max-w-full max-h-full" />
                  </div>
                  <div className="ml-4">
                    <div className="w-[120px] h-[27px] border-2 border-white bg-[#1E1E1E] rounded-xl flex items-center justify-center">
                      <p className="text-white font-noto">DIAMOND</p>
                    </div>
                    <p className="mt-2 text-white text-left">X100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-blue-300/20 h-full">aaaa</div>
        </div>
      </div>
    </div>
  );
};

export default App;
