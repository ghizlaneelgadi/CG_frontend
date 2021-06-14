import React, { Component } from 'react';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faFastBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



toast.configure();
let table = new Array;


export default class Certifications extends Component {

	constructor(props) {
		super(props);
		this.state = {
			certif: [],
			currentPage: 1,
			certifsPerPage: 6
		};


	}


	componentDidMount() {
		this.findAllCertif();
		this.showAlert();
		table += localStorage.getItem('val');
		console.log(table);
	}

	findAllCertif() {
		axios.get("http://localhost:8080/api/certifications")
			.then(response => response.data)
			.then((data) =>
				this.setState({ certif: data }));
	};

	changePage = event => {
		this.setState({

			[event.target.name]: parseInt(event.target.value)

		});
	};

	firstPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: 1
			});
		}
	};

	prevPage = () => {
		if (this.state.currentPage > 1) {
			this.setState({
				currentPage: this.state.currentPage - 1
			});
		}
	};

	lastPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.certif.length / this.state.certifsPerPage)) {
			this.setState({
				currentPage: Math.ceil(this.state.certif.length / this.state.certifsPerPage)
			});
		}
	};

	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.certif.length / this.state.certifsPerPage)) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}
	};

	showAlert = () => {
		var name = localStorage.getItem('id_Cert');
		var exp = localStorage.getItem('exp_Date');
		var days_left = this.convertDate(exp);
		toast.error("Alert ! the certificate with the id " + name + " will expire in " + days_left + " days" , { autoClose: 1000 }, 
		{position: toast.POSITION.TOP_RIGHT});
		
	};


	convertDate = date => {
		var today = new Date();
		var strToDate = new Date(date);
		var diff_in_time = strToDate.getTime() - today.getTime();
		var diff_in_days = (diff_in_time / (1000 * 3600 * 24)).toFixed(0);
		return diff_in_days;
	}
	

	render() {
		const { certif, currentPage, certifsPerPage } = this.state;
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
			<Card className="border border-white text-black" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
				<Card.Header lg={12} className="text-center texte-muted"></Card.Header>
				<Card.Body>
					<Table id="table" hover size="sm" responsive border >
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
										{this.convertDate(certif.exp_Date) <= 30 ? localStorage.setItem('exp_Date', certif.exp_Date): null}
										{this.convertDate(certif.exp_Date) <= 30 ? localStorage.setItem('id_Cert', certif.id_Cert) : null}
										{this.convertDate(certif.exp_Date) <= 30 ? localStorage.setItem('val', this.convertDate(certif.exp_Date)) : null}
										<td>{certif.id_Cert} </td>
										<td>{certif.state}</td>
										<td>{certif.exp_Date}</td>
										<td style={{ color: this.convertDate(certif.exp_Date) <= 30 ? "red" : "green", fontWeight:this.convertDate(certif.exp_Date) <= 30 ? "bold" : "lighter" }}>
											{this.convertDate(certif.exp_Date)} d
										</td>
									</tr>
								))
							}
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<div style={{ "float": "right" }}>
						<InputGroup size="sm">
							<InputGroup.Prepend>
								<Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
									onClick={this.firstPage}>
									< FontAwesomeIcon icon={faFastBackward} /> First
								</Button>
								<Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
									onClick={this.prevPage}>
									< FontAwesomeIcon icon={faStepBackward} /> Prev
								</Button>
							</InputGroup.Prepend>

							<FormControl style={pageNumCss} name="currentPage" value={currentPage}
								onChange={this.changePage} />

							<InputGroup.Prepend>
								<Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
									onClick={this.nextPage}>
									< FontAwesomeIcon icon={faStepForward} /> Next
								</Button>
								<Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
									onClick={this.lastPage}>
									< FontAwesomeIcon icon={faFastForward} /> Last
								</Button>
							</InputGroup.Prepend>
						</InputGroup>
					</div>
				</Card.Footer>
			</Card>

		);
	}

}

