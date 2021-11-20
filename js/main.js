import TableCsv from "./TableCsv.js";

const tableRoot = document.querySelector("#tableRoot");
const csvFileInput = document.querySelector("#fileInput");
const tableCsv = new TableCsv(tableRoot);

csvFileInput.addEventListener("change", (e) => {
    Papa.parse(csvFileInput.files[0], {
        delimiter: ";",
        skipEmptyLines: true,
        complete: (results) => {
            tableCsv.update(results.data.slice(1), results.data[0]);
            console.log(results);
          }
    });
});