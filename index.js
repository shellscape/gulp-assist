'use strict';

const argv = require('yargs').argv;
const chalk = require('chalk');
const stringLength = require('string-length');
const table = require('text-table');

const _tasks = {};
const space = '   ';

module.exports = (options) => {
  const defaults = {
    gulp: null,
    taskName: 'help'
  };

  options = Object.assign(defaults, options);

  const gulp = options.gulp || require('gulp');

  gulp.assist = (taskName, meta) => {
    let task = gulp.tasks[taskName];

    if (!task) {
      console.log(chalk.red(`gulp-assist: ${taskName} isn't a gulp task. Please add the task before calling gulp.assist().\n`));
      return;
    }

    meta = Object.assign({ visible: true}, meta || {});
    task = Object.assign(task, meta);
  };

  gulp.task(options.taskName, () => {
    let header = 'Tasks',
      rows = [],
      tasks = Object.keys(gulp.tasks),
      usage = 'gulp ' + chalk.blue(options.taskName) + chalk.gray(' [--taskName]'),
      targetTask;

    Object.keys(argv).forEach((task) => {
      if (argv[task] === true && !targetTask) {
        targetTask = task;
      }
    });

    if (targetTask) {
      if (!gulp.tasks[targetTask]) {
        console.log('', chalk.red(`\nError: ${targetTask} is not a Gulp task.\n`));
        return;
      }

      usage = 'gulp ' + chalk.blue(targetTask) + chalk.gray(' [options]');
      header = 'Arguments';
    }

    console.log('\n', chalk.underline('Usage'));
    console.log(space + usage);

    if (targetTask) {
      let task = gulp.tasks[targetTask];

      console.log('\n', chalk.underline('Description'));
      console.log(space + (task.desc || 'No description available'));
    }

    console.log('\n', chalk.underline(header));

    if (targetTask) {
      let task = gulp.tasks[targetTask],
        flags = Object.keys(task.flags || {});

      flags.forEach((flagName) => {
        let flag = task.flags[flagName];

        if (task.visible) {
          rows.push([space + chalk.yellow('--' + flagName), flag || '' ]);
        }
      });
    }
    else {
      tasks.forEach((taskName) => {
        let task = gulp.tasks[taskName],
          desc = task.desc || '';

        if (task.visible) {
          rows.push([ space + chalk.blue(task.name), desc ]);
        }

        if (task.flags) {
          rows.push(['', chalk.gray('Args: --' + Object.keys(task.flags).join(', --'))]);
        }
      });
    }

    if (rows.length) {
      console.log(table(rows, { stringLength: stringLength}));
    }
    else {
      console.log(chalk.grey(space + 'No ' + header + ' available.'));
    }

    console.log();
  });

  gulp.assist(options.taskName, {
    desc: 'Displays this list.',
    flags: { 'taskName': 'Displays information for a particular task. eg. `gulp ' + options.taskName + ' --lint`' }
  });
};
