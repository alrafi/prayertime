import axios from 'axios';
import { APIKEY } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getCityWeather() {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.query}&units=metric&appid=${APIKEY}`
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

  async getResult(country) {
    //
    try {
      const res = await axios.get(
        `https://api.aladhan.com/v1/calendarByCity?city=${this.query}&country=${country}&method=2&month=${this.month}&year=${this.year}`
      );
      this.timePrayer = res.data.data;
    } catch (err) {
      console.log(`something error: ${err}`);
    }
  }
}
