const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.html', 'utf-8');

const selectBlockStart = text.indexOf('<div class="filter-control w-full md:max-w-xs relative">');
const selectBlockEnd = text.indexOf('</select>\n            </div>') + '</select>\n            </div>'.length;
const selectBlock = text.substring(selectBlockStart, selectBlockEnd);

const inputBlockStart = text.indexOf('<div class="filter-control w-full md:max-w-md relative">');
const inputBlockEnd = text.indexOf('class="filter-input pl-9">\n          </div>') + 'class="filter-input pl-9">\n          </div>'.length;
const inputBlock = text.substring(inputBlockStart, inputBlockEnd);

// Find the whole container to replace safely
const fullContainerStart = text.indexOf('<div class="filters-row flex flex-col md:flex-row gap-4 items-end p-4 border-b border-gray-100">');
const fullContainerEnd = inputBlockEnd;

const oldContent = text.substring(fullContainerStart, fullContainerEnd);
const newContent = '<div class="filters-row flex flex-col md:flex-row gap-4 items-end p-4 border-b border-gray-100">\n          ' + inputBlock + '\n          ' + selectBlock;

text = text.replace(oldContent, newContent);

fs.writeFileSync('src/app/features/proveedores/proveedores.component.html', text, 'utf-8');
