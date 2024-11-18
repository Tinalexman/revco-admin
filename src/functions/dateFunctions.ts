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

// const convertLocaleString = (date: string) => {
//   const split = date.split("/");
//   return `${split[2]}-${split[0].padStart(2, "0")}-${split[1].padStart(
//     2,
//     "0"
//   )}`;
// };

// export const getDateRange = (filter: string) => {
//   const today = new Date();
//   let startDate, endDate;

//   switch (filter) {
//     case "Today":
//       startDate = endDate = convertLocaleString(today.toLocaleDateString());
//       break;
//     case "Yesterday":
//       const yesterday = new Date(today);
//       yesterday.setDate(today.getDate() - 1);
//       startDate = convertLocaleString(yesterday.toLocaleDateString());
//       endDate = convertLocaleString(today.toLocaleDateString());
//       break;
//     case "This Week":
//       const weekStart = new Date(today);
//       weekStart.setDate(today.getDate() - today.getDay());
//       startDate = convertLocaleString(weekStart.toLocaleDateString());
//       endDate = convertLocaleString(today.toLocaleDateString());
//       break;
//     case "Last Week":
//       const lastWeekStart = new Date(today);
//       lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
//       const lastWeekEnd = new Date(today);
//       lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
//       startDate = convertLocaleString(lastWeekStart.toLocaleDateString());
//       endDate = convertLocaleString(lastWeekEnd.toLocaleDateString());
//       break;
//     case "This Month":
//       startDate = convertLocaleString(
//         new Date(today.getFullYear(), today.getMonth(), 1).toLocaleDateString()
//       );

//       endDate = convertLocaleString(today.toLocaleDateString());
//       break;
//     case "Last Month":
//       const lastMonth = new Date(today);
//       lastMonth.setMonth(today.getMonth() - 1);
//       startDate = convertLocaleString(
//         new Date(
//           lastMonth.getFullYear(),
//           lastMonth.getMonth(),
//           1
//         ).toLocaleDateString()
//       );

//       const lastMonthEnd = new Date(
//         lastMonth.getFullYear(),
//         lastMonth.getMonth() + 1,
//         0
//       );
//       endDate = convertLocaleString(lastMonthEnd.toLocaleDateString());
//       break;
//     case "This Year":
//       startDate = convertLocaleString(
//         new Date(today.getFullYear(), 0, 1).toLocaleDateString()
//       );
//       endDate = convertLocaleString(today.toLocaleDateString());
//       break;
//     case "Last Year":
//       startDate = convertLocaleString(
//         new Date(today.getFullYear() - 1, 0, 1).toLocaleDateString()
//       );

//       endDate = convertLocaleString(
//         new Date(today.getFullYear() - 1, 11, 31).toLocaleDateString()
//       );
//       break;
//     default:
//       startDate = endDate = convertLocaleString(today.toLocaleDateString());
//   }

//   return [startDate, endDate];
// };

export const convertToISODateString = (date: Date) => {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
    .toISOString()
    .split("T")[0];
};

export const getDateRange = (filter: string) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "Today":
      startDate = endDate = convertToISODateString(today);
      break;
    case "Yesterday":
      const yesterday = new Date(today);
      yesterday.setUTCDate(today.getUTCDate() - 1);
      startDate = convertToISODateString(yesterday);
      endDate = convertToISODateString(today);
      break;
    case "This Week":
      const weekStart = new Date(today);
      weekStart.setUTCDate(today.getUTCDate() - today.getUTCDay());
      startDate = convertToISODateString(weekStart);
      endDate = convertToISODateString(today);
      break;
    case "Last Week":
      const lastWeekStart = new Date(today);
      lastWeekStart.setUTCDate(today.getUTCDate() - today.getUTCDay() - 7);
      const lastWeekEnd = new Date(lastWeekStart);
      lastWeekEnd.setUTCDate(lastWeekStart.getUTCDate() + 6);
      startDate = convertToISODateString(lastWeekStart);
      endDate = convertToISODateString(lastWeekEnd);
      break;
    case "This Month":
      startDate = convertToISODateString(
        new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1))
      );
      endDate = convertToISODateString(today);
      break;
    case "Last Month":
      const lastMonthStart = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)
      );
      const lastMonthEnd = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0)
      ); // Last day of previous month
      startDate = convertToISODateString(lastMonthStart);
      endDate = convertToISODateString(lastMonthEnd);
      break;
    case "This Year":
      startDate = convertToISODateString(
        new Date(Date.UTC(today.getUTCFullYear(), 0, 1))
      );
      endDate = convertToISODateString(today);
      break;
    case "Last Year":
      startDate = convertToISODateString(
        new Date(Date.UTC(today.getUTCFullYear() - 1, 0, 1))
      );
      endDate = convertToISODateString(
        new Date(Date.UTC(today.getUTCFullYear() - 1, 11, 31))
      );
      break;
    default:
      startDate = endDate = convertToISODateString(today);
  }

  return [startDate, endDate];
};

export interface iDateRange {
  start: string;
  end: string;
}
