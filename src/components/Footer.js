import React, {Component} from 'react';
import { Navbar, Container, Col} from 'react-bootstrap';


export default class Footer extends Component{
	
	render(){
		let fullYear = new Date().getFullYear();
		
		return (
			<Navbar fixed="bottom" bg="dark" variant="dark">
				<Container>
					<Col lg={12} className="text-center texte-muted text-danger">
						<div className="texte-white">{fullYear}, Société Générale African Business Services</div>
					</Col>
				</Container>
			</Navbar>
		);
	}
}

