import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CONTACT_ERRORS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    errors: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Add Contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Delete Contact

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // clear Contacts
  const clearContacts = () =>
    dispatch({
      type: CLEAR_CONTACTS
    });

  // Set Current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };
  // Clear Filter

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        errors: state.errors,
        getContacts,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
