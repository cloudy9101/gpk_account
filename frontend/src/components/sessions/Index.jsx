import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import ReduxWrapper from '../ReduxWrapper';
import Transition from '../Transition';
import Wrapper from './Wrapper';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import Modal from '../Modal';
import Message from '../share/Message';
import ServerStore from '../share/ServerStore';

const T = props => (
  <ReduxWrapper>
    <div>
      <ServerStore server={props.route.server} />
      <Transition {...props}>
        <Wrapper children={props.children} />
      </Transition>
      <Modal />
      <Message />
    </div>
  </ReduxWrapper>
);

T.propTypes = {
  route: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

class Session extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={T} {...this.props}>
          <IndexRoute component={Login} />
          <Route path="login" component={Login} />
          <Route path="signup" component={Register} />
          <Route path="reset" component={ResetPassword} />
        </Route>
      </Router>
    );
  }
}

Session.propTypes = {
  server: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

export default Session;