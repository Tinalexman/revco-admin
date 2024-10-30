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

const isA30DayMonth = (currentMonth: number) => {
  return (
    currentMonth === 9 ||
    currentMonth === 6 ||
    currentMonth === 4 ||
    currentMonth === 11
  );
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
      startDate = endDate = yesterday.toISOString().split("T")[0];
      break;
    case "This Week":
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay()); // Sunday as the first day of the week
      startDate = weekStart.toISOString().split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    case "Last Week":
      const lastWeekStart = new Date(today);
      lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(lastWeekStart.getDate() + 6); // End of last week
      startDate = lastWeekStart.toISOString().split("T")[0];
      endDate = lastWeekEnd.toISOString().split("T")[0];
      break;
    case "This Month":
      const currentMonth = today.getMonth();
      let dayAddition = 0;
      if (isA30DayMonth(currentMonth)) {
        dayAddition = 1;
      }

      startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        dayAddition + 1
      )
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    case "Last Month":
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const lastMonthEnd = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      );
      endDate = lastMonthEnd.toISOString().split("T")[0];
      break;
    case "This Year":
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    case "Last Year":
      startDate = new Date(today.getFullYear() - 1, 0, 1)
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    default:
      startDate = endDate = today.toISOString().split("T")[0];
  }

  return [startDate, endDate];
};

export const getDateRangeFromDMYFilter = (filter: string) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "D":
      startDate = endDate = today.toISOString().split("T")[0];
      break;
    case "This Month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    case "Last Month":
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const lastMonthEnd = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      );
      endDate = lastMonthEnd.toISOString().split("T")[0];
      break;
    case "This Year":
      startDate = new Date(today.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    case "Last Year":
      startDate = new Date(today.getFullYear() - 1, 0, 1)
        .toISOString()
        .split("T")[0];
      endDate = today.toISOString().split("T")[0];
      break;
    default:
      startDate = endDate = today.toISOString().split("T")[0];
  }

  return [startDate, endDate];
};

export interface iDateRange {
  start: string;
  end: string;
}
