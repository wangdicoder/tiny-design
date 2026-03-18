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

# Form

Form data management, including data collection, verification, and styles.

## Scenario

- When you need to create an instance or collect information.
- When you need to validate fields in certain rules.

## Usages

```jsx
import { Form } from 'tiny-design';

const { Item, useForm, FormInstance } = Form;
```

## Examples

<Layout>
  <Column>
    <Demo>

### Basic usage

Basic Form data control.

<DemoBlock component={BasicDemo} source={BasicSource} />

    </Demo>
    <Demo>

### Extra info

Use `helper` and `notice` to provide more field info.

<DemoBlock component={ExtraDemo} source={ExtraSource} />

    </Demo>
    <Demo>

### Form Layout

There are three layouts for form: `horizontal`, `vertical` and `inline`.

<DemoBlock component={LayoutDemo} source={LayoutSource} />

    </Demo>
    <Demo>

### Form method

Call form method with `Form.useForm`.

<DemoBlock component={MethodDemo} source={MethodSource} />

    </Demo>
  </Column>
  <Column>
    <Demo>

### More complex layout

Sometimes it could need to put two fields in a same line.

<DemoBlock component={ComplexLayoutDemo} source={ComplexLayoutSource} />

    </Demo>
    <Demo>

### Validation Trigger

There are three different triggers for the form validation: `onChange`, `onBlur` and `onSubmit`.

<DemoBlock component={ValidateTriggerDemo} source={ValidateTriggerSource} />

    </Demo>
    <Demo>

### Create in `Modal`

Create a form in a `Modal`.

<DemoBlock component={ModalDemo} source={ModalSource} />

    </Demo>
    <Demo>

### Async Submission

Simulate an async form submission with loading state.

<DemoBlock component={AsyncSubmitDemo} source={AsyncSubmitSource} />

    </Demo>
  </Column>
</Layout>

<Demo>
### Other Form Controls

A versatile example.

<DemoBlock component={OtherControlsDemo} source={OtherControlsSource} />

</Demo>

## API

### Form

| Property          | Description                                                                                   | Type                                              | Default       |
| ----------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------- |
| form              | form control instance created by `Form.useForm()`. Automatically created when not provided    | `FormInstance`                                    | -             |
| initialValues     | set value by Form initialisation or reset                                                     | object                                            | false         |
| labelCol          | label layout, like `<Col>` component                                                          | number &#124; \{ span: number, offset: number \}    | 8             |
| wrapperCol        | the layout for input controls, same as `labelCol`                                             | number &#124; \{ span: number, offset: number \}    | 16            |
| validateTrigger   | config field validate trigger                                                                 | `onChange` &#124; `onBlur` &#124; `onSubmit`      | `onChange`    |
| layout            | form layout                                                                                   | `horizontal` &#124; `vertical` &#124; `inline`    | `horizontal`  |
| onFinish          | trigger after submitting the form and verifying data successfully                             | (values) => void                                  | -             |
| onFinishFailed    | trigger after submitting the form and verifying data unsuccessfully                           | (values, errors) => void                          | -             |

### Form.Item

Form field component for data bidirectional binding, validation and layout.

| Property          | Description                                                               | Type                                              | Default   |
| ----------------- | ------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| name              | field name                                                                | string                                            | -         |
| required          | display required style. It will be generated by the validation rule       | boolean                                           | -         |
| colon             | display `:` after the label text                                          | boolean                                           | true      |
| label             | label text                                                                | string                                            | -         |
| rules             | rules for field validation                                                | `Rule`[]                                          | -         |
| helper            | the prompt message                                                        | ReactNode                                         | -         |
| notice            | similar with `help`, but more impressive                                  | ReactNode                                         | -         |
| valuePropName     | props of children node. For example, the prop of `Switch` is 'checked'.   | string                                            | 'value'   |
| valueGetter       | specify how to get value from event or other `onChange` arguments         | (..args: any[]) => any                            | -         |
| labelCol          | the layout of label                                                       | number &#124; \{ span: number, offset: number \}    | -         |
| wrapperCol        | the layout of controls                                                    | number &#124; \{ span: number, offset: number \}    | -         |

### FormInstance

| Method            | Description                                       | Type                                      |
| ----------------- | ------------------------------------------------- | ----------------------------------------- |
| getFieldValues    | get values by a set of field names                | () => \{ [name: string]: any \}             |
| getFieldValue     | get the value by the field name                   | (name: string) => any                     |
| setFieldValues    | set values by a set of field names                | (\{ [name: string]: any \}) => void         |
| setFieldValue     | set the value by the field name                   | (name: string, value: any) => void        |
| getFieldErrors    | get errors by a set of field names                | () => \{ [name: string]: string[] \}        |
| getFieldError     | get the error messages by the field name          | (name: string) => string[]                |
| setFieldError     | set the error messages by the field name          | (name: string, errors: string[]) => void  |
| resetFields       | reset fields to initialValues                     | () => void                                |
| validateFields    | validate all fields                               | (name: string) => void                    |
| validateField     | validate a field by the field name                | () => void                                |

### Rule

| Property          | Description                                               | Type                                          |
| ----------------- | --------------------------------------------------------- | --------------------------------------------- |
| type              | specific type                                             | `string` &#124; `number` &#124; `boolean`     |
| message           | error message. auto generate by template if not provided  | string                                        |
| max               | type required: max length of string, number, array        | number                                        |
| min               | type required: min length of string, number, array        | number                                        |
| required          | required field                                            | boolean                                       |
| enum              | match enum value                                          | any[]                                         |
| len               | length of string, number, array                           | number                                        |
| pattern           | regex pattern                                             | RegExp                                        |
| transform         | transform value to the rule before validation             | (value) => any                                |
| validator         | customize validation rule                                 | (value) => boolean &#124; `Promise<boolean>`  |
| whitespace        | failed if only has whitespace                             | boolean                                       |