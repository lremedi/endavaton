export const SET_EVENTS = 'SET_EVENTS';
export const SAVE_EVENT = 'SAVE_EVENT';
export const ADD_PERSON = 'ADD_PERSON';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error; 
    }
}

export function saveEvent(event){
    return dispatch => {
       return fetch('/VyE_new/API/v1/events', {
            method: 'post',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '3d524a53c110e4c22463b10ed32cef9d'
            }

        })
        .then(handleResponse);
    }
}

export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events
    }
}

export function addPerson(person) {
  return {
      type: ADD_PERSON,
      person
  }
}

export function fetchEvents() {
    return dispatch => {
        fetch('/VyE_new/API/v1/events')
            .then(res => res.json())
            .then(data => dispatch(setEvents(data.events)))
    }
}