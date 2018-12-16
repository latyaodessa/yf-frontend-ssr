import React from 'react'
import {connect} from "react-redux";
import ParticipantsView, {PARTICIPATS_VIEW} from './views/ParticipantsView'
import PhotoshootingView, {PHOTOSHOOTING_VIEW} from "./views/PhotoshootingView";
import AuthModalWindow from './../core/modal/auth/AuthModalWindow';
import {verifyLoggedInUser} from "../../services/CookieService";
import {
    getSubmissionByUUid,
    initSubmission,
    updateSubmission,
    submit
} from "../../actions/submission/submissionActions";
import {Router} from './../../../routes';
import {PUBLISHED_PAGE} from '../user/profile/components/ProfileMainContent'
import {INIT_SUBMISSION_FULFILLED} from "../../constants/submission/supmissionConstants";

export const VIEWS = {
    PARTICIPATS_VIEW: PARTICIPATS_VIEW,
    PHOTOSHOOTING_VIEW: PHOTOSHOOTING_VIEW
};

class SubmissionViewsWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: {},
            currentView: VIEWS.PARTICIPATS_VIEW,
            showAuthPopUp: false,
            showInitPopUp: false,
            submission: null
        }

    }

    componentDidMount() {
        const uuid = new URLSearchParams(location.search).get('uuid');
        if (uuid) {
            verifyLoggedInUser().then(valid => {
                if (valid) {
                    this.props.dispatch(getSubmissionByUUid(uuid)).then(() => {
                        if (this.props.data != null) {
                            this.setState({
                                submission: this.props.data
                            })
                            console.log(this.state);
                        }
                    })
                } else {
                    this.setState({
                        showInitPopUp: true
                    })
                }
            })

        }
        window.scrollTo(0, 0);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        try {
            const uuid = new URLSearchParams(location.search).get('uuid');
            if (!uuid && nextProps.data) {
                nextProps.dispatch({type: INIT_SUBMISSION_FULFILLED, payload: null});
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    commitParticipants = (participants) => {

        this.setState({
            participants: participants
        });

        this.validateAndMakeFirstSubmit();

    };

    commitPhotoshooting = (description) => {

        console.log(description);
        console.log(this.state.submission);

        let sbms = this.state.submission;

        sbms.city = description.city;
        sbms.country = description.country;
        sbms.eventDate = description.date;
        sbms.text = description.description;
        sbms.equipment = description.equipment;

        this.setState({submission: sbms});
        this.validateAndSubmit();
    };


    validateAndSubmit = () => {
        verifyLoggedInUser().then(valid => {
            if (valid) {
                const submission = this.state.submission;
                submission.allParticipants = this.state.participants;
                this.setState({
                    submission: submission
                });
                this.props.dispatch(submit(submission)).then(() => {
                    Router.pushRoute('profile', {goTo: PUBLISHED_PAGE});
                });
            } else {
                this.setState({
                    showAuthPopUp: true
                })
            }
        })
    };

    validateAndMakeFirstSubmit = () => {

        verifyLoggedInUser().then(valid => {
            if (valid) {
                if (this.state.submission) {
                    const submission = this.state.submission;
                    submission.allParticipants = this.state.participants;
                    this.setState({
                        submission: submission
                    });
                    this.props.dispatch(updateSubmission(submission)).then(() => {
                        Router.pushRoute('submission', {uuid: this.props.data.uuid});
                        this.goToPage(VIEWS.PHOTOSHOOTING_VIEW);
                    });
                } else {
                    console.log(this.state);
                    this.props.dispatch(initSubmission(this.state.participants)).then(() => {
                        this.setState({
                            submission: this.props.data
                        });
                        console.log(this.props);
                        console.log(this.state);
                        Router.pushRoute('submission', {uuid: this.props.data.uuid});
                        this.goToPage(VIEWS.PHOTOSHOOTING_VIEW);
                    });
                }

            } else {
                this.setState({
                    showAuthPopUp: true
                })
            }
        })
    };

    goToPage = (page) => {
        this.setState({
            currentView: page
        })
    };

    render() {
        return (
            <div>
                {this.state.currentView === VIEWS.PARTICIPATS_VIEW
                &&
                <ParticipantsView commitParticipants={this.commitParticipants}/>}
                {this.state.currentView === VIEWS.PHOTOSHOOTING_VIEW
                && <PhotoshootingView goToPage={this.goToPage} commitPhotoshooting={this.commitPhotoshooting}
                                      participants={this.state.participants} initUuid={this.props.data.uuid}/>}

                {this.state && <AuthModalWindow
                    handleSubmit={this.validateAndMakeFirstSubmit}
                    showPopUp={this.state.showAuthPopUp}
                    close={() => this.setState({showAuthPopUp: false})}
                    type={this.state.error}/>}

                {this.state && <AuthModalWindow
                    handleSubmit={this.componentDidMount}
                    showPopUp={this.state.showInitPopUp}
                    close={() => this.setState({showInitPopUp: false})}
                    type={this.state.error}/>}


            </div>

        )
    }
}

function mapStateToProps(state) {
    const {submission} = state;
    console.log(submission);
    return submission;
}

export default connect(mapStateToProps)(SubmissionViewsWrapper);

