import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = 'AIzaSyDTvoz6HKxxFEruDD7iw7Ik-oUOKLjFR5g';

//const is es6 for something that does not change
//=> "fat arrow"

class App extends Component {
	constructor(props){
		//when a state changes: the component instantly re-renders along with any children the component contains as well. 
		super(props)
		this.state = {
			videos:[],
			selectedVideo:null
		};
		this.videoSearch('cwcello');
	}
	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) =>{
			//syntactic sugar if the key name is the same as value name i.e. this.setState({videos:videos});
			this.setState({
				videos:videos,
				selectedVideo:videos[0]

			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)} ,300)
		return (
		<div>
			<SearchBar onSearchTermChange = {videoSearch}/>
			<VideoDetail video={this.state.selectedVideo}/>
			<VideoList 
			    onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
				videos={this.state.videos} />
		 </div>
		);
	}
}

//second argument is a target
ReactDom.render(<App/>, document.querySelector('.container'));