export const add = (payload) => {
  return {
    type: "ADD",
    payload,
  };
};
export const subtract = (payload) => {
  return {
    type: "SUBTRACT",
    payload,
  };
};
