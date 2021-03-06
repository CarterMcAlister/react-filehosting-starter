import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Item from './pages/Item'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Upload from './pages/Upload'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import ChangePassword from './pages/profile/ChangePassword'
import AppliedRoute from './components/AppliedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />

    <AuthenticatedRoute path="/new" exact component={Upload} props={childProps} />

    <AuthenticatedRoute path="/:userName" exact component={Profile} props={childProps} />
    <AuthenticatedRoute path="/:userName/:id" exact component={Item} props={childProps} />
    {/* <AuthenticatedRoute path="/profile/changepassword" exact component={ChangePassword} props={childProps} /> */}

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
)
