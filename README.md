# Tours

## About The Project
A tour booking module for a real estate listings site, stress-tested with Artillery, New Relic, and Loader.io, and scaled for production. 
Initial: 1000 RPS at a 3-second response time on a single AWS EC2 T2 micro-instance
Final: 2000 RPS, 238 ms response time, 4 T2 micro-instances. 

- Achieved fast query times for structured data with multiple one-to-many relationships with a PostgreSQL database
- Improved query speed for last 10% of database from 14 sec to under 10 ms by indexing table ID
- Scaled deployed app with NGINX load balancing


Final test results (Loader.io): 
![image](https://user-images.githubusercontent.com/70930077/108565609-339bc300-72c2-11eb-903f-b878b46c12b2.png)

Final load test monitoring page (New Relic):
![image](https://user-images.githubusercontent.com/70930077/108565548-19fa7b80-72c2-11eb-8afa-e3d23bc65cf6.png)
