const readline = require("readline");
const { Select } = require('enquirer');
const Memo = require('../models/memo').Memo;

const each = (memos, callback) => memos.forEach(memo => {callback(memo)});
const show_first = memo => { return memo.body.split(/\n/)[0] }

const select = async(message, show_first, callback) => {
  const memos = await Memo.all();
  const lists = [] 
  const add = await (memo => {lists.push(show_first(memo))})
  await each(memos, add)
  const prompt = new Select({
    message: message,
    choices: lists,
  });
  prompt.run().then(() => callback(memos, prompt));
}

exports.index = async() => {
  const memos = await Memo.all();
  const display_index = await(memo => console.log(show_first(memo)))
  await each(memos, display_index)
}

exports.destroy = () => {
  const destroy_body = (memos, prompt) => {
    const memo = memos.filter(memo => memos.indexOf(memo) === prompt.index)[0];
    memo.destroy();
  }
  select('Choose a note you want to delete:', show_first, destroy_body)
} 

exports.show = () => {
  const show_body = (memos, prompt) => console.log(memos[prompt.index].body)
  select('Choose a note you want to see:', show_first, show_body)
}

const receive_stdin = () => {
  return new Promise(resolve => {
    process.stdin.setEncoding("utf8");
    const standard_inputs = []; 
    const reader = readline.createInterface({
      input: process.stdin,
    });
    reader.on("line", standard_input => {
      standard_inputs.push(standard_input)
      resolve(standard_inputs)
    });
  });
}

exports.create = async() => {
  const standard_inputs = await receive_stdin()
  const save = () => {
    const memo = new Memo(standard_inputs[0]);
    memo.save();
  }
  await save()
}
