"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var readline = require("../src/command-app");

var expect = chai.expect;
chai.use(sinonChai);
var reportModule = require("../src/report");

describe("build-student-sequence-prompt-string", function(){
    it("should return init prompt string when pass a type init prompt", function(){
        let result = reportModule.buildStudentSequencePromptString('INIT_PROMPT');
        let expect_string = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
        expect(expect_string).to.equal(result);
    });

    it("should return wrong format string when pass a type wrong format", function(){
        let result = reportModule.buildStudentSequencePromptString('WRONG_FORMAT');
        let expect_string = `请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`;
        expect(expect_string).to.equal(result);
    });
});
