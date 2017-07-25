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