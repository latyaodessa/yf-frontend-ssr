import React from 'react';
import {Link, Route} from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Submission from '../submission';
import {Button} from 'semantic-ui-react'
import {cleanUserCookies, verifyLoggedInUser} from "../core/auth/CookieService";


class LoginButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
    }
    }

    logout = () => {
        cleanUserCookies().then(() => {
            window.location.reload();
        });
    };

    componentDidMount() {
        verifyLoggedInUser().then(valid => {
            this.setState({valid})
        })
    }

    render() {
        return this.state.valid ? <Button onClick={this.logout.bind(this)} secondary>Logout</Button> : <Button primary>Login</Button>;
    }

};

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/submission">Submission</Link>
            <div>
                <LoginButton/>
            </div>
        </header>

        <main>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about-us" component={About}/>
            <Route exact path={"/submission"} component={Submission}/>
            <Route exact path={"/submission/:userId/:uuid"} component={Submission}/>
        </main>
    </div>
)

export default App
