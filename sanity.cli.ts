/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dtlyikoh"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineCliConfig({
    api: { projectId, dataset }, deployment: {
    appId: 'yuc1ycozh8j51g47kdhg0d1f',
  }
})
