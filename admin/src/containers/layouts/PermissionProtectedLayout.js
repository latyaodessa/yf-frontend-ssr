import React from 'react';
import 'semantic-ui-css/semantic.min.css';
// import Navbar from '../core/navbar'
// import Footer from '../core/footer'
// import Sidebar from '../core/sidebars/main-sidebar/sidebar'
// import Slider from "../home/components/slider";
import './styles.scss';

class PermissionProtectedLayout extends React.Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        {/*<Head>*/}
                            {/*<meta charSet={"utf-8"}/>*/}
                            {/*/!*<meta name="description" content={this.props.meta.description}/>*!/*/}
                            {/*/!*<meta name="keywords" content={this.props.meta.keywords}/>*!/*/}
                            {/*/!*<link rel="canonical" href={this.props.meta.canonical}/>*!/*/}
                            {/*/!*<title>{this.props.meta.title}</title>*!/*/}
                            {/*<meta name="viewport" content="width=device-width, initial-scale=1"/>*/}
                            {/*<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet"/>*/}
                        {/*</Head>*/}
                        {/*<Navbar/>*/}
                        {/*{{slider : Slider} = props && <Slider/>}*/}
                        <div className="child-container">
                            <div className="wrapper">
                                <div className="content-wrapper">
                                    {this.props.children}
                                </div>
                                {/*<Sidebar/>*/}
                            </div>
                        </div>
                        {/*<Footer/>*/}
                    </div>


                </div>
            </div>
        )
    }
}

export default PermissionProtectedLayout;
