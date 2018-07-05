import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import {Navbar, SideBar, Footer} from './components'
import Routes from './routes'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <React.Fragment>
    <CssBaseline />
    <div>
    <ToastContainer autoClose={5000} />
      <Navbar />
      <SideBar />
      <Routes />
      <Footer />
    </div>
  </React.Fragment>
  )
}

export default App