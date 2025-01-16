export default defineEventHandler(async (event) => {
  const db = hubDatabase()

  await db.exec('CREATE TABLE IF NOT EXISTS genres (genreGuid TEXT PRIMARY KEY, name TEXT)')


  // List genres
  const { results: genres } = await db.prepare('SELECT * FROM genres').all()

  return genres
})
