/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import NavigationContainer from './navigation-container.js';
import Calendar from './calendar.js';
import type {CalendarPropsT, StatefulDatepickerPropsT} from './types.js';

function StatefulComponent(props: StatefulDatepickerPropsT<CalendarPropsT>) {
  return (
    <StatefulContainer {...props}>
      {extendedProps => (
        <NavigationContainer {...extendedProps}>
          {componentProps => <Calendar {...componentProps} />}
        </NavigationContainer>
      )}
    </StatefulContainer>
  );
}

StatefulComponent.defaultProps = {
  initialState: {value: null},
  stateReducer: (type, nextState) => nextState,
  onSelect: () => {},
};

export default StatefulComponent;
