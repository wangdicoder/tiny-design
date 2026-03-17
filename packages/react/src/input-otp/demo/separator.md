<Demo>

### Separator

Customize the separator between cells using the `separator` prop.

```jsx live
() => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8 }}>Default (no separator)</div>
        <InputOTP length={4} />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>Dash separator</div>
        <InputOTP length={4} separator="-" />
      </div>
      <div>
        <div style={{ marginBottom: 8 }}>Custom separator element</div>
        <InputOTP
          length={4}
          separator={<span style={{ color: '#999' }}>/</span>}
        />
      </div>
    </div>
  );
}
```

</Demo>