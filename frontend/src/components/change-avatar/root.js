import React from 'react';
import AvatarIndex from 'misago/components/change-avatar/index'; // jshint ignore:line
import Loader from 'misago/components/modal-loader'; // jshint ignore:line
import misago from 'misago/index';
import { updateAvatar } from 'misago/reducers/users'; // jshint ignore:line
import ajax from 'misago/services/ajax';
import cropit from 'misago/services/cropit';
import dropzone from 'misago/services/dropzone';
import store from 'misago/services/store'; // jshint ignore:line

export class ChangeAvatarError extends React.Component {
  getErrorReason() {
    if (this.props.reason) {
      /* jshint ignore:start */
      return <p dangerouslySetInnerHTML={{__html: this.props.reason}} />;
      /* jshint ignore:end */
    } else {
      return null;
    }
  }

  render() {
    /* jshint ignore:start */
    return <div className="modal-body">
      <div className="message-icon">
        <span className="material-icon">
          remove_circle_outline
        </span>
      </div>
      <div className="message-body">
        <p className="lead">
          {this.props.message}
        </p>
        {this.getErrorReason()}
      </div>
    </div>;
    /* jshint ignore:end */
  }
}

export default class extends React.Component {
  componentDidMount() {
    Promise.all([
      ajax.get(misago.get('user').avatar_api_url),
      cropit.load(),
      dropzone.load()
    ]).then((resolutions) => {
      this.setState({
        'component': AvatarIndex,
        'options': resolutions[0]
      });
    }, (rejection) => {
      this.showError(rejection);
    });
  }

  /* jshint ignore:start */
  showError = (error) => {
    this.setState({
      error
    });
  };

  updateAvatar = (avatarHash, options) => {
    store.dispatch(updateAvatar(this.props.user, avatarHash));

    this.setState({
      'component': AvatarIndex,
      options
    });
  };

  showIndex = () => {
    this.setState({
      'component': AvatarIndex
    });
  };
  /* jshint ignore:end */

  getBody() {
    if (this.state) {
      if (this.state.error) {
        /* jshint ignore:start */
        return <ChangeAvatarError message={this.state.error.detail}
                                  reason={this.state.error.reason} />;
        /* jshint ignore:end */
      } else {
        /* jshint ignore:start */
        return <this.state.component options={this.state.options}
                                     user={this.props.user}
                                     updateAvatar={this.updateAvatar}
                                     showIndex={this.showIndex} />;
        /* jshint ignore:end */
      }
    } else {
      /* jshint ignore:start */
      return <Loader />;
      /* jshint ignore:end */
    }
  }

  getClassName() {
   if (this.state && this.state.error) {
      return "modal-dialog modal-message modal-change-avatar";
    } else {
      return "modal-dialog modal-change-avatar";
    }
  }

  render() {
    /* jshint ignore:start */
    return <div className={this.getClassName()}
                role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal"
                  aria-label={gettext("Close")}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{gettext("Change your avatar")}</h4>
        </div>

        {this.getBody()}

      </div>
    </div>;
    /* jshint ignore:end */
  }
}

export function select(state) {
  return {
    'user': state.auth.user
  };
}