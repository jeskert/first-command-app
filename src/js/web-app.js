$(document).ready(function () {
    showTable();
});

function getAllElements(formId) {
    let studentInfo = document.getElementById(formId);
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

function resetForm() {
    document.getElementById("studentInfo").reset();
}

function saveOrUpdateStudents(type) {
    let elements = getAllElements("studentInfo"), modal = $('#addModal');
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
        student.calculateTotalAndAverage();

        saveToLocalStorage(student, type);

        document.getElementById("successAlert").style.visibility = "visible";
        modal.modal('hide');

        modal.on('hidden.bs.modal', function () {
            document.getElementById("studentInfo").reset();
            setTimeout("location.reload()", 1000);
        });
    }
}

function saveToLocalStorage(obj, type) {
    let currentArray = [];
    let isExist = false;
    if (undefined == localStorage.students || "" == localStorage.students) {
        currentArray = [obj];
    } else {
        currentArray = JSON.parse(localStorage.students);
        for (let i = 0; i < currentArray.length; i++) {
            if (currentArray[i].studentNo == obj.studentNo) {
                isExist = true;
                currentArray.splice(i, 1, obj);
            }
        }
        if (!isExist) {
            currentArray.push(obj);
        }
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

function deleteFromLocalStorage(id) {
    let currentArray = JSON.parse(localStorage.students);
    for (let i = 0; i < currentArray.length; i++) {
        if (currentArray[i].studentNo == id) {
            currentArray.splice(i, 1);
        }
    }
    localStorage.students = JSON.stringify(currentArray);
}

function deleteSelection(obj) {
    let uniqueId = $(obj).parent().parent().attr("data-uniqueid");
    let currentStudentData = $('#table').bootstrapTable('getRowByUniqueId', uniqueId);
    deleteFromLocalStorage(currentStudentData.studentNo);
    location.reload()
}

function editSelection(obj) {
    let uniqueId = $(obj).parent().parent().attr("data-uniqueid");
    let currentStudentData = $('#table').bootstrapTable('getRowByUniqueId', uniqueId);

    $('#studentName').val(currentStudentData.studentName);
    $('#studentNo').val(currentStudentData.studentNo);
    $('#studentEthnic').val(currentStudentData.studentEthnic);
    $('#studentClass').val(currentStudentData.studentClass);
    $('#mathScore').val(currentStudentData.mathScore);
    $('#chineseScore').val(currentStudentData.chineseScore);
    $('#englishScore').val(currentStudentData.englishScore);
    $('#programmingScore').val(currentStudentData.programmingScore);
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
        let buttonId = 'button' + index;
        return [
            '<button class="btn btn-info btn-sm rightSize detailBtn" type="button" onclick="editSelection(this)" data-toggle="modal" data-target="#addModal" id="modify' + buttonId +'"><i class="fa fa-paste"></i> 修改</button>',
            '<button class="btn btn-danger btn-sm rightSize packageBtn" type="button" onclick="deleteSelection(this)" id="delete' + buttonId +'"><i class="fa fa-envelope"></i> 删除</button>'
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
        }, {
            field: 'average',
            title: '平均分'
        }, {
            field: 'total',
            title: '总分'
        }, {
            field: 'operate',
            title: '操作',
            formatter: operateFormatter
        }],
        data: students,
        search: true,
        searchOnEnterKey: true,
        showColumns: true,
        responseHandler: responseHandler,
        uniqueId: "studentNo"
    });
}

