import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from './Root';
import modules from './modules';

ReactDOM.render(<Root {...modules} />, document.getElementById('root'));
