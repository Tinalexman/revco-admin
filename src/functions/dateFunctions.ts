export function convertDate(date: string | Date) {
  let dateObject = new Date(date);

  let day = dateObject.getDate();
  let month = dateObject.getMonth();
  let year = dateObject.getFullYear();

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthNames = [
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
  let monthName = monthNames[month];

  let dayWithSuffix = day + getOrdinalSuffix(day);

  return `${
    daysOfWeek[dateObject.getDay()]
  }, ${monthName} ${dayWithSuffix} ${year}`;
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
