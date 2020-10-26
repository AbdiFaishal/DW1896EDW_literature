import React, { useState } from 'react';
import Logo from './../../components/Logo/Logo';
import Title from './../../components/Title/Title';
import LoginModal from './../../components/LoginModal.js/LoginModal';
import RegisterModal from './../../components/RegisterModal.js/RegisterModal';

const Landing = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="container landing-page">
      <Logo />
      <Title setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} />
      {loginOpen && (
        <LoginModal
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          setRegisterOpen={setRegisterOpen}
        />
      )}
      {registerOpen && (
        <RegisterModal
          setRegisterOpen={setRegisterOpen}
          setLoginOpen={setLoginOpen}
        />
      )}
    </div>
  );
};

export default Landing;
