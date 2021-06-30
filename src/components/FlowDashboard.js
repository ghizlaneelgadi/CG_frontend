import React, { Component } from 'react';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faFastBackward, faStepForward, faFastForward, fa } from '@fortawesome/free-solid-svg-icons';
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";
import axios from "axios";


export default class FlowDashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			current: [],
			currentPage: 1,
			flowsPerPage: 5
		};
		this.csvLinkEl = React.createRef();
	}

	componentDidMount() {
		this.findFlows();
		var time_send = new Date(localStorage.getItem('senddate'));
		var time_rec= new Date(localStorage.getItem('enddate'));
		localStorage.getItem('flowidentifier');
		localStorage.getItem('flowname');
		localStorage.getItem('sourceapp');
		localStorage.getItem('targetapp');
		console.log(time_send);
		console.log(time_rec);

	}


	findFlows() {
		axios.get("http://localhost:8080/api/flows/flow?flowidentifier="+localStorage.getItem('flowidentifier')+"&flowname="+localStorage.getItem('flowname')+"&sourceapp="+localStorage.getItem('sourceapp')+"&targetapp="+localStorage.getItem('targetapp'))
			.then(response => response.data)
			.then((data) =>
				this.setState({ current: data }));
	}

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
		if (this.state.currentPage < Math.ceil(this.state.current.length / this.state.flowsPerPage)) {
			this.setState({
				currentPage: Math.ceil(this.state.current.length / this.state.flowsPerPage)
			});
		}
	};

	nextPage = () => {
		if (this.state.currentPage < Math.ceil(this.state.current.length / this.state.flowsPerPage)) {
			this.setState({
				currentPage: this.state.currentPage + 1
			});
		}

	};

	generatePDF = () => {
		var doc = new jsPDF("p", "pt", "a2");
		doc.html(document.querySelector("#table"), {
			callback: function (pdf) {
				pdf.save("report.pdf");
			}
		}, 10, 10);
	};

	generateCSV = async () => {
		const data = await this.findFlows();
		this.setState({ data: data }, () => {
			setTimeout(() => {
				this.csvLinkEl.current.link.click();
			});
		});
	};

	refreshPage = () => {
		window.location.reload(false);
	}


	render() {

		const { current, currentPage, flowsPerPage } = this.state;
		const lastIndex = currentPage * flowsPerPage;
		const firstIndex = lastIndex - flowsPerPage;
		const currentflow = current.slice(firstIndex, lastIndex);
		const totalPages = current.length / flowsPerPage;

		const pageNumCss = {
			width: "45px",
			border: "1px solid #17A2B8",
			color: "#17A2B8",
			textAlign: "center",
			fontWeight: "bold"
		}

		const headers = [
			{ label: "Start date", key: "senddate" },
			{ label: "End date", key: "enddate" },
			{ label: "Flow identifier", key: "flowidentifier" },
			{ label: "Flow name", key: "flowname" },
			{ label: "Priority", key: "priority" },
			{ label: "Status", key: "status" },
			{ label: "Protocol", key: "protocol" },
			{ label: "Source application", key: "sourceapp" },
			{ label: "Target application", key: "targetapp" },
			{ label: "Filename", key: "filename" },
		];

		
		return (

			<Card className="border border-white " style={{ width: '80%', marginLeft: 'auto' , marginRight: 'auto' , marginTop: '30px' }}>
				<Card.Header className="text-center texte-muted" >
					<div style={{ "textAlign": "right" }}>
						<Button variant="outline-info" className="border">
							< img src="https://image.flaticon.com/icons/png/128/617/617502.png" width="25" height="25"
								onClick={this.generateCSV} />
							<CSVLink headers={headers} filename="Report.csv" data={current}
								ref={this.csvLinkEl} />
						</Button>
						<Button className="border" variant="outline-info" style={{ "marginLeft": "10px" }}>
							< img src='https://www.adobe.com/content/dam/cc/en/legal/images/badges/PDF_32.png' width="25" height="25" onClick={this.generatePDF} />
						</Button>
						<Button className="border" variant="outline-info" style={{ "marginLeft": "10px" }}>
							< img src='data:image/png;base64,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' width="25" height="25" onClick={this.refreshPage} />
						</Button>
					</div>
				</Card.Header>
				<Card.Body>
					<Table id="table" hover size="sm" responsive border>
						<thead>
							<tr>
								<th>Start date</th>
								<th>End date</th>
								<th>Flow identifier</th>
								<th>Flow name</th>
								<th>Source application</th>
								<th>Target application</th>
								<th>Status</th>
								<th>Protocol</th>
							</tr>
						</thead>
						<tbody>
							{current.length === 0 ?
								<tr>
									<td colSpan="10"> Flows</td>
								</tr> :
								currentflow.map((current) => (
									<tr key={current.Id}>
										<td>{current.senddate} </td>
										<td>{current.enddate} </td>
										<td>{current.flowidentifier}</td>
										<td>{current.flowname}</td>
										<td>{current.sourceapp}</td>
										<td>{current.targetapp}</td>
										<td style={{ color: current.status === "Canceled" ? "red" : "green", 
											fontWeight: current.status === 'Canceled' ? "bold" : "lighter" }}>{current.status}</td>
										<td>{current.protocol}</td>

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

