/*globals describe beforeEach afterEach it assert sinon ckan jQuery */
describe('ckan.sandbox()', function () {
  it('should create an instance of Sandbox', function () {
    var target = sinon.stub(ckan.sandbox, 'Sandbox');
    ckan.sandbox();
    sinon.assert.called(target);
    target.restore();
  });

  it('should pass in sandbox.callbacks', function () {
    var target = sinon.stub(ckan.sandbox, 'Sandbox');
    ckan.sandbox();
    sinon.assert.calledWith(target, ckan.sandbox.callbacks);
    target.restore();
  });

  describe('Sandbox()', function () {
    var Sandbox = ckan.sandbox.Sandbox;

    beforeEach(function () {
    });

    it('should call each callback provided with itself', function () {
      var callbacks = [sinon.spy(), sinon.spy(), sinon.spy()];

      var target = new Sandbox(callbacks);

      jQuery.each(callbacks, function () {
        sinon.assert.called(this);
        sinon.assert.calledWith(this, target);
      });
    });

    describe('.ajax()', function () {
      it('should be an alias for the jQuery.ajax() method', function () {
        var target = new Sandbox();
        assert.strictEqual(target.ajax, jQuery.ajax);
      });
    });

    describe('.jQuery()', function () {
      it('should be a reference to jQuery', function () {
        var target = new Sandbox();
        assert.ok(target.jQuery === jQuery);
      });
    });

    describe('.body', function () {
      it('should be a jQuery wrapped body object', function () {
        var target = new Sandbox();
        assert.ok(target.body instanceof jQuery);
        assert.ok(target.body[0] === window.document.body);
      });
    });

    describe('.location', function () {
      it('should be a reference to window.location', function () {
        var target = new Sandbox();
        assert.ok(target.location === window.location);
      });
    });

    describe('.window', function () {
      it('should be a reference to window', function () {
        var target = new Sandbox();
        assert.ok(target.window === window);
      });
    });
  });

  describe('sandbox.extend()', function () {
    it('should extend the Sandbox.prototype with properties', function () {
      var method = sinon.spy();

      ckan.sandbox.extend({method: method});

      assert.equal(ckan.sandbox().method, method);
    });
  });

  describe('sandbox.setup()', function () {
    it('should register a function to be called when the sandbox is initialized', function () {
      var target = sinon.spy();

      ckan.sandbox.setup(target);
      ckan.sandbox();

      sinon.assert.called(target);
    });

    it('should throw an error if a non function is provided', function () {
      assert.throws(function () {
        ckan.sandbox.setup('not a function');
      });
    });
  });
});
