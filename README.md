# Inspire Coach AI App
# Frontend README

## Project Overview
This is the frontend for our AI-powered job coaching application. The application helps job seekers and coaches by breaking down tasks, sending smart reminders, generating progress reports, and improving accessibility through AI-driven communication tools.

## Features
- **AI Task Breakdown**: Breaks large tasks into smaller, actionable steps.
- **Smart Reminders**: Sends push notifications based on user behavior.
- **Progress Reports**: Generates reports for job coaches.
- **Accessibility Features**:
  - Voice-to-text & text-to-speech
  - AI-powered sign language interpretation
  - Speech simplification & summarization

## Tech Stack
- **Frontend**: React.js
- **Styling**: CSS/Tailwind
- **APIs Used**: Azure AI Services, Azure Speech Services, Azure Translator API

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- npm or yarn

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an **.env** file in the root directory and add necessary environment variables (API keys, backend URL, etc.). Example:
   ```sh
   REACT_APP_API_URL=http://localhost:5001/api
   REACT_APP_AZURE_SPEECH_KEY=your-key
   ```
4. Start the development server:
   ```sh
   npm start
   ```
   This will run the app at `http://localhost:3000/`

## Project Structure
```
frontend/
│── public/             # Static assets
│── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API calls
│   ├── utils/          # Helper functions
│   ├── styles/         # Styling files
│   ├── App.js          # Main App component
│   ├── index.js        # Entry point
│── .env                # Environment variables
│── package.json        # Project metadata and dependencies
```

## API Endpoints Used
The frontend communicates with the backend using the following endpoints:
- **User Routes**
  - `GET /api/users/` - Get all users
  - `GET /api/users/:id` - Get user by ID
  - `POST /api/users/coachsignup` - Create a coach account
  - `POST /api/users/userlogin` - User login
  - `POST /api/users/traineesignup` - Create a trainee account

## Running Tests
To run tests:
```sh
npm test
```

## Deployment
To build the application for production:
```sh
npm run build
```
This will generate an optimized build in the `build/` folder.

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Make your changes and commit.
4. Push to your fork and create a pull request.

## License
This project is licensed under the MIT License.

---

### Need Help?
For any issues, feel free to raise an issue on GitHub or contact the development team. 🚀
