'use strict';
const readlineSync = require("readline-sync");
const INIT_PROMPT = "INIT_PROMPT";
const WRONG_FORMAT = "WRONG_FORMAT";

function buildReport() {
    var input = readlineSync.question(buildStudentSequencePromptString(INIT_PROMPT));

    while (!isReportMatching(input)) {
        input = readlineSync.question(buildStudentSequencePromptString(WRONG_FORMAT));
    }

    console.log(generateReport(input));
}

function buildStudentSequencePromptString(type) {
    switch (type) {
        case INIT_PROMPT:
            return `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
            break;

        case WRONG_FORMAT:
            return `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
            break;

        default:
            break;
    }
}

function generateReport(input) {
    let studentGradeStrings = [];
    let studentNos = input.split(',');
    for (let currentStudentNo of studentNos) {
        for (let student of students) {
            if (parseInt(student.studentNo) == parseInt(currentStudentNo)) {
                console.log(currentStudentNo, student);

                studentGradeStrings.push(generateReportItem(student));
            }
        }
    }
    let studentGradeFormatString = studentGradeStrings.join('\n');
    return `成绩单
姓名|数学|语
文|英语|编程|平均分|总分 
========================
${studentGradeFormatString}
========================
`
}

function calculateScore(student) {
    let grades = student.grades;
    let total = parseInt(grades.get('math')) + parseInt(grades.get('chinese')) + parseInt(grades.get('english')) + parseInt(grades.get('programming'));
    student.total = total;
    student.average = total / 4;
    return student;
}

function generateReportItem(student) {
    student = calculateScore(student);
    return `${student.name}|${student.grades.get('math')}|${student.grades.get('chinese')}|${student.grades.get('english')}|${student.grades.get('programming')}|${student.average}|${student.total}`;
}

function isReportMatching(input) {
    return true;
}

module.exports = {
    buildReport,
    buildStudentSequencePromptString,
    generateReport
};