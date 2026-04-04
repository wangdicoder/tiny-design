export type Locale = {
  locale: string;
  DatePicker: {
    weeks: string[];
    months: string[];
    today: string;
    selectDate: string;
    selectMonth: string;
    selectYear: string;
  };
  TimePicker: {
    selectTime: string;
    now: string;
    okText: string;
  };
  Modal: {
    okText: string;
    cancelText: string;
  };
  PopConfirm: {
    okText: string;
    cancelText: string;
  };
  Empty: {
    description: string;
  };
  Table: {
    sortAscend: string;
    sortDescend: string;
    cancelSort: string;
    selectAll: string;
    selectNone: string;
    emptyText: string;
  };
  ColorPicker: {
    hex: string;
    rgb: string;
    hsb: string;
  };
  Tour: {
    prevText: string;
    nextText: string;
    finishText: string;
  };
};
