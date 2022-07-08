const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./test.db");

function Memo(body, id) {
  this.body = String(body);
  this.id = id;
}

Memo.prototype.destroy = function() {
  db.run(`DELETE FROM memos WHERE id = ?`, this.id);
}

Memo.prototype.save = function() {
  db.run("insert into memos(body) values(?)", this.body);
}

// Memo.all = function() {
//   const memos = []
//   db.all(`SELECT * FROM memos`, (error, rows) => rows.forEach(row => memos.push(new Memo(row.body, row.id))))
//   return memos
// }
Memo.all = () => {
  return new Promise((resolve, reject) => {
    const memos = []
    db.all(`SELECT * FROM memos`, (error, rows) => rows.forEach(row => {
      memos.push(new Memo(row.body, row.id))
      resolve(memos)
      }
    ))
  });
}

module.exports = {
  Memo: Memo
}
