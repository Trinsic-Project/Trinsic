import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import {Navbar, SideBar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <React.Fragment>
    <CssBaseline />
    <div>
      <Navbar />
      <SideBar />
      <Routes />
      <Footer />
    </div>
  </React.Fragment>
  )
}

export default App