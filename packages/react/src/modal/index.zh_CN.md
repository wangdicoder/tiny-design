import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import CustomisedFooterDemo from './demo/CustomisedFooter';
import CustomisedFooterSource from './demo/CustomisedFooter.tsx?raw';
import PositionDemo from './demo/Position';
import PositionSource from './demo/Position.tsx?raw';
import AnimationDemo from './demo/Animation';
import AnimationSource from './demo/Animation.tsx?raw';
import ContextDemo from './demo/Context';
import ContextSource from './demo/Context.tsx?raw';
import ContextRegisterDemo from './demo/ContextRegister';
import ContextRegisterSource from './demo/ContextRegister.tsx?raw';

# Modal 模态对话框

模态对话框。

## 使用场景

当需要用户与应用进行交互，但又不希望跳转到新页面打断用户工作流程时，可以使用 **Modal** 在当前页面上创建一个新的浮层，以获取用户反馈或展示信息。

## 使用方式

```jsx
import { Modal } from '@tiny-design/react';
```

## 静态方法

当需要在当前 React 树之外以命令式方式触发对话框时，可以使用 `Modal.open()` 或 `Modal.confirm()`。

```jsx
const instance = Modal.open({
  header: '删除项目',
  children: '这个操作不可撤销。',
});

instance.update({
  confirmLoading: true,
});

instance.destroy();
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

简单的模态对话框。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 自定义底部

更复杂的例子，自定义底部按钮栏，点击提交按钮后对话框会进入加载状态，加载完成后自动关闭。
如果不需要默认的底部按钮，可以设置 `footer={null}`。

<DemoBlock component={CustomisedFooterDemo} source={CustomisedFooterSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 自定义位置

使用 `centered` 或 `top` 等属性设置对话框位置。

<DemoBlock component={PositionDemo} source={PositionSource} />

    </Demo>
    <Demo>

### 动画

使用 `animation` 设置不同的弹出动画。

<DemoBlock component={AnimationDemo} source={AnimationSource} />

    </Demo>
    <Demo>

### 上下文

使用 `Modal.Provider` 和 `Modal.useModal` 通过 ID 管理多个对话框。触发组件可以使用 `Modal.useModalActions()` 来避免在可见性变化时重新渲染。

<DemoBlock component={ContextDemo} source={ContextSource} />

    </Demo>
    <Demo>

### 注册式对话框与可等待结果

通过 `Modal.Register`（或 `store.register`）注册一次对话框，之后即可在任意位置调用 `show(id, props)`。`show` 返回一个 Promise，会以传给 `hide(result)` 的值进行 resolve，因此可以 `await` 用户的选择。在已注册的组件内部，使用 `Modal.useModalSelf()` 即可拿到 `props`、`visible`、`hide` 与 `remove`。

<DemoBlock component={ContextRegisterDemo} source={ContextRegisterSource} />

    </Demo>
  </Column>
</Layout>

## 上下文 API

`Modal.Provider` 将子树绑定到一个 `ModalStore`，支持两种使用方式：

- **手动挂载** —— 自己渲染对话框，使用 `useModal(id)` 读取可见状态。
- **注册式** —— 通过 id 注册组件，使用 `useModalActions().show(id, props)` 触发，并在组件内部使用 `useModalSelf()` 读取自身状态。

### 选择 store

`<Modal.Provider>` 接受可选的 `store` 属性。如果不传，会回退到包级单例 `Modal.store` —— 对只有一个 Provider 的简单应用很方便，但所有省略 `store` 的 Provider 都会共享同一份状态。两个挂载到单例的 Provider 会订阅同一个注册表，任何注册过的对话框会被**每个 Provider 各渲染一次**（你会看到重复的浮层），同时它们也会互相看到对方的 `show()` 调用。

实际项目中建议使用 `createModalStore()` 创建自己的 store 并显式传入。只有在确实需要从 React 之外触发对话框时才使用单例。

```jsx
import { Modal, createModalStore } from '@tiny-design/react';

function App() {
  const store = useMemo(() => createModalStore(), []);
  return (
    <Modal.Provider store={store}>
      {/* … */}
    </Modal.Provider>
  );
}
```

任何需要独立 store 的场景都应使用 `createModalStore()`：应用级 Provider、单元测试、SSR 每请求 store，或同页面上互不相关的对话框子树。

### API 参考

| 导出                          | 类型                                                                | 说明                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `Modal.Provider`              | `({ store?, children }) => Element`                                 | 向后代提供 store，并为已注册的对话框渲染 outlet。默认使用单例 `Modal.store`，参见上文。                                                    |
| `Modal.Register`              | `({ id, component }) => null`                                       | 声明式注册。挂载时注册，卸载时反注册。                                                                                                      |
| `Modal.useModal(id)`          | `(id) => { visible, show, close, toggle }`                          | 按 id 订阅可见性的状态 hook，仅在该 id 的可见性变化时重新渲染。配合手动挂载使用。                                                            |
| `Modal.useModalActions()`     | `() => { show, hide, hideAll, register }`                           | 命令式 actions，不订阅 state —— 调用方不会因开/关而重新渲染。                                                                                |
| `Modal.useModalSelf<P, R>()`  | `() => { id, visible, props, hide, reject, remove }`                | 在已注册的组件内部读取自身状态。在 outlet 之外使用会抛错。                                                                                  |
| `Modal.store`                 | `ModalStore`                                                        | 进程级单例 store。**仅**当需要在 React 之外触发对话框（路由守卫、错误处理等）时使用。在 React 内部请优先使用 `useModalActions`。            |
| `createModalStore()`          | `() => ModalStore` _(从 `@tiny-design/react` 具名导入)_             | 创建独立的 store。推荐用于应用级 Provider、单元测试、SSR 每请求 store，或互相独立的对话框子树。                                              |

### `ModalStore`

| 方法                            | 说明                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `register(id, component)`       | 注册组件，返回反注册函数。                                                                                          |
| `show<R, P>(id, props?)`        | 打开对话框。返回的 Promise 会以 `hide(result)` 传入的值进行 resolve。                                                |
| `hide(id, result?)`             | 关闭对话框并 resolve 其 Promise。对话框会保持挂载直到 `afterClose` 触发 `remove`。                                  |
| `remove(id)`                    | 从 store 中硬删除该记录。如果还有未完成的 resolver，会以 `undefined` 进行 resolve。                                 |
| `hideAll()`                     | 隐藏所有可见对话框；将它们的 Promise 以 `undefined` resolve。                                                       |
| `getState()` / `subscribe(fn)`  | 低层 state 访问，便于自定义集成。                                                                                   |

## Props

| 属性               | 说明                                       | 类型                                              | 默认值    |
| ------------------ | ------------------------------------------ | ------------------------------------------------- | --------- |
| visible            | 对话框是否可见                             | boolean                                           | false     |
| header             | 对话框头部内容                             | ReactNode                                         | -         |
| footer             | 对话框底部内容                             | ReactNode                                         | -         |
| width              | 对话框宽度                                 | number &#124; string                              | 520       |
| centered           | 是否垂直居中显示                           | boolean                                           | false     |
| closable           | 是否显示关闭按钮                           | boolean                                           | true      |
| unmountOnClose     | 关闭时是否卸载子组件                       | boolean                                           | true      |
| afterClose         | 关闭动画结束后的回调                       | () => void                                        | -         |
| maskType           | 遮罩层类型                                 | enum: `default` &#124; `blurred` &#124; `inverted` &#124; `none` | `default` |
| maskClosable       | 点击遮罩层是否关闭对话框                   | boolean                                           | true      |
| confirmLoading     | 确认按钮是否处于加载状态                   | boolean                                           | false     |
| onConfirm          | 确认按钮的回调                             | (e: MouseEvent) => void                           | -         |
| onCancel           | 取消按钮的回调                             | (e: MouseEvent) => void                           | -         |
| onClose            | 关闭按钮的回调                             | (e: MouseEvent) => void                           | -         |
| confirmText        | 确认按钮文本                               | string                                            | `OK`      |
| cancelText         | 取消按钮文本                               | string                                            | `Cancel`  |
| confirmButtonProps | 传递给确认按钮的属性                       | ButtonProps                                       | -         |
| cancelButtonProps  | 传递给取消按钮的属性                       | ButtonProps                                       | -         |
| animation          | 动画类型                                   | enum: `slide` &#124; `scale`                      | `slide`   |
| top                | 距离视口顶部的距离                         | number                                            | 100       |
| zIndex             | 对话框的 z-index                           | number                                            | -         |
| headerStyle        | 头部的内联样式                             | CSSProperties                                     | -         |
| bodyStyle          | 主体的内联样式                             | CSSProperties                                     | -         |
| footerStyle        | 底部的内联样式                             | CSSProperties                                     | -         |
| maskStyle          | 遮罩层的内联样式                           | CSSProperties                                     | -         |
| style              | 容器的样式对象                             | CSSProperties                                     | -         |
| className          | 容器的类名                                 | string                                            | -         |

## StaticModalProps

`Modal.open()` 和 `Modal.confirm()` 接收与 `Modal` 相同的参数，但 `visible` 由内部管理。
