multi-ngbp
=========

This is an [ngbp](https://github.com/ngbp/ngbp) wrapper which makes it easy to develop multiple projects by:

  - Share common/library codes between *builds* & *compiles*.
  - Run them similtaneously without port overlaps.
  - ```grunt-contrib-connect``` plugin to develop from localhost rather than file system.

Structure
---------
```
-- app1/
  |-- src/
  |-- vendor/
  |-- node_modules/
  |-- build/
  |-- bin/
  |-- Gruntfile.js
  |-- package.json ...
-- app2/ 
-- common/
-- grunt_conf/
```

  - ```app1 & app2``` : your regular ngbp application
  - ```common```: you can include .js, .spec, .tpl.html files and it will be treated as if it was in the ```src``` folder
  - ```grunt_conf```: grunt related tasks & other configruation.

Quick start
--------------
After cloning the repo you should enter each *app* folders & install dependencies like regular *ngbp*.  
 
```sh
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt watch
```

To compile it for production

```sh
$ grunt
```

To add another app folder you just need same directory structure & configure ```build.conf.js``` file to have different port numbers than others.


