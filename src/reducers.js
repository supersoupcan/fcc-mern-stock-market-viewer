export function stocks (state = {}, action){
  switch(action.type){
    case "INIT" : {
      state = action.payload;
      break;
    }
    case "ADD" : {
      state = [
        ...state.slice(),
        action.payload
      ];
      break;
    }
    case "UPDATE" : {
      const index = state.findIndex(stock => stock.symbol === action.payload.symbol);
      state = [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1)
      ];
      break;
    }
    case "REMOVE" : {
      const index = state.findIndex(stock => stock.symbol === action.payload);
      state = [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    }
  }
  return state;
}