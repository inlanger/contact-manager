import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { contactAdd } from '../actions';
import ContactForm from './ContactForm';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

class ContactCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { name, phone, email } = values;
    // const newDate = new Date();
    const newDate = randomDate(new Date(2013, 0, 1), new Date());
    const date = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
    this.props.onSubmit({ name, phone, email, date });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <ContactForm onSubmit={this.handleSubmit} />
        <Link to="/"><i className="glyphicon glyphicon-chevron-left"></i> Back to Home Page</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactAdd(contact))
});

export default connect(null, mapDispatchToProps)(withRouter(ContactCreate));
