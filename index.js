#!/usr/bin/env node
require('dotenv').config()
const prog = require('caporal');
const { Octokit } = require('@octokit/rest')


const octokit = new Octokit({
    auth: process.env.GH_TOKEN
})

prog
  .version('1.0.0')
  // you specify arguments using .argument()
  // 'app' is required, 'env' is optional
  .command('star', 'Star an application')
  .argument('<repo>', 'repo', prog.STRING)
  .action(async (args, options, logger) => {
    const [owner, repo] = args.repo.split('/');
    try{
        await octokit.activity.starRepo({
        owner,
        repo
      });
      console.log(`Starred ${repo}`)
    } catch(e) {
        console.log('error: ', e)
    }
  });
 
prog.parse(process.argv);