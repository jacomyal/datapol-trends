import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

import { setOption, toggleCandidate, toggleSource } from '../actions';

export default branch(
  {
    candidates: ['data', 'config', 'candidates'],
    sources: ['data', 'config', 'sources'],
    candidatesOn: ['nav', 'candidates'],
    sourcesOn: ['nav', 'sources'],
  },
  class Form extends Component {
    render() {
      const {
        candidates, sources,
        candidatesOn, sourcesOn,
      } = this.props;

      return (
        <aside className="col-sm-3 max-height">
          <div className="card max-height">
            <h4 className="card-header">Options</h4>
            <div className="card-body scrollable">
              <form onSubmit={ e => e.preventDefault() }>
                {
                  candidates.map(candidate => (
                    <div
                      key={ 'candidate-' + candidate.id }
                      className="form-check"
                    >
                      <label
                        htmlFor={ 'candidate-' + candidate.id }
                        className="form-check-label"
                      >
                        <input
                          id={ 'candidate-' + candidate.id }
                          className="form-check-input"
                          name="option"
                          type="checkbox"
                          checked={ candidatesOn[candidate.id] }
                          onChange={
                            e => this.props.dispatch(
                              toggleCandidate,
                              { candidate: candidate.id }
                            )
                          }
                        />
                        <img
                          className="img-fluid"
                          width="25"
                          height="25"
                          alt={ candidate.label }
                          src={ candidate.avatar }
                        />
                        <span
                          className="badge"
                          style={{
                            color: '#fff',
                            backgroundColor: candidate.color,
                          }}
                        >{
                          candidate.label
                        }</span>
                      </label>
                    </div>
                  ))
                }
                <hr />
                {
                  sources.map(source => (
                    <div
                      key={ 'source-' + source.id }
                      className="form-check"
                    >
                      <label
                        htmlFor={ 'source-' + source.id }
                        className="form-check-label"
                      >
                        <input
                          id={ 'source-' + source.id }
                          className="form-check-input"
                          name="option"
                          type="checkbox"
                          checked={ sourcesOn[source.id] }
                          onChange={
                            e => this.props.dispatch(
                              toggleSource,
                              { source: source.id }
                            )
                          }
                        />
                        <img
                          className="img-fluid"
                          width="25"
                          height="25"
                          alt={ source.label }
                          src={
                            'assets/img/candidats/' + source.id + '.jpg'
                          }
                        />
                        <span className="badge">{
                          source.label
                        }</span>
                      </label>
                    </div>
                  ))
                }
              </form>
            </div>
          </div>
        </aside>
      );
    }
  }
);
