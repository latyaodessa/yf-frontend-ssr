import Head from 'next/head'
import React from 'react'
import Navbar from '../core/navbar'
import Footer from '../core/footer'
import Sidebar from '../core/sidebars/main-sidebar/sidebar'
// import Slider from "../home/components/slider";
import {initGA, logPageView} from '../../utils/analytics'

class MainLayoutWithNavigationSidebar extends React.Component {

    componentDidMount() {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true
        }
        logPageView()
    }

    render() {
        return (
            <div>
                <div>
                    <style jsx global>{`
        html,
        body {
          background: #FFF;
          margin: 0;
          padding: 0;
          font: 100% 'Noto Sans', sans-serif;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        h1 {
          position: relative;
          font-weight: 600;
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          overflow: hidden;



          &:before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 4em;

            //background-color: $color-black;
            animation: slide-in 1s ease-in both 0.5s;
          }

          &.no-underscore{
            &:before{
              display: none;
            }
          }
        }
        .child-container {
              display: flex;
              min-height: 100vh;
              flex-direction: column;
              margin-top: 5px;
              margin-bottom: 5px;
              align-items: center;
            }

        .wrapper {
          max-width: 1160px;
          //width:75%;
          margin: 0 auto;
          position: relative;
          display: inline-flex;

        }

        .content-wrapper {
          width: 100%;
        }

        .content {
          clear: both;
          overflow: auto;
          & h1 {
            margin-left: 5px;
          }
        }

        .grid-list-container{
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .swiper-container {
          z-index: 0;
        }



        /**
         * Animations
         */

        @keyframes slide-in {
          0% {
            transform: translate3d(-180%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .grig-img-container {
          background-color: transparent;
          border: 0;
          border-radius: 0;

        }

        .grig-img-container img {
          width: 100%;
          height: 265px;
          object-fit: cover;
          padding-left: 5px;
          padding-bottom: 5px;

        }

        /*Hover*/

        .hovereffect {
          /*float: left;*/
          overflow: hidden;
          position: relative;
          text-align: center;
          cursor: default;
        }

        .hovereffect .overlay {
          position: absolute;
          overflow: hidden;
          cursor: pointer;
          width: 80%;
          height: 80%;
          left: 10%;
          top: 10%;
          border-bottom: 1px solid #FFF;
          border-top: 1px solid #FFF;
          -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
          transition: opacity 0.35s, transform 0.35s;
          -webkit-transform: scale(0, 1);
          -ms-transform: scale(0, 1);
          transform: scale(0, 1);
        }

        .hovereffect:hover .overlay {
          opacity: 1;
          filter: alpha(opacity=100);
          -webkit-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
        }

        .hovereffect .grig-img {
          display: block;
          position: relative;
          -webkit-transition: all 0.35s;
          transition: all 0.35s;
        }

        .hovereffect:hover .grig-img {
          filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feComponentTransfer color-interpolation-filters="sRGB"><feFuncR type="linear" slope="0.6" /><feFuncG type="linear" slope="0.6" /><feFuncB type="linear" slope="0.6" /></feComponentTransfer></filter></svg>#filter');
          filter: brightness(0.6);
          -webkit-filter: brightness(0.6);
        }

        .hovereffect h2 {
          text-transform: uppercase;
          text-align: center;
          position: relative;
          font-size: 17px;
          background-color: transparent;
          color: #FFF;
          padding: 1em 0;
          opacity: 0;
          filter: alpha(opacity=0);
          -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
          transition: opacity 0.35s, transform 0.35s;
          -webkit-transform: translate3d(0, -100%, 0);
          transform: translate3d(0, -100%, 0);
        }.hovereffect .overlay

        .hovereffect a, .hovereffect p {
          color: #FFF;
          /*padding: 1em 0;*/
          /*opacity: 0;*/
          filter: alpha(opacity=0);
          -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
          transition: opacity 0.35s, transform 0.35s;
          -webkit-transform: translate3d(0, 100%, 0);
          transform: translate3d(0, 100%, 0);
        }

        .hovereffect:hover a, .hovereffect:hover p, .hovereffect:hover h2 {
          opacity: 1;
          filter: alpha(opacity=100);
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }

        //GRID
        .pure-g{
          text-align: center;
        }


        `}</style>

                    <div>
                        <Head>
                            <link rel="apple-touch-icon" sizes="57x57" href="/static/img/f/apple-icon-57x57.png"/>
                            <link rel="apple-touch-icon" sizes="60x60" href="/static/img/f/apple-icon-60x60.png"/>
                            <link rel="apple-touch-icon" sizes="72x72" href="/static/img/f/apple-icon-72x72.png"/>
                            <link rel="apple-touch-icon" sizes="76x76" href="/static/img/f/apple-icon-76x76.png"/>
                            <link rel="apple-touch-icon" sizes="114x114" href="/static/img/f/apple-icon-114x114.png"/>
                            <link rel="apple-touch-icon" sizes="120x120" href="/static/img/f/apple-icon-120x120.png"/>
                            <link rel="apple-touch-icon" sizes="144x144" href="/static/img/f/apple-icon-144x144.png"/>
                            <link rel="apple-touch-icon" sizes="152x152" href="/static/img/f/apple-icon-152x152.png"/>
                            <link rel="apple-touch-icon" sizes="180x180" href="/static/img/f/apple-icon-180x180.png"/>
                            <link rel="icon" type="image/png" sizes="192x192"
                                  href="/static/img/f/android-icon-192x192.png"/>
                            <link rel="icon" type="image/png" sizes="32x32" href="/static/img/f/favicon-32x32.png"/>
                            <link rel="icon" type="image/png" sizes="96x96" href="/static/img/f/favicon-96x96.png"/>
                            <link rel="icon" type="image/png" sizes="16x16" href="/static/img/f/favicon-16x16.png"/>
                            <meta charSet={this.props.meta.charset}/>
                            <meta name="description" content={this.props.meta.description}/>
                            <meta name="keywords" content={this.props.meta.keywords}/>
                            <link rel="canonical" href={this.props.meta.canonical}/>
                            <title>{this.props.meta.title}</title>
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
                            <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet"/>
                            <link rel="stylesheet"
                                  href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/css/swiper.min.css"/>
                            <link rel="stylesheet"
                                  href="https://unpkg.com/purecss@0.6.2/build/grids-responsive-min.css"/>
                            <link rel='stylesheet' href='/_next/static/style.css'/>
                        </Head>
                        <Navbar/>
                        {/*{{slider : Slider} = props && <Slider/>}*/}
                        <div className="child-container">
                            <div className="wrapper">
                                <div className="content-wrapper">
                                    {this.props.children}
                                </div>
                                <Sidebar/>
                            </div>
                        </div>
                        <Footer/>
                    </div>


                </div>
            </div>
        )
    }
}

export default MainLayoutWithNavigationSidebar;
