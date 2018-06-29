import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <React.Fragment>
    <CssBaseline />
    <div>
      <Navbar />
      <Routes />
    </div>
  </React.Fragment>
  )
}

export default App