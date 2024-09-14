const daysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonthNames: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function convertDate(date: string | Date) {
  let dateObject = new Date(date);

  let day = dateObject.getDate();
  let month = dateObject.getMonth();
  let year = dateObject.getFullYear();

  let monthName = monthNames[month];

  let dayWithSuffix = day + getOrdinalSuffix(day);

  return `${
    daysOfWeek[dateObject.getDay()]
  }, ${monthName} ${dayWithSuffix} ${year}`;
}

export function convertDateWithDayAndMonth(date: string | Date) {
  let dateObject = new Date(date);
  let day = dateObject.getDate();
  let month = dateObject.getMonth();

  let monthName = shortMonthNames[month];
  let dayWithSuffix = day + getOrdinalSuffix(day);

  return `${monthName} ${dayWithSuffix}`;
}

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getTimeOfDay(date: Date) {
  if (date.getHours() < 12) {
    return "Good Morning";
  } else if (date.getHours() < 17) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

export function convertDateWithSlashes(date: Date) {
  let isPM = date.getHours() > 11;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}; ${hours}:${minutes} ${
    isPM ? "PM" : "AM"
  }`;
}

export function convertDateWithJustSlashes(date: Date) {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export function convertDateWithDashesAndTime(date: Date) {
  let isPM = date.getHours() > 11;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}-${
    date.getMonth() < 10 ? "0" : ""
  }${date.getMonth()}-${date.getFullYear()} ${hours % 12 < 10 ? "0" : ""}${
    hours === 0 || hours % 12 === 0 ? "12" : hours % 12
  }:${minutes < 10 ? "0" : ""}${minutes} ${isPM ? "PM" : "AM"}`;
}
