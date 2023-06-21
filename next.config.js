module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/addproject",
          destination: "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items",
        },
        {
            source: "/getproject",
            destination: "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items",
          },
          {
            source: "/editproject/:id", 
            destination: "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items/:id", 
          },
          {
            source: "/deleteproject/:id", 
            destination: "https://5yaxbihtgl.execute-api.us-east-1.amazonaws.com/items/:id", 
          },
      ];
    }
  
    return {
      rewrites,
    };
  };
  
  