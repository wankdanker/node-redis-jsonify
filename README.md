node-redis-jsonify
==================

[![Build Status](https://travis-ci.org/wankdanker/node-redis-jsonify.svg?branch=master)](https://travis-ci.org/wankdanker/node-redis-jsonify)

Save JSON representation of objects to redis when using node_redis

why
------

I basically always save JSON objects to redis. As far as I can tell there isn't 
a way to make @mranney's [node_redis](https://github.com/mranney/node_redis) 
implicitly convert objects and arrays to JSON before they are sent off to redis.
So I would always to have to wrap my set and get calls with JSON.parse/stringify
nonsense. 

how
------

This module exports a function which when passed a RedisClient instance will 
proxy the send_command method and convert anything that is not a Buffer to and 
from JSON. I considered modifying the RedisClient prototype automatically when 
this module is included in your project, but decided against it because you may
not want this behavior on all of your redis clients.

compatibility
-------------

This module is compatible with most versions of node_redis from 0.6.7 to 2.8.0
except 2.4.2 and 2.3.1.

install
---------

with npm...

```bash
npm install redis-jsonify
```

or with git...

```bash
git clone git://github.com/wankdanker/node-redis-jsonify.git
```

example
------------

```javascript

var redis = require('redis')
	, jsonify = require('redis-jsonify')
	, client = jsonify(redis.createClient())
	;

client.set('asdf', { foo : "bar" }, function (err, result) {
		client.get('asdf', function (err, result) {
			console.log(result); 
			// should be { foo : "bar" } and not [Object object]
			
			client.quit(function () {	});
		});
});

```

extras
--------

I'm not a huge redis buff yet, so there may be certain commands for which this 
is not a good idea. One example would be the `list` command. The value returned
by the `list` command is not JSON. To disable the JSON processing for certain
commands there is a command blacklist array exported by the module. It currently
only contains the `list` command. If you know of other commands that should be
blacklisted by default or there should be special processing, let me know and
I'll add them. Pull requests welcome also.

```javascript
var jsonify = require('redis-jsonify');

//add somecommand to the blacklist
jsonify.blacklist.push('somecommand');

//dump the blacklist to console
console.log(jsonify.blacklist);
```

license
----------

### The MIT License (MIT)


Copyright (c) 2012 Daniel L. VerWeire

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.