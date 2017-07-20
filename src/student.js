'use strict';
const readlineSync = require("readline-sync");
const INIT_PROMPT = "INIT_PROMPT";
const WRONG_FORMAT = "WRONG_FORMAT";
const SAVE_SUCCESS = "SAVE_SUCCESS";

function addStudentAchievement() {
    var input = readlineSync.question(buildStudentInfoPromptString(INIT_PROMPT));

    while (!isStudentMatching(input)) {
        input = readlineSync.question(buildStudentInfoPromptString(WRONG_FORMAT));
    }
    if (addStudentInfo(input)) {
        console.log(buildStudentInfoPromptString(SAVE_SUCCESS));
    }
}

function buildStudentInfoPromptString(type) {
    switch (type) {
        case INIT_PROMPT:
            return `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`;
            break;

        case WRONG_FORMAT:
            return `请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：`;
            break;

        case SAVE_SUCCESS:
            return `学生xxx的成绩被添加`;
            break;

        default:
            return "";
            break;
    }

}

function addStudentInfo(input) {
    let inputArr = input.split(',');
    let student = {
        name: inputArr[0],
        studentNo: inputArr[1],
        ethnic: inputArr[2],
        klass: inputArr[3],
        grades: new Map()
    };
    for (let i = 4; i < inputArr.length; i++) {
        let grade = inputArr[i].split(':');
        student.grades.set(grade[0].trim(), grade[1].trim());
    }

    students.push(student);
    return true;
}

function isStudentMatching(input) {
    let result = true;
    let inputArr = input.split(',');
    if (inputArr.length > 4) {
        for (let i = 4; i < inputArr.length; i++) {
            let grade = inputArr[i].split(':');
            if (parseInt(grade[1]) == NaN) {
                console.log(parseInt(grade[1]))
                result = false;
            }
        }
    } else {
        result = false;
    }
    return result;
}

module.exports = {
    addStudentAchievement,
    buildStudentInfoPromptString,
    addStudentInfo
};