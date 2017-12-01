import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

import { setOption, toggleSelection } from '../actions';

export default branch(
  {
    candidates: ['data', 'config', 'candidates'],
    sources: ['data', 'config', 'sources'],
    topics: ['data', 'config', 'topics'],
    candidatesOn: ['nav', 'candidates'],
    sourcesOn: ['nav', 'sources'],
    topicsOn: ['nav', 'topics'],
  },
  class Form extends Component {
    render() {
      const {
        candidates, sources, topics,
        candidatesOn, sourcesOn, topicsOn,
      } = this.props;

      return (
        <aside className="col-sm-3 max-height">
          <div className="card max-height">
            <h4 className="card-header">Options</h4>
            <div className="card-body scrollable">
              <form onSubmit={ e => e.preventDefault() }>
                <label className="control-label">Candidats</label>
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
                              toggleSelection,
                              { type: 'candidates', value: candidate.id }
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
                <label className="control-label">Sources</label>
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
                              toggleSelection,
                              { type: 'sources', value: source.id }
                            )
                          }
                        />
                        <span className="badge badge-legend">
                          { source.label }
                          <small>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="1.659"
                              viewBox="0 0 32 1.659"
                            >
                              <path
                                d="M0 0h32v1.66H0z"
                                style={ source.style }
                              />
                            </svg>
                          </small>
                        </span>
                      </label>
                    </div>
                  ))
                }
                <hr />
                <label className="control-label">Types d'événements</label>
                {
                  topics.map(topic => (
                    <div
                      key={ 'topic-' + topic.id }
                      className="form-check"
                    >
                      <label
                        htmlFor={ 'topic-' + topic.id }
                        className="form-check-label"
                      >
                        <input
                          id={ 'topic-' + topic.id }
                          className="form-check-input"
                          name="option"
                          type="checkbox"
                          checked={ topicsOn[topic.id] }
                          onChange={
                            e => this.props.dispatch(
                              toggleSelection,
                              { type: 'topics', value: topic.id }
                            )
                          }
                        />
                        <span className="badge">
                          { topic.label }
                        </span>
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
