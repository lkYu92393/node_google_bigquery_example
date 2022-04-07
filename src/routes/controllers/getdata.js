const express = require('express');
const router = express.Router();
const moment = require("moment");
const Path = require("path");
const {BigQuery} = require('@google-cloud/bigquery');

const projectID = "<PROJECTID>";

const bigquery = new BigQuery({
    projectId: projectID
  });
  
var query = `
select 
repo_name, author.name, committer.name, commit 
from 
${projectID}.github_source_data.github_contributors 
limit 10
`;

async function getGithubStat() {
  try {
    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();   
    return rows; 
  } catch (error) {
    throw
  }
}

router.get('/data', async function(req, res) {
  try {
    var rows = await getGithubStat();
    res.json(rows);   
  } catch (error) {
    res.write(`error: ${error}`);
  }
});

module.exports = router;