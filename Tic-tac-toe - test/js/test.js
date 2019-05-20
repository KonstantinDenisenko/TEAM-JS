mocha.setup('bdd');
var assert = chai.assert;

describe('Check start game behavior', function() {
    var name = "someName";

    it('Check that "requestToStart" returns promise', function(done) {
        var promise = fetch(host + "/start?name=" + name);

        assert.isTrue(promise instanceof Promise);

        promise.then(() => done());
    });

    it("Check for permission to move", function (done) {

        fetch(host + "/start?name=" + name)
            .then(checkResponse)
            .then(function (json) {
                assert.isTrue(json.data.canMove);

                done();
            })
    });

});

describe('Checking request for server', function() {
    var name = "someName";
    var index = 8;
    var headers = new Headers();
    headers.append("Content-type", "application/json");

    it("Check for correct answer from server", function (done) {
        fetch(host + "/start?name=" + name)
            .then(function (response) {
                assert.equal(response.status, 200);
                done();
            })
    });

    it('Check that "makeMove" returns correct json', function(done) {
        fetch(host + "/makeMove", {
            method: "POST",
            body: JSON.stringify({move: index, id: id, name: name}),
            headers: headers
        })
        .then(checkResponse)
        .then(checkReason)
        .then(function (json) {
            assert.isTrue(json.ok);
        });
        done();
    });

    it('Check that "waitMove" returns correct json', function(done) {
        fetch(host + "/waitMove", {
            method: "POST",
            body: JSON.stringify({id: id, name: name}),
            headers: headers
        })
        .then(checkResponse)
        .then(function (json) {
            assert.isTrue(json.ok);
        });
        done();
    });
});

mocha.run();