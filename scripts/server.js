// ===== SERVEUR LOCAL / LOCAL SERVER =====

// Module HTTP natif de Node / Native Node HTTP module
const http = require('node:http')
// Module de lecture de fichiers / File-reading module
const fs = require('node:fs')
// Module de chemins / Path module
const path = require('node:path')

// Port dédié au projet / Project-specific port
const PORT = Number.parseInt(process.env.PORT || '4176', 10)
// Racine du projet / Project root
const ROOT = path.resolve(__dirname, '..')

// Types MIME nécessaires / Required MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.ttf': 'font/ttf',
  '.md': 'text/markdown; charset=utf-8',
}

// Serveur statique minimal / Minimal static server
const server = http.createServer((request, response) => {
  // Sert index.html par défaut / Serves index.html by default
  const requestedUrl = request.url === '/' ? '/index.html' : request.url
  // Chemin local normalisé / Normalized local path
  const filePath = path.normalize(path.join(ROOT, decodeURIComponent(requestedUrl)))

  // Bloque toute sortie du dossier projet / Blocks any escape outside the project folder
  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  // Lit le fichier demandé / Reads the requested file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404)
      response.end('Not found')
      return
    }

    const contentType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': contentType })
    response.end(content)
  })
})

// Lance le serveur / Starts the server
server.listen(PORT, () => {
  console.log(`Synth Weather available at http://localhost:${PORT}`)
})
