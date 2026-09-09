// Resolve um nome de arquivo (ex: "hero.png") para a URL processada pelo Vite.
// Usa import.meta.glob para que arquivos ainda não migrados simplesmente não
// apareçam (retorna '') em vez de quebrar o build.
const modules = import.meta.glob('../assets/images/*', { eager: true, import: 'default' })

const byFilename = {}
for (const path in modules) {
  const filename = path.split('/').pop()
  byFilename[filename] = modules[path]
}

export function imageUrl(filename) {
  if (!filename) return ''
  return byFilename[filename] || ''
}
