import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ContactList from './containers/ContactList';
import ContactCreate from './containers/ContactCreate';
import ContactEdit from './containers/ContactEdit';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Contacts Manager</h1>
          <div className="container main">
            <Route exact path="/" component={ContactList} />
            <Route path="/new" component={ContactCreate} />
            <Route path="/edit/:contactId" component={ContactEdit} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
