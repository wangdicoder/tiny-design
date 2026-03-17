# Form Component Architecture

## Overview

The Form system uses a **pub/sub pattern** built around a central `FormInstance` class, with two React Contexts wiring everything together.

```
Form (Provider)
 ├── FormInstanceContext  →  shares the FormInstance (state store)
 ├── FormOptionsContext   →  shares layout/validation options
 └── Form.Item (Consumer) →  subscribes to FormInstance for its field
```

### FormInstance — The State Store

A plain class (not React state) that holds all form data:

| Concern | Storage | Key Methods |
|---|---|---|
| **Values** | `values: { [name]: any }` | `getFieldValue`, `setFieldValue`, `setFieldValues` |
| **Errors** | `errors: { [name]: string[] }` | `getFieldError`, `setFieldError` |
| **Rules** | `rules: { [name]: Rule[] }` | `setFieldRules` |
| **Subscriptions** | `listeners: ((name) => void)[]` | `subscribe`, `notify` |

When a value or validation result changes, `notify(name)` fires and every subscribed `FormItem` checks if the notification is relevant to it.

### Form — The Wrapper

- Creates (or accepts via `form` prop) a `FormInstance`, stored in a `useRef`
- Provides it to children via `FormInstanceContext`
- Provides layout options (`labelCol`, `wrapperCol`, `validateTrigger`, `layout`) via `FormOptionsContext`
- Handles **submit**: calls `validateFields()` on all fields, then routes to `onFinish` or `onFinishFailed`
- Handles **reset**: calls `resetFields()` which resets values to `initialValues` and notifies all fields with `'*'`

### Form.Item — The Field Connector

Each `Form.Item` with a `name` prop:

1. **Registers rules** — On mount, calls `form.setFieldRules(name, rules)`
2. **Subscribes** — Calls `form.subscribe(callback)` in a `useEffect`. Updates local `value`/`error` state only if the notification matches its own `name` (or either side uses `'*'`)
3. **Injects props via `cloneElement`** — The child component gets:
   - `value` (or the prop name from `valuePropName`) — bound to `form.getFieldValue(name)`
   - `onChange` — calls `form.setFieldValue()` and optionally validates (if `validateTrigger === 'onChange'`)
   - `onBlur` — validates on blur (if `validateTrigger === 'onBlur'`)
4. **Renders layout** — Uses `Row`/`Col` grid for label and input columns
5. **Shows errors** — Displays validation errors with a slide-down `<Transition>` animation

### useForm Hook

A factory function that creates a `FormInstance` externally:

```ts
const [form] = Form.useForm({ username: '', password: '' });
// Pass to <Form form={form}> to control the form programmatically
```

If no `form` prop is provided, `Form` creates one internally.

### Validation (form-helper.ts)

The `validate` function checks a value against a `Rule` supporting: `required`, `type`, `max`, `min`, `len`, `enum`, `pattern`, `whitespace`, `transform`, and custom `validator` functions.

---

## Diagrams

### Component Hierarchy & Context Flow

```mermaid
graph TD
    subgraph Form["<Form>"]
        FI["FormInstance (useRef)"]
        FIC["FormInstanceContext.Provider"]
        FOC["FormOptionsContext.Provider"]
    end

    subgraph FormItem1["<Form.Item name='username'>"]
        SUB1["subscribe(listener)"]
        CE1["cloneElement(child, {value, onChange, onBlur})"]
        ERR1["Error display with Transition"]
    end

    subgraph FormItem2["<Form.Item name='password'>"]
        SUB2["subscribe(listener)"]
        CE2["cloneElement(child, {value, onChange, onBlur})"]
        ERR2["Error display with Transition"]
    end

    FI --> FIC
    FIC --> FormItem1
    FIC --> FormItem2
    FOC --> FormItem1
    FOC --> FormItem2
```

### Data Flow: User Input

```mermaid
sequenceDiagram
    participant User
    participant Input as Child Input
    participant Item as Form.Item
    participant Store as FormInstance

    Note over Item: On mount: subscribe + setFieldRules

    User->>Input: Types a character
    Input->>Item: onChange fires
    Item->>Store: setFieldValue(name, value)
    Store->>Store: notify(name)
    Store->>Item: Listener callback fires
    Item->>Item: setValue → re-render
    Item->>Input: cloneElement with new value

    alt validateTrigger === "onChange"
        Item->>Store: validateField(name)
        Store->>Store: run rules via validate()
        Store->>Store: setFieldError + notify
        Store->>Item: Listener fires again
        Item->>Item: setError → show/hide error
    end
```

### Data Flow: Form Submit

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant Store as FormInstance
    participant Items as All Form.Items

    User->>Form: Submit
    Form->>Form: e.preventDefault()
    Form->>Store: validateFields()
    Store->>Store: validateField() for each rule set
    Store->>Items: notify each field name
    Items->>Items: Update error states

    Form->>Store: getFieldValues()
    Form->>Store: getFieldErrors()

    alt Has errors
        Form->>Form: onFinishFailed({ values, errors })
    else No errors
        Form->>Form: onFinish(values)
    end
```

### Data Flow: Form Reset

```mermaid
sequenceDiagram
    participant User
    participant Form
    participant Store as FormInstance
    participant Items as All Form.Items

    User->>Form: Reset
    Form->>Store: resetFields()
    Store->>Store: errors = {}
    Store->>Store: values = deepCopy(initValues)
    Store->>Items: notify("*")
    Items->>Items: All items re-read value and error → re-render
```

### Validation Rules

```mermaid
graph LR
    V["validate(value, rule)"] --> R["required: empty check"]
    V --> T["type: typeof check"]
    V --> MX["max / len: upper bound"]
    V --> MN["min: lower bound"]
    V --> E["enum: inclusion check"]
    V --> P["pattern: regex test"]
    V --> W["whitespace: trim check"]
    V --> TR["transform: pre-process value"]
    V --> C["validator: custom fn"]
```
