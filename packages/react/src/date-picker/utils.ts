export const WEEKS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TODAY = new Date();
export const THIS_YEAR = TODAY.getFullYear();
export const THIS_MONTH = TODAY.getMonth();
export const THIS_DAY = TODAY.getDate();

export const isLeapYear = (year: number): boolean => {
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  } else if (year % 400 === 0) {
    return true;
  }
  return false;
};

/**
 * (int) Number days in a month for a given year from 28 - 31
 * @param month
 * @param year
 */
export const getMonthDays = (year: number = THIS_YEAR, month: number = THIS_MONTH): number => {
  const day = year && isLeapYear(year) ? 29 : 28;
  return [31, day, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

export const getWeekday = (
  year: number = THIS_YEAR,
  month: number = THIS_MONTH,
  date: number = THIS_DAY
): number => {
  return new Date(year, month, date).getDay();
};

type DayCell = {
  label: number;
  date: Date;
  isThisMonth: boolean;
};

export const getMonthDaysArray = (date: Date = TODAY, weekStartsOn: number = 0): DayCell[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayArrays: DayCell[] = [];
  const days = getMonthDays(year, month);
  const [preYear, preMonth] = getPrevMonthAndYear(year, month);
  const preDays = getMonthDays(preYear, preMonth);
  const thisMonthFirstDayInWeek = getWeekday(year, month, 1);

  // Adjust for weekStartsOn
  const leadingDays = (thisMonthFirstDayInWeek - weekStartsOn + 7) % 7;

  // last month days
  for (let i = 0; i < leadingDays; i++) {
    const day = preDays - leadingDays + i + 1;
    dayArrays.push({
      label: day,
      date: new Date(preYear, preMonth, day),
      isThisMonth: false,
    });
  }

  // this month days
  for (let i = 1; i <= days; i++) {
    dayArrays.push({
      label: i,
      date: new Date(year, month, i),
      isThisMonth: true,
    });
  }

  // next month days - always fill to 42 cells (6 rows) for stable layout
  const totalCells = 42;
  const trailingDays = totalCells - dayArrays.length;
  for (let i = 1; i <= trailingDays; i++) {
    dayArrays.push({
      label: i,
      date: new Date(year, month + 1, i),
      isThisMonth: false,
    });
  }

  return dayArrays;
};

export const getISOWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const isSameDate = (dateA: Date, dateB: Date): boolean => {
  const dateAYear = dateA.getFullYear();
  const dateAMonth = dateA.getMonth();
  const dateADate = dateA.getDate();
  const dateBYear = dateB.getFullYear();
  const dateBMonth = dateB.getMonth();
  const dateBDate = dateB.getDate();
  return dateAYear === dateBYear && dateAMonth === dateBMonth && dateADate === dateBDate;
};

export const compareDate = (dateA: Date, dateB: Date): number => {
  const a = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate()).getTime();
  const b = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate()).getTime();
  return a - b;
};

export const isDateInRange = (current: Date, start: Date, end: Date): boolean => {
  return compareDate(current, start) >= 0 && compareDate(current, end) <= 0;
};

export const isToday = (date: Date): boolean => {
  return isSameDate(new Date(), date);
};

/**
 * (bool) Checks if a value is a date - this is just a simple check
 * @param date
 */
export const isDate = (date: Date): boolean => {
  const isPrototypeDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isPrototypeDate && isValidDate;
};

export const getPrevMonthDate = (date: Date = TODAY): Date => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const prevMonth = month > 0 ? month - 1 : 11;
  const prevYear = month > 0 ? year : year - 1;

  return new Date(prevYear, prevMonth, date.getDate());
};

export const getPrevMonthAndYear = (
  year: number = THIS_YEAR,
  month: number = THIS_MONTH
): [number, number] => {
  const prevMonth = month > 0 ? month - 1 : 11;
  const prevYear = month > 0 ? year : year - 1;

  return [prevYear, prevMonth];
};

export const getNextMonthDate = (date: Date = TODAY): Date => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const nextMonth = month < 11 ? month + 1 : 0;
  const nextYear = month < 11 ? year : year + 1;

  return new Date(nextYear, nextMonth, date.getDate());
};

export const getPrevYearDate = (date: Date = TODAY): Date => {
  return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
};

export const getNextYearDate = (date: Date = TODAY): Date => {
  return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
};
