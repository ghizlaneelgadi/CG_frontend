import React from 'react';
import './App.css';
import { Container,Row, Col} from 'react-bootstrap';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import SearchForm from './components/SearchForm';
import FlowDashboard from './components/FlowDashboard';


function App() {
	const marginTop = {
		marginTop : "20px"
	}
	
	return (
		<Router>
			<NavigationBar />
			<Container>
				<Row>
					<Col lg={12} style={marginTop}>
						<Switch>
							<Route path="/" exact component = {SearchForm}/>
							<Route path="/certif" exact component = {Certifications}/>
							<Route path="/flows" exact component = {FlowDashboard}/>
						</Switch>
					</Col>
				</Row>
			
			</Container>
		
			
			<Footer />
		</Router>
			
		
	);
}

export default App;
