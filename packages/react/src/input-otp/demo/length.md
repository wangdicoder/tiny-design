<Demo>

### Length

Set the number of OTP cells using the `length` prop.

```jsx live
() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ marginBottom: 8 }}>4 digits</div>
        <InputOTP length={4} />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>6 digits (default)</div>
        <InputOTP />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>8 digits</div>
        <InputOTP length={8} />
      </div>
    </div>
  );
}
```

</Demo>