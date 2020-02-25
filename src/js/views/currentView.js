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
  elements.nextPrayerElement.innerHTML = nextPrayer;
};

let interval;

export const showCountdown = (nextPrayer, prayerName) => {
  const countdown = () => {
    const now = new Date().getTime();
    const distance = nextPrayer - now;

    const hh = ('0' + Math.floor(distance / (1000 * 3600))).slice(-2);
    const mm = (
      '0' + Math.floor((distance % (1000 * 3600)) / (1000 * 60))
    ).slice(-2);
    const ss = ('0' + Math.floor((distance % (1000 * 60)) / 1000)).slice(-2);

    elements.countdownElement.innerHTML = `${hh}:${mm}:${ss} left until ${prayerName}`;

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
  elements.items[indexNextPrayer].classList.add('highlight');
};

export const removeHighlight = () => {
  elements.items.forEach(item => {
    item.classList.remove('highlight');
  });
};

export const showCityName = (city, country) => {
  elements.cityElement.innerHTML = `${city}, ${country}`;
};

export const showWeather = (temp, icon, description) => {
  elements.iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${icon}.png`
  );
  elements.iconElement.setAttribute('title', `${description}`);
  elements.iconElement.setAttribute('alt', `${description}`);
  elements.tempElement.innerHTML = `${temp} &#176C`;
};

export const clearSearch = () => {
  elements.search.value = '';
};
