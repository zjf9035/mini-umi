import React from 'react';
import { render } from 'react-dom';
import { Router,Route,Switch } from 'react-router-dom';
import history from './core/history';
import { getRoutes } from './core/routes';
function renderRoutes(routes){
  return routes.map(({path,exact,component:Component,routes:childRoutes=[]},index)=>(
    <Route key={index} path={path} exact={exact} render={
      props=>(
        <Component {...props}>
          <Switch>
            {renderRoutes(childRoutes)}
          </Switch>
        </Component>
      )
    }/>
  ))
}
function renderClient(opts) {
  render(
  <Router history={opts.history}>
   {renderRoutes(opts.routes)}
  </Router>
  ,document.getElementById(opts.rootElement));
}
const opts = {
  routes:getRoutes(),
  history,
  rootElement: 'root'
}
renderClient(opts);