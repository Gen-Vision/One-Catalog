// LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';import {
    Button,
  } from "@material-tailwind/react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate('/genvision/dashboard');
  };

  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <div className="text-center">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to Genvision</h1>
        <p>Catalog digitalization made easy</p>
        <Button className="text-white bg-[#623FC4] fs-2" placeholder="a" variant='outlined' onClick={handleNavigateToDashboard}>
             Let's Begin
          </Button>
      </div>
    </div>
  );
};

export default LandingPage;
