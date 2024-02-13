import React from 'react';

export class SingleSearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mb-10 overflow-hidden rounded-lg shadow-1 bg-dark-2 shadow-box-dark">
                <div
                    className="items-center justify-between border-b border-stroke px-6 pt-5 border-dark-3 sm:flex md:px-8">
                    <div className="mb-4 flex items-center">
                        <div className="mr-4 h-14 w-14 overflow-hidden rounded-full">
                            <img
                                src={this.props.img}
                                alt="type-logo"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-white">
                                {this.props.name}
                            </h3>
                            <p className="text-sm text-body-color text-dark-6">{this.props.date}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center">
                            <p className="mr-[10px] text-base font-medium text-white">
                                <span> {this.props.rating} </span>
                            </p>
                            <div className="flex items-center gap-1">
                                <span>Place to put some stuff</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-8 md:px-8">
                    <h4 className="mb-4 text-lg font-semibold text-white sm:text-xl">
                        {this.props.title}
                    </h4>
                    <p className="text-base text-body-color text-dark-6">{this.props.details}</p>
                </div>
            </div>
        )
    }
}