const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.ts', 'utf-8');

const importRegex = /import { Router } from '@angular\/router';/;
if (text.match(importRegex) && !text.includes('ActivatedRoute')) {
    text = text.replace(importRegex, "import { Router, ActivatedRoute } from '@angular/router';");
}

const constructorRegex = /constructor\(\s*private http: HttpClient,\s*private confirmService: ConfirmService,\s*private toast: ToastService,\s*private router: Router,\s*private auth: AuthService\s*\) \{ \}/;
const replacementConstructor = `constructor(
    private http: HttpClient, 
    private confirmService: ConfirmService, 
    private toast: ToastService, 
    private router: Router, 
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }`;
text = text.replace(constructorRegex, replacementConstructor);

const ngOnInitRegex = /ngOnInit\(\) {\s*this\.cargarProveedores\(\);\s*this\.cargarProductos\(\);\s*}/;
const replacementOnInit = `ngOnInit() {
    this.cargarProveedores();
    this.cargarProductos();
    this.route.queryParams.subscribe(params => {
      if (params['modal'] === 'nuevo') {
        this.abrirModalCrear();
      }
    });
  }`;
text = text.replace(ngOnInitRegex, replacementOnInit);

fs.writeFileSync('src/app/features/proveedores/proveedores.component.ts', text, 'utf-8');
console.log('Modified proveedores.component.ts');
