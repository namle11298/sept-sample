/*
    JS file for pageNotFound of react website
    Author: Rodrigo Miguel Rojas (s3784466)
 */
import React, {Component} from 'react';
import '../../assets/pageNotFound.css'

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1 className={'msg'}>ERROR 404: PAGE NOT FOUND</h1>
            </div>
        );
    }
}

export default PageNotFound;