let users = require('./model/user').users,
    _ = require('lodash');

let checkMethod = {
    //重复和前端一样的检测， 以防有人绕过前端页面直接向服务端post非法数据。
    id: function (id) {
        if (!id) return;
        if (isNaN(id)) return;
        if (id.length !== 8) return;
        if (id[0] === '0') return;
        return !checkRepeat('id', id);
    },
    phone: function (phone) {
        if (!phone) return;
        if (isNaN(phone)) return;
        if (phone.length !== 11) return;
        if (phone[0] === '0') return;
        return !checkRepeat('phone', phone);
    },
    mail: function (mail) {
        if (!mail) return;
        if (!mail.match(/^[a-zA-Z0-9_\\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/)) return;
        return !checkRepeat('mail', mail);
    },
    name: function (name) {
        if (!name) return;
        if (!name.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/)) return;
        return !checkRepeat('name', name);
    },
    checkAll: function (query) {
        return ['id', 'phone', 'mail', 'name'].every(function (argName) {
            return (query && checkMethod[argName] && checkMethod[argName](query[argName]));
        });
    }
};

function checkRepeat(argName, arg) {
    if (argName === 'name')
        return !!users[arg];
    else
        return !!_.findKey(users, u => u[argName] === arg);
}

module.exports = checkMethod;