import React from 'react';
import { PopConfirm, Button, Message } from '@tiny-design/react';

export default function PlacementDemo() {
  const btnStyle = {
    width: 80,
  };

  const confirm = () => {
    Message.info('Clicked on Yes.');
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
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="top-start"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>TS</Button>
            </PopConfirm>
          </td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="top"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>Top</Button>
            </PopConfirm>
          </td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="top-end"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>TE</Button>
            </PopConfirm>
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="left-start"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>LS</Button>
            </PopConfirm>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="right-start"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>RS</Button>
            </PopConfirm>
          </td>
        </tr>
        <tr>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="left"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>Left</Button>
            </PopConfirm>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="right"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>Right</Button>
            </PopConfirm>
          </td>
        </tr>
        <tr>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="left-end"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>LE</Button>
            </PopConfirm>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="right-end"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>RE</Button>
            </PopConfirm>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="bottom-start"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>BS</Button>
            </PopConfirm>
          </td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="bottom"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>Bottom</Button>
            </PopConfirm>
          </td>
          <td>
            <PopConfirm
              title="Are you sure to delete this?"
              content={content}
              placement="bottom-end"
              onConfirm={confirm}
            >
              <Button style={btnStyle}>BE</Button>
            </PopConfirm>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}