var AWS = require('aws-sdk');

// con callback
// var handler = (event, callback) => {

var handler = async (event) => {
    var dynamodb = new AWS.DynamoDB({
        apiVersion: '2012-08-10',
        endpoint: 'http://dynamodb:8000',
        region: 'us-west-2',
        credentials: {
            accessKeyId: '2345',
            secretAccessKey: '2345' 
        }
    });

    var docClient = new AWS.DynamoDB.DocumentClient({
        apiVersion: '2012-08-10',
        service: dynamodb
    });

    // con callback
    // dynamodb.listTables((err, data) => {
    //     console.log(data);

    //     callback(null, { statusCode: 200 });
    // });

    return dynamodb.listTables().promise()
        .then(data => {
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        })
        .catch(err => {
            console.log(err);

            return {
                statusCode: 500,
                body: err.message
            };
        });
}

exports.handler = handler;