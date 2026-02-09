import type { StructureResolver } from 'sanity/structure'
import { StarIcon, PlayIcon, ImageIcon, UserIcon, ShareIcon, CalendarIcon } from '@sanity/icons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton for About Profile
      S.listItem()
        .title('About Profile')
        .id('aboutProfile')
        .icon(UserIcon)
        .child(
          S.document()
            .schemaType('aboutProfile')
            .documentId('aboutProfile')
        ),
      // Singleton for Social Links
      S.listItem()
        .title('Social Links')
        .id('social')
        .icon(ShareIcon)
        .child(
          S.document()
            .schemaType('social')
            .documentId('social')
        ),
      S.divider(),
      // Document list for Timeline
      S.listItem()
        .title('Timeline Entries')
        .id('timeline')
        .icon(CalendarIcon)
        .child(S.documentTypeList('timeline').title('Timeline Entries')),
      S.divider(),
      // Singleton for Featured Projects
      S.listItem()
        .title('Featured Projects')
        .id('featuredProjects')
        .icon(StarIcon)
        .child(
          S.document()
            .schemaType('featuredProjects')
            .documentId('featuredProjects')
        ),
      // Singleton for Recent Favorite
      S.listItem()
        .title('Recent Favorite Track')
        .id('recentFavorite')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('recentFavorite')
            .documentId('recentFavorite')
        ),
      // Singleton for Featured Image
      S.listItem()
        .title('Featured Image Section')
        .id('featuredImage')
        .icon(ImageIcon)
        .child(
          S.document()
            .schemaType('featuredImage')
            .documentId('featuredImage')
        ),
      S.divider(),
      // All other document types
      ...S.documentTypeListItems().filter(
        (item) => !['featuredProjects', 'recentFavorite', 'featuredImage', 'aboutProfile', 'social', 'timeline'].includes(item.getId()!)
      ),
    ])
