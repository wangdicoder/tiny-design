import classNames from 'classnames';

export type PickerMonthProps = {
  date: Date | null;
  panelDate: Date;
  months: string[];
  onChange: (date: Date) => void;
  prefixCls: string;
};

const PickerMonth = ({ date, panelDate, months, onChange, prefixCls }: PickerMonthProps) => {
  const panelYear = panelDate.getFullYear();
  const selectedMonth = date && date.getFullYear() === panelYear ? date.getMonth() : -1;
  const now = new Date();
  const isCurrentYear = now.getFullYear() === panelYear;

  return (
    <div className={`${prefixCls}__body`}>
      <table className={classNames(`${prefixCls}__table`, `${prefixCls}__month-table`)}>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2, 3].map((col) => {
                const monthIdx = row * 4 + col;
                const cls = classNames(`${prefixCls}__cell`, `${prefixCls}__month-cell`, {
                  [`${prefixCls}__cell_selected`]: monthIdx === selectedMonth,
                  [`${prefixCls}__cell_today`]: isCurrentYear && monthIdx === now.getMonth(),
                });
                return (
                  <td
                    key={col}
                    className={cls}
                    onClick={() => onChange(new Date(panelYear, monthIdx, 1))}>
                    <div className={classNames(`${prefixCls}__cell-inner`, `${prefixCls}__month-cell-inner`)}>
                      {months[monthIdx]}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PickerMonth;
