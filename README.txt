Description:
This project is a full-stack web application consisting of a Flask backend and a React frontend. 
The following features have been fully implemented:
User Authentication: Signing Up, Logging In, maintaining a user session
Explore Page: Uses the CrawlBase API to scrape Groupon events upon every refresh, presented as small cards and one large featured event. Also retrieves initial information about who all is attending an event. 
Event Details Page:
- Displays full event details for each event and uses the CrawlBase API to scrape the event description for a specific event once clicked.
- Allows users to join a Groupchat for the event, which does 2 things:
  - Provides the groupchat link (or generates a new one using the GroupMe API) for the event where users can communicate
  - Stores the information for who is attending each event (using the unique identifier for a user and unique identifier for the event) once they have joined the groupchat, and retrieves that data to show the user a list of who else is attending

We also have static implementations of the profile and calendar pages. 

How to run the project:
Backend: cd backend, source groupon_env/bin/activate, python app.py, flask should host the backend server at http://localhost:5000.
Frontend: cd frontend, cd free-for-friends, npm start. React should host the frontend at http://localhost:3000.
