require('../dist/js/vendor.js');

var chai = require('chai'),
    expect = chai.expect,
    AppComponent = require('../dist/app/app.js').AppComponent;

describe('AppComponent', function() {
    var app;

    beforeEach(function() {
        app = new AppComponent();
    });

    it('should run tests', function() {
        expect(true).to.equal(true);
    });

    it('should test the app', function() {
        expect(app.isTestable).to.equal(true);
    });
});
