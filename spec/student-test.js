"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

var expect = chai.expect;
chai.use(sinonChai);
var studentModule = require("../src/student");

describe("build-student-info-prompt-string", function(){
    it("should return init prompt string when pass a type init prompt", function(){
        let result = studentModule.buildStudentInfoPromptString('INIT_PROMPT');
        let expect_string = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`;
        expect(expect_string).to.equal(result);
    });

    it("should return wrong format string when pass a type wrong format", function(){
        let result = studentModule.buildStudentInfoPromptString('WRONG_FORMAT');
        let expect_string = `请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：`;
        expect(expect_string).to.equal(result);
    });

    it("should return save success string when pass a type save success", function(){
        let result = studentModule.buildStudentInfoPromptString('SAVE_SUCCESS');
        let expect_string = `学生xxx的成绩被添加`;
        expect(expect_string).to.equal(result);
    });
});

describe("add-student-info", function(){
    it("should save a student in global variable students when call it properly", function(){
        let input = '李伟晔, 0101, 蒙古族, 2,chinese: 90, math: 95, english: 98, programming: 100';
        let input2 = '李伟晔2, 0102, 彝族, 2, chinese: 60, math: 25, english: 18, programming: 9';
        studentModule.addStudentInfo(input);
        expect(students.length).to.equal(1);
        studentModule.addStudentInfo(input2);
        expect(students.length).to.equal(2);
    });
});