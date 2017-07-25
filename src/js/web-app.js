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



