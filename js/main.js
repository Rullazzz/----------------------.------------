import TableBuilder from "./TableCsv.js";
import Student from "./Student.js";
import SchoolClass from "./SchoolСlass.js";

const tableRoot = document.querySelector("#tableRoot");
const fileInput = document.querySelector("#fileInput"); // only .csv, .xlsx, .txt

const tableRootTabularOutput = document.querySelector("#tableRootTabularOutput"); // only .csv
const fileInputTabularOutput = document.querySelector("#fileInputTabularOutput");

const tableBuilderLoad = new TableBuilder(tableRoot);
const tableBuilderTabularOutput = new TableBuilder(tableRootTabularOutput);


fileInput.addEventListener("change", (e) => {  
    let fileName = fileInput.files[0].name;
    console.log(fileName);

    if (fileName.includes(".csv")) {
        Papa.parse(fileInput.files[0], {
            delimiter: ";",
            skipEmptyLines: true,
            complete: (results) => {
                tableBuilderLoad.update(results.data.slice(1), results.data[0]);
                console.log(results);
              }
        });
    } else if (fileName.includes(".xlsx")) {
        readXlsxFile(fileInput.files[0]).then((data) => {
            tableBuilderLoad.update(data.slice(1), data[0]);
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
            
            tableBuilderLoad.update(data.slice(1), data[0]);
        };        
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file); 
    } else {
        alert("Такой формат не доступен!");
    }
});

fileInputTabularOutput.addEventListener("change", (e) => {
    let fileName = fileInputTabularOutput.files[0].name;
    console.log(fileName);

    Papa.parse(fileInputTabularOutput.files[0], {
        delimiter: ";",
        skipEmptyLines: true,
        complete: (results) => {
            let classesNames = [];
            let classes = [];
            let StudentsData = results.data.slice(1);

            StudentsData.forEach(studentData => {
                if (classesNames.includes(studentData[1])) {
                    let student = new Student(studentData[0], studentData[1], studentData.slice(2));

                    classes.forEach(element => {
                        if (element.className == student.className) 
                            element.add(student);
                    });
                } else {
                    let schoolClass = new SchoolClass(studentData[1]);
                    let student = new Student(studentData[0], studentData[1], studentData.slice(2));
                    schoolClass.add(student);
                    classesNames.push(studentData[1]);
                    classes.push(schoolClass);
                }
            });            

            let headers = ['class', 'av. mark', 'median', '5', '4', '3', '2'];
            let classesData = [];
            classes.forEach(schoolClass => {
                classesData.push(schoolClass.getData());
            });

            tableBuilderTabularOutput.update(classesData, headers);
        }
    });
});