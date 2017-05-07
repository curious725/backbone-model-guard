Backbone.ModelGuard = (function(_, Backbone){
  'use strict';

  var ModelGuard = (function(){
    var mixin = function() {
      var original_set = Backbone.Model.prototype.set;
      return {
        set: function() {
          var options = {match: true},
              new_keys = [],
              expected_keys = _.keys(this.defaults),
              forbidden_keys = [],
              message = '';

          // Attributes that are not expected by backend in case of a new record,
          // but it is Ok to initialize a model with these attributes.
          expected_keys.push('id', 'user_id', 'created_at', 'updated_at');

          if (_.isObject(arguments[0])) {
            options = _.extend(options, arguments[1]);
            new_keys = _.keys(arguments[0]);
            forbidden_keys = _.reject(new_keys, function(key) {
              return _.contains(expected_keys, key);
            });
          } else {
            options = _.extend(options, arguments[2]);
            new_keys = [arguments[0]];
            forbidden_keys = _.reject(new_keys, function(key) {
              return _.contains(expected_keys, key);
            });
          }

          if (_.isEmpty(forbidden_keys)) {
            return original_set.apply(this, arguments);
          }
        }
      };
    };

    return {
      version: '0.1.0',
      mixin: mixin()
    };
  }());

  return ModelGuard;
}(_, Backbone));
