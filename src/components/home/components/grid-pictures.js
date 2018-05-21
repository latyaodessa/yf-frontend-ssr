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
        return (
            <div>
                <NativeGrid/>
                <SetsGrid/>
            </div>
        )
    }
}

export default connect()(Grid)
