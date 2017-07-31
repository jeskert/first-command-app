function saveToLocalStorage(obj) {
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