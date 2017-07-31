const BASE_URL = "http://localhost:8081";

function saveDataToRedis(obj) {
    $.post(BASE_URL + "/students", {
        data: obj,
        dataType: 'JSONP',
        crossDomain: true
    }, function (data) {
        postSuccess();
    }).error(function (data) {
        postFailed(JSON.parse(data.responseText));
    });
}

function updateDataToRedis(obj) {
    $.ajax({
        type: 'PUT',
        data: obj,
        url:  BASE_URL + '/students/' + obj.studentNo,
        dataType: 'JSONP',
        crossDomain: true,
        success: function (data) {
            postSuccess();
        }
    })
}

function getDataFromRedis(input) {
    let request = new XMLHttpRequest();
    let subUrl = input == undefined ? "" : `?studentNos=${input}`;
    request.open('get', BASE_URL + '/students' + subUrl);

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                showTable(JSON.parse(request.responseText));
            }
        }
    };
    request.setRequestHeader("Content-Type","application/json");

    request.send();
}


function deleteDataFromRedis(id) {
    let request = new XMLHttpRequest();
    request.open('DELETE', BASE_URL + '/students/' + id);

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                // showTable(JSON.parse(request.responseText));
                location.reload();
            }
        }
    };
    request.setRequestHeader("Content-Type","application/json");

    request.send();
}