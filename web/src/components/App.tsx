import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

import mailboxImage from "../assets/mailbox.png";
import diamond from "../assets/Diamond.png";
import line from "../assets/line.png";
import paginationBack from "../assets/pagination-back.png";
import paginationNext from "../assets/pagination-next.png";

// This will set the NUI to visible if we are
// developing in browser
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

interface ReturnData {
  x: number;
  y: number;
  z: number;
}

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
  {
    id: 6,
    title: "ของรางวัลพิเศษ",
    time: "TODAY, 14:15",
    icon: diamond,
    prizeName: "โทรศัพท์มือถือ",
    prizeAmount: 1,
    content: "คุณได้รับโทรศัพท์มือถือจากกิจกรรมพิเศษวันนี้!",
  },
  {
    id: 7,
    title: "ของรางวัลพิเศษ",
    time: "TODAY, 15:00",
    icon: diamond,
    prizeName: "ตั๋วเครื่องบิน",
    prizeAmount: 1,
    content: "คุณได้รับตั๋วเครื่องบิน 1 ใบจากกิจกรรมพิเศษวันนี้!",
  },
];

const App: React.FC = () => {
  const [clientData, setClientData] = useState<ReturnData | null>(null);
  const [selectedMail, setSelectedMail] = useState<any>(null); // เก็บเมลที่เลือก

  const handleGetClientData = () => {
    fetchNui<ReturnData>("getClientData")
      .then((retData) => {
        console.log("Got return data from client scripts:");
        console.dir(retData);
        setClientData(retData);
      })
      .catch((e) => {
        console.error("Setting mock data due to error", e);
        setClientData({ x: 500, y: 300, z: 200 });
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const mailsPerPage = 4; // กำหนดจำนวนจดหมายต่อหน้า
  const totalPages = Math.ceil(mockMails.length / mailsPerPage);

  // คำนวณรายการที่จะแสดงในหน้านี้
  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails = mockMails.slice(indexOfFirstMail, indexOfLastMail);

  return (
    <div className="nui-wrapper">
      <div className="popup-thing">
        <div className="bubble"></div>
        <div className="logo"></div>
        <div>
          <div className="container">
            <div className="mailbox">
              <p style={{ fontSize: "33px", margin: "0px" }}>
                <img
                  src={mailboxImage}
                  style={{ marginRight: "5px" }}
                  alt="Mailbox"
                />{" "}
                MAILBOX
              </p>
            </div>

            <div className="details">
              <div className="detail-list" style={{ padding: "20px" }}>
                {currentMails.map((mail) => (
                  <button
                    key={mail.id}
                    className={`mail ${
                      mail.id === 1 ? "active bg-logo" : "bg-logo"
                    }`}
                    onClick={() => setSelectedMail(mail)} // เมื่อกด จะตั้งค่า selectedMail
                  >
                    <div className="icon-box">
                      <span className="number" style={{ fontSize: "50px" }}>
                        {mail.id}
                      </span>
                    </div>
                    <div className="content">
                      <div className="title-box">
                        <p className="title-text">{mail.title}</p>
                      </div>
                      <p className="time">{mail.time}</p>
                    </div>
                    <div className="reward-icon">
                      <img src={mail.icon} alt="Reward Icon" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ส่วนแสดงรายละเอียดของรางวัล */}
            <div className="reward">
              {selectedMail ? (
                <>
                  <div className="detail-mail bg-header">
                    <p className="reward-header">ของรางวัล</p>
                  </div>
                  <div className="product-detail">
                    <p className="detail-text">
                      <img
                        src={line}
                        alt="line"
                        style={{ marginRight: "10px" }}
                      />
                      <span className="detail-label"> รายละเอียดสินค้า </span>
                      <img
                        src={line}
                        alt="line"
                        style={{ marginLeft: "10px" }}
                      />
                    </p>
                  </div>
                  <p className="detail-mail-text">
                    {`${selectedMail.content}`}
                  </p>
                  <div className="product-detail">
                    <p className="detail-text">
                      <img
                        src={line}
                        alt="line"
                        style={{ marginRight: "10px" }}
                      />
                      <span className="detail-label"> ของรางวัล </span>
                      <img
                        src={line}
                        alt="line"
                        style={{ marginLeft: "10px" }}
                      />
                    </p>
                  </div>
                  <div className="bg-item">
                    <div className="item-icon">
                      <img src={diamond} alt="Diamond" />
                    </div>
                    <div className="content">
                      <div className="title-item">
                        <p className="title-text">{selectedMail.prizeName}</p>
                      </div>
                      <p className="item-amount">{`X${selectedMail.prizeAmount}`}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>กรุณาเลือกอีเมลเพื่อดูรายละเอียด</p>
              )}
            </div>

            {/* เพิ่ม clear fix หรือ ให้ pagination อยู่ด้านล่าง */}
            <div className="pagination-container" style={{ clear: "both" }}>
              <div className="pagination">
                <div className="bg-pagination">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <img src={paginationBack} alt="" />
                  </button>
                  <div className="page-container">
                    <p className="page-text">{currentPage}</p>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <img src={paginationNext} alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="collet-container">
              <div className="collet-content">Collet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
