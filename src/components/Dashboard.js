import React, { Component } from 'react';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap';
export default class Dashboard extends Component {
	renderMostActiveUsers = (users, company) => {
		let month = this.props.selectedMonth,
				numEmployees,
				sortedUsers,
				inActiveUsers = [],
				percentInactive;	
		sortedUsers = Object.keys(users).sort((a, b) => {
			return users[b].emailsSentLastNMonths[month] - users[a].emailsSentLastNMonths[month];
		});
		numEmployees = sortedUsers.length;
		sortedUsers = sortedUsers.map((user) => {
			if (users[user].emailsSentLastNMonths[month] === 0) inActiveUsers.push(user);
			return (
				<p key={user}>
					{user} <br/>
						<strong>
							<small>								
								{users[user].email}								
							</small>
						</strong>
					<br/>
					<i><small>{users[user].emailsSentLastNMonths[month]}{' emails sent this month'}</small></i>
				</p>
			)
		}).slice(0, 5);
		percentInactive =  Math.round(inActiveUsers.length / numEmployees * 100);
		company.percentInactive = percentInactive;
		return sortedUsers;		
	}
	renderCompanies = () => {
		return(
			this.props.lastNumberOfMonths.map((company, index) => {
				return (
					<tr className={index < 5 ? 'fa-top-5' : null}key={company.company_name}>
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

	renderTopWorkBuddies = () => {
		return this.props.topWorkBuddies.map((buddies, index) => {
			let buddyOne = buddies[0];
			let buddyTwo = buddies[1];
			return(
				<tr key={index}>
					<td style={{display: 'flex'}}>
					<span style={{width: '13.5em'}}>
						<strong>
							{buddyOne.name.first} {buddyOne.name.last} 
						</strong> 
						<br/>
						{buddyOne.email} 
					</span>
					<span>
						<strong>
							{buddyTwo.name.first} {buddyTwo.name.last}
						</strong> 
						<br/>
						{buddyTwo.email} 
					</span>
					</td>
				</tr>
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
						</ListGroup>
						<Table striped bordered condensed hover>
							<thead>
								<tr>															
									<th>Top 5 Pair Work Buddies</th>								
								</tr>
									{this.renderTopWorkBuddies()}					
							</thead>
						</Table>
			</div>
			</div>
		)
	}
}