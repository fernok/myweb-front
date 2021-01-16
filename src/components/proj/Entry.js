import React from 'react';
import '../../css/Proj.css';

class DocumentBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {contents: ""};
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

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll = () => {
        var header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div className="proj-mainframe">
                <header className="proj-sub-title" onScroll={this.handleScroll}>
                    <div><span>Title</span></div>
                </header>
                <div className="proj-sur-body">
                    <div className="proj-vertical-fill">
                        <DocumentBody id={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Read;