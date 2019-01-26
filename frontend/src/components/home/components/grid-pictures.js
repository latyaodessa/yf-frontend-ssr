import React from 'react';
import NativeGrid from './native-grid-component'
import SetsGrid from './sets-grid-component'
import {connect} from "react-redux";
import ExclustivePostsBigSlider from  "./../../posts/lists/ExclustivePostsBiglSlider";

class Grid extends React.Component {

    static initialAction() {
        return []
        // .concat(TopNativeSlider.initialAction())
            .concat(NativeGrid.initialAction())
            .concat(SetsGrid.initialAction());
    }

    componentDidMount() {
        this.setState({
            width: window.innerWidth,
            screen: screen.width
        });
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            screen: screen.width
        })
    }


    render() {
        return (
            <div>
                <ExclustivePostsBigSlider />
                <NativeGrid/>
                <SetsGrid/>
            </div>
        )
    }
}

export default connect()(Grid)
