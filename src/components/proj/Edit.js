import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../css/Proj.css';

class DocumentBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUpdated: false,
            contents: ""
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

        if (!data.success) console.log(data);

        this.setState({contents: data.contents});
    }

    async updateDocument() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: this.props.id, contents: this.state.contents}),
        };
        const response = await fetch('/proj/edit', requestOptions);

        const data = await response.json();

        if (data.success) this.setState({isUpdated: true});
    }

    componentDidMount() {
        this.getDocument();
    }

    render() {
        const targetUrl = '/p/' + this.props.id.toString();
        return (
            this.state.isUpdated ? 
            <Redirect to={targetUrl}/>
            : <form>
                <input type="textarea"></input>
                <button onClick={this.updateDocument}>Edit</button>
            </form>
        )
    }
}

class Edit extends React.Component {
    render() {
        return (
            <div className="proj-mainframe">
                <div className="proj-sur-body">
                    <div className="proj-vertical-fill">
                        <DocumentBody id={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Edit;