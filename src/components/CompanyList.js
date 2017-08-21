import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';
export default class CompanyList extends Component {
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
	renderTopFiveWorkBuddies = () => {
		return this.props.topWorkBuddies.map((buddies, index) => {
			let buddyOne = buddies[0];
			let buddyTwo = buddies[1];
			return (
				<span className="fa-buddy-container"key={buddyOne.email}>
				<span className="fa-name-container">
							<span className="fa-number"><strong>{index + 1}</strong></span>
							<span style={{marginRight: '10px'}}>
								<strong>{buddyOne.name.first} {' '}
									{buddyOne.name.last} <br/>
								</strong>
								{buddyOne.email}
							</span>
							<span>
								<strong>
									{buddyTwo.name.first} {' '}
									{buddyTwo.name.last} <br/>						
								</strong>
								{buddyTwo.email}
							</span>
						</span>
					<br/>
				</span>
			)
		})
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
							<ListGroupItem header={`Total Conversations last ${selectedMonth} months`}>
								<br/>{totalConversationsPerMonth[selectedMonth]}
							</ListGroupItem>
							<ListGroupItem header="Top 5 pair of work buddies">
									{this.renderTopFiveWorkBuddies()}
							</ListGroupItem>
						</ListGroup>
					</div>
			</div>
		)
	}
}