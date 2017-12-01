import cls from 'classnames';
import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

import {
  searchQueries,
  setOption, selectEvent,
  toggleSelection, toggleQuery,
} from '../actions';

const TABS = [
  {
    id: 'filters',
    label: 'Filtres',
    component(props) {
      return (
        <form onSubmit={ e => e.preventDefault() }>
          <label className="control-label">Candidats</label>
          {
            props.candidates.map(candidate => (
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
                    checked={ props.candidatesOn[candidate.id] }
                    onChange={
                      e => props.dispatch(
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
          <label className="control-label">Catégories</label>
          {
            props.categories.map(category => (
              <div
                key={ 'category-' + category.id }
                className="form-check"
              >
                <label
                  htmlFor={ 'category-' + category.id }
                  className="form-check-label"
                >
                  <input
                    id={ 'category-' + category.id }
                    className="form-check-input"
                    name="option"
                    type="checkbox"
                    checked={ props.categoriesOn[category.id] }
                    onChange={
                      e => props.dispatch(
                        toggleSelection,
                        { type: 'categories', value: category.id }
                      )
                    }
                  />
                  <span className="badge">
                    { category.label }
                  </span>
                </label>
              </div>
            ))
          }
          <hr />
          <label className="control-label">Sources</label>
          {
            props.sources.map(source => (
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
                    checked={ props.sourcesOn[source.id] }
                    onChange={
                      e => props.dispatch(
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
        </form>
      );
    },
  },
  {
    id: 'queries',
    label: 'Requêtes',
    component(props) {
      const highlightedQueriesIndex = _.keyBy(props.highlightedQueries);
      const queries = props.queries.filter(
        query => !highlightedQueriesIndex[query.id]
      );

      return (
        <form onSubmit={ e => e.preventDefault() }>
          <div className="form-group">
            <label
              className="col-form-label sr-only"
              htmlFor="searchQueries"
            >
              Chercher dans les requêtes
            </label>
            <input
              type="search"
              className="form-control"
              id="searchQueries"
              placeholder="Rechercher dans les requêtes"
              value={ props.querySearch || '' }
              onChange={
                e => props.dispatch(
                  searchQueries,
                  { search: e.target.value }
                )
              }
            />
          </div>
          <hr />
          {
            props.highlightedQueries.length ?
              <label className="control-label">{
                props.highlightedQueries.length > 1 ?
                  props.highlightedQueries.length + ' requêtes sélectionnées' :
                  'Une requête sélectionnée'
              }
              </label> :
              undefined
          }
          {
            props.highlightedQueries.map(query => (
              <div
                key={ 'query-' + query }
                className="form-check"
              >
                <label
                  htmlFor={ 'query-' + query }
                  className="form-check-label"
                >
                  <input
                    id={ 'query-' + query }
                    className="form-check-input"
                    name="option"
                    type="checkbox"
                    checked={ true }
                    onChange={
                      e => props.dispatch(
                        toggleQuery,
                        { query: query }
                      )
                    }
                  />
                  <span className="badge">
                    <strong>{ query }</strong>
                  </span>
                </label>
              </div>
            ))
          }
          {
            props.highlightedQueries.length ?
              <hr /> :
              undefined
          }
          {
            queries.length ?
              <label className="control-label">
                { queries.length } requête{ queries.length > 1 ? 's' : null }
              </label> :
              <label className="control-label">
                Aucune requête dans les filtres actifs
              </label>
          }
          {
            queries.slice(0, 50).map(query => (
              <div
                key={ 'query-' + query.id }
                className="form-check"
              >
                <label
                  htmlFor={ 'query-' + query.id }
                  className="form-check-label"
                >
                  <input
                    id={ 'query-' + query.id }
                    className="form-check-input"
                    name="option"
                    type="checkbox"
                    checked={ false }
                    onChange={
                      e => props.dispatch(
                        toggleQuery,
                        { query: query.id }
                      )
                    }
                  />
                  <span className="badge">
                    { query.id }
                  </span>
                </label>
              </div>
            ))
          }
          {
            queries.length > 50 ?
              <label className="control-label">
                ...{ queries.length - 50 } requêtes restantes
              </label> :
              undefined
          }
        </form>
      );
    },
  },
  {
    id: 'events',
    label: 'Événements',
    component(props) {
      return (
        <form onSubmit={ e => e.preventDefault() }>
          {
            props.events.map(event => (
              <div
                key={ 'event-' + event.id }
                className="form-check"
              >
                <label
                  htmlFor={ 'event-' + event.id }
                  className="form-check-label"
                >
                  <input
                    id={ 'event-' + event.id }
                    className="form-check-input"
                    name="option"
                    type="radio"
                    checked={ props.event === event.id }
                    onChange={
                      e => props.dispatch(
                        selectEvent,
                        { event: event.id }
                      )
                    }
                  />
                  <span>
                    <span className="date">{ event.date }</span>
                    { event.label }
                  </span>
                </label>
              </div>
            ))
          }
        </form>
      );
    },
  },
];

export default branch(
  {
    candidates: ['data', 'config', 'candidates'],
    categories: ['data', 'config', 'categories'],
    sources: ['data', 'config', 'sources'],
    events: ['data', 'config', 'events'],
    queries: ['data', 'queries'],

    // Selection
    highlightedQueries: ['nav', 'queries'],
    candidatesOn: ['nav', 'candidates'],
    categoriesOn: ['nav', 'categories'],
    querySearch: ['nav', 'querySearch'],
    sourcesOn: ['nav', 'sources'],
    event: ['nav', 'event'],
  },
  class Form extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = { tab: 'filters' };
    }

    setTab(tab) {
      this.setState({ tab });
    }

    render() {
      const selectedTab = this.state.tab;

      return (
        <aside className="col-sm-4 col-md-3 max-height no-padding-left">
          <ul
            className="nav nav-tabs"
            role="tablist"
          >{
            TABS.map(tab => (
              <li
                key={ tab.id }
                className="nav-item"
              >
                <a
                  id={ tab.id }
                  href="#"
                  role="tab"
                  aria-controls={ tab.id }
                  aria-selected="true"
                  className={
                    cls(
                      'nav-link',
                      tab.id === selectedTab && 'active'
                    )
                  }
                  onClick={
                    e => {
                      e.preventDefault();
                      this.setTab(tab.id);
                    }
                  }
                >{
                  tab.label
                }</a>
              </li>
            ))
          }</ul>

          <div className="tab-content max-height-tab">{
            TABS.map(tab => (
              <div
                key={ tab.id }
                role="tabpanel"
                aria-labelledby={ tab.id }
                className={
                  cls(
                    'tab-pane scrollable',
                    tab.id === selectedTab ?
                      'active show' :
                      'fade'
                  )
                }
              >{
                tab.id === selectedTab ?
                  tab.component(this.props) :
                  undefined
              }</div>
            ))
          }</div>
        </aside>
      );
    }
  }
);
