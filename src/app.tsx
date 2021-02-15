import React from 'react';
import * as ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faCheck, faFilePdf, faUser, faKey, faSave, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import Main from './components/Main';

library.add(faTimesCircle, faCheck, faFilePdf, faUser, faKey, faSave, faQuestionCircle);

function render() {

  ReactDOM.render(
    <Main />
    ,document.getElementById('root'));
}

render();