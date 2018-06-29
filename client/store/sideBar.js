// ACTION TYPES;
const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

// ACTION CREATORS;
export const toggleSidebar = bool  => ({type: TOGGLE_SIDEBAR, payload: bool});

//REDUCERS;
export default function(state = false, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return action.payload;
    default:
      return state;
  }
};
