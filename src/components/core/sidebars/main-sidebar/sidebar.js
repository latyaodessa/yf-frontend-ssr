import React from 'react'
import {Link} from 'react-router-dom'
import SidebarHeader from './components/sidebarheader'

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // width: window.innerWidth,
      mobileViewSize: 850,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    // window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    // this.setState({
      // width: window.innerWidth
    // })
  }

  getSideBar() {
    return <div className="sidebar">
      <div className='profile'>
        <SidebarHeader/>
      </div>
    </div>
  }


  render() {
    let sidebar = this.state.width > this.state.mobileViewSize ? this.getSideBar() : '';

    return (
      <div>
        {sidebar}
      </div>
    )
  }
};
