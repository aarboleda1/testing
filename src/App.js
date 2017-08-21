import React, { Component } from 'react';
import CompanyList from './components/CompanyList';
import ButtonDropDown from './components/ButtonDropDown';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: props.data.appData.sortedCompaniesByMonth[5],		
			selectedMonth: 5,	
		}
		this.monthMapper = {
			5: props.data.appData.topFiveInLastFiveMonths,
			6: props.data.appData.topFiveInLastSixMonths,
			7: props.data.appData.topFiveInLastSevenMonths,
			8: props.data.appData.topFiveInLastEightMonths,
			9: props.data.appData.topFiveInLastNineMonths,
			10: props.data.appData.topFiveInLastTenMonths,
			11: props.data.appData.topFiveInLastElevenMonths,
			12: props.data.appData.topFiveInLastTwelveMonths,
		}
	}
	onSelectMonth = (lastNumberOfMonths) => {
		this.setState({
			currentMonth: this.props.data.appData.sortedCompaniesByMonth[lastNumberOfMonths],
			selectedMonth: lastNumberOfMonths,
		})
	}
	componentDidMount = () => {
	}
  render() {
		const {data} = this.props;
		const {currentMonth, selectedMonth}= this.state;
    return (
      <div className="app-container">
				<div className="fa-sidebar-container"/>
				<div className="fa-header">
					<h4>Front Analytics Dashboard</h4>
				</div>
				<div className="fa-main-container">
					<ButtonDropDown
						onSelectMonth={this.onSelectMonth}
						selectedMonth={this.state.selectedMonth}
					/>
					<CompanyList
						lastNumberOfMonths={currentMonth}
						selectedMonth={selectedMonth}
						totalConversationsPerMonth={data.appData.totalConversationsPerMonth}
						topWorkBuddies = {data.appData.topWorkBuddies}
					/>									
				</div>

      </div>
    );
  }
}

export default App;
