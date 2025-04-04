import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import axios from 'axios';

const SendEmail = ({ open, setOpen, setEmails, emails }) => {
    const [formData, setFormData] = useState({ to: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/email/create", formData, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true
            });
            setEmails([...emails, res.data.email]);
            toast.success("Email sent successfully!");
            setFormData({ to: "", subject: "", message: "" }); // Reset form after sending
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to send email.");
        }
        setOpen(false);
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
            console.log(error);
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
                    <input onChange={changeHandler} value={formData.to} name="to" type="text" placeholder='To' className='outline-none py-2 border-b' />
                    <input onChange={changeHandler} value={formData.subject} name="subject" type="text" placeholder='Subject' className='outline-none py-2 border-b' />
                    <textarea onChange={changeHandler} value={formData.message} name="message" rows='6' className='outline-none py-2 border rounded-lg'></textarea>

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
