import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../App.css';


export default class SearchForm extends Component {

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.FlowChange = this.FlowChange.bind(this);
		this.cancelSearch = this.cancelSearch.bind(this);
	}

	componentDidMount(){
		document.body.style.backgroundColor = "#f9f9f9"
	  }
	
	initialState = {
		startdate: '', enddate: '', flowidentifier: '', flowname: '', sourceapp: '', targetapp: '' 	
	}

	FlowChange(event) {
		this.setState({

			[event.target.name]: event.target.value

		}
		);
	}


	cancelSearch = () => {
		this.setState({"senddate": ""});
		this.setState({"enddate": ""});
		this.setState({"flowidentifier": ""});
		this.setState({"flowname": ""});
		this.setState({"sourceapp": ""});
		this.setState({"targetapp": ""});
	};

	handleSearch = () =>{
		localStorage.setItem('senddate', this.state.startdate);
		localStorage.setItem('enddate', this.state.enddate);
		localStorage.setItem('flowidentifier', this.state.flowidentifier);
		localStorage.setItem('flowname', this.state.flowname);
		localStorage.setItem('sourceapp', this.state.sourceapp);
		localStorage.setItem('targetapp', this.state.targetapp);
	}

	render() {
		
		const {startdate, enddate,flowidentifier, flowname, sourceapp, targetapp} = this.state
		
		return (

			<Card className="border border-white text-black text-black align-self-center align-middle" 
			style={{ width: '60%', marginLeft: 'auto' , marginRight: 'auto' , marginTop: '30px' }} >
				<br />
				<Card.Header lg={12} className="text-center texte-muted">Enter your parameters</Card.Header>
				<Form onSubmit={this.SearchFlow} id="flowFormId">
					<Card.Body>

						<Form.Row style={{ "textAlign": "left" }}>
							<Form.Group as={Col} controlId="formGridStartdate">
								<Form.Label >Start date</Form.Label>
								<Form.Control autocomplete="off"
									type="date"
									name="startdate"
									value={startdate}
									onChange={this.FlowChange}
									placeholderText="Start date" />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridEnddate">
								<Form.Label>End date</Form.Label>
								<Form.Control autocomplete="off"
									type="date"
									name="enddate"
									value={enddate}
									onChange={this.FlowChange}
									placeholder="End date" />
							</Form.Group>
						</Form.Row>
						<Form.Row style={{ "textAlign": "left" }}>
							<Form.Group as={Col} controlId="formGridFlowidentifier">
								<Form.Label>Flow identifier</Form.Label>
								<Form.Control autocomplete="off"
									type="text"
									name="flowidentifier"
									value={flowidentifier}
									onChange={this.FlowChange}
									placeholder="Enter flow identifier" />
							</Form.Group>

							<Form.Group as={Col} controlId="FormGridFlowname">
								<Form.Label>Flow name</Form.Label>
								<Form.Control autocomplete="off"
									type="text"
									name="flowname"
									value={flowname}
									onChange={this.FlowChange}
									placeholder="Enter flow name" />
							</Form.Group>
						</Form.Row>
						<Form.Row style={{ "textAlign": "left" }}>
							<Form.Group as={Col} controlId="formGridSourceapp">
								<Form.Label>Source application</Form.Label>
								<Form.Control autocomplete="off"
									type="text"
									name="sourceapp"
									value={sourceapp}
									onChange={this.FlowChange}
									placeholder="Enter source application" />
							</Form.Group>

							<Form.Group as={Col} controlId="formGridTargetapp">
								<Form.Label>Target application</Form.Label>
								<Form.Control autocomplete="off"
									type="text"
									name="targetapp"
									value={targetapp}
									onChange={this.FlowChange}
									placeholder="Enter target application" />
							</Form.Group>
						</Form.Row>
					</Card.Body>
					<Card.Footer style={{ "textAlign": "right" }}>
					<Link to="/flows">
						<Button size="mm" variant="danger" type="submit"
							onClick = {this.handleSearch}>
							Search
						</Button>
						</Link>
					
						<Button size="mm" variant="danger" type="submit" 
						onClick = {this.cancelSearch} 
						style={{ "marginLeft": "10px" }}>
							Cancel
					</Button>
					
					</Card.Footer>
				</Form>
			</Card>
		);
	}


}

