let checkMethod = {
    id: function (id, callback) {
        if (!id) return;
        if (!isNaN(id)) {
            if (id.length !== 8)
                callback("id", false, "学号应为8位数字");
            else {
                if (id[0] === '0') callback("id", false, "学号不能以0开头");
                else ajaxCheck("id", id, _.bind(callback, null, "id", _, "学号已注册"));
            }
        } else {
            callback("id", false, "学号应为8位数字");
        }
    },
    phone: function (phone, callback) {
        if (!phone) return;
        if (!isNaN(phone)) {
            if (phone.length !== 11)
                callback("phone", false, "电话应为11位数字");
            else {
                if (phone[0] === '0') callback("phone", false, "电话不能以0开头");
                else ajaxCheck("phone", phone, _.bind(callback, null, "phone", _, "电话已注册"));
            }
        } else {
            callback("phone", false, "电话应为11位数字");
        }
    },
    mail: function (mail, callback) {
        if (!mail) return;
        if (mail.match(/^[a-zA-Z0-9_\\-]+@(([a-zA-Z0-9_\-])+\.)+[a-zA-Z]{2,4}$/)) {
            ajaxCheck("mail", mail, _.bind(callback, null, "mail", _, "邮箱已注册"));
        } else {
            callback("mail", false, "邮箱格式不正确");
        }
    },
    name: function (name, callback) {
        if (!name) return;
        if (name.match(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/)) {
            ajaxCheck("name", name, _.bind(callback, null, "name", _, "用户名已注册"));
        } else {
            callback("name", false, "用户名不合法");
        }
    }
};

function ajaxCheck(argName, arg, callback) {
    $.post(`/check/${argName}`, arg, function (res) {
        if (res === 'ok') callback(true);
        else callback(false);
    });
}
