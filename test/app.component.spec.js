require('../node_modules/reflect-metadata/Reflect.js');

var chai = require('chai'),
    expect = chai.expect,
    AppComponent = require('../build/app.component.js').AppComponent;

describe('AppComponent', () => {
    var app;

    beforeEach(function() {
        app = new AppComponent();
    });

    it('should be testable', function() {
        expect(app.isTestable).to.equal(true);
    });
});

