import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';

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

class EditingWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {input: ""};
    }

    handleChange(e) {
        this.setState({input: e.target.value});
        this.props.onMDEdit(e.target.value);
    }

    render() {
        return (
            <div className="proj-edit-sur">
            <textarea className="proj-edit-textarea" value={this.props.defaultContents} onChange={(e) => this.handleChange(e)}></textarea>
            <ReactMarkdown 
                className="proj-edit-markdown" 
                children={this.state.input}
                renderers={{
                    code:Component,
                }}
                plugins={[gfm]}
            />
        </div>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            contents: "",
            userDidSubmit: false,
            editDidSuccess: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async getDocument() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: this.props.id}),
        };
        const response = await fetch('/proj', requestOptions);
    
        const data = await response.json();

        this.setState({
            title: data.title,
            description: data.description,
            contents: data.contents
        });
    }

    handleMDChange = value => {
        this.setState({contents: value});
    }

    handleSubmit = async e => {
        // console.log(this.state);
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.id, 
                title: this.state.title,
                description: this.state.description,
                contents: this.state.contents
            }),
            credentials: 'include'
        };
        const response = await fetch('/proj/edit', requestOptions);

        const data = await response.json();

        if (data.success) {
            this.setState({
                userDidSubmit: true,
                editDidSuccess: true,
            })
        } else {
            this.setState({
                userDidSubmit: true,
                editDidSuccess: false,
            })
        }
    }

    componentDidMount() {
        this.getDocument();
    }

    render() {
        const successUrl = '/p/' + this.props.id.toString();
        return (
            this.state.userDidSubmit ? 
            (this.state.editDidSuccess ? 
                <Redirect to={successUrl} />
                : <Redirect to='/auth/signin' />)
            : <form onSubmit={this.handleSubmit}>
                <div className="proj-edit-title-sur"><input 
                    className="proj-edit-title-input" 
                    type="text" 
                    value={this.state.title}
                    onChange={(e)=>this.setState({title: e.target.value})}
                /></div>
                <div className="proj-edit-desc-sur"><input 
                    className="proj-edit-desc-input" 
                    type="text" 
                    value={this.state.description}
                    onChange={(e)=>this.setState({description: e.target.value})}
                /></div>
                <EditingWindow defaultContents={this.state.contents} onMDEdit={this.handleMDChange}/>
                <div className="proj-edit-button-sur">
                    <button className="proj-edit-submit-button" type="submit">Edit!</button>
                </div>
            </form>
        )
    }
}


class Edit extends React.Component {
    render() {
        return (
            <div className="proj-edit-mainframe">
                <div className="proj-edit-sur-body">
                    <Form id={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}

export default Edit;