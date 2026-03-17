<Demo>

### Basic

A basic OTP input.

```jsx live
() => {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <InputOTP onChange={(val) => setValue(val)} />
      <p>Entered: {value}</p>
    </div>
  );
}
```

</Demo>
