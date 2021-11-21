import TableBuilder from "./TableCsv.js";

const tableRoot = document.querySelector("#tableRoot");
const fileInput = document.querySelector("#fileInput"); // only .csv, .xlsx, .txt
const tableBuilder = new TableBuilder(tableRoot);

fileInput.addEventListener("change", (e) => {
    console.log(fileInput.files[0].name);

    if (fileInput.files[0].name.includes(".csv")) {
        Papa.parse(fileInput.files[0], {
            delimiter: ";",
            skipEmptyLines: true,
            complete: (results) => {
                tableBuilder.update(results.data.slice(1), results.data[0]);
                console.log(results);
              }
        });
    }
    else if (fileInput.files[0].name.includes(".xlsx")) {
        readXlsxFile(fileInput.files[0]).then(function(data) {
            tableBuilder.update(data.slice(1), data[0]);
            console.log(data);
        });
    }
});