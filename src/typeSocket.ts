type ServerToClientEventsType = {
  getMessage: (
    option: string
  ) => void;
}

type ClientToServerEventsType = {
  setMessage: (
    option: string
  ) => void;
}

export {
  ServerToClientEventsType,
  ClientToServerEventsType,
};
