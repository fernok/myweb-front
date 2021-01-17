import React from 'react';
import '../../css/Proj.css';

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
                {this.state.contents}
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