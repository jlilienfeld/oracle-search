const React = require('react');
const ReactDOM = require('react-dom/client');
const client = require('./client');

import './app.css';
import {Header} from './Header'
import {SearchResults} from "./SearchResults";

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
            <main>
                <div className="flex h-screen overflow-hidden bg-dark dark:bg-dark ui-sans-serif text-white/50">
                    <div className="relative flex flex-col flex-1 overflow-hidden">
                        <Header/>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto max-w-9xl mx-auto">
                            <form onSubmit={this.onSearchTextSubmit}>
                                <div
                                    className="relative mr-[38px] hidden w-full max-w-[250px] lg:block"
                                >
                                    <input
                                        onChange={this.onSearchTextUpdated}
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full shadow-product rounded border border-body-color/30 bg-white/5 py-[5px] pl-4 pr-10 text-sm font-medium text-white/50 outline-none"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.5" clipPath="url(#clip0_1050_7232)">
                                                <path
                                                    d="M13.4313 12.1844L9.82188 9.25313C11.3094 7.21875 11.1563 4.30938 9.29688 2.47188C8.31251 1.4875 7.00001 0.940628 5.60001 0.940628C4.20001 0.940628 2.88751 1.4875 1.90313 2.47188C-0.131244 4.50625 -0.131244 7.83125 1.90313 9.86563C2.88751 10.85 4.20001 11.3969 5.60001 11.3969C6.93438 11.3969 8.18126 10.8938 9.16563 9.99688L12.8188 12.95C12.9063 13.0156 13.0156 13.0594 13.125 13.0594C13.2781 13.0594 13.4094 12.9938 13.4969 12.8844C13.6719 12.6656 13.65 12.3594 13.4313 12.1844ZM5.60001 10.4125C4.46251 10.4125 3.41251 9.975 2.60313 9.16563C0.940631 7.50313 0.940631 4.8125 2.60313 3.17188C3.41251 2.3625 4.46251 1.925 5.60001 1.925C6.73751 1.925 7.78751 2.3625 8.59688 3.17188C10.2594 4.83438 10.2594 7.525 8.59688 9.16563C7.80938 9.975 6.73751 10.4125 5.60001 10.4125Z"
                                                    fill="white"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1050_7232">
                                                    <rect
                                                        width="14"
                                                        height="14"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </button>
                                </div>
                            </form>

                            <div>
                                Search results
                                for <b>{this.state.searchText ? this.state.searchText : ""}</b>:
                            </div>

                            <div className="w-full">
                                <SearchResults results={this.state.indexedFiles}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById('react'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
