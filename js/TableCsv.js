export default class {
    /**
     * 
     * @param {HTMLTableElement} root The table element which will display CSV data.
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * 
     * @param {string[][]} data A 2D array of data to be used as the table body
     * @param {string[]} headerColumns List of headings to be user
     */
    update(data, headerColumns = []) {
        this.clear();
        this.setHeader(headerColumns);
        this.setBody(data);
    }

    /**
     * Clears all contents of the table (include the header).
     */
    clear() {
        this.root.innerHTML = "";
    }

    /**
     * Sets the table header
     * 
     * @param {string[]} headerColumns List of headings to be user
     */
    setHeader(headerColumns) {
        // join - remove all ','
        this.root.insertAdjacentHTML("afterbegin", `
            <thead>
                ${headerColumns.map(text => `<th>${text}</th>`).join("")}
            </thead>
        `);
    }

    /**
     * Sets the table body
     * 
     * @param {string[][]} data A 2D array of data to be used as the table body
     */
    setBody(data) {
        const rowsHtml = data.map(row => {
            return `
                <tr>
                    ${row.map(text => `<td>${text}</td>`).join("") }
                </tr>  
            `;
        });

        this.root.insertAdjacentHTML("beforeend", `
            <tbody>
                ${rowsHtml.join("")}
            </tbody>
        `);
    }
}