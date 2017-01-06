# gulp-assist

> Display helpful information for your Gulp tasks

gulp-assist presents basic info registered tasks in a stylish format by extending
`gulp` with an additional method to describe tasks and their flags. gulp-assist
does not modify existing `gulp` methods or API.

<img src="https://github.com/shellscape/gulp-assist/blob/master/gulp-assist.png?raw=true" width="569">

And info for each individual task including flags and their descriptions.

<img src="https://github.com/shellscape/gulp-assist/blob/master/gulp-assist-task.png?raw=true" width="570">

## Install

```
$ npm install gulp-assist --save-dev
```

## Usage

```js
const gulp = require('gulp');

// initialize the module
require('gulp-assist')();

gulp.task('lint', () =>
	// ...
);

gulp.assist('lint', {
  desc: 'Analyzes code for errors and convention violations.',
  flags: {
    src: 'Specifies a directory / module to inspect, within the `src` directory.'
  }
});
```

## API

### default([options])

#### options

Example Usage of all options:

```js
const gulp = require('gulp');
let taskName = 'default';

require('gulp-assist')({ gulp, taskName })
```

##### gulp

Type: `Object`  
Default: `null`

The module has the ability to use a `gulp` instance already required. If this
option is not specified, the module will require `gulp` internally. In most cases
this will use the shared instance.

##### taskName

Type: `String`  
Default: `'help'`

The name of the task that gulp-assist should use as the entry point.

### gulp.assist(taskName, options)

Registers a task with gulp-assist.

#### options

##### desc

Type: `String`  
Default: `null`

A description of the task being registered.

##### flags

Type: `Object`  
Default: `null`

An object whose keys represent a flag name. gulp-assist automagically prepends a
double hypen to each flag name when displaying task details. The value for each
key should represent the description of the flag.


## License

MIT © [Andrew Powell](http://shellscape.org)
