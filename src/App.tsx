import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContext } from "./context";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { JobVacancies } from "./pages/JobVacancies/JobVacancies";
import { CandidateSearch } from "./pages/CandidateSearch/CandidateSearch";
import { ReportingStudio } from "./pages/ReportingStudio/ReportingStudio";
import { UserSettings } from "./pages/UserSettings/UserSettings";
import { Account } from "./pages/Account/Account";
import { SignIn } from "./pages/SignIn/SignIn";
import { SingleJob } from "./pages/SingleJob/SingleJob";

const App: React.FC<{}> = (): React.ReactElement => {
	const [loggedIn, setLoggedIn] = React.useState(false);
	
	return (
		<AppContext.Provider value={{ loggedIn, setLoggedIn }}>
				{!loggedIn ? (
					<SignIn />
				) : (
					<Router>
						<Sidebar />
						<Switch>
							<Route path="/interview/dashboard" exact component={Dashboard} />
							<Route path="/interview/jobs" exact component={JobVacancies} />
							<Route
								path="/interview/candidates"
								exact
								component={CandidateSearch}
							/>
							<Route
								path="/interview/studio"
								exact
								component={ReportingStudio}
							/>
							<Route
								path="/interview/settings"
								exact
								component={UserSettings}
							/>
							<Route path="/interview/account" exact component={Account} />
							<Route path="/interview/jobs/:id">
								<SingleJob />
							</Route>
						</Switch>
					</Router>
				)}
		</AppContext.Provider>
	);
}

export default App;