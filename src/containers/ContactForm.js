import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../components/TextInput';

const apiPrefix = "http://localhost:8080";

class ContactForm extends React.Component {
  required(value) {
    return value && value.length > 0 ? undefined : 'This field is required.';
  }

  maxLength(max) {
    return value => value && value.length <= max ? undefined : `Must have ${max} characters or less.`;
  }

  phoneFormat(value) {
    return value && /^\+380 [0-9]{2} [0-9]{3} [0-9]{4}$/.test(value) ? undefined : 'Must be in US format, e.g. +380 11 111 1111';
  }

  render() {
    const { handleSubmit, pristine, submitting, reset } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="id" type="hidden" component="input" />

        <Field
          name="name"
          component={TextInput}
          type="text"
          label="Name"
          placeholder="e.g. John Doe"
          validate={[
            this.required,
            (() => this.maxLength(25))()
          ]}
        />

        <Field
          name="phone"
          component={TextInput}
          type="text"
          label="Phone"
          placeholder="+380 11 111 1111"
          validate={[
            this.required,
            this.phoneFormat
          ]}
        />

        <Field
          name="email"
          component={TextInput}
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
          validate={this.required}
        />

        <Field name="date" type="hidden" component="input" />

        <fieldset className="form-group">
          <button type="submit" disabled={pristine || submitting} className="btn btn-success">Submit</button>&nbsp;
          <button type="button" disabled={pristine || submitting} className="btn btn-default" onClick={reset}>Reset</button>&nbsp;
        </fieldset>
      </form>
    )
  }
}

const phoneUnique = values => {
  const { phone, id } = values;
  return fetch(`${apiPrefix}/contacts?phone=${btoa(phone)}&id=${id}`)
    .then(response => response.json())
    .then(json => {
      if (json.length > 0) {
        throw { phone: 'This phone number already exists.' };
      }
    });

}

export default reduxForm({
  form: 'contact',
  asyncValidate: phoneUnique,
  asyncBlurFields: ['phone'],
  enableReinitialize: true
})(ContactForm);
