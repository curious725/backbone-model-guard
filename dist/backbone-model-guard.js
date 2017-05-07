/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);