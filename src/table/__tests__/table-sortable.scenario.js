/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {
  StyledTable,
  StyledHead,
  StyledBody,
  StyledRow,
  StyledCell,
  SortableHeadCell,
} from '../index.js';

export const name = 'table-sortable';

const DATA = [
  ['Marlyn', 10],
  ['Luther', 15],
  ['Kiera', 13],
  ['Edna', 20],
  ['Soraya', 18],
  ['Dorris', 32],
  ['Astrid', 26],
  ['Wendie', 17],
  ['Marna', 11],
  ['Malka', 14],
  ['Jospeh', 10],
  ['Roselee', 12],
  ['Justine', 35],
  ['Marlon', 30],
  ['Mellissa', 32],
  ['Fausto', 21],
  ['Alfredia', 22],
  ['Abel', 18],
  ['Winford', 19],
  ['Neil', 27],
];

// eslint-disable-next-line flowtype/no-weak-types
class SortableTable extends React.Component<any, any> {
  state = {nameDirection: null, ageDirection: null};

  handleSort = (title: string, prevDirection: ?string) => {
    let nextDirection = null;
    if (prevDirection === 'ASC') {
      nextDirection = 'DESC';
    }
    if (prevDirection === 'DESC') {
      nextDirection = null;
    }
    if (prevDirection === null) {
      nextDirection = 'ASC';
    }

    if (title === 'name') {
      this.setState({nameDirection: nextDirection, ageDirection: null});
      return;
    }

    if (title === 'age') {
      this.setState({nameDirection: null, ageDirection: nextDirection});
      return;
    }
  };

  getSortedData = () => {
    if (this.state.nameDirection) {
      // $FlowFixMe
      const sorted = DATA.slice(0).sort((a, b) => a[0].localeCompare(b[0]));

      if (this.state.nameDirection === 'ASC') {
        return sorted;
      }

      if (this.state.nameDirection === 'DESC') {
        return sorted.reverse();
      }
    }

    if (this.state.ageDirection) {
      const sorted = DATA.slice(0).sort((a, b) => a[1] - b[1]);
      if (this.state.ageDirection === 'ASC') {
        return sorted;
      }

      if (this.state.ageDirection === 'DESC') {
        return sorted.reverse();
      }
    }

    return DATA;
  };

  render() {
    return (
      <div style={{height: '500px', width: '400px'}}>
        <StyledTable>
          <StyledHead>
            <SortableHeadCell
              title="Name"
              direction={this.state.nameDirection}
              onSort={() => this.handleSort('name', this.state.nameDirection)}
            >
              {/* eslint-disable-next-line no-console */}
              <button onClick={() => console.log('filter')}>f</button>
            </SortableHeadCell>
            <SortableHeadCell
              disabled
              title="Age"
              direction={this.state.ageDirection}
              onSort={() => this.handleSort('age', this.state.ageDirection)}
            />
          </StyledHead>
          <StyledBody>
            {this.getSortedData().map((row, index) => (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex}>{cell}</StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    );
  }
}

export const component = () => <SortableTable />;
