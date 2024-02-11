import React from 'react';
import Combobox from "react-widgets/Combobox";

export class Header extends React.Component {

    constructor(props) {
        super(props);

        this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
    }

    onSearchTextChanged(event) {
        this.props.onSearchTextChanged(event.target.value);
    }

    render() {
        return (
            <header className="sticky top-0 bg-slate-700 border-b border-slate-200 z-30">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 -mb-px">

                        {/* Header: Left side */}
                        <div className="flex items-center w-full">
                            <label className="block text-sm font-medium mb-1">Search for content:</label>
                            <input onChange={this.onSearchTextChanged}
                                   className="form-input bg-slate-400 w-full" type="text"/>
                        </div>

                        {/* Header: Right side */}
                        <div className="flex items-center space-x-3">
                            <div>
                                Place Holder 2
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        );
    }
}
