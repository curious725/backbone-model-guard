/*jshint -W030*/
var expect = chai.expect;


// TODO: Check for a set of attributes
describe('Backbone.Model', function () {
  before(function () {
    this.defaults = {
      'kind': '',
      'status': '',
      'start_date':'',
      'end_date':'',
    };
    this.restrictedAttributes = {
      'agility': '1',
      'intellect': '5',
      'mastery': '5',
      'spirit': '5',
      'stamina': '3',
      'strength': '2',
    };

    this.restrictedKeys = _.keys(this.restrictedAttributes);
    this.restrictedKey  = this.restrictedKeys[0];
    this.allowedKeys    = _.keys(this.defaults);

    this.restrictedAttr = {'agility': '1'};
    this.allowedAttr    = {kind: 'passed'};
    this.allowedKey     = _.keys(this.allowedAttr)[0];
  });

  context('without Backbone.ModelGuard', function () {
    before(function () {
      this.model = Backbone.Model.extend({
        defaults: {
          'kind': '',
          'status': '',
          'start_date':'',
          'end_date':'',
        }
      });
    });

    beforeEach(function () {
      this.subject = new this.model();
    });

    context('with allowed attribute', function () {
      beforeEach(function () {
        this.attr = this.allowedAttr;
      });

      it('sets the attribute', function () {
        this.subject.set(this.attr);
      });
    });

    context('with restricted attribute', function () {
      beforeEach(function () {
        this.attr = this.restrictedAttr;
      });

      it('sets the attribute', function () {
        this.subject.set(this.attr);
      });
    });
  });

  context('with Backbone.ModelGuard', function () {
    before(function () {
      _.extend(Backbone.Model.prototype, Backbone.ModelGuard.mixin);
      this.model = Backbone.Model.extend({defaults: this.defaults});
    });

    beforeEach(function () {
      this.subject = new this.model();
    });

    context('with allowed attribute', function () {
      before(function () {
        this.key = this.allowedKey;
        this.value = this.allowedAttr[this.key];
      });

      context('set as an object', function () {
        beforeEach(function () {
          this.subject.set(this.allowedAttr);
        });

        it('sets the attribute', function () {
          expect(this.subject.has(this.key)).to.be.true;
          expect(this.subject.get(this.key)).to.equal(this.value);
        });
      });

      context('set as a pair of strings', function () {
        beforeEach(function () {
          this.subject.set(this.key, this.value);
        });

        it('sets the attribute', function () {
          expect(this.subject.has(this.key)).to.be.true;
          expect(this.subject.get(this.key)).to.equal(this.value);
        });
      });
    });

    context('with restricted attribute', function () {
      before(function () {
        this.key = this.restrictedKey;
        this.value = this.restrictedAttr[this.key];
      });

      context('set as an object', function () {
        beforeEach(function () {
          this.subject.set(this.allowedAttr);
        });

        it('does not set the attribute', function () {
          expect(this.subject.has(this.key)).to.be.false;
        });
      });

      context('set as a pair of strings', function () {
        beforeEach(function () {
          this.subject.set(this.key, this.value);
        });

        it('does not set the attribute', function () {
          expect(this.subject.has(this.key)).to.be.false;
        });
      });
    });
  });
});
