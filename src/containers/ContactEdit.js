import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { contactEdit } from '../actions';
import ContactForm from './ContactForm';

const apiPrefix = "http://localhost:8080";

class ContactEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { contactId } = this.props.match.params;

    fetch(`${apiPrefix}/contacts/${contactId}`)
      .then(response => response.json())
      .then(contact => this.setState({ contact }));
  }

  handleSubmit(values) {
    this.props.onSubmit(values);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <ContactForm onSubmit={this.handleSubmit} initialValues={this.state.contact} />
        <Link to="/"><i className="glyphicon glyphicon-chevron-left"></i> Back to Home Page</Link>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactEdit(contact))
});

export default connect(null, mapDispatchToProps)(withRouter(ContactEdit));
