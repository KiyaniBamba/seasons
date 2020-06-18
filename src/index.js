import React from 'react';
import ReactDom from 'react-dom';
import './SeasonDisplay.css';
import SeasonDisplay  from "./SeasonDisplay";
import Spinner from './Spinner.js'

class App extends React.Component {

    state = {lat: null, errorMessage:'' };         
    
    componentDidMount(){
        // l'on place cette methode ici et non a l'interieur de render car, si on l'a laisse a l'interieur de render a chaque fois que notre browser sera entrant de call la fonction. And we don't need to fetch it multiple time
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude}),
            (err) => {
            this.setState({errorMessage: err.message})
            }
            ); 
    }

    renderContent = () => {
        if (this.state.errorMessage && !this.state.lat){
            return <div className={`season-display`} > Error: {this.state.errorMessage} </div> 
        }
        if (!this.state.errorMessage && this.state.lat){
            return   <SeasonDisplay  lat= {this.state.lat} /> 
        } else {
            return <Spinner message="Please, accept location request"/>   
        }
    }

    // ideally, we don't want to have too many return inside our render function, this is why we are going to create renderContent and call it inside render.
    render(){
                // if (this.state.errorMessage && !this.state.lat){
                //     return <div className={`season-display`} > Error: {this.state.errorMessage} </div> 
                // }
                // if (!this.state.errorMessage && this.state.lat){
                //     return   <SeasonDisplay  lat= {this.state.lat} /> 
                // } else {
                //     return <Spinner message="Please, accept location request"/>   
                // }
                return (
                    <div>
                        {this.renderContent()}
                    </div>
                )

        }
}

ReactDom.render(<App/>, document.querySelector('#root'))