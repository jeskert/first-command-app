class Student {
    constructor(name, studentNo, ethnic, klass) {
        this.studentName = name;
        this.studentNo = studentNo;
        this.studentEthnic = ethnic;
        this.studentClass = klass;
    }

    calculateTotalAndAverage() {
        this.total = parseInt(this.chineseScore) + parseInt(this.englishScore) + parseInt(this.mathScore) + parseInt(this.programmingScore);
        this.average = this.total / 4;
    }
}
