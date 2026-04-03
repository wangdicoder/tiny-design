import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import RangeSelectionDemo from './demo/RangeSelection';
import RangeSelectionSource from './demo/RangeSelection.tsx?raw';
import MultipleSelectionDemo from './demo/MultipleSelection';
import MultipleSelectionSource from './demo/MultipleSelection.tsx?raw';
import WeekNumberDemo from './demo/WeekNumber';
import WeekNumberSource from './demo/WeekNumber.tsx?raw';
import ValidRangeDemo from './demo/ValidRange';
import ValidRangeSource from './demo/ValidRange.tsx?raw';
import DotIndicatorDemo from './demo/DotIndicator';
import DotIndicatorSource from './demo/DotIndicator.tsx?raw';
import CardModeDemo from './demo/CardMode';
import CardModeSource from './demo/CardMode.tsx?raw';

# Calendar 日历

日历组件，用于展示和选择日期，支持范围选择、多选、周数显示、键盘导航等功能。

## 使用场景

展示完整的日历视图，支持日期选择，适用于日程安排、事件管理等场景。

## 使用方式

```jsx
import { Calendar } from 'tiny-design';
```

## 代码演示

<Layout>
  <Column>
    <Demo>

### 基本用法

支持日期选择的全尺寸日历。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### 范围选择

点击选择起始日期，再次点击完成范围选择。

<DemoBlock component={RangeSelectionDemo} source={RangeSelectionSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 多选

单击日期可切换选中/取消。适合标记可用日期。

<DemoBlock component={MultipleSelectionDemo} source={MultipleSelectionSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### 周数显示

使用 `showWeekNumber` 显示 ISO 周数，`weekStartsOn={1}` 设置周一为一周的开始。

<DemoBlock component={WeekNumberDemo} source={WeekNumberSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 有效范围 & 今天按钮

通过 `validRange` 限制日历在3个月范围内，`showToday` 显示"今天"按钮。

<DemoBlock component={ValidRangeDemo} source={ValidRangeSource} />

    </Demo>
  </Column>
</Layout>

<Layout>
  <Column>
    <Demo>

### 圆点指示器

使用 `dotRender` 在有事件的日期下方显示彩色圆点。返回 `true` 使用主色，也可返回颜色字符串。

<DemoBlock component={DotIndicatorDemo} source={DotIndicatorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 卡片模式 & 键盘导航

紧凑的卡片日历，支持键盘方向键导航。使用 `cellClassName` 自定义周末样式。

<DemoBlock component={CardModeDemo} source={CardModeSource} />

    </Demo>
  </Column>
</Layout>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选中日期（受控） | Date | |
| defaultValue | 默认选中日期 | Date | 今天 |
| mode | 显示模式 | 'month' \| 'year' \| 'decade' | month |
| fullscreen | 全尺寸或卡片模式 | boolean | true |
| selectionMode | 选择行为 | 'single' \| 'range' \| 'multiple' | single |
| rangeValue | 受控范围值 | [Date, Date] \| null | |
| defaultRangeValue | 默认范围值 | [Date, Date] \| null | |
| onRangeChange | 范围变化回调 | (range: [Date, Date] \| null) => void | |
| multipleValue | 受控多选日期 | Date[] | |
| defaultMultipleValue | 默认多选日期 | Date[] | |
| onMultipleChange | 多选变化回调 | (dates: Date[]) => void | |
| weekStartsOn | 一周的起始天（0=周日） | 0\|1\|2\|3\|4\|5\|6 | 0 |
| showWeekNumber | 显示 ISO 周数列 | boolean | false |
| showToday | 显示"今天"按钮 | boolean | false |
| validRange | 限制可导航的日期范围 | [Date, Date] | |
| disabledDate | 禁用特定日期 | (date: Date) => boolean | |
| cellClassName | 单元格自定义类名 | (date: Date) => string | |
| cellStyle | 单元格自定义样式 | (date: Date) => CSSProperties | |
| dotRender | 圆点指示器渲染 | (date: Date) => boolean \| string | |
| onChange | 日期选中回调 | (date: Date) => void | |
| onSelect | 日期单元格点击回调 | (date: Date) => void | |
| onPanelChange | 面板切换回调 | (date: Date, mode: string) => void | |
| onMonthChange | 月份导航回调 | (date: Date) => void | |
| onYearChange | 年份导航回调 | (date: Date) => void | |
| dateCellRender | 自定义日期单元格内容 | (date: Date) => ReactNode | |
| monthCellRender | 自定义月份单元格内容 | (date: Date) => ReactNode | |
| headerRender | 自定义头部渲染 | (config) => ReactNode | |

## 键盘导航

| 按键 | 操作 |
| --- | --- |
| ← | 移动到前一天 |
| → | 移动到后一天 |
| ↑ | 移动到上一周 |
| ↓ | 移动到下一周 |
| Enter | 选择当前焦点日期 |
| Escape | 重置焦点 |