import React from 'react';

export class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="sticky top-0 bg-gray-2 dark:bg-dark border-b border-slate-200 z-30">
                <div className="mx-auto w-full px-4 xl:container">
                    <div
                        className="flex items-center justify-between bg-dark dark:bg-dark-2 px-4 xl:px-[30px]"
                    >
                        <div className="mr-4 max-w-[100px] lg:mr-[58px]">
                            <a className="block">
                                <img src="/NAFO_OFAN_brain_damaged_cartoon_dogs.jpeg"
                                     alt="logo"/>
                            </a>
                        </div>
                        <div className="flex w-full items-center justify-end md:justify-between">
                            <div className="mr-4 hidden md:block">
                                <nav>
                                    <ul className="flex items-center space-x-10">
                                        <li>
                                            <a
                                                className="relative block px-[2px] text-sm font-medium text-white/50 hover:text-white duration-200 after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:rounded-t hover:after:bg-white/50"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="relative block px-[2px] text-sm font-medium text-white/50 hover:text-white duration-200 after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:rounded-t hover:after:bg-white/50"
                                            >
                                                Products
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="relative block px-[2px] text-sm font-medium text-white/50 hover:text-white duration-200 after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:rounded-t hover:after:bg-white/50"
                                            >
                                                Analytics
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="relative block px-[2px] text-sm font-medium text-white/50 hover:text-white duration-200 after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:rounded-t hover:after:bg-white/50"
                                            >
                                                Support
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div>
                                <div className="flex items-center justify-end">
                                    <div className="relative mr-3 hidden sm:block">
                                        <a
                                            className="block text-body-color dark:text-dark-6 hover:text-white"
                                        >
                                            <svg
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="fill-current"
                                            >
                                                <path
                                                    d="M17.5 3.3325H15.875V2.645C15.875 2.27 15.5625 1.92625 15.1562 1.92625C14.75 1.92625 14.4375 2.23875 14.4375 2.645V3.3325H5.53125V2.645C5.53125 2.27 5.21875 1.92625 4.8125 1.92625C4.40625 1.92625 4.09375 2.23875 4.09375 2.645V3.3325H2.5C1.4375 3.3325 0.53125 4.2075 0.53125 5.30125V16.1763C0.53125 17.2388 1.40625 18.145 2.5 18.145H17.5C18.5625 18.145 19.4687 17.27 19.4687 16.1763V5.27C19.4687 4.2075 18.5625 3.3325 17.5 3.3325ZM1.96875 9.14501H4.625V12.2388H1.96875V9.14501ZM6.03125 9.14501H9.3125V12.2388H6.03125V9.14501ZM9.3125 13.645V16.7075H6.03125V13.645H9.3125V13.645ZM10.7187 13.645H14V16.7075H10.7187V13.645ZM10.7187 12.2388V9.14501H14V12.2388H10.7187ZM15.375 9.14501H18.0312V12.2388H15.375V9.14501ZM2.5 4.73875H4.125V5.395C4.125 5.77 4.4375 6.11375 4.84375 6.11375C5.25 6.11375 5.5625 5.80125 5.5625 5.395V4.73875H14.5V5.395C14.5 5.77 14.8125 6.11375 15.2187 6.11375C15.625 6.11375 15.9375 5.80125 15.9375 5.395V4.73875H17.5C17.8125 4.73875 18.0625 4.98875 18.0625 5.30125V7.73875H1.96875V5.30125C1.96875 4.98875 2.1875 4.73875 2.5 4.73875ZM1.96875 16.145V13.6138H4.625V16.6763H2.5C2.1875 16.7075 1.96875 16.4575 1.96875 16.145ZM17.5 16.7075H15.375V13.645H18.0312V16.1763C18.0625 16.4575 17.8125 16.7075 17.5 16.7075Z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="relative mr-3 hidden sm:block">
                                        <a
                                            className="relative block text-body-color dark:text-dark-6 hover:text-white"
                                        >
                        <span
                            className="absolute -top-0.5 -right-0.5 block h-[10px] w-[10px] rounded-full border-[1.5px] border-dark dark:border-dark-2 bg-green"
                        ></span>
                                            <svg
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="fill-current"
                                            >
                                                <g clipPath="url(#clip0_1050_7236)">
                                                    <path
                                                        d="M18 17.5738L17.375 16.605C17.25 16.4175 17.1875 16.23 17.1875 16.0113V9.51125C17.1875 7.6675 16.4063 5.94875 14.9688 4.6675C13.8125 3.63625 12.3125 2.98 10.7187 2.855V2.23C10.7187 1.855 10.4062 1.51125 10 1.51125C9.625 1.51125 9.28125 1.82375 9.28125 2.23V2.82375C9.21875 2.82375 9.15625 2.82375 9.09375 2.855C5.46875 3.26125 2.75 6.1675 2.75 9.63625V16.0113C2.71875 16.3238 2.65625 16.48 2.59375 16.5738L2 17.5738C1.8125 17.8863 1.8125 18.2613 2 18.5738C2.1875 18.855 2.5 19.0425 2.84375 19.0425H9.3125V19.73C9.3125 20.105 9.625 20.4488 10.0312 20.4488C10.4062 20.4488 10.75 20.1363 10.75 19.73V19.0425H17.1875C17.5312 19.0425 17.8437 18.855 18.0312 18.5738C18.2188 18.2613 18.2187 17.8863 18 17.5738ZM3.59375 17.6363L3.8125 17.2613C4 16.9488 4.09375 16.5738 4.15625 16.1363V9.63625C4.15625 6.88625 6.34375 4.57375 9.25 4.26125C11.0312 4.07375 12.7812 4.605 14.0625 5.73C15.1875 6.73 15.8125 8.07375 15.8125 9.51125V16.0113C15.8125 16.48 15.9375 16.9175 16.2188 17.355L16.4062 17.6363H3.59375V17.6363Z"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1050_7236">
                                                        <rect width="20" height="20" fill="white"
                                                              transform="translate(0 0.980003)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="relative mr-[18px] hidden sm:block">
                                        <a
                                            className="relative block text-body-color dark:text-dark-6 hover:text-white"
                                        >
                        <span
                            className="absolute -top-0.5 -right-0.5 block h-[10px] w-[10px] rounded-full border-[1.5px] border-dark dark:border-dark-2 bg-green"
                        ></span>
                                            <svg
                                                width="20"
                                                height="21"
                                                viewBox="0 0 20 21"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="fill-current"
                                            >
                                                <path
                                                    d="M17.5 3.02H2.5C1.4375 3.02 0.53125 3.895 0.53125 4.98875V15.1138C0.53125 16.1763 1.40625 17.0825 2.5 17.0825H17.5C18.5625 17.0825 19.4687 16.2075 19.4687 15.1138V4.9575C19.4687 3.895 18.5625 3.02 17.5 3.02ZM17.5 4.42625C17.5312 4.42625 17.5625 4.42625 17.5937 4.42625L10 9.30125L2.40625 4.42625C2.4375 4.42625 2.46875 4.42625 2.5 4.42625H17.5ZM17.5 15.6138H2.5C2.1875 15.6138 1.9375 15.3638 1.9375 15.0513V5.80125L9.25 10.4888C9.46875 10.645 9.71875 10.7075 9.96875 10.7075C10.2187 10.7075 10.4687 10.645 10.6875 10.4888L18 5.80125V15.0825C18.0625 15.395 17.8125 15.6138 17.5 15.6138Z"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="group relative">
                                        <div className="h-7 w-7 cursor-pointer rounded-full">
                                            <img
                                                src="/nafo_logo2.jpg"
                                                alt="avatar"
                                                className="h-full w-full rounded-full object-cover object-center"
                                            />
                                        </div>
                                        <div
                                            className="invisible absolute right-0 top-[120%] mt-3 w-[200px] space-y-2 rounded bg-white dark:bg-dark-2 p-3 opacity-0 shadow-card-2 duration-200 group-hover:visible group-hover:top-full group-hover:opacity-100"
                                        >
                                            <a
                                                className="block rounded px-4 py-2 text-sm font-medium text-body-color dark:text-dark-6 hover:bg-gray-2 dark:hover:bg-dark hover:text-primary"
                                            >
                                                Account Settings
                                            </a>
                                            <a
                                                className="block rounded px-4 py-2 text-sm font-medium text-body-color dark:text-dark-6 hover:bg-gray-2 dark:hover:bg-dark hover:text-primary"
                                            >
                                                Dashboard
                                            </a>
                                            <a
                                                className="block rounded px-4 py-2 text-sm font-medium text-body-color dark:text-dark-6 hover:bg-gray-2 dark:hover:bg-dark hover:text-primary"
                                            >
                                                Sign Out
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>);
    }
}
