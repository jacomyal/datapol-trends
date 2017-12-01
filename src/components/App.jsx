import React from 'react';

import Form from './Form.jsx';
import Curve from './Curve.jsx';

export default () => (
  <main
    role="main"
    className="container-fluid max-height-base no-overflow"
  >
    <div className="row max-height">
      <Form />
      <Curve />
    </div>
  </main>
);
