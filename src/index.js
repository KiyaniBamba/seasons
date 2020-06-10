import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    constructor(props){
        super(props);

        // THIS IS THE ONLY TIME we do direct assignment to this.state
        
        // initializing our state. On sait que lat est un nombre donc on initialise avec null
        
        this.state = {lat: null, errorMessage:'' }; 

        
        // l'on place cette methode ici et non a l'interieur de render car, si on l,a laissé a l'interieur de render a chaque fois notre browser sera entrant de call la fonction. And we don't need to fetch it multiple time

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lat: position.coords.latitude})  
            },
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
                    return   <div> Latitude: {this.state.lat} </div> 
                } else {
                    return <div> Loading </div>   
                }
        }
}

ReactDom.render(<App/>, document.querySelector('#root'))