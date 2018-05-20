import React from 'react';
import NativeGrid from './native-grid-component'
import SetsGrid from './sets-grid-component'
import TopNativeSlider from '../../../components/posts/lists/top-native-slider'
import {connect} from "react-redux";


class Grid extends React.Component {

    static initialAction() {
        return []
            .concat(TopNativeSlider.initialAction())
            .concat(NativeGrid.initialAction())
            .concat(SetsGrid.initialAction());
    }

    render() {
        //   console.log("GRID !!");
        // console.log(this.props);
        return (
            <div>
                {/*<TopNativeSlider/>*/}
                <NativeGrid/>
                {/*<NativeGrid width={this.props.width} mobileViewSize={this.props.mobileViewSize}/>*/}
                <SetsGrid/>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const {type} = state;
    console.log("GRID !!");
    console.log(state);
    return {}
}

export default connect(mapStateToProps)(Grid)
