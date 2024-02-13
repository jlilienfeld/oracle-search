import React from 'react';

import {SingleSearchResult} from "./SingleSearchResult";

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="bg-gray-2 dark:bg-dark pb-1 pt-1 lg:pb-2 lg:pt-2">
                <div className="container mx-auto">
                {
                    this.props.results.map(result => (
                        <SingleSearchResult
                            img="/folder-icon.jpg"
                            name="PressTV Leak"
                            date="Date Here"
                            rating="FileType"
                            title={result.file.url}
                            details={result.content}
                        />))
                }
                </div>
            </section>
        )
    }
}
