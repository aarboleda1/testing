import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';
export default class CompanyList extends Component {
	constructor(props) {
		super(props);
	}	
	renderMostActiveUsers = (users, company) => {
		let month = this.props.selectedMonth
		let sortedUsers = Object.keys(users).sort((a, b) => {
			return users[b].emailsSentLastNMonths[month] - users[a].emailsSentLastNMonths[month];
		});
		let numEmployees = sortedUsers.length;
		let inActiveUsers = [];
		sortedUsers = sortedUsers.map((user) => {
			if (users[user].emailsSentLastNMonths[month] === 0) {
				inActiveUsers.push(user)
			}
			return (
				<p key={user}>
					{user}
					{/*{users[user].emailsSentLastNMonths[month]}*/}
				</p>
			)
		})
		let percentInactive =  Math.round(inActiveUsers.length / numEmployees * 100);
		company.percentInactive = percentInactive;
		return sortedUsers;
		
	}
	renderCompanies = () => {
		return(
			this.props.lastNumberOfMonths.map((company, index) => {
				return (
					<tr key={company.company_name}>
						<td>{index + 1}</td>
						<td>{company.company_name}</td>
						<td>
							{this.renderMostActiveUsers(company.users, company)}
						</td>
						<td>
							<strong>{company.percentInactive + '%'}</strong>
						</td>
					</tr>
				)
			})
		)
	}
	render() {
		const {selectedMonth, totalConversationsPerMonth} = this.props;
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
					<div className="fa-monthly-data-container">
						<ListGroup>
							<ListGroupItem header="Heading 1">
								<strong> Total Conversations this Month </strong>
								<br/>{totalConversationsPerMonth[selectedMonth]}
							</ListGroupItem>
							<ListGroupItem header="Heading 3">
								<strong>Top 5 pairs of work buddies</strong>
							</ListGroupItem>
						</ListGroup>
					</div>
			</div>
		)
	}
}