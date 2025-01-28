import axios from 'axios';

const AIP_KEY = 'b458b809b0399ee106d6e3de0ea1c8f0';
const URL_ADDRESS = 'https://api.novaposhta.ua/v2.0/json/';

export const fetchCities = () => {
  return axios
    .post(URL_ADDRESS, {
      apiKey: AIP_KEY,
      modelName: 'Address',
      calledMethod: 'getCities',
    })
    .then((response) => response.data.data);
};

export const fetchWarehouses = (cityRef: string) => {
  return axios
    .post(URL_ADDRESS, {
      apiKey: AIP_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: { CityRef: cityRef },
    })
    .then((response) => response.data.data);
};
