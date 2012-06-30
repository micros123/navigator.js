// Generated by CoffeeScript 1.3.1

/*
* NavigationState
*/


(function() {
  var NavigationState;

  window.NavigationState = NavigationState = (function() {

    NavigationState.name = 'NavigationState';

    function NavigationState(segments) {
      if (segments instanceof Array) {
        segments = segments.join('/');
      }
      this.setPath(segments);
    }

    NavigationState.prototype.setPath = function(path) {
      this._path = '/' + path.toLowerCase() + '/';
      this._path = this._path.replace(new RegExp("\/+", "g"), "/");
      return this._path = this._path.replace(/\s+/g, "-");
    };

    NavigationState.prototype.getPath = function() {
      return this._path;
    };

    NavigationState.prototype.setSegments = function(segments) {
      return this.setPath(segments.join('/'));
    };

    NavigationState.prototype.getSegments = function() {
      var segments;
      segments = this._path.split("/");
      segments.pop();
      segments.shift();
      return segments;
    };

    NavigationState.prototype.getSegment = function(index) {
      return this.getSegments()[index];
    };

    NavigationState.prototype.getFirstSegment = function() {
      return this.getSegment(0);
    };

    NavigationState.prototype.getLastSegment = function() {
      var segments;
      segments = this.getSegments();
      return this.getSegment(segments.length - 1);
    };

    NavigationState.prototype.contains = function(foreignState) {
      var foreignSegment, foreignSegments, index, nativeSegment, nativeSegments, _i, _len;
      foreignSegments = foreignState.getSegments();
      nativeSegments = this.getSegments();
      if (foreignSegments.length > nativeSegments.length) {
        return false;
      }
      for (index = _i = 0, _len = foreignSegments.length; _i < _len; index = ++_i) {
        foreignSegment = foreignSegments[index];
        nativeSegment = nativeSegments[index];
        if (!(foreignSegment === "*" || nativeSegment === "*") && foreignSegment !== nativeSegment) {
          return false;
        }
      }
      return true;
    };

    NavigationState.prototype.equals = function(state) {
      var subtracted;
      subtracted = this.subtract(state);
      if (subtracted === null) {
        return false;
      }
      return subtracted.getSegments().length === 0;
    };

    NavigationState.prototype.subtract = function(operand) {
      var subtractedSegments;
      if (!this.contains(operand)) {
        return null;
      }
      subtractedSegments = this.getSegments();
      subtractedSegments.splice(0, operand.getSegments().length);
      return new NavigationState(subtractedSegments);
    };

    return NavigationState;

  })();

}).call(this);
