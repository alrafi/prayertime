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

  // call api from getTimePrayer method
  await state.current.getTimePrayer();

  // show the time prayer to UI
  currentView.showTimePrayer(state.current.timePrayer[today]);

  // next prayer
  const [valueTimePrayer, nextPrayer] = state.current.getNextPrayerTime(
    state.current.timePrayer[today]
  );

  // update next prayer to UI
  currentView.showNextPrayer(valueTimePrayer);

  // show countdown to UI
  currentView.showCountdown(nextPrayer);
};

controlCurrent();
