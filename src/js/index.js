import Current from './models/Current';

const state = {};

const controlCurrent = async () => {
  state.current = new Current();

  await state.current.getCoord();

  console.log(state.current.coord);
};

controlCurrent();
