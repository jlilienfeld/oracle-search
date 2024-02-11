module.exports = {
    content: [require.resolve('react-widgets/styles.css'),
        "./src/main/resources/templates/public/index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
        ],
    theme: {
        extend: {},
    },
    plugins: [require('react-widgets-tailwind')({
        components: [
            'Listbox',
            'DropdownList',
            'Combobox',
            'Multiselect',
            'DatePicker',
            'Calendar',
            'TimeInput',
            'NumberPicker',
        ],
    })],
};