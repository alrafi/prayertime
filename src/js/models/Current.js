import axios from 'axios';

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

  async getCityName() {
    try {
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${this.coord[0]}&lon=${this.coord[1]}&appid=f3bfa42f5eb3ca462fa3a4e43d1366ff`
      );
      this.city = res.data.name;
      this.country = res.data.sys.country;
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }

  getDate() {
    const currentDate = new Date();
    this.day = currentDate.getDate();
    this.month = currentDate.getMonth();
    this.year = currentDate.getFullYear();
  }

  async getTimePrayer() {
    try {
      const res = await axios.get(
        `http://api.aladhan.com/v1/calendar?latitude=${this.coord[0]}&longitude=${this.coord[1]}&method=2&month=${this.month}&year=${this.year}`
      );
      this.timePrayer = res.data.data;
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }
}
