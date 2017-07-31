class Student {
    constructor() {

    }

    calculateTotalAndAverage() {
        this.total = parseInt(this.chineseScore) + parseInt(this.englishScore) + parseInt(this.mathScore) + parseInt(this.programmingScore);
        this.average = this.total / 4;
    }

    copyStudent(student) {
        this.studentName = student.studentName;
        this.studentNo = student.studentNo;
        this.studentEthnic = student.studentEthnic;
        this.studentClass = student.studentClass;
        this.mathScore = student.mathScore;
        this.englishScore = student.englishScore;
        this.chineseScore = student.chineseScore;
        this.programmingScore = student.programmingScore;
    }
}

module.exports = Student;
