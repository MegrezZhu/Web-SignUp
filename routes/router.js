/**
 * Created by i4908 on 2016/11/9.
 */

let url = require('url'),
    queryString = require('querystring'),
    _ = require('lodash'),
    path = require('path'),
    User = require('../user').User,
    users = require('../user').users,
    toolkit = require('../toolkit'),
    checkMethod = require('../inputCheck');

function renderDetailPage(user, callback) {
    toolkit.renderFile(path.join(__dirname, '..\\views\\detail.template'), user, callback);
}

function sendUserPage(res, username) {
    res.writeHead(200, {'Content-type': 'text/html'});
    renderDetailPage(users[username], function (err, pageHTML) {
        res.end(pageHTML, 'utf-8');
    });
}

function getReqHandler(req, res) {
    let _url = url.parse(req.url);
    if (_url.pathname === '/') _url.pathname += 'index.html';
    if (!_url.query && _url.pathname.match(/.+\..+/)) { //file requests
        try {
            let filePath = path.join(__dirname, '..\\public', _url.pathname);
            toolkit.sendFile(res, filePath);
        } catch (e) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found.');
        }
        return;
    } else {
        let query = queryString.parse(_url.query);
        if (query.username && users[query.username]) sendUserPage(res, query.username);
        else toolkit.redirectTo(res, '/');
    }
}

function postReqHandler(req, res) {
    let _url = url.parse(req.url);
    toolkit.readFromStream(req, function (err, data) {
        if (_url.pathname.match(/^\/check\//)) {
            let argName = _url.pathname.match(/^\/check\/(.+)/)[1],
                arg = data;
            if (!checkMethod[argName](arg)) res.end('wrong');
            else res.end('ok');
        } else {
            let query = queryString.parse(data);
            if (query.name && query.id && query.phone && query.mail) {
                let result = checkMethod.checkAll(query);
                if (result) {
                    users[query.name] = new User(query.name, query.id, query.phone, query.mail);
                    toolkit.redirectTo(res, `/?username=${query.name}`);
                } else {
                    res.write(200);
                    res.end('Hey! What are you doing?!');
                }
            } else {
                toolkit.redirectTo(res, '/');
            }
        }
    });
}

function router(req, res) {
    switch (req.method) {
        case 'GET':
            getReqHandler(req, res);
            break;
        case 'POST':
            postReqHandler(req, res);
            break;
    }
}

module.exports = router;