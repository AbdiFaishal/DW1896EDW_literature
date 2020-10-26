import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { UserContext } from './../../context/userContext';

import defaultAvatar from '../../images/utils/no-profile-picture.png';

import UploadAvatar from './../../components/UploadAvatar/UploadAvatar';
import { API } from './../../config/api';
import Card from './../../components/Card/Card';
import EmptyList from './../../components/commons/EmptyList/EmptyList';
import LoadingSpinner from '../../components/commons/LoadingSpinner/LoadingSpinner';

const Profile = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userLiteratures, setUserLiteratures] = useState([]);
  const [bookLoading, setBookLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  const [userData, setUserData] = useState({
    avatar: null,
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setUserData({ avatar: e.target.files[0] });
    setMessage('');
    setTimeout(() => {
      setModalOpen(true);
    }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('avatar', userData.avatar);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      setUploadLoading(true);
      const res = await API.patch(
        `/profile/${state.user.id}`,
        formData,
        config
      );

      setUploadLoading(false);
      setMessage('Upload Success');
      setUserData({ avatar: null });

      const auth = await API.get('/auth');
      dispatch({
        type: 'USER_LOADED',
        payload: auth.data.data.user,
      });
    } catch (err) {
      console.log(err.response);
      setUserData({ avatar: null });
    }
  };

  useEffect(() => {
    const getBooks = async () => {
      try {
        setBookLoading(true);
        const res = await API.get('/my-literatures');
        console.log('res: ', res);
        setBookLoading(false);
        setUserLiteratures(res.data.data);
      } catch (err) {
        setBookLoading(false);
        console.log(err.response);
      }
    };
    getBooks();
  }, []);
  return (
    <div className="container">
      <Navbar />
      <div className="user-profile">
        <div className="user-profile-detail">
          <h1>Profile</h1>
          <div className="user-card">
            <div className="user-info">
              <div className="email">
                <p>{state.user.email}</p>
                <p>Email</p>
              </div>
              <div className="gender">
                <p>{state.user.gender}</p>
                <p>Gender</p>
              </div>
              <div className="phone">
                <p>{state.user.phone}</p>
                <p>Mobile Phone</p>
              </div>
              <div className="address">
                <p>{state.user.address}</p>
                <p>Address</p>
              </div>
            </div>
            <div className="user-change-profile">
              <img
                src={state.user.avatar ? state.user.avatar : defaultAvatar}
                alt=""
              />
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  // value={userData.avatar}
                  onChange={(e) => handleChange(e)}
                  name="avatar"
                  className="input-file"
                  type="file"
                  id="avatar"
                  style={{ color: 'transparent' }}
                />
                <label name="" className="btn" htmlFor="avatar">
                  Change Photo Profile
                </label>
                {/* <button className="btn">Change Photo Profile</button> */}
              </form>
            </div>
          </div>
        </div>
        <div className="my-books">
          <h1>My Literature</h1>
          <div className="list-owned-books">
            {bookLoading ? (
              <div className="loading-profile-literature">
                <LoadingSpinner />
              </div>
            ) : !userLiteratures.length ? (
              <EmptyList text={`You haven't uploaded any literatures yet`} />
            ) : (
              userLiteratures.map((literature) => {
                return <Card key={literature.id} {...literature} />;
              })
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <UploadAvatar
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          message={message}
          uploadLoading={uploadLoading}
        />
      )}
    </div>
  );
};

export default Profile;
