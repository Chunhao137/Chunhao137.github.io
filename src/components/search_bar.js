//{ Component }import React and pull off the property component as a varaible called component
import React, {Component} from 'react';

//functional component
// const SearchBar = () => {
// 	return <input />;
// }

//class based component (es6 class  is a javascript oject with methods and properties) 

//define a new class called SearchBar and give it access to all the functionality that React.component has 
//class based components are used versus functional component when the component needs to be aware of state (i.e. data changing over time)
//functional components are used when are just taking in some info.  and spitting out some jsx
class SearchBar extends Component {
	//all javaScript classes have a special function called constructor. The constructor function is the first 
	//and only function called automatically when a new instance of a class is created 
	constructor(props){
		//super calls the parent method
		super(props);
        //we initialize state witn a new object and assinging it to this.state
		this.state = {term: ''};
	}
	//this is the syntax we use to define methods on a class
	render(){
		//to change out state, we use this.setState
		return (
			<div className ="search-bar">
				
				<input 
					value = {this.state.term} 
					onChange = {event => this.onInputChange(event.target.value)}/>
			</div>
		)
	}
	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);


	}

}



export default SearchBar;