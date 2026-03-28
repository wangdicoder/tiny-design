import { Flex, Form, Input, InputPassword, InputNumber, AutoComplete, Textarea, Typography } from '@tiny-design/react';

const { Heading } = Typography;

const suggestions = [
  { value: 'React' },
  { value: 'Vue' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Next.js' },
];

export default function InputVariants() {
  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Heading level={5}>Input Types</Heading>
      <Form layout="vertical">
        <Form.Item label="Text input">
          <Input placeholder="Enter some text" />
        </Form.Item>
        <Form.Item label="Password">
          <InputPassword placeholder="Enter password" />
        </Form.Item>
        <Form.Item label="Number">
          <InputNumber defaultValue={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Autocomplete">
          <AutoComplete
            placeholder="Search a framework"
            options={suggestions}
          />
        </Form.Item>
        <Form.Item label="Textarea">
          <Textarea defaultValue="" rows={3} />
        </Form.Item>
        <Heading level={5} style={{ marginTop: 16 }}>Sizes</Heading>
        <Flex vertical gap="sm">
          <Input placeholder="Small" size="sm" />
          <Input placeholder="Medium (default)" />
          <Input placeholder="Large" size="lg" />
        </Flex>
      </Form>
    </div>
  );
}
