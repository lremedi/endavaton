import axios from "axios";
import config from "../environmentConfig";

const unknowns = [{
    id: '0',
    text: "un texto del primer tweet",
  },
  {
    id: '1',
    text: "lala laslal la al alala dasfsdfasdf",
  },
  {
    id: '2',
    text: "afsdfakjsdf asdgkjasdgkjasdg asdgkjasdgkhasdgkjadsg asdgakjsdg",
  },
]

const results = {
  results: [{
      type: 'Positive',
      number: 70,
    },
    {
      type: 'Negative',
      number: 20,
    },
    {
      type: 'Neutral',
      number: 10,
    },
  ],
  total: 100
}

const getUknowns = (id) => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?q={%22sentiment%22:%20%22__label__NONE%22}&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU').then(({
    data
  }) => {
    return data;
  });
}

const getUnproccess = () => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?q={%22sentiment%22:null}&c=true&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
      .then(({data}) => {
        return data;
      })
}

const getTotal = () => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?c=true&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
    .then(({
      data
    }) => {
     return data;      
    });
}
const getPositive = () => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?q={%22sentiment%22:%20%22__label__P%22}&c=true&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
    .then(({
      data
    }) => {
      return data;
    });
}
const getNegative = () => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?q={%22sentiment%22:%20%22__label__N%22}&c=true&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
    .then(({
      data
    }) => {
      return data;
    });
}

const getNeutral = () => {
  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/tweets?q={%22sentiment%22:%20%22__label__NEU%22}&c=true&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
    .then(({
      data
    }) => {
      return data;
    });
}

const getCriteria = (id) => {

  return axios.get('https://api.mlab.com/api/1/databases/trackback/collections/patterns?&apiKey=ar8hwQ-hy4rFUdvnwd1Zn2ypZOhfCeaU')
    .then(({data}) => {
      const chords = data[0].chords.join();
      return `${data[0].root.split('#')[1]} [${chords}]`;
    });
}

export default {
  getUknowns,
  getTotal,
  getUnproccess,
  getCriteria,
  getPositive,
  getNegative,
  getNeutral
}