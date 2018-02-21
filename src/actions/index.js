const apiPrefix = "http://localhost:8080";

export const contactFetch = () => dispatch => {
  fetch(`${apiPrefix}/contacts`)
    .then(response => response.json())
    .then(json =>
        dispatch({
          type: 'CONTACT_FETCH',
          contacts: json
        }));
};

export const contactAdd = contact => dispatch => {
  fetch(`${apiPrefix}/contacts`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
    .then(response => response.json())
    .then(() => {
      dispatch({
        type: 'CONTACT_ADD',
        contact
      });
    });
};

export const contactEdit = contact => dispatch => {
  fetch(`${apiPrefix}/contacts/${contact.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(contact)
  })
    .then(() => {
      dispatch({
        type: 'CONTACT_EDIT',
        contact
      });
    });
};

export const contactDelete = id => dispatch => {
  fetch(`${apiPrefix}/contacts/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      dispatch({
        type: 'CONTACT_DELETE',
        id
      });
    });
};
