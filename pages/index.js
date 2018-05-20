import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Grid from '../src/components/home/components/grid-pictures'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'


class Index extends React.Component {
    static async getInitialProps({store, isServer}) {

        await Promise.all([].concat(Grid.initialAction()).map(async (action) => {
            await store.dispatch(action);
        }));

        return {isServer}
    }

    componentDidMount() {
        // this.timer = this.props.startClock()
    }

    componentWillUnmount() {
        // clearInterval(this.timer)
    }

    render() {
        return (
            <MainLayoutWithNavigation>
                <div className="child-container">
                    <Grid/>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     topNativeFuckYou: bindActionCreators(fetchTopNative(0,10), dispatch),
//     // startClock: bindActionCreators(startClock, dispatch)
//   }
// }

// export default connect(null, mapDispatchToProps)(Counter)
export default connect()(Index)
