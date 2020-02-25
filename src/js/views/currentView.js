import { elements } from './base';

export const showTimePrayer = timePrayer => {
  elements.fajr.innerHTML = timePrayer.timings['Fajr'];
  elements.dhuhr.innerHTML = timePrayer.timings['Dhuhr'];
  elements.asr.innerHTML = timePrayer.timings['Asr'];
  elements.maghrib.innerHTML = timePrayer.timings['Maghrib'];
  elements.isha.innerHTML = timePrayer.timings['Isha'];
};

export const showTodayName = day => {
  const dayName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  elements.dayElement.innerHTML = `${dayName[day]}`;
};

export const showTodayDate = (day, month, year) => {
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

  elements.dateElement.innerHTML = `${monthName[month]} ${day}, ${year}`;
};

export const showNextPrayer = nextPrayer => {
  const nextPrayerElement = document.querySelector('.time-next');

  nextPrayerElement.innerHTML = nextPrayer;
};

let interval;

export const showCountdown = (nextPrayer, prayerName) => {
  const countdownElement = document.querySelector('.countdown');

  const countdown = () => {
    const now = new Date().getTime();
    const distance = nextPrayer - now;

    const hh = ('0' + Math.floor(distance / (1000 * 3600))).slice(-2);
    const mm = (
      '0' + Math.floor((distance % (1000 * 3600)) / (1000 * 60))
    ).slice(-2);
    const ss = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

    countdownElement.innerHTML = `${hh}:${mm}:${ss} left until ${prayerName}`;

    if (distance < 0) {
      window.location.reload();
    }
  };

  interval = setInterval(countdown, 1000);
};

export const stopCountdown = () => {
  clearInterval(interval);
};

export const highlightNextPrayer = indexNextPrayer => {
  const items = document.querySelectorAll('.item');
  items[indexNextPrayer].classList.add('highlight');
};

export const removeHighlight = () => {
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.classList.remove('highlight');
  });
};

export const showCityName = (city, country) => {
  const cityElement = document.querySelector('.city');
  cityElement.innerHTML = `${city}, ${country}`;
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
};

export const clearSearch = () => {
  const search = document.querySelector('.input-city');
  search.value = '';
};
