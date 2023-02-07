import React, {Fragment} from 'react';


const NavBar = ({title, subtitle}) => {
    return (
        <Fragment>
            <header>
                <div className="container">
                    <h1>{title}<br/>
                        <small>{subtitle}</small>
                    </h1>
\
                </div>
            </header>
        </Fragment>
    );
};

export default NavBar;