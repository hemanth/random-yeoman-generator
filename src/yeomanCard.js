import React from 'react';
import fetch from 'isomorphic-fetch';
import Card from 'react-material-card';
import './main.css';

const API = 'https://yeoman-generator-list.herokuapp.com/';
let cache = [];

export default class YeomanCard extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     generators: null,
     generator: null
   };
 }

 _fetchGenerators() {
    if(!cache.length) {
     fetch(API)
       .then(resp => resp.json())
       .then(generators => {
        cache = generators;
        this.setState({generators}); 
       })
       .catch(e => console.error(e))
   } else {
      this.setState({generators: cache});
   }
 }

 componentDidMount() {
  this._fetchGenerators();
 }

 _getRandomGenerator() {
     const { generators } = this.state;
     if (!generators) return null;
     return generators[ Math.floor(Math.random() * generators.length) ];
 }

 render() {
   if (!this.state.generators) return null;
   const {name, description, downloads, owner, site, stars, updated} = this._getRandomGenerator();
   return <div>
   <Card width={300} height={400} borderRadius={10} className="card">
     <div className="content">
        <h1><a href={site} className="link">{name}</a></h1>
        <h2>{description}</h2>
        <h3>{downloads}</h3>
        <h5>{stars}</h5>
        <h6>Last update: {new Date(updated).toDateString()}</h6>
     </div>
    </Card>
    <span
      className="next" 
      onClick = {::this._fetchGenerators}>>></span>
    </div>
 }
}

YeomanCard.defaultProps = null;