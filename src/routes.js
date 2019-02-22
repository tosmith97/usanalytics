import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

/* Component Imports */
import LoginView from './LoginView/LoginView';
import DashboardView from './DashboardView/DashboardView';
import ProfileView from './ProfileView/ProfileView';
import AdminLayout from "./layouts/Admin/Admin.jsx";

// copied from template
import Dashboard from "./views/Dashboard.jsx";
import Icons from "./views/Icons.jsx";
import Map from "./views/Map.jsx";
import Notifications from "./views/Notifications.jsx";
import Rtl from "./views/Rtl.jsx";
import TableList from "./views/TableList.jsx";
import Typography from "./views/Typography.jsx";
import UserProfile from "./views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/counties",
    name: "County List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
];

export { routes };

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={DashboardView} />
      {/* <Route path='/profile' component={ProfileView} /> */}
      <Route path='/admin' render={props => <AdminLayout {...props} />} />
      {/* this needs to be last */}
      <Route path="*" component={LoginView} />
    </Switch>
  </BrowserRouter>
);
