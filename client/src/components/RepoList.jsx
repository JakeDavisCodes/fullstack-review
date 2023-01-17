import React from 'react';
import Repo from 'Repo';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo) => {
      <Repo repo={repo}/>
    })}
  </div>
)

export default RepoList;