const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const cssDir = path.join(componentsDir, 'css');
const jsxDir = path.join(componentsDir, 'jsx');

if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(jsxDir)) fs.mkdirSync(jsxDir);

// 1. Move files
const files = fs.readdirSync(componentsDir);
files.forEach(file => {
  const ext = path.extname(file);
  const fullPath = path.join(componentsDir, file);
  
  if (fs.statSync(fullPath).isFile()) {
    if (ext === '.css') {
      fs.renameSync(fullPath, path.join(cssDir, file));
    } else if (ext === '.jsx') {
      fs.renameSync(fullPath, path.join(jsxDir, file));
    }
  }
});

// 2. Update imports in component JSX files
const jsxFiles = fs.readdirSync(jsxDir);
jsxFiles.forEach(file => {
  const filePath = path.join(jsxDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  // Replace import './Something.css' with import '../css/Something.css'
  content = content.replace(/import\s+['"]\.\/([^'"]+\.css)['"]/g, "import '../css/$1'");
  fs.writeFileSync(filePath, content);
});

// 3. Update imports in Home.jsx
const homePath = path.join(srcDir, 'pages', 'Home.jsx');
if (fs.existsSync(homePath)) {
  let homeContent = fs.readFileSync(homePath, 'utf-8');
  homeContent = homeContent.replace(/import\s+(\w+)\s+from\s+['"]\.\.\/components\/([^'"]+)['"]/g, "import $1 from '../components/jsx/$2'");
  fs.writeFileSync(homePath, homeContent);
}

// 4. Update imports in App.jsx
const appPath = path.join(srcDir, 'App.jsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf-8');
  appContent = appContent.replace(/import\s+(\w+)\s+from\s+['"]\.\/components\/([^'"]+)['"]/g, "import $1 from './components/jsx/$2'");
  fs.writeFileSync(appPath, appContent);
}

console.log('Restructure complete.');
