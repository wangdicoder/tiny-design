# ConfigProvider

为组件提供统一的全局配置。

## 引入方式

```jsx
import { ConfigProvider, zh_CN } from 'tiny-design';

// ...

return (
  <ConfigProvider componentSize="lg" locale={zh_CN} {...otherYourConfig}>
    <App />
  </ConfigProvider>
);
```

# ConfigProvider 全局配置

为组件提供统一的全局配置。

## API

| 属性              | 说明                                                          | 类型                                              | 默认值    |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------- | --------- |
| prefixCls         | 设置类名前缀                                                  | string                                            | ty        |
| componentSize     | 组件大小                                                      | enum: `lg` &#124; `md` &#124; `sm`                | `md`      |
| shimmer           | 为 [Skeleton](#/components/skeleton) 显示微光动画效果         | boolean                                           | false     |
| space             | 设置 Space 间距，参考 [Space](#/components/space)             | enum: `sm` &#124; `md` &#124; `lg` or `number`.   | `sm`      |
| locale            | 设置组件语言包（如 `en_US`、`zh_CN`）                         | Locale                                            | -         |
| theme             | 设置主题模式                                                  | enum: `light` &#124; `dark` &#124; `system`       | -         |

> `prefixCls` 属性适用于解决与其他库的类名冲突问题。请注意，这将丢失 `ty` 的默认样式。要解决此问题，还需要同时更新 `_variables.scss` 中的 `prefix` 变量。
