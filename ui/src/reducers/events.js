import { SET_EVENTS } from "../actions/actions";

export function events (state = [], action = {}) {    
    switch (action.type) {           
        case SET_EVENTS: 
            return action.events;
        default: return state;
    }
}