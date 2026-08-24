const fs = require('fs');
const path = require('path');

const replacements = {
  // Sage
  '#FAF0F4': '#F4F7F4',
  '#F5E9EE': '#E7EFE8',
  '#E6C7D4': '#C9D8CB',
  '#9B335E': '#6B8E73',
  '#7A284B': '#4A6B52',
  '#5D1E38': '#38523E',
  '#421527': '#283B2C',
  
  // Champagne
  '#FBF8F0': '#FBFaf7',
  '#F7F0DD': '#F2EDE4',
  '#C49A45': '#BCA98E',
  '#AA8233': '#9C8B72',
  
  // Base / Greys
  '#FAF8F3': '#FAFAF9',
  '#E9E2E6': '#E8E6E1',
  '#242126': '#2C2A29',
  '#716B73': '#787470',
  '#9A9299': '#A39F9A',
  
  // Status
  '#3F7D63': '#5C826B',
  '#C58A35': '#A68A61',
  '#C94A5A': '#B86B6B'
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function refactorColors() {
  const srcDir = path.join(__dirname, 'src');
  walkDir(srcDir, (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.css')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    for (const [oldColor, newColor] of Object.entries(replacements)) {
      // Replace uppercase
      let regexUpper = new RegExp(oldColor, 'g');
      if (regexUpper.test(content)) {
        content = content.replace(regexUpper, newColor);
        hasChanges = true;
      }
      
      // Replace lowercase hex
      let regexLower = new RegExp(oldColor.toLowerCase(), 'g');
      if (regexLower.test(content)) {
        content = content.replace(regexLower, newColor.toLowerCase());
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated colors in ${filePath}`);
    }
  });
}

refactorColors();
