import '../../css/Content.css';
import React from 'react';

import golangImgSrc from '../../img/golang.png';
import herokuImgSrc from '../../img/heroku.png';
import awsImgSrc from '../../img/aws2.png';
import swiftImgSrc from '../../img/swift.png';
import nodeImgSrc from '../../img/nodejs.png';
import apolloImgSrc from '../../img/apollo.png';
import graphqlImgSrc from '../../img/graphql.png';
import psqlImgSrc from '../../img/postgresql.png';

import emailImgSrc from '../../img/email.png';
import phoneImgSrc from '../../img/phone.png';
import githubImgSrc from '../../img/github.png';

class About extends React.Component {
    render() {
        return (
            <div className="contents-elements" id="contents-about">
                <h3>Welcome!</h3>
                <p>
                    
                </p>
            </div>
        );
    }
}

class Project extends React.Component {
    render() {
        const golangImg = <img 
            src={golangImgSrc}
            height='15'
            alt=""
        />;
        const herokuImg = <img
            src={herokuImgSrc}
            height='15'
            alt=""
        />;
        const awsImg = <img 
            src={awsImgSrc}
            height='15'
            alt=""
        />;
        const swiftImg = <img
            src={swiftImgSrc}
            height='15'
            alt=""
        />;
        const nodeImg = <img
            src={nodeImgSrc}
            height='15'
            alt=""
        />;
        const apolloImg = <img
            src={apolloImgSrc}
            height='15'
            alt=""
        />;
        const graphImg = <img
            src={graphqlImgSrc}
            height='15'
            alt=""
        />;
        const psqlImg = <img
            src={psqlImgSrc}
            height='15'
            alt=""
        />;
        return (
            <div className="contents-elements" id="contents-project">
                <h3>The projects throughout my college course</h3>
                <p id="subscript-p">click on the project title for more information</p>
                <h4><a href="/p/1" className="learn-more">Random BaekJoon</a> &nbsp;{golangImg} &nbsp;{herokuImg} &nbsp;</h4>
                <p>A service for fetching random BaekJoon problems for the given user.</p>
                <h4><a href="/p/2" className="learn-more">PNG Color Inversor</a> &nbsp;{golangImg} &nbsp;{awsImg}</h4>
                <p>A service that, given an input png, produces a color inverted version of the image.</p>
                <h4><a href="/p/3" className="learn-more">WitchWatch - iOS</a> &nbsp;{swiftImg} &nbsp;{apolloImg}</h4>
                <p>An iOS application for keeping track of the user's productive time and connects the productivity to donations. </p>
                <h4><a href="/p/4" className="learn-more">WitchWatch - Server</a> &nbsp;{nodeImg} &nbsp;{apolloImg} &nbsp;{graphImg} &nbsp;{herokuImg}</h4>
                <p>The server for project WitchWatch.</p>
                <h4><a href="/p/5" className="learn-more">WitchWatch - Database</a> &nbsp;{psqlImg} &nbsp;{awsImg}</h4>
                <p>The database server for project WitchWatch.</p>
            </div>
        );
    }
}

class Research extends React.Component {
    render() {
        return (
            <div className="contents-elements" id="contents-research">
                <h3>The researches I conducted</h3>
                this is research. 
            </div>
        );
    }
}

function ListItem(props) {
    return <li className="course-li"><span>COSE{props.id} </span>{props.title}</li>;
}

function FetchSemester(props) {
    const year = parseInt(props.semester / 10);
    const round = props.semester % 10;
    return (
        <h4>20{year}-{round}R</h4>
    );
}

function CourseList(props) {
    const courses = props.courses;
    var currentYear = 100;
    var listItems = [];

    for (const [, value] of Object.entries(courses)) {
        if (currentYear < value.semester) {
            listItems.push(<FetchSemester key={value.semester.toString()} semester={value.semester} />);
            currentYear = value.semester;
        }
        listItems.push(<ListItem key={value.id.toString()} id={value.id} title={value.title} />);
    }
    
    return (
        <ul className="course-ul">
            {listItems}
        </ul>
    );
}

class Course extends React.Component {
    render() {
        var leftHalf = [], rightHalf = [];

        for (let [, value] of Object.entries(this.props.courses)) {
            if (value.semester < 200) leftHalf.push(value);
            else rightHalf.push(value);
        }
        
        return (
            <div className="contents-elements" id="contents-course">
                <div>
                    <CourseList courses={leftHalf} />
                    <div className="righthalf-bottom"><CourseList courses={rightHalf} /></div>
                </div>
                <div className="righthalf-right">
                    <CourseList courses={rightHalf} />
                </div>
            </div>
        );
    }
}

class Contact extends React.Component {
    render() {
        const phoneImg = <img
            src={phoneImgSrc}
            height='27'
            width='27'
            alt=""
            id="contents-contact-img"
        />;
        const emailImg = <img
            src={emailImgSrc}
            height='27'
            width='27'
            alt=""
            id="contents-contact-img"
        />;
        const githubImg = <img
            src={githubImgSrc}
            height='27'
            width='27'
            alt=""
            id="contents-contact-img"
        />;
        return (
            <div className="contents-elements" id="contents-contact">
                <h3>Contact Me!</h3>
                <div className="contents-contact-sur-img-div">
                    <div>{phoneImg}<span>010-5112-8199</span></div>
                    <div>{emailImg}<span>minkim918@gmail.com</span></div>
                    <div>{githubImg}<span>https://github.com/fernok</span></div>
                </div>
            </div>
        );
    }
}

class BlankFill extends React.Component {
    render() {
        return (
            <div className="contents-elements" id="blank-fill" >a</div>
        )
    }
}

export {
    About,
    Project,
    Research,
    Course,
    Contact,
    BlankFill,
};