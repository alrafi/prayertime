import Current from './models/Current';
import Search from './models/Search';
import * as currentView from './views/currentView';

const state = {};

const controlCurrent = async () => {
  state.current = new Current();

  state.current.getDate();
  const attrDate = {
    day: state.current.day,
    month: state.current.month,
    year: state.current.year
  };

  // get coodinate
  await state.current.getCoord();

  // call api from getTimePrayer method
  await state.current.getTimePrayer();

  // call api from getWeather method
  await state.current.getWeather();

  const today = state.current.date - 1;
  const tomorrow = state.current.date;

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

  const attrNextPrayer = {
    today,
    tomorrow,
    valueTimePrayer,
    nextPrayer,
    prayerName,
    indexNextPrayer
  };
  // console.log(attr);
  // console.log(attr);

  updateUI(state.current, attrNextPrayer, attrDate);
};

const form = document.querySelector('.form-city');
const search = document.querySelector('.input-city');

const controlSearch = async () => {
  if (!search.value) return;
  state.search = new Search(search.value);
  state.currentSearch = new Current();

  state.currentSearch.getDate();

  try {
    await state.search.getCityWeather();
  } catch (err) {
    console.log(err);
  }

  if (!state.search.temperature) {
    alert('City is not found');
    return;
  }

  await state.search.getResult(state.search.country);

  const today = state.currentSearch.date - 1;
  const tomorrow = state.currentSearch.date;

  // next prayer
  const [
    valueTimePrayer,
    nextPrayer,
    prayerName,
    indexNextPrayer
  ] = state.currentSearch.getNextPrayerTime(
    state.search.timePrayer[today],
    state.search.timePrayer[tomorrow]
  );

  const attr = {
    today,
    tomorrow,
    valueTimePrayer,
    nextPrayer,
    prayerName,
    indexNextPrayer
  };

  // console.log(attr);
  updateUI(state.search, attr, state.currentSearch);
};

const updateUI = (current, attr, attrDate) => {
  // show current day
  currentView.showTodayName(attrDate.day);

  // show current date to UI
  currentView.showTodayDate(attr.today + 1, attrDate.month - 1, attrDate.year);

  // show the time prayer to UI
  currentView.showTimePrayer(current.timePrayer[attr.today]);

  // update next prayer to UI
  currentView.showNextPrayer(attr.valueTimePrayer);

  // show countdown to UI
  currentView.showCountdown(attr.nextPrayer, attr.prayerName);

  // highlight next prayer
  currentView.highlightNextPrayer(attr.indexNextPrayer);

  // show city name and country to UI
  currentView.showCityName(current.city, current.country);

  // show temperature
  currentView.showWeather(
    current.temperature,
    current.icon,
    current.description
  );
};

form.addEventListener('submit', event => {
  event.preventDefault();
  currentView.removeHighlight();
  currentView.stopCountdown();
  controlSearch();
  currentView.clearSearch();
});

const init = () => {
  controlCurrent();
};

init();
