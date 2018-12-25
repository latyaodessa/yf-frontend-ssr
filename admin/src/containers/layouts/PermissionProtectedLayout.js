import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import AuthForm from './../core/auth/AuthForm'
import './styles.scss';
import {verifyLoggedInUser} from "../core/auth/CookieService";

class PermissionProtectedLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false
        }


    }


    componentDidMount() {
        verifyLoggedInUser().then(valid => {
            this.setState({valid})
        })

    }

    render() {
        return this.state.valid ? <ChildRender props={this.props.children}/> : <AuthForm/>
        // verifyLoggedInUser().then(valid => {
        //     if (valid) {
        //         return ( <ChildRender props={this.props.children}/>
        //         )
        //     } else {
        //         return <AuthForm/>
        //     }
        // })


    }
}

const ChildRender = ({props}) => {
    return <div>
        <div>
            <div>
                <div className="child-container">
                    <div className="wrapper">
                        <div className="content-wrapper">
                            {props}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
}

export default PermissionProtectedLayout;
