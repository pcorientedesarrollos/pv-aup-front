const fs = require('fs');
let text = fs.readFileSync('src/app/features/proveedores/proveedores.component.ts', 'utf-8');

const constructorRegex = /constructor\(private http: HttpClient, private auth: AuthService, private router: Router, private route: ActivatedRoute, private toast: ToastService, private confirmService: ConfirmService\) \{/m;
const replacementConstructor = `constructor(private http: HttpClient, private auth: AuthService, private router: Router, private route: ActivatedRoute) {`;
text = text.replace(constructorRegex, replacementConstructor);

fs.writeFileSync('src/app/features/proveedores/proveedores.component.ts', text, 'utf-8');
console.log('Fixed constructor errors');
