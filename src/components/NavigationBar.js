import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import '../App.css';

export default class NavigationBar extends Component {

	render() {
		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<div className="navbar-brand">
					<img src="https://media-exp1.licdn.com/dms/image/C560BAQHTt5GdJpuviw/company-logo_200_200/0/1543582574842?e=2159024400&v=beta&t=MiG130MPzVtWa9pSD3VGyhx5yp3HWITlH7clQJaag14" width="30" height="30"/>
				</div>
				<Nav className="mr-auto" >
					<NavLink to={"/"} className="nav-link"  exact activeClassName="active">Search form</NavLink>
					<NavLink to={"/certif"} className="nav-link " exact activeClassName="active">Certifications</NavLink>
					
				</Nav>
				
			</Navbar>
		);
	}

}