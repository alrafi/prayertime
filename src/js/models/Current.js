import axios from 'axios';
import { APIKEY } from '../config';

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

  async getWeather() {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.coord[0]}&lon=${this.coord[1]}&units=metric&appid=${APIKEY}`
      );
      this.icon = res.data.weather[0].icon;
      this.description = res.data.weather[0].description;
      this.temperature = res.data.main.temp;
      this.city = res.data.name;
      this.country = res.data.sys.country;
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }

  getDate() {
    const currentDate = new Date();
    const nameOfMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Des'
    ];
    this.time = currentDate.getTime(); // time in milisecond based on Jan 1, 1970
    this.date = currentDate.getDate(); // 1-31
    this.day = currentDate.getDay(); // 0-6
    this.month = currentDate.getMonth() + 1; // 0-11 but change to 1-12
    this.year = currentDate.getFullYear(); // 2020, 2021, so on
    this.monthName = nameOfMonth[this.month - 1]; // 3 char of month name

    return [
      this.time,
      this.date,
      this.day,
      this.month,
      this.year,
      this.monthName
    ];
  }

  async getTimePrayer() {
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/calendar?latitude=${this.coord[0]}&longitude=${this.coord[1]}&method=2&month=${this.month}&year=${this.year}`
      );
      this.timePrayer = res.data.data;
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }

  getOnlyPrayerTime(raw) {
    const allowed = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

    const filtered = Object.keys(raw)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = raw[key];
        return obj;
      }, {});

    return filtered;
  }

  getValuePrayerTime(dataTimePrayer) {
    const values = Object.values(dataTimePrayer);
    const onlyValues = values.map(value => value.substring(0, 5));
    return onlyValues;
  }

  // get next prayer time
  getNextPrayerTime(timePrayer, tomorrow) {
    const dataTimePrayer = timePrayer.timings;
    const onlyTimePrayer = this.getOnlyPrayerTime(dataTimePrayer);
    const valueTimePrayer = this.getValuePrayerTime(onlyTimePrayer);
    const prayerName = Object.keys(onlyTimePrayer);

    const tomorrowTimePrayer = tomorrow.timings;

    // todo: refactor -- make on other function
    const timeIsha = new Date(
      `${this.monthName} ${this.date}, ${this.year} ${valueTimePrayer[4]}:00`
    ).getTime();

    if (this.time > timeIsha) {
      const fajr = tomorrowTimePrayer['Fajr'].substring(0, 5);
      const nextFajr = new Date(
        `${this.monthName} ${this.date + 1}, ${this.year} ${fajr}:00`
      ).getTime();
      const i = 0;

      return [fajr, nextFajr, prayerName[i], i];
    } else {
      let foundNext = false;
      let i = 0;
      let nextPrayer;
      while (!foundNext) {
        const next = new Date(
          `${this.monthName} ${this.date}, ${this.year} ${valueTimePrayer[i]}:00`
        ).getTime();

        if (this.time < next) {
          foundNext = true;
          nextPrayer = next;
        } else {
          i++;
        }
      }

      return [valueTimePrayer[i], nextPrayer, prayerName[i], i];
    }
  }
}
