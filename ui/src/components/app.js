import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Input, Menu, Divider } from 'semantic-ui-react'

import AdminComponent from "./admin/adminComponent";

import sinlimitesApi from "../apis/hackaton";

export default class App extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div className="ui container">        
        <Route path="/" render={props => <AdminComponent {...props} />} />        
      </div>
    )
  }
}
