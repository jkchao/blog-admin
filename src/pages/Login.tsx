import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
  render() {
    return (
      <>
        <div>Login</div>
        <Link to="/article/list">hahah</Link>
      </>
    );
  }
}
