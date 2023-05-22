const daysList = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const monthsList = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const convertDayInfo = (date) => {
  const splitDate = date.split(".");
  const correctDate = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
  const day = daysList[correctDate.getDay()];
  const week = Math.round(30 / correctDate.getDate());
  const month = monthsList[correctDate.getMonth()];
  const year = correctDate.getFullYear();
  return `${day}, ${week} неделя ${month} ${year} года`;
};

const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);

const animateScroll = (anchors) => {
  for (let anchor of anchors) {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const blockID = anchor.getAttribute("href");

      document.querySelector(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
};

const upScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export { convertDayInfo, addClass, removeClass, animateScroll, upScroll };
