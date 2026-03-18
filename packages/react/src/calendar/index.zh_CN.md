import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';

# Calendar 日历

日历组件，用于展示和选择日期。

## 使用场景

展示完整的日历视图，支持日期选择，适用于日程安排等场景。

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

## API

| 属性            | 说明                   | 类型                                         | 默认值  |
| --------------- | ---------------------- | -------------------------------------------- | ------- |
| value           | 选中日期（受控）       | Date                                         |         |
| defaultValue    | 默认选中日期           | Date                                         | 今天    |
| mode            | 显示模式               | 'month' \| 'year'                            | month   |
| fullscreen      | 全尺寸或卡片模式       | boolean                                      | true    |
| disabledDate    | 禁用特定日期           | (date: Date) => boolean                      |         |
| onChange        | 日期选中回调           | (date: Date) => void                         |         |
| onSelect        | 日期单元格点击回调     | (date: Date) => void                         |         |
| onPanelChange   | 面板切换回调           | (date: Date, mode: string) => void           |         |
| dateCellRender  | 自定义日期单元格内容   | (date: Date) => ReactNode                    |         |
| monthCellRender | 自定义月份单元格内容   | (date: Date) => ReactNode                    |         |
| headerRender    | 自定义头部渲染         | (config) => ReactNode                        |         |