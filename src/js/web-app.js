'use strict';

const ADD_STUDENT = 1;
const GENERATE_REPORT = 2;
const EXIT = 3;

$(document).ready(function () {
    showTable();
});

function getAllElements() {
    let studentInfo = document.getElementById("studentInfo");
    let elements = [];
    let tagElements = studentInfo.getElementsByTagName('input');
    for (let element of tagElements) {
        elements.push(element);
    }
    return elements;
}

function validateForm(elements) {
    let flag = true;
    for (let element of elements) {
        if (element.value == '') {
            element.parentNode.className += ' has-error';
            flag = false;
            break;
        }
    }
    return flag;
}

function addStudents() {
    let elements = getAllElements();
    if (validateForm(elements)) {
        let studentName = document.getElementById("studentName").value;
        let studentNo = document.getElementById("studentNo").value;
        let studentEthnic = document.getElementById("studentEthnic").value;
        let studentClass = document.getElementById("studentClass").value;
        let student = new Student(studentName, studentNo, studentEthnic, studentClass);
        student.mathScore = document.getElementById("mathScore").value;
        student.chineseScore = document.getElementById("chineseScore").value;
        student.englishScore = document.getElementById("englishScore").value;
        student.programmingScore = document.getElementById("programmingScore").value;

        saveToLocalstorage(student);

        document.getElementById("successAlert").style.visibility = "visible";
        $('#addModal').modal('hide');

        $("#addModal").on('hidden.bs.modal', function () {
            document.getElementById("studentInfo").reset();
            location.reload()
        });
        // setTimeout(document.getElementById("successAlert").style.visibility = "hidden", 3000);
    }
}

function saveToLocalstorage(obj) {
    let currentArray = [];
    if (undefined == localStorage.students || "" == localStorage.students) {
        currentArray = [obj];
    } else {
        currentArray = JSON.parse(localStorage.students);
        currentArray.push(obj);
    }
    localStorage.students = JSON.stringify(currentArray);
}

function getLocalStorageInfo() {
    if (undefined == localStorage.students || "" == localStorage.students) {
        return null;
    } else {
        return JSON.parse(localStorage.students);
    }
}

function showTable() {
    let students = getLocalStorageInfo();
    let responseHandler = function (res) {
        return {
            "rows": res,
            "total": res.length
        }
    };

    let operateFormatter = function (value, row, index) {
        console.log(index);
        return [
            '<button class="btn btn-info btn-sm rightSize detailBtn" type="button" data-toggle="modal" data-target="#modifyModal"><i class="fa fa-paste"></i> 修改</button>',
            '<button class="btn btn-danger btn-sm rightSize packageBtn" type="button" data-toggle="modal" data-target="#deleteModal"><i class="fa fa-envelope"></i> 删除</button>'
        ].join('    ')
    };

    $('#table').bootstrapTable({
        columns: [{
            checkbox: true
        }, {
            field: 'studentName',
            title: '学生姓名'
        }, {
            field: 'studentNo',
            title: '学号'
        }, {
            field: 'studentEthnic',
            title: '民族'
        }, {
            field: 'studentClass',
            title: '班级'
        }, {
            field: 'mathScore',
            title: '数学成绩'
        }, {
            field: 'chineseScore',
            title: '语文成绩'
        }, {
            field: 'englishScore',
            title: '英语成绩'
        }, {
            field: 'programmingScore',
            title: '编程成绩'
        // }, {
        //     field: 'average',
        //     title: '平均分'
        // }, {
        //     field: 'total',
        //     title: '总分'
        }, {
            field: 'operate',
            title: '操作',
            formatter: operateFormatter
        }],
        data: students,
        search: true,
        searchOnEnterKey: true,
        showColumns: true,
        responseHandler: responseHandler
    });
}
//李伟晔, 0101, 蒙古族, 2,chinese: 90, math: 95, english: 98, programming: 100
//李伟晔2, 0102, 彝族, 2, chinese: 60, math: 25, english: 18, programming: 9

