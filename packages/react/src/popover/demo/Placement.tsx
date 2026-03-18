import React from 'react';
import { Popover, Button } from '@tiny-design/react';

export default function PlacementDemo() {
  const btnStyle = {
    width: 80,
  };

  const content = (
    <div>
      <div>This is the content</div>
      <div>This is the content</div>
    </div>
  );

  return (
    <table>
      <tbody>
        <tr>
          <td></td>
          <td>
            <Popover title="Title" content={content} placement="top-start">
              <Button style={btnStyle}>TS</Button>
            </Popover>
          </td>
          <td>
            <Popover title="Title" content={content} placement="top">
              <Button style={btnStyle}>Top</Button>
            </Popover>
          </td>
          <td>
            <Popover title="Title" content={content} placement="top-end">
              <Button style={btnStyle}>TE</Button>
            </Popover>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <Popover title="Title" content={content} placement="left-start">
              <Button style={btnStyle}>LS</Button>
            </Popover>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <Popover title="Title" content={content} placement="right-start">
              <Button style={btnStyle}>RS</Button>
            </Popover>
          </td>
        </tr>
        <tr>
          <td>
            <Popover title="Title" content={content} placement="left">
              <Button style={btnStyle}>Left</Button>
            </Popover>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <Popover title="Title" content={content} placement="right">
              <Button style={btnStyle}>Right</Button>
            </Popover>
          </td>
        </tr>
        <tr>
          <td>
            <Popover title="Title" content={content} placement="left-end">
              <Button style={btnStyle}>LE</Button>
            </Popover>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <Popover title="Title" content={content} placement="right-end">
              <Button style={btnStyle}>RE</Button>
            </Popover>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Popover title="Title" content={content} placement="bottom-start">
              <Button style={btnStyle}>BS</Button>
            </Popover>
          </td>
          <td>
            <Popover title="Title" content={content} placement="bottom">
              <Button style={btnStyle}>Bottom</Button>
            </Popover>
          </td>
          <td>
            <Popover title="Title" content={content} placement="bottom-end">
              <Button style={btnStyle}>BE</Button>
            </Popover>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}