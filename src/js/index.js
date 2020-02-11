import Current from './models/Current';

const state = {};

const controlCurrent = async () => {
  state.current = new Current();

  await state.current.getCoord();

  await state.current.getCityName();

  console.log(state.current.coord);
  console.log(state.current.city);
  console.log(state.current.country);
};

controlCurrent();
