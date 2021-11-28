export default class {

    /**
     * 
     * @param {string} className 
     * @param {string[]} disciplines 
     */
    constructor(className, disciplines) {
        this.className = className;
        this.students = [];
        this.disciplines = disciplines;
    }

    add(student) {
        this.students.push(student);
    }

    getAverageSchoolMark() {
        let averageMarks = [];

        this.students.forEach(student => {
            averageMarks.push(student.getAverageMark());
        });

        let x;
        let sum = averageMarks.map(i => x += Number(i), x = 0).reverse()[0];
        let averageMark = sum / averageMarks.length;

        return averageMark.toFixed(2);
    }

    getAllMarks() {
        let marks = [];
        this.students.forEach(student => {
            marks = marks.concat(student.marks);
        });

        return marks;
    }

    getAllMarksByDiscipline(discipline) {
        let marks = [];
        let index = this.disciplines.indexOf(discipline, 0);
        this.students.forEach(student => {
            marks = marks.concat(student.marks[index]);
        });

        // console.log(marks);
        return marks;
    }

    getMedian() {      
        let values = this.getAllMarks().sort((a, b) => {
          return a - b;
        });
      
        let half = Math.floor(values.length / 2);
        
        if (values.length % 2)
          return values[half];

        return (Number(values[half - 1]) + Number(values[half])) / 2.0;
    }

    getCount(mark) {
        return this.getAllMarks().filter(m => m == mark).length;
    }

    getPercentage(mark) {
        let marks = this.getAllMarks();
        return (marks.filter(m => m == mark).length / marks.length * 100).toFixed(1);
    }

    getData(isPercentage = true) {
        if (isPercentage) {
            return [this.className, 
                    this.getAverageSchoolMark(), 
                    this.getMedian(), 
                    this.getCount('5') + `(${this.getPercentage('5')}%)`, 
                    this.getCount('4') + `(${this.getPercentage('4')}%)`, 
                    this.getCount('3') + `(${this.getPercentage('3')}%)`, 
                    this.getCount('2') + `(${this.getPercentage('2')}%)`];
        } else {
            return [this.className, 
                    this.getAverageSchoolMark(), 
                    this.getMedian(), 
                    this.getCount('5'), 
                    this.getCount('4'), 
                    this.getCount('3'), 
                    this.getCount('2')];
        }
        
    }
}