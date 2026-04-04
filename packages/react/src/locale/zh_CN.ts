import { Locale } from './types';

const zh_CN: Locale = {
  locale: 'zh_CN',
  DatePicker: {
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    today: '今天',
    selectDate: '请选择日期',
    selectMonth: '请选择月份',
    selectYear: '请选择年份',
  },
  TimePicker: {
    selectTime: '请选择时间',
    now: '此刻',
    okText: '确定',
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
  },
  PopConfirm: {
    okText: '确定',
    cancelText: '取消',
  },
  Empty: {
    description: '暂无数据',
  },
  Table: {
    sortAscend: '升序排列',
    sortDescend: '降序排列',
    cancelSort: '取消排序',
    selectAll: '全选',
    selectNone: '取消全选',
    emptyText: '暂无数据',
  },
  ColorPicker: {
    hex: 'HEX',
    rgb: 'RGB',
    hsb: 'HSB',
  },
  Tour: {
    prevText: '上一步',
    nextText: '下一步',
    finishText: '完成',
  },
};

export default zh_CN;
