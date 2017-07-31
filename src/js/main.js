const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const Student = require('./students');
const app = express();
const client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/students', function (req, res) {
    let result = [];
    let studentNos = req.query.studentNos;
    if (studentNos == "" || studentNos == undefined) {
        client.keys("stu:*", function (err, reply) {
            client.mget(reply, function (mgetErr, mgetReply) {
                mgetReply.forEach((mgetItem, index) => {
                    result.push(JSON.parse(mgetItem));
                    if (index == mgetReply.length - 1) {
                        res.send(result);
                    }
                });
                // res.send(mgetReply);
            })
        });
    } else {
        let searchNos = studentNos.split(',');
        searchNos.forEach((studentNo, index) => {
            let key = `stu:${studentNo}`;
            client.get(key, function (err, reply) {
                if (reply != null) {
                    result.push(JSON.parse(reply));
                }
                if (index == searchNos.length - 1) {
                    res.send(result);
                }
            })
        });
    }
});

app.post('/students', function (req, res) {
    let student = req.body.data;
    if (validateRequest(student)) {
        let key = `stu:${student.studentNo}`;
        client.get(key, function (err, reply) {
            if (reply == null) {
                client.set(key, JSON.stringify(student), redis.print);
                res.send(student);
            } else {
                res.status(400).send({
                    statusCode: 400,
                    errMsg: "该学号已存在"
                })
            }
        });
    } else {
        res.status(400).send({
            statusCode: 400,
            errMsg: "请按正确的格式输入"
        });
    }
});

app.put('/students/:id', function (req, res) {
    let student = req.body;
    let id = req.params.id;
    if (validateRequest(student)) {
        let key = `stu:${id}`;
        client.get(key, function (err, reply) {
            if (reply == null) {
                res.status(404).send({
                    statusCode: 404,
                    errMsg: "该学生不存在"
                });
            } else {
                client.set(key, JSON.stringify(student), redis.print);
                res.send(student);
            }
        });
    } else {
        res.status(400).send({
            statusCode: 400,
            errMsg: "请按正确的格式输入"
        });
    }
});

app.delete('/students/:id', function (req, res) {
    let id = req.params.id;
    let key = `stu:${id}`;
    client.get(key, function (err, reply) {
        if (reply == null) {
            res.status(404).send({
                statusCode: 404,
                errMsg: "该学生不存在"
            });
        } else {
            client.del(key);
            res.send({
                statusCode: 200,
                msg: "该学生已成功删除"
            });
        }
    })
});

function validateRequest(obj) {
    let flag = true;
    for (let attr in obj) {
        if (obj[attr] == "" || obj[attr] == undefined) {
            flag = false;
            break;
        }
    }
    return flag;
}

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

