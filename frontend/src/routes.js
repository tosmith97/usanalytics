import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

/* Component Imports */
import LoginView from './LoginView/LoginView';
import DashboardView from './DashboardView/DashboardView';
import ProfileView from './ProfileView/ProfileView';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={DashboardView} />
      <Route path='/profile' component={ProfileView} />


      {/* this needs to be last */}
      <Route path="*" component={LoginView} />
    </Switch>
  </BrowserRouter>
);
