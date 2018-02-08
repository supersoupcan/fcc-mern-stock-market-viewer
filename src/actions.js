export function serverToClient(data){
  return (dispatch) => {
    dispatch(JSON.parse(data));
  };
}

export function clientToServer(data){
  return (dispatch, getState, socket) => {
    socket.send(
      JSON.stringify(data)
    );
  };
}