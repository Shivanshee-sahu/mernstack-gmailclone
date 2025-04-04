import React, { useEffect, useState } from 'react';
import Email from './Email';
import useGetAllEmails from '../hooks/useGetAllEmails';
import { useSelector } from 'react-redux';

const Emails = () => {
  // Fetch emails
  useGetAllEmails();
  const { emails, searchText } = useSelector(store => store.app);
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (emails?.length > 0) {
      const filtered = emails.filter((email) =>
        email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
        email.to.toLowerCase().includes(searchText.toLowerCase()) ||
        email.message.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEmails(filtered);
    }
  }, [searchText, emails]);

  return (
    <div>
      {filteredEmails.length > 0 ? (
        filteredEmails.map((email) => <Email key={email._id} email={email} />)
      ) : (
        <p>No emails found.</p>
      )}
    </div>
  );
};

export default Emails;
