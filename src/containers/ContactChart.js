import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { contactFetch } from '../actions';

let dataObj = {};

class ContactChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onLoad();
  }

  componentDidMount() {
    const contactList = this.props.contactList;
    this.props.contactList.forEach(({ id, name, phone, email, date }) => {
      if (dataObj[date] !== undefined)
        ++dataObj[date];
      else
        dataObj[date] = 1;
    });
  }

  render() {
    let labels = [];
    for (var key in dataObj)
      labels.push(key);

    let values = [];
    for (var key in dataObj)
      values.push(dataObj[key]);

    const data = {
      labels: labels,
      datasets: [{
        label: 'Chart',
        data: values
      }]
    };

    return (
      <div>
        <Line data={data} />
        <Link to="/"><i className="glyphicon glyphicon-chevron-left"></i> Back to Home Page</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.contacts
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(contactFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactChart));
