export const showTimePrayer = timePrayer => {
  const fajr = document.querySelector('.fajr');
  const dhuhr = document.querySelector('.dhuhr');
  const asr = document.querySelector('.asr');
  const maghrib = document.querySelector('.maghrib');
  const isha = document.querySelector('.isha');

  fajr.innerHTML = timePrayer.timings['Fajr'];
  dhuhr.innerHTML = timePrayer.timings['Dhuhr'];
  asr.innerHTML = timePrayer.timings['Asr'];
  maghrib.innerHTML = timePrayer.timings['Maghrib'];
  isha.innerHTML = timePrayer.timings['Isha'];
  console.log(timePrayer);
};

export const showTodayDate = (day, month, year) => {
  const dateElement = document.querySelector('.date');

  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  dateElement.innerHTML = `${monthName[month]} ${day}th, ${year}`;
};
