import Current from './models/Current';
import * as currentView from './views/currentView';

const state = {};

const controlCurrent = async () => {
  state.current = new Current();

  await state.current.getCoord();

  state.current.getDate();

  // show current day
  currentView.showTodayName(state.current.day);

  // show current date to UI
  currentView.showTodayDate(
    state.current.date,
    state.current.month - 1,
    state.current.year
  );

  const today = state.current.date - 1;
  const tomorrow = state.current.date;

  // call api from getTimePrayer method
  await state.current.getTimePrayer();

  // call api from getWeather method
  await state.current.getWeather();

  // show the time prayer to UI
  currentView.showTimePrayer(state.current.timePrayer[today]);

  // next prayer
  const [
    valueTimePrayer,
    nextPrayer,
    prayerName,
    indexNextPrayer
  ] = state.current.getNextPrayerTime(
    state.current.timePrayer[today],
    state.current.timePrayer[tomorrow]
  );

  // update next prayer to UI
  currentView.showNextPrayer(valueTimePrayer);

  // show countdown to UI
  currentView.showCountdown(nextPrayer, prayerName);

  // highlight next prayer
  currentView.highlightNextPrayer(indexNextPrayer);

  // show city name and country to UI
  currentView.showCityName(state.current.city, state.current.country);

  // show temperature
  currentView.showWeather(
    state.current.temperature,
    state.current.icon,
    state.current.description
  );
};

controlCurrent();
