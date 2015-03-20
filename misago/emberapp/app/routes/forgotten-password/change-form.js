import Ember from 'ember';
import ResetScroll from 'misago/mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
  model: function(params) {
    return this.get('rpc').ajax('change-password/' + params.user_id + '/' + params.token + '/validate-token');
  },

  actions: {
    didTransition: function() {
      this.get('page-title').setTitle(gettext('Change forgotten password'));
    },

    error: function(reason) {
      if (reason.status === 404) {
        this.get('toast').error(reason.responseJSON.detail);
        return this.transitionTo('forgotten-password');
      }

      return true;
    }
  }
});