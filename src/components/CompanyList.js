import React, { Component } from 'react';
import { Table, Button, Jumbotron, ListGroup, ListGroupItem } from 'react-bootstrap';
export default class CompanyList extends Component {	
	constructor(props) {
		super(props)
	}
	renderCompanies = () => {
		return(
			this.props.lastNumberOfMonths.map((company, index) => {
				return (
					<tr key={company}>
						<td>{index + 1}</td>
						<td>{company}</td>
						<td>
							{'hello'}<br/>
							{'hello'}<br/>
							{'hello'}<br/>
							{'hello'}<br/>
							{'hello'}<br/>
						</td>
						<td>@mdo</td>
					</tr>
				)
			})
		)
	}
	render() {
		const {} = this.props;
		return(
			<div className="fa-dashboard-container">
					<div className="fa-top-5-container-list">
						<Table striped bordered condensed hover>
							<thead>
								<tr>
								<th>#</th>
								<th>Company</th>
								<th>Top 5 users</th>
								<th>% Inactive Users</th>
							</tr>
							</thead>
							<tbody>
								{this.renderCompanies()}
							</tbody>
							</Table>					
					</div>
					<div className="fa-global-data">
						<ListGroup>
							<ListGroupItem header="Heading 1">Total Conversations</ListGroupItem>
							<ListGroupItem header="Heading 3" bsStyle="danger">Danger styling</ListGroupItem>
						</ListGroup>
					</div>
			</div>
		)
	}
}