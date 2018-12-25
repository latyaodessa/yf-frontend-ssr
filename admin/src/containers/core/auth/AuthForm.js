import React from 'react'
import {connect} from 'react-redux'
import {Button, Form} from 'semantic-ui-react'
import {login} from "../../../actions/AuthActions";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {setAuthCookie} from "./CookieService";

class AuthForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {value: '', valid: true, errorMessage: ''},
            password: {value: '', valid: true, errorMessage: ''},
            error: null
        }
    }

    updateInputValue = (evt) => {
        this.setState({
            [evt.target.name]: {value: evt.target.value, valid: true}
        });
    };

    handleSubmit = (evt) => {

        this.setState({error: null});


        evt.preventDefault();
        if (this.state.email.value && this.state.password.value) {
            this.props.login(this.state.email.value, this.state.password.value).then(() => {
                if (this.props.error) {
                    this.setState({error: this.props.error.data});
                } else if (this.props.data) {
                    setAuthCookie(this.props.data.user, this.props.data.token);
                    window.location.reload(true);
                }
            });
        }
    };

    render() {
        return (<div>
                <h1>{this.state.error}</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Field>
                    <label>First Name</label>
                    <input onChange={evt => this.updateInputValue(evt)} name='email' placeholder='email'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={evt => this.updateInputValue(evt)} name='password' type='password'/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = ({login}) => {
    return login;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            goToDetails: (userId, uuid) => push(`/submission/${userId}/${uuid}`)
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm)

