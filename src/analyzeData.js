const conversations = require('./conversations.json');
export 
const appData = {
	sortedCompaniesByMonth: new Array(12).fill(0),
} 
const data = {}; // data for processing
const companies = {};
const userMap = {};
//configuration
for (let i = 0; i < conversations.companies.length; i++){
	let company = conversations.companies[i];
	companies[company.id] = company.name
}
/*
	when? 
	1: is what months
	2: what company
*/
for (let i = 0; i < conversations.users.length; i++) {
	let user = conversations.users[i];
	userMap[user.email] = {
		company_id: user.company_id,
		name: user.name
	}
}
const monthsAgo = (n) => {
	const timeNow = Date.now();
	return timeNow - (n * (2.682 * 1000000000));
}
const incrementAllSubsequentMonths = (month, company_id) => {
	for (let i = month; i < data[company_id].activityOfLastNMonths.length; i++) {
		data[company_id].activityOfLastNMonths[i]++;
	}
}
const incrementMonthlyActivityForCompany = (timeSent, company_id) => {
		if (timeSent > monthsAgo(1)) { // delete months 1 - 5? no data
			data[company_id].activityPerNMonth[1]++; 
		} else if (timeSent < monthsAgo(1) & timeSent > monthsAgo(2)) {
		} else if (timeSent < monthsAgo(2) & timeSent > monthsAgo(3)) {
		} else if (timeSent < monthsAgo(3) & timeSent > monthsAgo(4)) {
		} else if (timeSent < monthsAgo(4) & timeSent > monthsAgo(5)) {
			incrementAllSubsequentMonths(5, company_id);	
		} else if (timeSent < monthsAgo(5) & timeSent > monthsAgo(6)) {
			incrementAllSubsequentMonths(6, company_id)
			data[company_id].activityPerNMonth[6]++;				
		} else if (timeSent < monthsAgo(6) & timeSent > monthsAgo(7)) {
			incrementAllSubsequentMonths(7, company_id)
			data[company_id].activityPerNMonth[7]++;
		} else if (timeSent < monthsAgo(7) & timeSent > monthsAgo(8)) {
			incrementAllSubsequentMonths(8, company_id)
			data[company_id].activityPerNMonth[8]++;											
		} else if (timeSent < monthsAgo(8) & timeSent > monthsAgo(9)) {
			incrementAllSubsequentMonths(9, company_id)
			data[company_id].activityPerNMonth[9]++;													
		} else if (timeSent < monthsAgo(9) & timeSent > monthsAgo(10)) {
			incrementAllSubsequentMonths(10, company_id)
			data[company_id].activityPerNMonth[10]++;																	
		} else if (timeSent < monthsAgo(10) & timeSent > monthsAgo(11)) {
			incrementAllSubsequentMonths(11, company_id)
			data[company_id].activityPerNMonth[11]++;																	
		} else if (timeSent < monthsAgo(11) & timeSent > monthsAgo(12)) {
			incrementAllSubsequentMonths(12, company_id)
			data[company_id].activityPerNMonth[12]++;																
		}
}
const createDataStore = () => {
	let company;
	for (let i = 0; i < conversations.companies.length; i++) {
		company = conversations.companies[i];
		data[company.id] = {
			users: {},
			company_name: company.name,
			activityPerNMonth: new Array(12).fill(0),
			activityOfLastNMonths: new Array(12).fill(0),
			activeUsers: 0,			
		};
	}
	for (let j = 0; j < conversations.conversations.length; j++) {
		let conversation = conversations.conversations[j];			
		let fromUser = conversation.from; // only gets from user, probably needs to user to increment also
		let timeSent = conversation.date;
		const company_id = userMap[fromUser].company_id;
		let fullName = userMap[fromUser].name.first + ' ' + userMap[fromUser].name.last;
		data[company_id].users[fullName] = data[company_id].users[fullName] ? data[company_id].users[fullName] += 1 : 1;
		incrementMonthlyActivityForCompany(timeSent, company_id)		
	}	
}

createDataStore();

const topCompaniesSortedByLastNMonths = (n) => {
	return Object.keys(data).sort((a,b)=> {
		return data[a].activityOfLastNMonths[n] - data[b].activityOfLastNMonths[n];
	}).map((id) => companies[id]);
}

const calculateTopCompanies = () => {
	for (let i = 5; i < 13; i++) {
		appData.sortedCompaniesByMonth[i] = topCompaniesSortedByLastNMonths(i);
	}
};
calculateTopCompanies();
console.log(data)