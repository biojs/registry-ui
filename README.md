BioJS registry ui
-----------------


[`biojs.io`](http://biojs.io)

[![Build Status](https://travis-ci.org/biojs/registry-ui.svg?branch=stable)](https://travis-ci.org/biojs/registry-ui)


Dev instance
------------

* directly linked to github pages
* branch `gh-pages`


[dev.biojs.io](http://dev.biojs.io)

Production instance
------------

* deployed to Amazon S3 and Cloudfront
* only deploy "stable" stuff to our registry frontend ;-)
* branch `stable`

[biojs.io](http://biojs.io)

1. Setup Your Local Dev Environment
-----------------------------------

Clone the repository, install all dependencies and run up the server:

````
git clone https://github.com/biojs/registry-ui.git
cd registry-ui/
npm install
npm run start
````

Any issues with this? You might need to install the following dependencies globally which could be missing yet:

- http-server
````
npm install -g http-server
````
- protractor (for testing, see also 2.)
````
npm install -g protractor
webdriver-manager update
````

2. Run the tests
----------------

To start up the Selenium test server and run the test suite, go with:

```
webdriver-manager start --standalone
protractor  protractor/conf.js

```

You might need to [install](https://github.com/angular/protractor/blob/master/docs/tutorial.md) protractor.
See also 1.)

3. More doc
----------

Join us on [Gitter](https://gitter.im/biojs/biojs) or #biojs.
