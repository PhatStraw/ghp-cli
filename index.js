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
    const [owner,repo] = args.repo.split('/');
    try{
        await octokit.activity.starRepo({
        owner,
        repo
      });
      console.log(`Starred ${repo}`)
    } catch(e) {
        console.log('error: ', e)
    }
  })

  .command('prl', 'List of pull request')
  .argument('<repo>', 'repo', prog.STRING)
  .action(async (args, options, logger) => {
    const [owner,repo] = args.repo.split('/');
    console.log(owner)
    console.log(repo)
    try{
        const prs = await octokit.pulls.list({
        owner,
        repo
      });
      
      console.log(JSON.stringify(prs.data.map(({number, state, title}) => ({
        title,
        state,
        number
       })), null, 2))

    } catch(e) {
        console.log('error: ', e)
    }
  })
 
prog.parse(process.argv);