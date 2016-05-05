import React, { PropTypes } from 'react';

import PasswordInput from '../../sessions/PasswordInput';
import Main from '../Main';
import { updatePassword } from '../../../share/server';
import { showXHRError } from '../../../share/utils';
import { showMessage, setStore } from '../../../actions';

class PasswordEdit extends React.Component {
  constructor() {
    super();

    this.submit = e => {
      e.preventDefault();
      const password = this.refs.old.getValue();
      if (password === false) return;
      const new_password = this.refs.new.getValue();
      if (new_password === false) return;

      updatePassword({ password, new_password })
        .done(user => {
          const msg = '密码修改成功，跳转中';
          this.props.dispatch(setStore({ user }));
          this.props.dispatch(showMessage({ type: 'success', msg }));

          setTimeout(() => {
            window.location.href = '/#/security';
          }, 5000);
        }).fail(xhr => showXHRError(xhr, this.props.dispatch));
    };
  }
  render() {
    return (
      <Main needPadding title="修改密码" isCenter>
        <form onSubmit={this.submit}>
          <PasswordInput placeholder="原密码" autofocus className="mb-input" ref="old" />
          <PasswordInput placeholder="新密码" className="mb-input" ref="new" />
          <button className="btn btn-large">修改密码</button>
        </form>
      </Main>
    );
  }
}

PasswordEdit.propTypes = {
  dispatch: PropTypes.func,
};

export default PasswordEdit;