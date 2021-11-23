import TableBuilder from "./TableCsv.js";

const tableRoot = document.querySelector("#tableRoot");
const fileInput = document.querySelector("#fileInput"); // only .csv, .xlsx, .txt
const tableBuilder = new TableBuilder(tableRoot);

fileInput.addEventListener("change", (e) => {  
    let fileName = fileInput.files[0].name;
    console.log(fileName);

    if (fileName.includes(".csv")) {
        Papa.parse(fileInput.files[0], {
            delimiter: ";",
            skipEmptyLines: true,
            complete: (results) => {
                tableBuilder.update(results.data.slice(1), results.data[0]);
                console.log(results);
              }
        });
    }
    else if (fileName.includes(".xlsx")) {
        readXlsxFile(fileInput.files[0]).then((data) => {
            tableBuilder.update(data.slice(1), data[0]);
            console.log(data);
        });
    }
    else if (fileName.includes(".txt")) {
        const file = fileInput.files[0];

        let reader = new FileReader();
        reader.onload = (e) => {
            const file = e.target.result;
            const lines = file.split(/\r\n|\n/);
            console.log(lines);

            let data = [];
            for (let i = 0; i < lines.length; i++) 
                data[i] = lines[i].split(" ");
            
            tableBuilder.update(data.slice(1), data[0]);
        };        
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file); 
    }
    else {
        alert("Такой формат не доступен!");
    }
});