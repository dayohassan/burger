var connection = require('./connection');
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}
function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf("") >= 0) {
                value = " ' " + value + " ' ";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}
var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, tableInput, function (err, results) {
            if (err) {
                throw err;
            }
            console.log(results)
            cb(results);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += "(";
        queryString += cols.toString();
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ")";
        console.log(queryString);
        connection.query(queryString, vals, function (err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    deleteOne: function(table, condition, cb){
        var sql = "DELETE FROM ?? WHERE " + condition;
        connection.query(sql, [table], function(err, result){
            if(err) throw err;

            cb(result)
        })
    }
};
module.exports = orm;




