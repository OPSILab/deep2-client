# DEEPCLIENT

Is a simple javascript library that allows the connection with DEEP and the inclusion of a Datalet within a HTML page developed by the [UNISA TEAM](http://www.isislab.it/) 
for the [ROUTE-TO-PA PROJECT](http://www.routetopa.eu/).


## Table of contents

* [Quick start](#quick-start)
* [Bugs and feature requests](#bugs-and-feature-requests)
* [Usage](#usage)
* [Versioning](#versioning)
* [Creators](#creators)
* [Copyright and license](#copyright-and-license)


## Quick start

Clone the repo: `git clone http://service.routetopa.eu:7480/isislab/DEEPCLIENT.git`.

### What's included

Within the download you'll find the following directories and files. You'll see something like this:

```
DEEPCLIENT/
├── js/
│   ├── bootstrap-3.3.4-dist
│   └── deepClient.js
│   ├── jquery-1.11.2.min.js
└── ├── jquery-2.1.0.min.js
```

## Bugs and feature requests

Have a bug or a feature request? 
Send a mail to developers@routetopa.eu

## Usage

This is a minimal example of deep client usage. 

```html
<html>
<head>
<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/webcomponents.js"></script>
<script type="text/javascript" src="js/deepClient.js"></script>
 <script type="text/javascript">
	jQuery(document).ready(function($) {
	   var datalet_params =
              {
	    component   : "DATALET_NAME", 
        params : {
		    data-url        : "DATA_URL",
        }
        fields      : Array("FIELD1", "FIELD2"),
        placeHolder : "HTML_PLACEHOLDER"
       };
	   ComponentService.deep_url = 'DEEP_URL';
	   ComponentService.getComponent(datalet_params);

    });

  </script>
</head>
<body>
<div id="HTML_PLACEHOLDER"></div>
</body>
</html>
</code>
```

We create an empty HTML document with a single DIV. On document ready event we create a datalet_params object, this object contains information for Datalet retrieving and initialization.

datalet_params contains :
component : the Datalet name to be sent to DEEP 
params.data-url : the datasource URL 
fields : an array with user selected fields from datasource
placeHolder : the ID of the DOM element where place the Datalet 

ComponentService.getComponent function take a datalet_params object as parameter. This function is responsible for Datalet info retrieving from DEPP and Datalet code retrieving from DEEPCOMPONENTS. Once the Datalet code is available DEEPCLIENT add the Datalet to the document DOM and initialize the Datalet with the data and fields parameters.
Now the Datalet is able to complete its lifecycle.

The programmer must specify the DEEP endpoint through the variable ComponentService.deep_url.


## Versioning
v0.1

## Creators
UNISA Team - Dipartimento di Informatica - Università degli studi di Salerno - Italy

## Copyright and license

Code released under [the MIT license](https://opensource.org/licenses/MIT).