// import axios from 'axios';

function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: 'PostionError', code })
        ),
      options
    );
  });
}

export default class Current {
  constructor() {
    this.coord = [];
  }

  async getCoord() {
    try {
      const dataCoord = await getCurrentLocation({
        enableHighAccuracy: true,
        maximumAge: 0
      });
      this.coord = [dataCoord.coords.latitude, dataCoord.coords.longitude];
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }
}
