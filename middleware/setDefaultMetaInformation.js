export default async ({ app, store }) => {
  const db = app.$fire.firestore
  await db
    .collection('globalConfig')
    .doc('metaInformation')
    .get()
    .then((doc) => {
      store.commit('metaInformation/setMetaInformation', {
        metaInformation: doc.data()
      })
    })
}
