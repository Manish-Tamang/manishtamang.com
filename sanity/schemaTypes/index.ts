import { type SchemaTypeDefinition } from 'sanity'
import { post } from './post'
import { project } from './project'
import { featuredProjects } from './featuredProjects'
import { recentFavorite } from './recentFavorite'
import { featuredImage } from './featuredImage'
import { timeline } from './timeline'
import { social } from './social'
import { aboutProfile } from './aboutProfile'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, project, featuredProjects, recentFavorite, featuredImage, timeline, social, aboutProfile],
}
