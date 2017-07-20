"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var readline = require("../src/command-app");

var expect = chai.expect;
chai.use(sinonChai);
var app = require("../src/command-app");

describe("build-main-menu-string", function(){
    it("should return main menu string when called this function", function(){
        let result = app.buildMainMenuString();
        let expect_string = `
1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：
`;
        expect(expect_string).to.equal(result);
    });
});