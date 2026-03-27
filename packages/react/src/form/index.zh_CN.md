import BasicDemo from './demo/Basic';
import BasicSource from './demo/Basic.tsx?raw';
import ExtraDemo from './demo/Extra';
import ExtraSource from './demo/Extra.tsx?raw';
import LayoutDemo from './demo/Layout';
import LayoutSource from './demo/Layout.tsx?raw';
import MethodDemo from './demo/Method';
import MethodSource from './demo/Method.tsx?raw';
import ComplexLayoutDemo from './demo/ComplexLayout';
import ComplexLayoutSource from './demo/ComplexLayout.tsx?raw';
import ValidateTriggerDemo from './demo/ValidateTrigger';
import ValidateTriggerSource from './demo/ValidateTrigger.tsx?raw';
import ModalDemo from './demo/Modal';
import ModalSource from './demo/Modal.tsx?raw';
import AsyncSubmitDemo from './demo/AsyncSubmit';
import AsyncSubmitSource from './demo/AsyncSubmit.tsx?raw';
import OtherControlsDemo from './demo/OtherControls';
import OtherControlsSource from './demo/OtherControls.tsx?raw';
import StepFormDemo from './demo/StepForm';
import StepFormSource from './demo/StepForm.tsx?raw';

# Form 表单

表单数据管理，包含数据收集、校验和样式。

## 使用场景

- 当你需要创建一个实例或收集信息时。
- 当你需要对字段进行特定规则的校验时。

## 引入方式

```jsx
import { Form } from 'tiny-design';

const { Item, useForm, FormInstance } = Form;
```

## 代码示例

<Layout>
  <Column>
    <Demo>

### 基本用法

基础的表单数据控制。

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### 额外信息

使用 `helper` 和 `notice` 提供更多字段信息。

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
    <Demo>

### 表单布局

表单有三种布局方式：`horizontal`、`vertical` 和 `inline`。

<DemoBlock component={LayoutDemo} source={LayoutSource} />

    </Demo>
    <Demo>

### 表单方法

通过 `Form.useForm` 调用表单方法。

<DemoBlock component={MethodDemo} source={MethodSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### 复杂布局

有时候需要将两个字段放在同一行。

<DemoBlock component={ComplexLayoutDemo} source={ComplexLayoutSource} />

    </Demo>
    <Demo>

### 校验触发器

表单校验有三种不同的触发时机：`onChange`、`onBlur` 和 `onSubmit`。

<DemoBlock component={ValidateTriggerDemo} source={ValidateTriggerSource} />

    </Demo>
    <Demo>

### 在 Modal 中创建

在 `Modal` 中创建表单。

<DemoBlock component={ModalDemo} source={ModalSource} />

    </Demo>
    <Demo>

### 异步提交

模拟带有加载状态的异步表单提交。

<DemoBlock component={AsyncSubmitDemo} source={AsyncSubmitSource} />

    </Demo>
  </Column>
</Layout>

### 其他表单控件

一个多功能的示例。

<DemoBlock component={OtherControlsDemo} source={OtherControlsSource} />

<Demo>
### 分步表单

多步骤注册表单。每一步通过表单实例校验当前步骤的字段后才能进入下一步。

<DemoBlock component={StepFormDemo} source={StepFormSource} />

</Demo>

## API

### Form

| 属性              | 说明                                                                                          | 类型                                              | 默认值        |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| form              | 经 `Form.useForm()` 创建的表单控制实例。未提供时会自动创建                                     | `FormInstance`                                    | -             |
| initialValues     | 表单初始化或重置时的默认值                                                                     | object                                            | false         |
| labelCol          | 标签布局，同 `<Col>` 组件                                                                      | number &#124; \{ span: number, offset: number \}    | 8             |
| wrapperCol        | 输入控件的布局，同 `labelCol`                                                                  | number &#124; \{ span: number, offset: number \}    | 16            |
| validateTrigger   | 字段校验触发时机                                                                               | `onChange` &#124; `onBlur` &#124; `onSubmit`      | `onChange`    |
| layout            | 表单布局方式                                                                                   | `horizontal` &#124; `vertical` &#124; `inline`    | `horizontal`  |
| onFinish          | 提交表单且数据校验成功后的回调                                                                 | (values) => void                                  | -             |
| onFinishFailed    | 提交表单且数据校验失败后的回调                                                                 | (values, errors) => void                          | -             |

### Form.Item

表单字段组件，用于数据双向绑定、校验和布局。

| 属性              | 说明                                                              | 类型                                              | 默认值    |
| ----------------- | ----------------------------------------------------------------- | ------------------------------------------------- | --------- |
| name              | 字段名称                                                          | string                                            | -         |
| required          | 显示必填样式。会根据校验规则自动生成                               | boolean                                           | -         |
| colon             | 是否在标签文本后显示 `:`                                           | boolean                                           | true      |
| label             | 标签文本                                                          | string                                            | -         |
| rules             | 字段校验规则                                                      | `Rule`[]                                          | -         |
| helper            | 提示信息                                                          | ReactNode                                         | -         |
| notice            | 类似 `help`，但更醒目                                              | ReactNode                                         | -         |
| valuePropName     | 子节点的值属性名。例如 `Switch` 的属性为 'checked'                 | string                                            | 'value'   |
| valueGetter       | 指定如何从事件或其他 `onChange` 参数中获取值                       | (..args: any[]) => any                            | -         |
| labelCol          | 标签布局                                                          | number &#124; \{ span: number, offset: number \}    | -         |
| wrapperCol        | 控件布局                                                          | number &#124; \{ span: number, offset: number \}    | -         |

### FormInstance

| 方法              | 说明                                      | 类型                                      |
| ----------------- | ------------------------------------------------- | ----------------------------------------- |
| getFieldValues    | 获取一组字段名对应的值                    | () => \{ [name: string]: any \}             |
| getFieldValue     | 获取指定字段名对应的值                    | (name: string) => any                     |
| setFieldValues    | 设置一组字段名对应的值                    | (\{ [name: string]: any \}) => void         |
| setFieldValue     | 设置指定字段名对应的值                    | (name: string, value: any) => void        |
| getFieldErrors    | 获取一组字段名对应的错误信息              | () => \{ [name: string]: string[] \}        |
| getFieldError     | 获取指定字段名对应的错误信息              | (name: string) => string[]                |
| setFieldError     | 设置指定字段名对应的错误信息              | (name: string, errors: string[]) => void  |
| resetFields       | 重置字段为 initialValues                  | () => void                                |
| validateFields    | 校验所有字段                              | (name: string) => void                    |
| validateField     | 校验指定字段                              | () => void                                |

### Rule

| 属性              | 说明                                              | 类型                                          |
| ----------------- | ------------------------------------------------- | --------------------------------------------- |
| type              | 指定类型                                          | `string` &#124; `number` &#124; `boolean`     |
| message           | 错误提示信息。未提供时将通过模板自动生成           | string                                        |
| max               | 需指定类型：字符串、数字、数组的最大长度           | number                                        |
| min               | 需指定类型：字符串、数字、数组的最小长度           | number                                        |
| required          | 是否为必填字段                                    | boolean                                       |
| enum              | 枚举值匹配                                        | any[]                                         |
| len               | 字符串、数字、数组的长度                           | number                                        |
| pattern           | 正则表达式                                        | RegExp                                        |
| transform         | 校验前对值进行转换                                | (value) => any                                |
| validator         | 自定义校验规则                                    | (value) => boolean &#124; `Promise<boolean>`  |
| whitespace        | 仅包含空格时是否校验失败                           | boolean                                       |