import React, {Component} from 'react';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default class Certifications extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			certif : [],
			currentPage : 1,
			certifsPerPage: 5
		};
		
	}
	
	componentDidMount() {
		this.findAllCertif(); 	
 }	

	findAllCertif (){
		axios.get("http://localhost:8080/check")
			.then(response => response.data)
			.then((data) => 
				this.setState({certif: data}));
	}
	
	changePage = event =>{
		this.setState({

			[event.target.name]: parseInt(event.target.value)

		});
	};
	
	firstPage = () =>{
		if(this.state.currentPage > 1){
			this.setState({
				currentPage: 1	
			});
		}
	};
	
	prevPage =() =>{
		if(this.state.currentPage > 1){
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};
	
	lastPage = () =>{
		if(this.state.currentPage < Math.ceil(this.state.certif.length / this.state.certifsPerPage)){
			this.setState({
				currentPage: Math.ceil(this.state.certif.length / this.state.certifsPerPage)	
			});
		}	
	};
	
	nextPage = () => {
		if(this.state.currentPage < Math.ceil(this.state.certif.length / this.state.certifsPerPage)){
			this.setState({
				currentPage: this.state.currentPage + 1	
			});
		}	
	
	};

	notify = () => {
		toast("Certification with the id +" {this.id_Cert} '+ will expire in +' {this.time_left} "+ days")
	}
	
	
	
	
	render() {
		
		const {certif, currentPage, certifsPerPage} = this.state;
		const lastIndex = currentPage * certifsPerPage;
		const firstIndex = lastIndex - certifsPerPage;
		const currentCertifs = certif.slice(firstIndex, lastIndex);
		const totalPages = certif.length / certifsPerPage;
		
		const pageNumCss = {
			width: "45px",
			border: "1px solid #17A2B8",
			color: "#17A2B8",
			textAlign: "center",
			fontWeight: "bold"
		}
		return (
			
			<Card className="border border-white text-black" style = {{width: '80%', marginLeft : 'auto', marginRight : 'auto'}}>
				<Card.Header lg={12} className="text-center texte-muted">Certifications</Card.Header>
				<Card.Body>
					<Table   id="table" hover size="sm" responsive border >
						<thead>
							<tr>
								<th>ID</th>
								<th>Certification state</th>
								<th>Exp. date</th>
								<th>Time left</th>
							</tr>
						</thead>
						<tbody>
							{certif.length === 0 ? 
								<tr>
									<td colSpan="10"> Flows</td>
								</tr> :
								
								currentCertifs.map((certif) => (
									<tr key={certif.id_Cert}>
										<td>{certif.id_Cert}</td>
										<td>{certif.state}</td>
										<td>{certif.exp_Date}</td>
										<td style ={{color: certif.time_left <= 30 ? "red" : "green", fontWeight: certif.time_left <= 30 ? "bold" : "lighter"}}>{certif.time_left} j</td>
									</tr>
								))	
							}
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					
					<div style = {{"float":"right"}}>
						<InputGroup size = "sm">
							<InputGroup.Prepend>
								<Button type = "button" variant = "outline-info" disabled = {currentPage === 1 ? true : false}
									onClick = {this.firstPage}>
									< FontAwesomeIcon icon={faFastBackward}/> First
								</Button>
								<Button type = "button" variant = "outline-info" disabled = {currentPage === 1 ? true : false}
									onClick = {this.prevPage}>
									< FontAwesomeIcon icon={faStepBackward}/> Prev
								</Button>
							</InputGroup.Prepend>
							
							<FormControl style = {pageNumCss} name = "currentPage" value = {currentPage}
								onChange={this.changePage}/>
							
							<InputGroup.Prepend>
								<Button type = "button" variant = "outline-info" disabled = {currentPage === totalPages ? true : false}
									onClick = {this.nextPage}>
									< FontAwesomeIcon icon={faStepForward}/> Next
								</Button>
								<Button type = "button" variant = "outline-info" disabled = {currentPage === totalPages ? true : false}
									onClick = {this.lastPage}>
									< FontAwesomeIcon icon={faFastForward}/> Last
								</Button>
							</InputGroup.Prepend>
							
						</InputGroup>
					</div>
				</Card.Footer>
			</Card>

		);
	}
	
	
}

