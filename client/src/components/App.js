import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/style/tailwind.css";
import getCurrentUser from "../services/getCurrentUser";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ProfileEditPage from "./ProfileEditPage";
import SweepInfo from "./SweepInfo";
// import 'bootstrap/dist/css/bootstrap.min.css';


const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>


        <Route exact path="/" >
          <SweepInfo user={currentUser} />
        </Route>

        <Route exact path="/users/new" component={RegistrationForm} />
        {/* <Route exact path="/data" component={SweepInfo} /> */}
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/edit" user={currentUser} component={ProfileEditPage} />
      </Switch>
    </Router>
  );
};

export default hot(App);
