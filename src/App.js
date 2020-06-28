import React from 'react'
import ResponsiveDrawer from './components/ResponsiveDrawer'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <div style={{marginBottom: '4.5em'}}>
      <Router>
        <ResponsiveDrawer/>
      </Router>
    </div>
  )
}

export default App;
