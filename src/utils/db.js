const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    users: db.table("users"),
    logs: db.table("logs"),
    record: db.table("record"),
};
