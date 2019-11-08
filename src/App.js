import React from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css'
import SignIn from './components/SignIn'
import SignOut from './components/SignOut'
import DisplayUser from './components/DisplayUser'
import { Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
      <Router>
        <Route exact path='/' component={SignIn} />
        <Route path='/displayuser' component={DisplayUser}/>
        <Route path='/signout' component={SignOut} />
      </Router>
  )
}

export default App
