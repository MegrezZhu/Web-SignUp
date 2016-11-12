/**
 * Created by i4908 on 2016/11/9.
 */

let fs = require('fs'),
    path = require('path');

function readFromStream(stream, callback) {
    try {
        stream.setEncoding('utf-8');
        let chunk = [];
        stream
            .on('end', function () {
                callback(null, chunk.join(''));
            })
            .on('data', data => chunk.push(data))
            .on('error', err => callback(err, null));
    } catch (e) {
        callback(e, null);
    }
}

function ensureFileExist(filePath) {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, '{}', {encoding: 'utf-8'});
        console.log(`"${filePath}" not exist, now ok.`);
    }
}

function sendFile(res, filePath) {
    //console.log(filePath);
    if (!fs.existsSync(filePath)) throw new Error(`${filePath} not exist!`);  //check if file exist
    let contentType;
    switch (filePath.match(/\.(.+)$/)[1]) {
        case 'jpg':
        case 'png':
            contentType = 'image/jpeg';
            break;
        case 'gif':
            contentType = 'image/gif';
            break;
        case 'js':
            contentType = 'text/javascript';
            break;
        case 'html':
            contentType = 'text/html';
            break;
        case 'css':
            contentType = 'text/css';
            break;
    }
    let file = fs.createReadStream(filePath);
    res.writeHead(200, {'Content-Type': contentType});
    file.pipe(res);
}

function redirectTo(res, path) {
    res.writeHead(301, {'Location': path});
    res.end();
}

function renderFile(filePath, obj, callback) {
    readFromStream(fs.createReadStream(filePath, {encoding: 'utf-8'}), function (err, html) {
        for (let arr in obj) {
            html = html.replace(`{{${arr}}}`, obj[arr]);
        }
        callback(null, html);
    });
}

// module.exports.readFromStream = readFromStream;
// module.exports.ensureFileExist = ensureFileExist;
// module.exports.sendFile = sendFile;
// module.exports.redirectTo = redirectTo;
// module.exports.renderFile = renderFile;

module.exports = {
    readFromStream,
    ensureFileExist,
    sendFile,
    redirectTo,
    renderFile
}

