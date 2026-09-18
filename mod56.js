const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.ts', 'utf-8');

// Fix constructor
const constructorRegex = /constructor\(private http: HttpClient, private auth: AuthService, private router: Router\) \{/m;
const replacementConstructor = `constructor(private http: HttpClient, private auth: AuthService, private router: Router, private route: ActivatedRoute, private toast: ToastService, private confirmService: ConfirmService) {`;
text = text.replace(constructorRegex, replacementConstructor);

// Fix params type
const paramsRegex = /this\.route\.queryParams\.subscribe\(params => {/m;
const paramsReplacement = `this.route.queryParams.subscribe((params: any) => {`;
text = text.replace(paramsRegex, paramsReplacement);

fs.writeFileSync('src/app/features/proveedores/proveedores.component.ts', text, 'utf-8');

// Fix POS component
let html = fs.readFileSync('src/app/features/pos/catalogo/catalogo.component.html', 'utf-8');
html = html.replace('cargarCategoriasYProductos()', "buscarEnBackend('', 1)");
fs.writeFileSync('src/app/features/pos/catalogo/catalogo.component.html', html, 'utf-8');

console.log('Fixed errors');
