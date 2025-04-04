import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import axios from 'axios';

const SendEmail = ({ open, setOpen, setEmails, emails }) => {
    const generateId = () => Math.random().toString(36).substring(2, 12);

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    };

    const getCurrentDate = () => {
        const now = new Date();
        return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    };

    const [formData, setFormData] = useState({
        threadId: generateId(),
        messageId: generateId(),
        from: "",
        to: "",
        subject: "",
        message: "",
        time: getCurrentTime(),
        date: getCurrentDate()
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                ...formData,
                time: getCurrentTime(),
                date: getCurrentDate(),
                messageId: generateId(),
                threadId: formData.threadId || generateId(),
                aiGenerated: false
            };

            console.log("Form Data Being Sent:", updatedData);

            const res = await axios.post("http://localhost:8080/api/v1/email/create", updatedData, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true
            });

            setEmails([...emails, res.data.email]);
            toast.success("Email sent successfully!");

            // Reset form
            setFormData({
                threadId: generateId(),
                messageId: generateId(),
                from: "",
                to: "",
                subject: "",
                message: "",
                time: getCurrentTime(),
                date: getCurrentDate()
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to send email.");
        }
    };

    const generateAIEmail = async () => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/v1/email/generate-ai", { subject: formData.subject }, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true
            });

            setFormData({ ...formData, message: res.data.generatedMessage });
            toast.success("AI-generated email ready!");
        } catch (error) {
            console.error(error);
            toast.error("AI generation failed.");
        }
        setLoading(false);
    };

    return (
        <div className={`${open ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' : 'hidden'}`}>
            <div className="bg-white max-w-2xl w-full mx-4 p-6 rounded-lg shadow-xl">
                <div className='flex items-center justify-between pb-4 border-b'>
                    <h1 className="text-lg font-semibold">New Message</h1>
                    <div onClick={() => setOpen(false)} className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                        <RxCross2 size="20px" />
                    </div>
                </div>
                <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                    <input name="from" onChange={changeHandler} value={formData.from} type="email" placeholder='From' className='outline-none py-2 border-b' required />
                    <input name="to" onChange={changeHandler} value={formData.to} type="email" placeholder='To' className='outline-none py-2 border-b' required />
                    <input name="subject" onChange={changeHandler} value={formData.subject} type="text" placeholder='Subject' className='outline-none py-2 border-b' required />
                    <textarea name="message" onChange={changeHandler} value={formData.message} rows='6' placeholder="Message body" className='outline-none py-2 border rounded-lg' required />

                    <div className="flex gap-3">
                        <button type='submit' className='bg-blue-700 rounded-full px-5 py-2 text-white'>Send</button>
                        <button type="button" onClick={generateAIEmail} className='bg-green-600 rounded-full px-5 py-2 text-white' disabled={loading}>
                            {loading ? "Generating..." : "AI Generate"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendEmail;
