const express = require('express');
const { getCurrentDate } = require('../helpers/getCurrentDate');
const homeRouter = express.Router();
const { getAllTasks } = require('../helpers/getAllTasks');
const { getLengthOfCategories } = require('../helpers/getLengthOfCategories');

homeRouter.get('/', async (req, res) => {
  const [tasks] = await getAllTasks();
  const categories = await getLengthOfCategories();
  const newDateFormat = [];

  tasks.forEach((task) => {
    let minutes = `${task.createdAt.getMinutes()}`;
    let hours = `${task.createdAt.getHours()}`;
    const day = `${task.createdAt.getDate()}`;
    const { monthsNames } = getCurrentDate();
    const month = `${task.createdAt.getMonth()}`;
    const year = `${task.createdAt.getFullYear()}`;

    task.createdAt = `${day} ${monthsNames[month]}, ${year}`;

    if (Number(hours) < 10 || Number(minutes) < 10) {
      hours = '0' + hours;
      minutes = '0' + minutes;
    }

    task.time = `${hours}:${minutes}`;
  });

  console.log(tasks);

  res.render('index', {
    date: getCurrentDate(),
    newDateFormat,
    tasks,
    categories,
  });
});

module.exports = {
  homeRouter,
};
