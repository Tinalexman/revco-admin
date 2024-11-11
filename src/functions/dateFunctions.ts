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

export function convertDateWithDashesAndTime(other: Date | string) {
  const date = new Date(other);
  let isPM = date.getHours() > 11;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}-${
    date.getMonth() < 10 ? "0" : ""
  }${date.getMonth()}-${date.getFullYear()} ${hours % 12 < 10 ? "0" : ""}${
    hours === 0 || hours % 12 === 0 ? "12" : hours % 12
  }:${minutes < 10 ? "0" : ""}${minutes} ${isPM ? "PM" : "AM"}`;
}

export const allFilters: string[] = [
  "Today",
  "Yesterday",
  "This Week",
  "Last Week",
  "This Month",
  "Last Month",
  "This Year",
  "Last Year",
];

const isALeapYear = (year: number) => {
  if (year % 4 !== 0) {
    return false;
  }

  if (year % 100 !== 0) {
    return true;
  }

  return year % 400 === 0;
};

const getDaysInMonth = (month: number, year: number) => {
  if (month === 8 || month === 3 || month === 5 || month === 10) return 30;
  if (month === 1) {
    return isALeapYear(year) ? 29 : 28;
  }
  return 31;
};

export const getDateRange = (filter: string) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "Today":
      startDate = endDate = today.toISOString().split("T")[0];
      break;

    case "Yesterday":
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      startDate = yesterday.toISOString().split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;

    case "This Week":
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      startDate = weekStart.toISOString().split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;

    case "Last Week":
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
      startDate = lastWeekStart.toISOString().split("T")[0];
      endDate = lastWeekEnd.toISOString().split("T")[0];
      break;

    case "This Month": {
      let m = today.getMonth() + 1;
      let y = today.getFullYear();

      let currentDay = today.getDate();

      startDate = `${y}-${m.toString().padStart(2, "0")}-01`;
      endDate = `${y}-${m.toString().padStart(2, "0")}-${currentDay}`;
      break;
    }

    case "Last Month": {
      let m = today.getMonth();
      let y = today.getFullYear();

      let lastDay = getDaysInMonth(m - 1, y);

      startDate = `${y}-${m.toString().padStart(2, "0")}-01`;
      endDate = `${y}-${m.toString().padStart(2, "0")}-${lastDay}`;
      break;
    }

    case "This Year": {
      let m = today.getMonth() + 1;
      let y = today.getFullYear();

      let currentDay = today.getDate();

      startDate = `${y}-01-01`;
      endDate = `${y}-${m.toString().padStart(2, "0")}-${currentDay}`;
      break;
    }

    case "Last Year": {
      let y = today.getFullYear() - 1;
      startDate = `${y}-01-01`;
      endDate = `${y}-12-31`;
      break;
    }

    default:
      startDate = endDate = today.toISOString().split("T")[0];
      break;
  }

  return [startDate, endDate];
};

export interface iDateRange {
  start: string;
  end: string;
}
