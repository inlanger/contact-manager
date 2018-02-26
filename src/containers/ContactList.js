import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ContactForm from './ContactForm';
import Button from '../components/Button';
import { contactAdd, contactDelete, contactFetch } from '../actions';
import './ContactList.css';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  handleSubmit(values) {
    const { name, phone, email } = values;
    this.props.onSubmit({ name, phone, email });
  }

  render() {
    const contactList = this.props.contactList;

    return (
      <div>
        {contactList.length > 0 ? (
          <Link to="/new" className="btn btn-primary">
            Create Contact
          </Link>
        ) : (
          <ContactForm onSubmit={this.handleSubmit} />
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.contactList.map(({ id, name, phone, email }, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{email}</td>
                  <td><Link to={`/edit/${id}`} className="btn btn-primary">Edit</Link></td>
                  <td>
                    <Button
                      buttonType="btn-danger"
                      onClick={() => this.props.onClickDelete(id)}>
                        Delete
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.contacts
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactAdd(contact)),
  onClickDelete: id => dispatch(contactDelete(id)),
  onLoad: () => dispatch(contactFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactList));
