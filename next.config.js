module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/additem",
        destination:
          "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items",
      },
      {
        source: "/getproject",
        destination:
          "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items",
      },
      {
        source: "/editproject",
        destination:
          "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items",
      },
      {
        source: "/deleteproject/:id",
        destination:
          "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items/:id",
      },
      {
        source: "/deleteclient/:id",
        destination:
          "https://k3kbdpoq43.execute-api.us-east-1.amazonaws.com/clients/:id",
      },
      {
        source: "/addclient",
        destination:
          "https://k3kbdpoq43.execute-api.us-east-1.amazonaws.com/clients",
      },
      {
        source: "/editclient/:id",
        destination:
          "https://k3kbdpoq43.execute-api.us-east-1.amazonaws.com/clients/:id",
      },
      {
        source: "/getclient",
        destination:
          "https://k3kbdpoq43.execute-api.us-east-1.amazonaws.com/clients",
      },
    ];
  };

  return {
    rewrites,
  };
};
