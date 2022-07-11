import { MetaInformation } from '~/utils/metaInformation'

export default async ({ app }) => {
  const db = app.$fire.firestore
  await db
    .collection('globalConfig')
    .doc('metaInformation')
    .get()
    .then((doc) => {
      const data = doc.data()
      app.head.title = data.title
      app.head.meta = new MetaInformation(data).nuxtFormat
    })
}
