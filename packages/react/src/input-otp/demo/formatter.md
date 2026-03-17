<Demo>

### Controlled & Formatter

Use `value` for controlled mode and `formatter` to restrict input.

```jsx live
() => {
  const [value, setValue] = React.useState('');

  // Only allow digits
  const formatter = (val) => val.replace(/\D/g, '');

  return (
    <div>
      <InputOTP
        length={4}
        value={value}
        formatter={formatter}
        onChange={setValue}
      />
      <p>Value: {value}</p>
      <p>Only digits are allowed</p>
    </div>
  );
}
```

</Demo>