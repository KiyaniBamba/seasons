import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay  from "./SeasonDisplay";

class App extends React.Component {

    state = {lat: null, errorMessage:'' };         
    
    componentDidMount(){
        // l'on place cette methode ici et non a l'interieur de render car, si on l,a laissé a l'interieur de render a chaque fois notre browser sera entrant de call la fonction. And we don't need to fetch it multiple time
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude}),
            (err) => {
            this.setState({errorMessage: err.message})
            }
            ); 
    }

    
    render(){
                if (this.state.errorMessage && !this.state.lat){
                    return <div> Error: {this.state.errorMessage} </div> 
                }
                if (!this.state.errorMessage && this.state.lat){
                    return   <SeasonDisplay  lat= {this.state.lat} /> 
                } else {
                    return <div> Loading </div>   
                }
        }
}

ReactDom.render(<App/>, document.querySelector('#root'))