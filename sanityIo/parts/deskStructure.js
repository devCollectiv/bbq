// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/extensions
// eslint-disable-next-line import/no-unresolved
import {createSuperPane} from 'sanity-super-pane'
// eslint-disable-next-line import/no-unresolved
import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Cold Lead')
        .child(createSuperPane('coldLead', S)),
      S.listItem()
        .title('Verification Question')
        .child(createSuperPane('verificationQuestion', S)),
      S.listItem()
        .title('Image Verification Question')
        .child(createSuperPane('imageVerificationQuestion', S)),
      S.listItem()
        .title('Media Tags')
        .child(createSuperPane('media.tag', S))
    ]);
