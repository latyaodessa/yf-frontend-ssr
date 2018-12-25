import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getPicsSubmission, getSubmissionImgPic} from "../../../actions/StorageActions";
import {Grid, Segment} from 'semantic-ui-react'
import './styles.scss';

class SubmissionImagesForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            imageFiles: null
        }

    }

    componentDidMount() {
        this.props.getPicsSubmission(this.props.uuid, this.props.userId).then(() => {
            this.setState({imageFiles: this.props.data});
        });
    }

    renderImages = () => {
        return this.state.imageFiles && this.state.imageFiles.length > 0 && <div className={"pics-container"}>
            <Grid stackable columns={1}>

                {this.state.imageFiles.map((file, index) => <Grid.Column
                    key={file.name + file.lastModified}>
                    <div className={"img-container"}>
                        <Segment style={{padding: 0}} basic>
                            <div>
                                <img onDragStart={this.preventDragHandler}
                                     src={file.uploaded ? getSubmissionImgPic(this.props.uuid, this.props.userId, file.name) : file.preview}/>
                            </div>
                        </Segment>
                    </div>
                </Grid.Column>)
                }

            </Grid>
        </div>
    };

    render() {
        console.log(this.state);
        return (<div>
            {this.renderImages()}
        </div>)
    }

}

const mapStateToProps = ({images}) => (
    images
);


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getPicsSubmission
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmissionImagesForm)
