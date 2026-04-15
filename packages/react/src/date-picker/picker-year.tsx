import classNames from 'classnames';

export type PickerYearProps = {
  date: Date | null;
  panelDate: Date;
  onChange: (date: Date) => void;
  prefixCls: string;
};

const PickerYear = ({ date, panelDate, onChange, prefixCls }: PickerYearProps) => {
  const panelYear = panelDate.getFullYear();
  const startYear = panelYear - (panelYear % 10);
  const selectedYear = date?.getFullYear() ?? -1;
  const now = new Date();

  const years: number[] = [];
  for (let i = startYear - 1; i <= startYear + 10; i++) {
    years.push(i);
  }

  return (
    <div className={`${prefixCls}__body`}>
      <table className={classNames(`${prefixCls}__table`, `${prefixCls}__year-table`)}>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2, 3].map((col) => {
                const idx = row * 4 + col;
                const year = years[idx];
                const isOutOfRange = year < startYear || year > startYear + 9;
                const cls = classNames(`${prefixCls}__cell`, `${prefixCls}__year-cell`, {
                  [`${prefixCls}__cell_selected`]: year === selectedYear,
                  [`${prefixCls}__cell_today`]: year === now.getFullYear(),
                  [`${prefixCls}__cell_dim`]: isOutOfRange,
                });
                return (
                  <td
                    key={col}
                    className={cls}
                    onClick={() => onChange(new Date(year, panelDate.getMonth(), 1))}>
                    <div className={classNames(`${prefixCls}__cell-inner`, `${prefixCls}__year-cell-inner`)}>
                      {year}
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

export default PickerYear;
