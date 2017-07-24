'use strict';
const readlineSync = require("readline-sync");
const student = require('./student-for-command');
const report = require('./report');

const ADD_STUDENT = 1;
const GENERATE_REPORT = 2;
const EXIT = 3;

global.students = [];

function main() {
    let input = readlineSync.question(buildMainMenuString());
    if (input == ADD_STUDENT) {
        student.addStudentAchievement();
        main();
    } else if (input == GENERATE_REPORT) {
        report.buildReport();
        main();
    } else if (input == EXIT) {
        exit();
    } else {

    }
}
function buildMainMenuString() {
    return `
1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
`;
}

function exit() {
    process.exit();
}

module.exports = {
    main,
    buildMainMenuString,
    exit
};

//李伟晔, 0101, 蒙古族, 2,chinese: 90, math: 95, english: 98, programming: 100
//李伟晔2, 0102, 彝族, 2, chinese: 60, math: 25, english: 18, programming: 9

