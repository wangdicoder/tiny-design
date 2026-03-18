import React, { useState } from 'react';
import { InputPassword, StrengthIndicator } from '@tiny-design/react';

export default function PasswordDemo() {
  const [password, setPassword] = useState('');

  const checkPwd = (str: string) => {
    const { length } = str;
    let lv = 0;
    if (str.length > 0 && str.length < 6) {
      return ++lv;
    }
    if (length > 8) {
      lv++;
    }
    if (/[0-9]/.test(str)) {
      lv++;
    }
    if (/[a-z]/.test(str)) {
      lv++;
    }
    if (/[A-Z]/.test(str)) {
      lv++;
    }
    if (/[.-_]/.test(str)) {
      lv++;
    }

    return lv;
  };

  return (
    <div>
      <InputPassword
        placeholder="Make it as stronger as possible"
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <StrengthIndicator
        blocks={5}
        colors={['#f5222d', '#fa541c', '#faad14', '#a0d911', '#52c41a']}
        labels={['Very weak', 'Weak', 'Medium', 'Strong', 'Very strong']}
        current={checkPwd(password)}
        style={{ marginTop: 10 }}
      />
    </div>
  );
}