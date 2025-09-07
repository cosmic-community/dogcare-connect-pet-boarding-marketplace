const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Read the console capture script
const scriptContent = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'), 
  'utf8'
);

// Create the inline script tag
const scriptTag = `<script>${scriptContent}</script>`;

// Find all HTML files in the build output
const buildDir = path.join(__dirname, '../out') || path.join(__dirname, '../.next');
const htmlFiles = glob.sync('**/*.html', { cwd: buildDir });

console.log(`Injecting console capture script into ${htmlFiles.length} HTML files...`);

htmlFiles.forEach(file => {
  const filePath = path.join(buildDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Inject script before closing head tag
  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content);
    console.log(`✓ Injected script into ${file}`);
  }
});

console.log('Console capture script injection complete!');