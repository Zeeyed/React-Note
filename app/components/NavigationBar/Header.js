import React from 'react';

class Header extends React.Component {
    render(){
        return (
            <header id="top_header" className="clearfix">
                <div className="wrapper">
                    <h1 className="logo">Note</h1>
                    <nav id="main_nav">
                        <a href="#">Dashboard</a>
                        <a href="">Search</a>
                        <a href="">Settings</a>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;