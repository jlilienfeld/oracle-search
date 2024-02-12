const React = require('react');
const ReactDOM = require('react-dom/client');
const client = require('./client');

import './app.css';

import {Header} from './Header'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            indexedFiles: [],
            searchText: null,
            searchTextInput: null,
            enableSearchButton: false
        };

        this.onSearchTextSubmit = this.onSearchTextSubmit.bind(this);
        this.onSearchTextUpdated = this.onSearchTextUpdated.bind(this);
    }

    componentDidMount() {
    }

    onSearchTextSubmit(formEvent) {
        formEvent.preventDefault();
        const searchText = this.state.searchTextInput;

        let newState = this.state;
        newState.enableSearchButton = false;
        this.setState(newState);
        console.log("Sending search request for " + searchText);
        client({method: 'GET', path: '/api/indexedFiles/search/findByContent?content='+searchText}).then(response => {
            this.setState(
                {
                    indexedFiles: response.entity._embedded.indexedFiles,
                    searchText: searchText,
                    enableSearchButton: false
                });
        });
    }

    onSearchTextUpdated(event) {
        const searchText = event.target.value;
        if (searchText) {
            let newState = this.state;
            newState.enableSearchButton = true;
            newState.searchTextInput = searchText;
            this.setState(newState);
        } else {
            let newState = this.state;
            newState.enableSearchButton = false;
            newState.searchTextInput = searchText;
            this.setState(newState);
        }
    }

    render() {
        return (
            <div className="flex h-screen bg-slate-900 ui-sans-serif text-slate-500 overflow-hidden">
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-9xl mx-auto">
                            <form onSubmit={this.onSearchTextSubmit}>
                                <div className="justify-center flex bg-slate-500 text-slate-800 space-x-4 p-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Search for text</label>
                                        <input onChange={this.onSearchTextUpdated} id="location"
                                               width="64"
                                               className="form-input bg-slate-400 w-full" type="text"/>

                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">&nbsp;</label>
                                        <div className="flex flex-wrap">
                                            <button type="submit" disabled={!this.state.enableSearchButton}
                                                    className="btn bg-slate-400 disabled:bg-slate-600 hover:bg-indigo-600">
                                                <span className="mx-2">Search</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div>
                                Search results
                                for <b>{this.state.searchText ? this.state.searchText : ""}</b>:
                            </div>

                            {
                                this.state.indexedFiles.map(indexedFile => (
                                    <div
                                        className="rounded-lg border-4 p-2 divide-h border-slate-500 grid grid-cols-3 text-lg">
                                        <div className="col-span-2 text-sky-400">{indexedFile.file.url}</div>
                                        <div className="text-indigo-300">Timestamp</div>
                                        <div className="border-t-2 p-2 text-slate-400 col-span-3">{indexedFile.content}</div>
                                    </div>
                                ))
                            }
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
