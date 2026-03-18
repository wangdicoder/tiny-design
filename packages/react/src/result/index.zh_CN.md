import SuccessDemo from './demo/Success';
import SuccessSource from './demo/Success.tsx?raw';
import LoadingDemo from './demo/Loading';
import LoadingSource from './demo/Loading.tsx?raw';
import ErrorDemo from './demo/Error';
import ErrorSource from './demo/Error.tsx?raw';
import WarningDemo from './demo/Warning';
import WarningSource from './demo/Warning.tsx?raw';
import InfoDemo from './demo/Info';
import InfoSource from './demo/Info.tsx?raw';
import IconDemo from './demo/Icon';
import IconSource from './demo/Icon.tsx?raw';

# Result

用于反馈一系列操作任务的处理结果。

## 使用场景

当需要向用户告知重要操作的处理结果，且反馈内容较为复杂时使用。

## 代码示例

<Layout>
  <Column>
    <Demo>

### 成功

显示处理成功的反馈结果。

<DemoBlock component={SuccessDemo} source={SuccessSource} />

    </Demo>
    <Demo>

### 加载中

结果显示加载状态。

<DemoBlock component={LoadingDemo} source={LoadingSource} />

    </Demo>
    <Demo>

### 失败

复杂的错误反馈。

<DemoBlock component={ErrorDemo} source={ErrorSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 警告

警告反馈结果。

<DemoBlock component={WarningDemo} source={WarningSource} />

    </Demo>
    <Demo>

### 提示

显示处理中的信息提示。

<DemoBlock component={InfoDemo} source={InfoSource} />

    </Demo>
    <Demo>

### 自定义图标

通过 `icon` 属性设置图标。

<DemoBlock component={IconDemo} source={IconSource} />

    </Demo>
  </Column>
</Layout>

## API

| 属性      | 说明                                          | 类型                                                                              | 默认值    |
| --------- | --------------------------------------------- | --------------------------------------------------------------------------------- | --------- |
| title     | 标题                                          | ReactNode                                                                         | -         |
| subtitle  | 副标题                                        | ReactNode                                                                         | -         |
| status    | 显示不同图标以表示结果状态                    | enum: `success` &#124; `error` &#124; `info` &#124; `warning` &#124; `loading`    | -         |
| icon      | 自定义图标                                    | ReactNode                                                                         | -         |
| extra     | 操作区域                                      | ReactNode                                                                         | -         |
| style	    | 容器的样式对象                                | CSSProperties                                                                     | -         |
| className	| 容器的类名                                    | string                                                                            | -         |