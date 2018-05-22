import React from 'react'
import {connect} from 'react-redux'
import Grid from '../src/components/home/components/grid-pictures'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import meta from '../src/components/home/components/homeMetaGenerator'

class Index extends React.Component {
    static async getInitialProps({store, isServer}) {

        await Promise.all([].concat(Grid.initialAction()).map(async (action) => {
            await store.dispatch(action);
        }));

        return {isServer}
    }

    render() {
        return (
            <MainLayoutWithNavigation meta={meta}>
                <div className="child-container">
                    <Grid/>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}

export default connect()(Index)
