You are part of a frontend engineering team at Front tasked with building an analytics dashboard using Javascript to present the following information about Front's customers:

- [x] Top 5 of the most active companies in the last N months (N = 1 through 6). We measure how active a company is by their number of conversations.
- [x] Top 5 of the most active users per company for these companies.
- [ ] Top 5 pairs of work buddies. We should look at which pair of users talk the most to each other. Be sure to look at both To & Bcc fields.
	- Create a key value
- [x] Percent of inactive users per company in the last N months (N = 1 through 6). An inactive user is a user who has not initiated any conversation in that time period.
- [x] Total number of conversations sent per month.
Your data team has made available a JSON API endpoint that returns data as in conversations.json.

You can either have your frontend app use the JSON file directly, or return it through a node server.