import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import ButtonDropDown from './components/ButtonDropDown';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonthData: null,
			selectedMonth: null,
			isLoading: true,
			data: null,	
		}
	}
	onSelectMonth = (lastNumberOfMonths) => {
		this.setState({
			currentMonthData: this.state.data.sortedCompaniesByMonth[lastNumberOfMonths],
			selectedMonth: lastNumberOfMonths,
		})
	}
	componentDidMount = () => {
		const context = this;		
		axios.get('http://localhost:8080/')
			.then((res) => {
				return this.props.data.createDataStore(res.data); 				
			})
			.then((data) => {
				context.setState({
					currentMonthData: data.sortedCompaniesByMonth[5],
					selectedMonth: 5,
					isLoading: false,
					data: data,
				})				
			})
	}
  render() {
		const {currentMonthData, selectedMonth, isLoading, data}= this.state;
		if (isLoading) {
			return (
				<RingLoader
					color={'#123abc'} 
					loading={isLoading} 
				/>
			)
		} else {
			return (			
				<div className="app-container">
					<div className="fa-sidebar-container"/>
					<div className="fa-header">
						<h4>Front Analytics Dashboard</h4>
					</div>
					<div className="fa-main-container">
						<ButtonDropDown
							onSelectMonth={this.onSelectMonth}
							selectedMonth={selectedMonth}
						/>
						<Dashboard
							lastNumberOfMonths={currentMonthData}
							selectedMonth={selectedMonth}
							totalConversationsPerMonth={data.totalConversationsPerMonth}
							topWorkBuddies = {data.topWorkBuddies}
						/>									
					</div>
				</div>
			);
		}
  }
}

export default App;
