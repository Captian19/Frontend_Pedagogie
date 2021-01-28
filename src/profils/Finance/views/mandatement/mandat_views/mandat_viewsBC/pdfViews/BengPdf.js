import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";

export default class BengPdf extends Component {
    constructor(props) {
        super(props);
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        this.state = {url:'',numPages: null, pageNumber: 1};
    }

    componentDidMount(){
        fetch(`http://localhost:8000/mandatement/uploadBonEngagementBc/${this.props.match.params.idBE}`)
            .then(res => res.json())
            .then(data => this.setState({url:data.file_uploaded}))
            .catch(err => console.error(err));
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <nav className="text-center mb-2">
                            <button  className="btn btn-github" onClick={this.goToPrevPage}>Prev</button>
                            <button  className="btn btn-facebook" onClick={this.goToNextPage}>Next</button>
                        </nav>
                        <div style={{ width: 800 }}>
                            <Document
                                file={this.state.url}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} width={800} />
                            </Document>
                        </div>

                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
