import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { LuPencil } from "react-icons/lu";
import { MdInbox, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import SendEmail from './SendEmail';

const sidebarItems = [
    { icon: <MdInbox size={'20px'} />, text: "Inbox", path: "/" },
    { icon: <IoMdStar size={'20px'} />, text: "Starred", path: "/starred" },
    { icon: <MdOutlineWatchLater size={'20px'} />, text: "Snoozed", path: "/snoozed" },
    { icon: <TbSend2 size={'20px'} />, text: "Sent", path: "/sent" }
];

const Sidebar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [emails, setEmails] = useState([]);

    return (
        <>
            <div className='w-[15%]'>
                <div className='p-3'>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 p-4 rounded-2xl shadow-custom-box-shadow hover:shadow-secondary-btn ease-in duration-300"
                        style={{ backgroundImage: "linear-gradient(90deg, #00ceb1 0%, #1e92fb 100%)" }}
                    >
                        <LuPencil size="24px" color="white" />
                        <span className="text-white">Compose</span>
                    </button>
                </div>
                <div className='text-gray-600'>
                    {sidebarItems.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(item.path)}
                            className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-200'
                        >
                            {item.icon}
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <SendEmail open={open} setOpen={setOpen} emails={emails} setEmails={setEmails} />
        </>
    );
};

export default Sidebar;
