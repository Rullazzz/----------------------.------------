export default class {
    /**
     * 
     * @param {string} name 
     * @param {string} className 
     * @param {string[]} marks 
     */
    constructor(name, className, marks) {
        this.name = name;
        this.className = className;
        this.marks = marks;
    }

    getAverageMark() {
        let x;
        let sum = this.marks.map(i => x += Number(i), x = 0).reverse()[0];
        return sum / this.marks.length;
    }
}