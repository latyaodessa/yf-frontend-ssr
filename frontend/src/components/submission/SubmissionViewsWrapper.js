import React from 'react'
import {connect} from "react-redux";
import ParticipantsView, {PARTICIPATS_VIEW} from './views/ParticipantsView'
import PhotoshootingView, {PHOTOSHOOTING_VIEW} from "./views/PhotoshootingView";
import AuthModalWindow from './../core/modal/auth/AuthModalWindow';
import {verifyLoggedInUser} from "../../services/CookieService";
import {
    getSubmissionByUUid,
    initSubmission,
    submit,
    updateSubmission
} from "../../actions/submission/submissionActions";
import {Router, Link} from './../../../routes';
import {PUBLISHED_PAGE} from '../user/profile/components/ProfileMainContent'
import styles from './views/styles.scss'
import {BACK_TO_PROFILE_BUTTON, SUBMISSION_TITLE_ERROR, SUBMISSION_TITLE_TEXT} from "../../messages/submission";
import {Button} from "semantic-ui-react";
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

const INCOMPLETED = "INCOMPLETED";
const SEND_TO_REWORK = "SEND_TO_REWORK";

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

    commitParticipants = (participants) => {

        this.setState({
            participants: participants
        });

        this.validateAndMakeFirstSubmit();

    };

    commitPhotoshooting = (description) => {

        let sbms = this.state.submission;

        sbms.city = description.city;
        sbms.country = description.country;
        sbms.eventDate = description.date;
        sbms.about = description.about;
        sbms.equipment = description.equipment;
        sbms.title = description.title;

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
                    this.props.dispatch(initSubmission(this.state.participants)).then(() => {
                        this.setState({
                            submission: this.props.data
                        });
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
        if (this.state.submission && !(this.state.submission.status === INCOMPLETED || this.state.submission.status === SEND_TO_REWORK)) {
            return <div>
                <style jsx>{styles}</style>
                <div className={"title-header"}>
                    <h1>{SUBMISSION_TITLE_ERROR}</h1>
                    <div>
                        <Link route='profile'>
                            <Button content={BACK_TO_PROFILE_BUTTON}
                                    icon='right arrow' labelPosition='right'/>
                        </Link>
                    </div>
                </div>
            </div>
        }
        return (
            <div>
                <style jsx>{styles}</style>
                <div className={"title-header"}>
                    <h1>{SUBMISSION_TITLE_TEXT}</h1>
                </div>
                {this.state.currentView === VIEWS.PARTICIPATS_VIEW
                &&
                <ParticipantsView commitParticipants={this.commitParticipants}/>}
                {this.state.currentView === VIEWS.PHOTOSHOOTING_VIEW
                && <PhotoshootingView goToPage={this.goToPage} commitPhotoshooting={this.commitPhotoshooting}
                                      participants={this.state.participants} initUuid={this.props.data.uuid}
                                      submission={this.state.submission}/>}

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
    return submission;
}

export default connect(mapStateToProps)(SubmissionViewsWrapper);

