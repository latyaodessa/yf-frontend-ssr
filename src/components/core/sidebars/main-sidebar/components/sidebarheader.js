import React from 'react'
import {Link, withRouter} from 'react-router-dom'
// import YFImg from '../../../../../res/img/32/YF-white.png'

class SidebarHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userExist: localStorage.getItem('user_id') ? true : false
    }
  }

  getUserThumbnail() {
    return localStorage.getItem('user_thumbnail');
  }

  getUserName() {
    return [localStorage.getItem('user_first_name'), localStorage.getItem('user_last_name')].join(" ");
  }


  getLoggedInUserData() {
    return <div>
      <div className="sidebar-header">
        <Link to="/dashboard"><img className='avatar' src={this.getUserThumbnail()}/></Link>
        <div className="sidebar-header-text">
          <h1 className="no-underscore">{this.getUserName()}</h1>
        </div>
      </div>
      <div className='info'>
        <ul>
          <li>
            <Link to="/dashboard">Профайл</Link>
          </li>
          <li>
            <a onClick={this.logOut.bind(this)}>Выйти</a>
          </li>
        </ul>
      </div>
    </div>
  }

  navigateToLogin() {
    this.props.history.push('/login');
  }

  logOut() {
    localStorage.clear();
    this.props.history.push('/login');
  }

  getButton() {
    return <div>
      <a className="button yf" role="button" onClick={this.navigateToLogin.bind(this)}>
        <span>Войти</span>
        <div className="icon">
          {/*<img src={YFImg}/>*/}
        </div>
      </a>
    </div>
  }

  render() {
    return (
      <div>
        {this.state.userExist ? this.getLoggedInUserData()
          : this.getButton()}
      </div>
    )
  }
}

export default withRouter(SidebarHeader);
