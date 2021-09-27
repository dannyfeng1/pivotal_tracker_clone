import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.userForm;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state)
      .then(this.props.history.push("/"))
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render() {
    let { username, password} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Username:
          <input onChange={this.update("username")}type="text" value={username} />
        </label>
        <label>Password:
          <input onChange={this.update("password")}type="password" value={password} />
        </label>
        <button>Log In</button>
        <Link to="/signup">Sign Up</Link>
      </form>
    )
  }
}

export default withRouter(LogInForm)