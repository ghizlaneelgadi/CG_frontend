import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthService from "../services/auth.service";
import '../App.css';

export default class NavigationBar extends Component {

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
		return (
			<div>
				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<div className="navbar-brand">
						<img src="https://media-exp1.licdn.com/dms/image/C560BAQHTt5GdJpuviw/company-logo_200_200/0/1543582574842?e=2159024400&v=beta&t=MiG130MPzVtWa9pSD3VGyhx5yp3HWITlH7clQJaag14" width="30" height="30" />
					</div>
					<div className="navbar-nav mr-auto">

						{showAdminBoard && (
							<Nav className="mr-auto" >
								<NavLink to={"/search"} className="nav-link" exact activeClassName="active">Search form</NavLink>
								<NavLink to={"/certif"} className="nav-link " exact activeClassName="active">Certifications</NavLink>
								<NavLink to={"/register"} className="nav-link " exact activeClassName="active">Add user</NavLink>
							</Nav>
						)}

						{currentUser ? (
							<Nav className="mr-auto" >
								<NavLink to={"/search"} className="nav-link" exact activeClassName="active">Search form</NavLink>
								<NavLink to={"/certif"} className="nav-link " exact activeClassName="active">Certifications</NavLink>
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
                  LogOut
                </a>
              </li>
            </div>
          ) : null}
		  </Navbar>
		</div>

		);
	}

}


{/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<div className="navbar-brand">
					<img src="https://media-exp1.licdn.com/dms/image/C560BAQHTt5GdJpuviw/company-logo_200_200/0/1543582574842?e=2159024400&v=beta&t=MiG130MPzVtWa9pSD3VGyhx5yp3HWITlH7clQJaag14" width="30" height="30"/>
				</div>
				<Nav className="mr-auto" >
					<NavLink to={"/search"} className="nav-link"  exact activeClassName="active">Search form</NavLink>
					<NavLink to={"/certif"} className="nav-link " exact activeClassName="active">Certifications</NavLink>
					<NavLink to={"/register"} className="nav-link " exact activeClassName="active">Certifications</NavLink>
					
				</Nav>
				
			</Navbar> */}