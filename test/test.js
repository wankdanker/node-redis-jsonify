var test = require("tape")
    , jsonify = require("../")
    , multidep = require('multidep')('test/multidep.json')
    ;

multidep.forEachVersion('redis', function (version, redis){
    var testPrefix = 'redis@' + version + ': ';

    test(testPrefix + 'client gets and sets string key', function (t) {
        var client = jsonify(redis.createClient())
            , key = "test-key-asdf"
            , val = { foo : "bar1" }
            ;

        t.plan(3);

        client.set(key, val, function (err, data) {
            t.error(err, 'no error returned on set');

            client.get(key, function (err, data) {
                t.error(err, 'no error returned on get');
                t.deepEqual(val, data);
                
                client.quit(function () {
                    t.end();
                });
            });
        });
    });

    test(testPrefix + 'client gets and sets string key even if it is an object when not using jsonKey', function (t) {
        var client = jsonify(redis.createClient())
            , key = { a : "test-key-asdf" }
            , val = { foo : "bar2" }
            ;

        t.plan(3);

        client.set(key, val, function (err, data) {
            t.error(err, 'no error returned on set');

            client.get("[object Object]", function (err, data) {
                t.error(err, 'no error returned on get');
                t.deepEqual(val, data);
                
                client.quit(function () {
                    t.end();
                });
            });
        });
    });

    test(testPrefix + 'client sets and gets a json key', function (t) {
        var client = jsonify(redis.createClient(), { jsonKey : true })
            , key = { b : "test-key-asdf" }
            , val = { foo : "bar3" }
            ;

        t.plan(3);

        client.set(key, val, function (err ,data) {
            t.error(err, 'no error returned on set');

            client.get(key, function (err, data) {
                t.error(err, 'no error returned on get');
                t.deepEqual(val, data);     
                
                client.quit(function () {
                    t.end();            
                });
            });
        });
    });
})