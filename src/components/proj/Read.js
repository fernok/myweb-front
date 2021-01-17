import React from 'react';
import ReactMarkdown from 'react-markdown';

import { Prism as SyntaxHighLighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

import '../../css/Proj.css';

const Component = ({ value, language }) => {
    return (
        <SyntaxHighLighter language={ language ?? null } style={ prism }>
            { value ?? "" }
        </SyntaxHighLighter>
    )
}

class MarkDownWindow extends React.Component {
    render() {
        return (
            <>
                <ReactMarkdown
                    children={this.props.contents}
                    renderers={{
                        code:Component,
                    }}
                    plugins={[gfm]}
                />
            </>
        )
    }
}

class DocumentBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: "",
        };
    }
    
    async getDocument() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: this.props.id}),
        };
        const response = await fetch('/proj', requestOptions);
    
        const data = await response.json();

        console.log(data);

        this.setState({
            contents: data.contents
        });

        this.props.onDataFetch(data.title);
    }

    componentDidMount() {
        this.getDocument();
    }

    render() {
        return (
            <>
                {/* {this.state.contents} */}
                <MarkDownWindow contents={this.state.contents} />
            </>
        )
    }
}

class Read extends React.Component {
    constructor(props) {
        super(props);

        this.state = {title: ""};
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll = () => {
        var header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    }

    handleTitleChange = (title) => {
        this.setState({title: title});
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const targetUrl = '/p/edit/' + this.props.match.params.id.toString();
        return (
            <div className="proj-mainframe">
                <header className="proj-sub-title" onScroll={this.handleScroll}>
                    <div><span className="proj-title-span">{this.state.title}</span><span className="proj-edit-button"><a href={targetUrl}>edit</a></span></div>
                </header>
                <div className="proj-sur-body">
                    <div className="proj-vertical-fill">
                        <DocumentBody id={this.props.match.params.id} onDataFetch={this.handleTitleChange}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Read;