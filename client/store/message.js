// ACTION TYPES;
const WRITE_MESSAGE = "WRITE_MESSAGE";

// ACTION CREATORS;
export const writeMessage = msg => ({type: WRITE_MESSAGE, payload: msg});

//REDUCERS;
export default function(state = "", action) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
