var orm = require('../config/orm');

module.exports = {
    all: function(cb){
        orm.selectAll("burgers", cb)
    },
    create: function(cols, vals, cb){
        orm.insertOne("burgers", cols, vals, cb)
    },
    update: function(vals, condition, cb){
        orm.updateOne("burgers", vals, condition, cb)
    },
    delete: function(condition, cb){
        orm.deleteOne("burgers", condition, cb)
    }
}