$(document).ready(function () {

    getDataFromRedis();
});


function validateForm(elements) {
    let flag = true;
    elements.each(function () {
        if ($(this).val() == '') {
            $(this).parent().addClass('has-error');
            flag = false;
        }
    });
    return flag;
}

function resetModal() {
    $("#studentInfo").trigger("reset");
    $("#studentInfo .has-error").removeClass("has-error");
    $("#studentNo").attr("disabled", false);
}

function saveOrUpdateStudents() {
    let elements = $("#studentInfo input");
    let modal = $('#addModal');
    if (validateForm(elements)) {
        let studentName = $("#studentName").val();
        let studentNo = $("#studentNo").val();
        let studentEthnic = $("#studentEthnic").val();
        let studentClass = $("#studentClass").val();
        let student = new Student(studentName, studentNo, studentEthnic, studentClass);
        student.mathScore = $("#mathScore").val();
        student.chineseScore = $("#chineseScore").val();
        student.englishScore = $("#englishScore").val();
        student.programmingScore = $("#programmingScore").val();
        student.calculateTotalAndAverage();

        saveDataToRedis(student);
    }
}

function postSuccess() {
    $("#successAlert").css("visibility", "visible");
    let modal = $('#addModal');
    modal.modal('hide');

    modal.on('hidden.bs.modal', function () {
        $("#studentInfo").trigger("reset");
        setTimeout("location.reload()", 1000);
    });
}

function postFailed(data) {
    alert(data.errMsg);
}

function deleteSelection(obj) {
    let uniqueId = $(obj).parent().parent().attr("data-uniqueid");
    let currentStudentData = $('#table').bootstrapTable('getRowByUniqueId', uniqueId);
    // deleteFromLocalStorage(currentStudentData.studentNo);
    // location.reload();
    deleteDataFromRedis(currentStudentData.studentNo);
}

function editSelection(obj) {
    let uniqueId = $(obj).parent().parent().attr("data-uniqueid");
    let currentStudentData = $('#table').bootstrapTable('getRowByUniqueId', uniqueId);

    $('#studentName').val(currentStudentData.studentName);
    $('#studentNo').val(currentStudentData.studentNo);
    $('#studentNo').attr("disabled", true);
    $('#studentEthnic').val(currentStudentData.studentEthnic);
    $('#studentClass').val(currentStudentData.studentClass);
    $('#mathScore').val(currentStudentData.mathScore);
    $('#chineseScore').val(currentStudentData.chineseScore);
    $('#englishScore').val(currentStudentData.englishScore);
    $('#programmingScore').val(currentStudentData.programmingScore);
}



