const program = require('commander');
const { index, show, create, destroy } = require('../controllers/memo_controller');

// module.exports = () => {
  program
  .option('-l, --list')
  .option('-r, --read')
  .option('-d, --delete')
  .parse();

  const options = program.opts();

  if (options.list) {
    index()
  } else if (options.read) {
    show()
  } else if (options.delete) {
    destroy() 
  } else {
    create()
  }
// }
