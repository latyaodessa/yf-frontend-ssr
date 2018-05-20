import React from 'react'
import {connect} from 'react-redux'
import {startClock, serverRenderClock} from '../store'
import Examples from '../components/examples'
import Link from 'next/link'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
        <div>
            <ul>
                <li><Link href='/blog?id=first' as='/blog/first'><a>My first blog post</a></Link></li>
                <li><Link href='/blog?id=second' as='/blog/second'><a>My second blog post</a></Link></li>
                <li><Link href='/blog?id=last' as='/blog/last'><a>My last blog post</a></Link></li>
            </ul>
      <Examples />
        </div>
    )
  }
}

export default connect()(Index)
