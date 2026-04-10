import React from 'react';
import { Heading, Paragraph, Text, Typography } from '@tiny-design/react';

export default function BasicDemo() {
  return (
    <>
      <Heading>Introduction</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus sit. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Massa enim nec dui nunc mattis enim. Aliquet risus feugiat in ante metus dictum at. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque.
      </Paragraph>
      <Paragraph>
        Metus aliquam eleifend mi in nulla posuere. <Text italic>Nisl tincidunt eget nullam non nisi est sit amet.</Text> Diam sit amet nisl suscipit. In ante metus dictum at tempor commodo. Amet luctus venenatis lectus magna. Velit egestas dui id ornare arcu. Enim ut tellus elementum sagittis. Vitae aliquet nec ullamcorper sit amet risus nullam. Nisl nunc mi ipsum faucibus vitae. Nunc mi ipsum faucibus vitae. Dictum at tempor commodo ullamcorper a lacus vestibulum.
      </Paragraph>

      <Heading level={2}>Guidelines & Resources</Heading>
      <Paragraph>
        In object-oriented computer programming, <Text strong>SOLID</Text> is a mnemonic acronym for five design principles intended to make software designs more understandable, flexible and maintainable.
      </Paragraph>

      <Typography>
        <ul>
          <li>
            <a href="https://en.wikipedia.org/wiki/Single-responsibility_principle">Single-responsibility principle</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle">Open–closed principle</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Behavioral_subtyping">Liskov substitution principle</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Interface_segregation_principle">Interface segregation principle</a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/wiki/Dependency_inversion_principle">Dependency inversion principle</a>
          </li>
        </ul>
      </Typography>
    </>
  );
}
