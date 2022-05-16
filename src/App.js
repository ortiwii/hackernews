import React, {Component} from 'react';
import Moment from 'react-moment';
import moment from 'moment'
import 'moment/locale/es';
import './App.css';
import Button from './components/Button';
import Table from './components/Table';
import Search from './components/Search';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

moment.locale('es');

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      searchTerm: DEFAULT_QUERY,
      result: null,
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();

  }
  setSearchTopStories(result){
    this.setState({result});
  }
  fetchSearchTopStories(searchTerm, page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);
  }


  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }


  onDismiss(id) {
    console.log(id);
    function isNotID(item) {
      return item.objectID !==id;
    }
    const updatedList=this.state.result.hits.filter(isNotID);
    this.setState({
      result : { ...this.state.result, hits: updatedList }
    })

  }

  onSearchChange(event) {
    console.log(event.target.value);
    this.setState({ searchTerm: event.target.value});
  }

  render(){
    const {result, searchTerm} = this.state;
    const page = (result && result.page) || 0;
   // if (!result) return null;
    return(
        <div className="page">
          <div className="interacions">

            <Search value={searchTerm}
                    onChange={this.onSearchChange}
                    onSubmit ={this.onSearchSubmit}>
              Search
            </Search>
          </div>
          {result &&
              <Table list={result.hits}
                     onDismiss={this.onDismiss}/>
          }
          <div className={"interactions"}>
            <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              More
            </Button>
          </div>
        </div>


    );
  }
}
/*
const Search = ({

                  value,
                  onChange,
                  onSubmit,
                  children}) =>
    <form onSubmit={onSubmit}>
      <input type="text"
             value={value}
             onChange={onChange}
      />
      <button type="submit">
        {children}
      </button>
    </form>;


const Table = ({
                    list,
                    onDismiss}) =>
    <div className="table">

        {list.map(item =>
        {return <div key={item.objectID} className="table-row">
             <span style={{ width: '40%' }}>
                <a href={item.url}>{item.title}</a>
                </span>
            <span style={{ width: '30%' }}>
                {item.author}
                </span>
            <span style={{ width: '10%' }}>
                    <Moment locale='es' fromNow>{item.created_at}</Moment></span>

            <span style={{ width: '10%' }}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        > Dismiss
                        </Button>
                        </span>
        </div>;
        })}
    </div>;
/*
class Table extends Component {
  render(){
    const {list, onDismiss} = this.props;
    return(
        <div className="table">

          {list.map(item =>
          {return <div key={item.objectID} className="table-row">
             <span style={{ width: '40%' }}>
                <a href={item.url}>{item.title}</a>
                </span>
            <span style={{ width: '30%' }}>
                {item.author}
                </span>
              <span style={{ width: '10%' }}>
                    <Moment locale='es' fromNow>{item.created_at}</Moment></span>

            <span style={{ width: '10%' }}>
                        <Button
                            onClick={() => onDismiss(item.objectID)}
                            className="button-inline"
                        > Dismiss
                        </Button>
                        </span>
          </div>;
          })}
        </div>
    );
  }
}*/



/*
class Button extends Component {
  render() {
    const {onClick, className = '', children} = this.props;
    return (
        <button
            onClick={onClick}
            className={className}
            type="button"
        >{children}
        </button>
    );
  }
}
const Button = ({
                    onClick,
                    className,
                    children}) =>
    <button
        onClick={onClick}
        className={className}
        type="button"
    >{children}
    </button>
*/


export default App;
