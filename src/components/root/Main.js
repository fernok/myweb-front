import '../../css/Main.css';
import React from 'react';
import { About, Project, Research, Course, Contact, BlankFill } from './Content.js';

// const returnStyle = (menu) => {
//     switch (menu) {
//         case "ABOUTME":
//             return [1, <About />];
//         case "PROJECT":
//             return [2, <Project />];
//         case "RESEARCH":
//             return [3, <Research />];
//         case "COURSE":
//             return [4, <Course />];
//         case "CONTACT":
//             return [5, <Contact />];
//         default:
//             break;
//     }
// }

class Title extends React.Component {
    render () {
        const title = this.props.title === "ABOUTME" ? "ABOUT ME" : this.props.title;
        return (
            <div className="sur-title-bar">
                {
                    this.props.isAuthorized ? 
                    <span className="login-bar">
                        <span>Welcome, <span className="title-username-span">{this.props.username}</span>!</span>
                        <a className="login-button" href="/auth/signout">Sign Out</a>
                    </span>
                    :
                    <span className="login-bar">
                        <a className="login-button" href="/auth/signin">Sign In</a>
                        <a className="login-button" href="/auth/signup">Sign Up</a>
                    </span>
                }
                <span className="title-bar unselectable">{title}</span>
            </div>
        )
    }
}

class MainImage extends React.Component {
    render() {
        return (
            <div className="sur-main-image">
                <Title title={this.props.title} isAuthorized={this.props.isAuthorized} username={this.props.username}/>
            </div>
        )
    }
}

class Contents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
        };
    }

    async getCourses() {
        const requestOptions = {
            method: 'GET'
        };
        const response = await fetch('/course', requestOptions);

        const data = await response.json();
        
        this.setState({courses: data});
    }

    componentDidMount() {
        this.getCourses();
    }

    render() {
        return (
            <>
                <About />
                <Project />
                <Research />
                <Course courses={this.state.courses} />
                <Contact />
                <BlankFill />
            </>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu:"ABOUTME",
            username: 'guest',
            isAuthorized: false,
            courses: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async checkUser() {
        const requestOptions = {
            method: 'GET',
            credentials: 'include'
        };
        const response = await fetch('/auth', requestOptions);
        
        const data = await response.json();
        if (data.isLoggedIn) {
            this.setState({isAuthorized: true, username: data.username});
        } else {
            this.setState({isAuthorized: false, username: 'guest'});
        }
    }

    componentDidMount() {
        this.checkUser();
    }

    handleChange(e) {
        const innerText = e.target.innerText.toUpperCase().replace(/\s/g,'');

        this.setState(() => ({
            menu: innerText,
        }));
    }

    render () {
        const menu = this.state.menu;

        return (
            <div className="mainframe">
                <MainImage title={menu} isAuthorized={this.state.isAuthorized} username={this.state.username}/>
                <div className="sur-menu-list">
                    <ul className="menu-ul">
                        <li className="menu-li"><a className="menu-button" onClick={(e) => this.handleChange(e)} href="#contents-about">about me</a></li>
                        <li className="menu-li"><a className="menu-button" onClick={(e) => this.handleChange(e)} href="#contents-project">project</a></li>
                        <li className="menu-li"><a className="menu-button" onClick={(e) => this.handleChange(e)} href="#contents-research">research</a></li>
                        <li className="menu-li"><a className="menu-button" onClick={(e) => this.handleChange(e)} href="#contents-course">course</a></li>
                        <li className="menu-li"><a className="menu-button" onClick={(e) => this.handleChange(e)} href="#contents-contact">contact</a></li>
                    </ul>
                    <div className="burger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="sur-contents">
                    <div className="contents-vertical-fill">
                        <Contents />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;