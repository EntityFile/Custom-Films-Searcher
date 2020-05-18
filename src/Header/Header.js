import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom'

const Header = ({searchRenderer, doTheSearch}) => (
  <div className="titleBar">
    <Link className="link1" to="/">
      <table>
        <tbody>
          <td>
            <img className="icon" width="50" alt="fm-icon" src="icon-3.svg"/>
          </td>
          <td width="10"/>
          <td>
            <p className="titleText">Search Your Movie</p>
          </td>
          <td width="10"/>
        </tbody>
      </table>
    </Link>
    <div className="outerSearchBar">
      <div className="searchTableBar">
        <input className="searchBar" onChange={searchRenderer} placeholder=""/>
        <Link className="link" to="/search"><button className="searchButton" onClick={doTheSearch}><div className="w3-text-white"><i className="fa fa-search"></i></div></button></Link>
      </div>
    </div>
  </div>
)

export default Header;