import React, { useEffect, useState } from 'react';
import Email from './Email';
import useGetAllEmails from '../hooks/useGetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  // Custom hook to fetch emails
  useGetAllEmails();
  
  const { emails, searchText } = useSelector((store) => store.app);
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (emails?.length > 0) {
      const filtered = emails.filter((email) =>
        email.subject?.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to?.toLowerCase().includes(searchText.toLowerCase()) ||
        email.body?.toLowerCase().includes(searchText.toLowerCase())  // ✅ Fixed field name
      );
      setFilteredEmails(filtered);
    } else {
      setFilteredEmails([]);
    }
  }, [searchText, emails]);

  return (
    <div>
      {filteredEmails.length > 0 ? (
        filteredEmails.map((email) => <Email key={email._id} email={email} />)
      ) : (
        <p className="text-center text-gray-500 mt-4">No emails found.</p>
      )}
    </div>
  );
};

export default Emails;
