import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/dashboard/Home'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import { AuthContext } from './context/authContext'
import { useCookies } from 'react-cookie'
import authenticateToken from './utils/Preloader'
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";
import Show from './pages/newpage/show'



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const App = () => {
  const [cookies] = useCookies(["access_token"]);
  const { dispatch } = useContext(AuthContext);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    authenticateToken(cookies, dispatch);
    setReady(true);
  }, []);


  if (!ready) {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <FadeLoader
          color={"#123abc"}
          loading={!ready}
          css={override}
          size={150}
        />
      </div>);
  }

  return (
    <BrowserRouter>
      {cookies.access_token ? <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/show' element={<Show />} />
      </Routes> : <Routes>
        <Route path='*' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>}

    </BrowserRouter>
  )
}

export default App