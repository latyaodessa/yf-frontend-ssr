import React from 'react'
import MainLayoutWithNavigation from '../src/components/layouts/MainLayoutWithNavigation'
import {connect} from 'react-redux'
import Examples from '../src/components/examples'
import Link from 'next/link'
import Grid from '../src/components/home/components/grid-pictures'
import {fetchTopNative} from '../src/actions/post/post-actions';

class Index extends React.Component {
    static getInitialProps({reduxStore, req}) {
        const isServer = !!req;
        // [].concat(Grid.initialAction()).forEach(action => reduxStore.dispatch(action));
        reduxStore.dispatch(fetchTopNative(0, 10));
        return {};
    }

    constructor(props) {
        super(props);
        // console.log(this.props);
    }


    componentDidMount() {
        const {dispatch} = this.props;
        console.log(this.props);

        // this.timer = startClock(dispatch)
    }

    componentWillUnmount() {
        // clearInterval(this.timer)
    }

    render() {
        return (
            <MainLayoutWithNavigation>

                {/*<div>*/}
                    {/*<ul>*/}
                        {/*<li><Link href='/blog?id=first' as='/blog/first'><a>My first blog post</a></Link></li>*/}
                        {/*<li><Link href='/blog?id=second' as='/blog/second'><a>My second blog post</a></Link></li>*/}
                        {/*<li><Link href='/blog?id=last' as='/blog/last'><a>My last blog post</a></Link></li>*/}
                    {/*</ul>*/}
                    {/*<Examples/>*/}
                {/*</div>*/}

                <div className="child-container">
                    <Grid/>
                </div>
            </MainLayoutWithNavigation>
        )
    }
}
export default connect()(Index)
