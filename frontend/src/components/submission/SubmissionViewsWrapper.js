import React from 'react'
import {connect} from "react-redux";
import ParticipantsView, {PARTICIPATS_VIEW} from './views/ParticipantsView'
import PhotoshootingView, {PHOTOSHOOTING_VIEW} from "./views/PhotoshootingView";
import AuthModalWindow from './../core/modal/auth/AuthModalWindow';
import {verifyLoggedInUser} from "../../services/CookieService";

const VIEWS = {
    PARTICIPATS_VIEW: PARTICIPATS_VIEW,
    PHOTOSHOOTING_VIEW: PHOTOSHOOTING_VIEW
};

class SubmissionViewsWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: {},
            currentView: VIEWS.PARTICIPATS_VIEW,
            showAuthPopUp: false
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    commitParticipants = (participants) => {

        verifyLoggedInUser().then(valid => {
            if (valid) {
                this.setState({
                    participants: participants
                });
                this.goToNextPage();
            } else {
                this.setState({
                    participants: participants,
                    showAuthPopUp: true
                })
            }
        })


    };

    goToNextPage = () => {
        console.log(this.state);
        this.setState({
            currentView: VIEWS.PHOTOSHOOTING_VIEW
        })
    };

    render() {
        return (
            <div>
                {this.state.currentView === VIEWS.PARTICIPATS_VIEW
                && <ParticipantsView commitParticipants={this.commitParticipants}/>}
                {this.state.currentView === VIEWS.PHOTOSHOOTING_VIEW
                && <PhotoshootingView participants={this.state.participants}/>}

                {this.state && <AuthModalWindow
                    handleSubmit={this.goToNextPage}
                    showPopUp={this.state.showAuthPopUp}
                    close={() => this.setState({showAuthPopUp: false})}
                    type={this.state.error}/>}

            </div>

        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(SubmissionViewsWrapper);

