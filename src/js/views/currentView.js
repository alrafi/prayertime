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
};

export const showTodayName = day => {
  const dayElement = document.querySelector('.day');
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  dayElement.innerHTML = `${dayName[day]}`;
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

  dateElement.innerHTML = `${monthName[month]} ${day}, ${year}`;
};

export const showNextPrayer = nextPrayer => {
  const nextPrayerElement = document.querySelector('.time-next');

  nextPrayerElement.innerHTML = nextPrayer;
};

export const showCountdown = (nextPrayer, prayerName) => {
  const countdownElement = document.querySelector('.countdown');

  setInterval(() => {
    const now = new Date().getTime();
    const distance = nextPrayer - now;

    // const hh = ;
    const hh = ('0' + Math.floor(distance / (1000 * 3600))).slice(-2);
    const mm = (
      '0' + Math.floor((distance % (1000 * 3600)) / (1000 * 60))
    ).slice(-2);
    const ss = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

    countdownElement.innerHTML = `${hh}:${mm}:${ss} left until ${prayerName}`;
  });
};

export const highlightNextPrayer = indexNextPrayer => {
  const items = document.querySelectorAll('.item');
  items[indexNextPrayer].classList.add('highlight');
};

export const showCityName = (city, country) => {
  const cityElement = document.querySelector('.city');
  cityElement.innerHTML = `${city}, ${country}`;
  // console.log(city, country);
};

export const showWeather = (temp, icon, description) => {
  const iconElement = document.querySelector('.image img');
  const tempElement = document.querySelector('.image p');

  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${icon}.png`
  );
  iconElement.setAttribute('title', `${description}`);
  iconElement.setAttribute('alt', `${description}`);
  tempElement.innerHTML = `${temp} &#176C`;
  // console.log(tempElement);
};
