<Demo>

### Size

Three sizes are available: `sm`, `md` (default), and `lg`.

```jsx live
() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputOTP size="sm" length={4} />
      <InputOTP size="md" length={4} />
      <InputOTP size="lg" length={4} />
    </div>
  );
}
```

</Demo>