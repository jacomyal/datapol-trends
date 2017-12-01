import React from 'react';

import Form from './Form.jsx';
import Curve from './Curve.jsx';

export default () => (
  <div>
    <header>
      <nav className="navbar navbar-fixed-top">
        <a className="navbar-brand" href="/">
          <img
            src="assets/img/logotype-datapol.png"
            className="img-fluid"
            alt="Logotype datapol"
            width="30"
            height="30"
          />
          <span />
        </a>
      </nav>
    </header>
    <main
      role="main"
      className="container-fluid max-height-base no-overflow"
    >
      <div className="row max-height">
        <Form />
        <Curve />
      </div>
    </main>
  </div>
);
