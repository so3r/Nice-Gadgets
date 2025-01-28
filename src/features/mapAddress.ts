import axios from 'axios';

export const apiKey = 'AIzaSyCr1nKQOHF7-NxK8r-yP6gmdX0YxwuFwJI';

export const getMapAddress = (address: string) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
    )
    .then((response) => response.data.results[0].geometry.location);
};
