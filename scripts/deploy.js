// Script para preparar la aplicación para GitHub Pages
const fs = require('fs');
const path = require('path');

// Rutas
const buildDir = path.join(__dirname, '..', 'build');
const docsDir = path.join(__dirname, '..', 'docs');

// Función para copiar archivos recursivamente
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Verificar que existe la carpeta build
if (!fs.existsSync(buildDir)) {
  console.error('❌ Error: La carpeta "build" no existe.');
  console.log('💡 Ejecuta primero: npm run build');
  process.exit(1);
}

// Eliminar la carpeta docs si existe
if (fs.existsSync(docsDir)) {
  console.log('🗑️  Eliminando carpeta docs anterior...');
  fs.rmSync(docsDir, { recursive: true, force: true });
}

// Copiar build a docs
console.log('📦 Copiando archivos de build a docs...');
copyRecursiveSync(buildDir, docsDir);

console.log('✅ ¡Despliegue preparado!');
console.log('📝 Ahora puedes hacer:');
console.log('   git add docs/');
console.log('   git commit -m "Deploy to GitHub Pages"');
console.log('   git push');

