import Current from './models/Current';
import * as currentView from './views/currentView';

const state = {};

const controlCurrent = async () => {
  state.current = new Current();

  await state.current.getCoord();

  // await state.current.getCityName();

  state.current.getDate();
  // console.log(state.current.year);

  // show current day
  currentView.showTodayName(state.current.day);

  // show current date to UI
  currentView.showTodayDate(
    state.current.date,
    state.current.month - 1,
    state.current.year
  );

  const today = state.current.date - 1;

  await state.current.getTimePrayer();

  console.log(state.current.coord);

  // show the time prayer to UI
  // console.log(state.current.timePrayer);
  currentView.showTimePrayer(state.current.timePrayer[today]);
};

controlCurrent();
