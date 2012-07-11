var redis = require("redis")
	, assert = require("assert")
	, client = require("./")(redis.createClient())
	, key = "test-key-asdf"
	, val = { foo : "bar" }
	, success = true
	;

client.set(key, val, function (err ,data) {

	client.get(key, function (err, data) {
		try {
			assert.deepEqual(val, data);
		}
		catch (e) {
			console.error(e);
			
			success = false;
		}
		
		client.quit(function () {
			if (success) {
				console.error("Success.");
			}
			else {
				console.error("Fail.");
			}
		});
	});
});