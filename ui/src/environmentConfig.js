export default process.env.NODE_ENV === 'production' ?
  {
    "baseUrl": "http://vidayesperanza.org.ar/api/",
    "appPrefix": "/sinlimites/"
  }
  :
  {
    "baseUrl": "http://localhost:9090/hackaton",
    "appPrefix": "/"
  }
