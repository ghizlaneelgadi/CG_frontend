import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,Row, Col} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import BoardAdmin  from './components/board-admin.component';
import FlowDashboard from './components/FlowDashboard';
import SearchForm from './components/SearchForm';
import BoardUser  from './components/board-user.component';
import Login from './components/login.component';
import Profile from './components/profile.component';
import Register from './components/register.component';
import { render } from '@testing-library/react';
import AuthService from "./services/auth.service";



class App extends Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);

		this.state = {
			showAdminBoard: false,
			currentUser: undefined,
		};
	}

	componentDidMount() {
		const user = AuthService.getCurrentUser();

		if (user) {
			this.setState({
				currentUser: user,
				showAdminBoard: user.roles.includes("ROLE_ADMIN"),
			});
		}
	}

	logOut() {
		AuthService.logout();
	}

	render() {
	const { currentUser, showAdminBoard } = this.state;
	  const marginTop = {
		marginTop : "20px"
	}
	
	  return (
		  <div>
			  <div>
			  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<div className="navbar-brand">
						<img src="https://media-exp1.licdn.com/dms/image/C560BAQHTt5GdJpuviw/company-logo_200_200/0/1543582574842?e=2159024400&v=beta&t=MiG130MPzVtWa9pSD3VGyhx5yp3HWITlH7clQJaag14" width="30" height="30" />
					</div>
					<Router>
					<div className="navbar-nav mr-auto">

						{showAdminBoard ? (
							<Nav className="mr-auto" >
								<NavLink to={"/register"} className="nav-link " >Add user</NavLink>
							</Nav>
						): null}

						{currentUser ? (
							<Nav className="mr-auto" >
								<NavLink to={"/search"} className="nav-link" >Search form</NavLink>
								<NavLink to={"/certif"} className="nav-link " >Certifications</NavLink>
							</Nav>
						): null}
					</div>

					{currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to={"/profile"} className="nav-link" exact activeClassName="active">
                  {currentUser.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : null}
		  </Router>
		  </Navbar>
			  </div>

			  <div>
		<Router>
			
			<Switch>
			<Route exact path={["/","/login"]}  component={Login} />
			  <Route exact path="/certif"  component={Certifications} />
			  <Route exact path="/search"  component={SearchForm} />
			  <Route exact path="/register"  component={Register} />
			  <Route path="/user"  component={BoardUser} />
			  <Route path="/admin"  component={BoardAdmin} />
			  <Route path="/flows" exact component = {FlowDashboard}/>
			  <Route exact path="/profile"  component={Profile} />
			</Switch>
		
			
		</Router>
		</div>
		</div>
	  );
	 
	}
  }
  
  export default App;
	

