import React from 'react';
import { MdCropSquare, MdOutlineStarBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedEmail } from '../redux/appSlice';

const Email = ({ email }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openMail = () => {
        dispatch(setSelectedEmail(email));
        navigate(`/mail/${email._id}`);
    };

    return (
        <div
            onClick={openMail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openMail()}
            className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md'
        >
            <div className='flex items-center gap-3'>
                <div className='text-gray-400'>
                    <MdCropSquare size={'20px'} />
                </div>
                <div className='text-gray-400'>
                    <MdOutlineStarBorder size={'20px'} />
                </div>
                <div>
                    <h1 className='font-semibold'>{email?.subject}</h1>
                </div>
            </div>
            <div className='flex-1 ml-4'>
                <p className="truncate">{email?.body}</p>
            </div>
            <div className='flex-none text-gray-500 text-xs'>
                <p>{new Date(email?.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default Email;
