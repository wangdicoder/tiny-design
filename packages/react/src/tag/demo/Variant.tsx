import { Heading, Tag } from '@tiny-design/react';

const colors = ['blue', 'green', 'orange', 'red', 'purple'] as const;
const statusColors = ['success', 'warning', 'info', 'danger'] as const;

export default function VariantDemo() {
  return (
    <>
      <Heading level={6} style={{ marginBottom: 16 }}>
        Filled (default):
      </Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color}>{color}</Tag>
        ))}
      </div>

      <Heading level={6} style={{ margin: '16px 0' }}>
        Soft:
      </Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="soft">{color}</Tag>
        ))}
      </div>

      <Heading level={6} style={{ margin: '16px 0' }}>
        Solid:
      </Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="solid">{color}</Tag>
        ))}
      </div>

      <Heading level={6} style={{ margin: '16px 0' }}>
        Outlined:
      </Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="outlined">{color}</Tag>
        ))}
      </div>

      <Heading level={6} style={{ margin: '16px 0' }}>
        Status (solid):
      </Heading>
      <div>
        {statusColors.map((color) => (
          <Tag key={color} color={color} variant="solid">{color}</Tag>
        ))}
      </div>

      <Heading level={6} style={{ margin: '16px 0' }}>
        Custom color variants:
      </Heading>
      <div>
        <Tag color="#1677ff">filled</Tag>
        <Tag color="#1677ff" variant="soft">soft</Tag>
        <Tag color="#1677ff" variant="solid">solid</Tag>
        <Tag color="#1677ff" variant="outlined">outlined</Tag>
      </div>
    </>
  );
}
