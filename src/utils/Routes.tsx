import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthenticatedRoute from 'utils/AuthenticatedRoute'

import { url } from './constants';

import { Dashboard } from "pages/Dashboard/Dashboard";
import { SignIn } from "pages/SignIn/SignIn";
import { JobVacancies } from "pages/JobVacancies/JobVacancies";
import { CandidateSearch } from "pages/CandidateSearch/CandidateSearch";
import { ReportingStudio } from "pages/ReportingStudio/ReportingStudio";
import { UserSettings } from "pages/UserSettings/UserSettings";
import { Account } from "pages/Account/Account";

const DefaultRoute = () => (
    <div className="content-container">
        <h1>You look lost... 🙄</h1>
    </div>
)

export const Routes = () => {
    return (
        <Switch>
            <Route exact path={url.signIn} component={SignIn} />
            <AuthenticatedRoute exact path={'/'} component={Dashboard} />
            <AuthenticatedRoute exact path={url.dashboard} component={Dashboard} />
            <AuthenticatedRoute exact path={url.jobs} component={JobVacancies} />
            <AuthenticatedRoute path={url.candidates} exact component={CandidateSearch} />
            <AuthenticatedRoute path={url.studio} exact component={ReportingStudio} />
            <AuthenticatedRoute path={url.settings} exact component={UserSettings} />
            <AuthenticatedRoute path={url.account}exact component={Account} />
        </Switch>    
    )
}

{/* <Switch location={ location } key={ location.pathname }>
<Redirect exact from="/interview" to="/interview/dashboard" />
<Route path="/interview/dashboard" exact component={Dashboard} />
<Route path="/interview/jobs" exact component={JobVacancies} />

<Route path="/interview/jobs/:id">
    <SingleJob />
</Route>
</Switch> */}
