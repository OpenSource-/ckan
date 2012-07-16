this.ckan.module('resource-form', function (jQuery, _) {
  return {
    initialize: function () {
      jQuery.proxyAll(this, /_on/);
      this.sandbox.subscribe('resource:uploaded', this._onResourceUploaded);
    },
    teardown: function () {
      this.sandbox.unsubscribe('resource:uploaded', this._onResourceUploaded);
    },
    _onResourceUploaded: function (resource) {
      var key;
      var field;

      for (key in resource) {
        if (resource.hasOwnProperty(key)) {
          field = this.$('[name="' + key + '"]');

          if (field.is(':checkbox, :radio')) {
            this.$('[value="' + resource[key] + '"]').prop('checked', true);
          } else if (field.is('select')) {
            field.prop('selected', resource[key]);
          } else {
            field.val(resource[key]);
          }
        }
      }
    }
  };
});