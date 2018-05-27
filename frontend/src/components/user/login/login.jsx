import React from 'react';
import YFBrand from '../../../res/img/brand/youngfolks-logo.jpg';
import FaceBookLoginButton from '../login/facebook-login';
import VKLoginButton from '../login/vk-login';
import Redirector from '../login/redirector';

export default class LoginView extends React.Component {
  render() {
    const meta = {
      title: "Войти в Young Folks - Модели с Америки и Европы России",
      description: "Young Folks - Модели с Америки и Европы России Модельное Агенство для начинающих истории работа",
      canonical: "http://youngfolks.ru/dashboard",
      meta: {
        charset: 'utf-8',
        name: {
          keywords: "Модели, модельное агентсво, young folks, модели и фотогафы из Европы США Америка"
        }
      }
    }
    return (
      <div className="login-form">
        <img src={YFBrand} className="login-profile-img"/>
        <div className="profile-container">
          <Redirector/>
          <VKLoginButton/>
          <FaceBookLoginButton/>
        </div>
      </div>
    )
  }
}
