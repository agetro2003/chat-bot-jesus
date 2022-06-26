let log = console.log;

let output = content => ({
    statusCode: 200,
    body: JSON.stringify(content)
});

module.exports = {log, output};