import { Tag, Typography } from '@tiny-design/react';

const colors = ['blue', 'green', 'orange', 'red', 'purple'] as const;
const statusColors = ['success', 'warning', 'info', 'danger'] as const;

export default function VariantDemo() {
  return (
    <>
      <Typography.Heading level={6} style={{ marginBottom: 16 }}>
        Filled (default):
      </Typography.Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color}>{color}</Tag>
        ))}
      </div>

      <Typography.Heading level={6} style={{ margin: '16px 0' }}>
        Soft:
      </Typography.Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="soft">{color}</Tag>
        ))}
      </div>

      <Typography.Heading level={6} style={{ margin: '16px 0' }}>
        Solid:
      </Typography.Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="solid">{color}</Tag>
        ))}
      </div>

      <Typography.Heading level={6} style={{ margin: '16px 0' }}>
        Outlined:
      </Typography.Heading>
      <div>
        {colors.map((color) => (
          <Tag key={color} color={color} variant="outlined">{color}</Tag>
        ))}
      </div>

      <Typography.Heading level={6} style={{ margin: '16px 0' }}>
        Status (solid):
      </Typography.Heading>
      <div>
        {statusColors.map((color) => (
          <Tag key={color} color={color} variant="solid">{color}</Tag>
        ))}
      </div>

      <Typography.Heading level={6} style={{ margin: '16px 0' }}>
        Custom color variants:
      </Typography.Heading>
      <div>
        <Tag color="#1677ff">filled</Tag>
        <Tag color="#1677ff" variant="soft">soft</Tag>
        <Tag color="#1677ff" variant="solid">solid</Tag>
        <Tag color="#1677ff" variant="outlined">outlined</Tag>
      </div>
    </>
  );
}
