import React from 'react'
import style from '../../../res/styles/loader.scss';

export default class Loader extends React.Component {
    render() {
        return (
            <div>
                <style jsx>{style}</style>
                <div id="waiting-loader">
                    <div className="circle-multiple">
                        <div className="circle"/>
                        <div className="circle"/>
                        <div className="circle"/>
                    </div>
                </div>
            </div>
        );
    }
};
