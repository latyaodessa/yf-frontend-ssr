import React from 'react';
import {Link, Route} from 'react-router-dom';
import Home from '../home';
import About from '../about';
import Submission from '../submission';


const App = (props) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/submission">Submission</Link>
        </header>

        <main>
            {/*<Router>*/}
                {/*<Switch>*/}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about-us" component={About}/>
                    <Route exact path={"/submission"} component={Submission}/>
                    <Route exact path={"/submission/:userId/:uuid"} component={Submission}/>
                {/*</Switch>*/}
            {/*</Router>*/}
        </main>
    </div>
)

export default App
