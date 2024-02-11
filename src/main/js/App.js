const React = require('react');
const ReactDOM = require('react-dom/client');
const client = require('./client');

import './app.css';

import {Header} from './Header'
import Combobox from "react-widgets/Combobox";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            indexedFiles: []};

        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    }

    componentDidMount() {
    }

    onSearchTextChanged(searchText) {
        client({method: 'GET', path: '/api/indexedFiles/search/findByContent?content='+searchText}).then(response => {
            this.setState({indexedFiles: response.entity._embedded.indexedFiles});
        });
    }

    render() {
        return (
            <div className="flex h-screen overflow-hidden">
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header
                            onSearchTextChanged={this.onSearchTextChanged}/>
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            <div>
                                Search results:
                            </div>

                            <div
                                className="mt-4 col-span-full bg-slate-500 shadow-lg rounded-sm border border-slate-200">
                                Results here.
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById('react'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
