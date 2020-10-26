import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../../context/userContext';
import { API } from './../../config/api';

import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import AdminTable from '../../components/AdminTable/AdminTable';
import ButtonVerif from './../../components/ButtonVerif/ButtonVerif';
import ceklisIcon from '../../images/icons/ceklisIcon.png';
import './style.css';
import AdminConfirm from './../../components/AdminConfirm/AdminConfirm';

const Admin = () => {
  const { state, dispatch } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [choice, setChoice] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const nameFormat = (str) => {
    return str.slice(str.indexOf('-') + 1);
  };

  const addCustomClass = (status) => {
    if (status === 'approved') {
      return 'approved';
    } else if (status === 'canceled') {
      return 'canceled';
    } else {
      return 'waiting';
    }
  };

  const addCustomIcon = (action, id) => {
    if (action === 'approved') {
      return <img src={ceklisIcon} alt="ceklis icon" />;
    } else {
      return (
        <ButtonVerif
          action={action}
          setChoice={setChoice}
          setModalOpen={setModalOpen}
          getBooks={getBooks}
          handleSubmit={handleSubmit}
          setMessage={setMessage}
          setBookId={setBookId}
          id={id}
        />
      );
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // localStorage.removeItem('isLogin');
  };

  const handleSubmit = async (id) => {
    try {
      let status;
      if (choice === 'approve') {
        status = 'approved';
      } else {
        status = 'canceled';
      }
      setLoading(true);
      const res = await API.patch(`/literature-verif/${id}`, {
        status,
      });
      getBooks();
      // console.log('res: ', res);
      setMessage(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response);
    }
  };

  const getBooks = async () => {
    try {
      const res = await API.get('/literatures');
      console.log('res: ', res);
      setBooks(res.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="admin-page">
      <NavbarAdmin
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        state={state}
        handleLogout={handleLogout}
      />
      <AdminTable
        books={books}
        nameFormat={nameFormat}
        addCustomClass={addCustomClass}
        addCustomIcon={addCustomIcon}
      />
      {modalOpen && (
        <AdminConfirm
          choice={choice}
          setModalOpen={setModalOpen}
          handleSubmit={handleSubmit}
          bookId={bookId}
          loading={loading}
          message={message}
        />
      )}
    </div>
  );
};

export default Admin;
