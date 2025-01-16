export default defineEventHandler(async (event) => {
  const db = hubDatabase()

  //await db.exec('CREATE TABLE IF NOT EXISTS books (genreGuid TEXT PRIMARY KEY, name TEXT)')

  // List books
  const { results: books } = await db.prepare('SELECT * FROM books').all()

  return books
})
