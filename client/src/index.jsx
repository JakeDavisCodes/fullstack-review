import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  React.useEffect(() => {
    axios.get('/repos')
      .then((newRepos) => setRepos(newRepos.data));
  }, [])

  const search = (term) => {
    // $.ajax({
    //   url: '/repos',
    //   method: 'POST',
    //   dataType: 'json',
    //   data: JSON.stringify({ user: term }),
    //   success: () => {
    //     console.log('SUCCESS');
    //   }
    // })
    // $.post('/repos', { user: term }, () => {
    //   console.log('Success')
    // })
    axios.post('/repos', { user: term })
      .then(() => axios.get('/repos'))
      .then((newRepos) => setRepos(newRepos.data));
    console.log(repos)
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));