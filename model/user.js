let path = require('path'),
    kit = require('./../lib/kit'),
    fs = require('fs');

function User(name, id, phone, mail) {
    this.name = name;
    this.id = id;
    this.phone = phone;
    this.mail = mail;
}

function saveUserPerTime(filePath, time) {
    setTimeout(function saveUsers() {
        let file = fs.createWriteStream(filePath, {encoding: 'utf-8'});
        file.end(JSON.stringify(users), function () {
            setTimeout(saveUsers, time);
        });
    }, time);
}

let users;

(function () {
    let filePath = path.join(__dirname, '..', 'database', 'user.json');
    kit.ensureFileExist(filePath);
    let data = fs.readFileSync(filePath, {encoding: 'utf-8'});
    try {
        users = JSON.parse(data);
    } catch (e) {
        users = {};
    }
    saveUserPerTime(filePath, 10 * 1000);
})();

module.exports.User = User;
module.exports.users = users;