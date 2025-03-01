import React from "react";
import {PiMailboxDuotone} from "react-icons/pi";

const MailboxHeader: React.FC = () => {
    return (
        <div className="absolute top-[2.7em] right-[.8em] bg-header-mail-box gap-2 items-center justify-center mt-[20px] text-white text-3xl max-w-[380px]">
            <span className="text-4xl text-[#56c0fb]">
                <PiMailboxDuotone />
            </span>
            <p className="mt-1 bg-gradient-to-r from-[#56c0fb] to-[#80ddff] bg-clip-text text-transparent">
                MAILBOX
            </p>
        </div>
    );
};

export default MailboxHeader;
