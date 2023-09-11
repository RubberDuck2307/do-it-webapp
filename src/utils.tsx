import { Event } from "./entities/event";

export const isToday = (someDate: Date): boolean => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export const isInPast = (someDate: Date): boolean => {
  const today = new Date();
  if (someDate.getFullYear() < today.getFullYear()) return true;
  else if (someDate.getFullYear() > today.getFullYear()) return false;
  else if (someDate.getMonth() < today.getMonth()) return true;
  else if (someDate.getMonth() > today.getMonth()) return false;
  else if (someDate.getDate() < today.getDate()) return true;
  else if (someDate.getDate() > today.getDate()) return false;
  else return false;
};

export const dateToString = (date: Date) => date.toISOString().slice(0, 10);

export const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const addDays = function (days: number, date: Date) {
  var date = new Date(date.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const MakePrettyDate = (date: Date) => {
  let month = date.getMonth() + 1;
  return month.toString() + "." + date.getDate() + ".";
};

export const convertDateToInputValue = (date: Date) => {
  let month = `${date.getMonth() + 1}`;
  if (date.getMonth() + 1 < 10) month = '0' + month;
  let day = `${date.getDate()}`;
  if (date.getDate() < 10) day = '0' + day;
  let year = date.getFullYear();
  return year + "-" + month + "-" + day;
}

export const MakePrettyTime = (date: Date) => {
  let minutes = date.getMinutes().toString();
  let hours = date.getHours().toString();
  if (date.getMinutes() < 10) minutes = "0" + minutes;
  if (date.getHours() < 10) hours = "0" + hours;
  return hours + ":" + minutes;
};

export const MakePrettyDateTime = (date: Date) => {
  return MakePrettyDate(date) + " " + MakePrettyTime(date);
};

export const getWeekDays = (date: Date): number => {
  switch (date.getDay()) {
    case 0:
      return 6;
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return 4;
    case 6:
      return 5;
    default:
      return 0;
  }
};

export const validateEmail = (email: string): boolean => {
  return (  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) }

export const validatePassword = (password: string): boolean => {
  return password.replace(/\s/g, "").length > 1

}

export function addMonths(date:Date, months: number) {
  const newDate = new Date(date.valueOf());
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
  }


  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV","DEC"]
  export const makePrettyDateMonthYear = (date:Date) :string => {
    
    return months[date.getMonth()] + " " + date.getFullYear()
  }

export const isEventOnDate = (event: Event, date: Date) => {
  return event.startTime <= date && event.endTime >= date
}