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
        let editButton = '<button class="btn btn-info btn-sm rightSize detailBtn" ' +
            'type="button" onclick="editSelection(this)" data-toggle="modal" ' +
            'data-target="#addModal" id="modify' + buttonId + '">' +
            '<i class="fa fa-paste"></i> ' +
            '修改' +
            '</button>';

        let deleteButton = '<button class="btn btn-danger btn-sm rightSize packageBtn" data-toggle="confirmation" ' +
            'data-popout="true" data-btn-ok-label="删除" data-btn-ok-icon="glyphicon glyphicon-trash" ' +
            'data-btn-ok-class="btn-success" ' +
            'data-btn-cancel-label="取消" data-btn-cancel-icon="glyphicon glyphicon-ban-circle"' +
            'data-btn-cancel-class="btn-danger"' +
            'data-title="删除学生" data-content=""' +
            'type="button" onclick="getDeleteContent(this)" id="delete' + buttonId + '">' +
            '<i class="fa fa-envelope"></i> ' +
            '删除' +
            '</button>';

        return [editButton, deleteButton].join('    ')
    };

    let columns = [{
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
    }];

    $('#table').bootstrapTable({
        columns: columns,
        data: students,
        responseHandler: responseHandler,
        uniqueId: "studentNo",
        valign: 'middle'
    });

    $(".search input").bind('keyup', function (e) {
        if (e.which == "13") {
            let searchTerm = $(".search input").val();
            let studentNos = searchTerm.split(',');
            let searchResult = [];
            if (searchTerm == "") {
                searchResult = students;
            } else {
                for (let studentNo of studentNos) {
                    for (let student of students) {
                        if (studentNo.trim() == student.studentNo) {
                            searchResult.push(student);
                        }
                    }
                }
            }

            $('#table').bootstrapTable('load', searchResult);
        }
    });

    $('[data-toggle=confirmation]').confirmation({
        rootSelector: '[data-toggle=confirmation]',
    });

    $('[data-toggle=confirmation]').on('confirmed.bs.confirmation', function () {
        deleteSelection(this);
    });

    $('[data-toggle=confirmation]').on('canceled.bs.confirmation', function () {
        $('.popover').remove();
    });

}

function getDeleteContent(obj) {
    let uniqueId = $(obj).parent().parent().attr("data-uniqueid");
    let currentStudentData = $('#table').bootstrapTable('getRowByUniqueId', uniqueId);
    $(obj).attr('data-content', `确定要删除${currentStudentData.studentName}, ${currentStudentData.studentNo}的成绩？`);
}
