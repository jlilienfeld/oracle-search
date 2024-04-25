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
                            subject={result.meta.title}
                            author={result.meta.author}
                            language={result.meta.language}
                            date={result.meta.created}
                            fileextension={result.file.extension}
                            filetype={result.file.contentType}
                            title={result.file.url.substring(13)}
                            details={result.content}
                        />))
                }
                </div>
            </section>
        )
    }
}
