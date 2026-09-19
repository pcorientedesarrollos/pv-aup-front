const fs = require('fs');

let ts = fs.readFileSync('../pv-aup-back/src/pos/pos.service.ts', 'utf8');

// Modificar parsearPdfFactura
let pdfIndex = ts.indexOf('async parsearPdfFactura(');
if (pdfIndex !== -1) {
  let extractIvaPdf = `
      const hasIva16 = /IVA[\\s:]*16%|Tasa[\\s:]*0\\.160000/i.test(text);
      const factorIvaPdf = hasIva16 ? 1.16 : 1;
`;
  ts = ts.replace(/const rfcs = text\.match\(\/\[A-Z&/, extractIvaPdf + '      const rfcs = text.match(/[A-Z&');

  // Multiplicar el costoUnitario por el factorIvaPdf
  ts = ts.replace(/currentProduct\.costoUnitario = currentProduct\.cantidad > 0 \? \(\(precioBruto \* currentProduct\.cantidad\) - descuento\) \/ currentProduct\.cantidad : precioBruto;/, 'currentProduct.costoUnitario = (currentProduct.cantidad > 0 ? ((precioBruto * currentProduct.cantidad) - descuento) / currentProduct.cantidad : precioBruto) * factorIvaPdf;');
}

// Modificar parsearXmlFactura
let xmlIndex = ts.indexOf('async parsearXmlFactura(');
if (xmlIndex !== -1) {
  let extractIvaXml = `
      let factorIvaXml = 1;
      const impuestosXml = comprobante['cfdi:Impuestos'];
      if (impuestosXml && impuestosXml['@_TotalImpuestosTrasladados']) {
        const subTotalXml = Number(comprobante['@_SubTotal'] || 0);
        const descuentoXml = Number(comprobante['@_Descuento'] || 0);
        const trasladosXml = Number(impuestosXml['@_TotalImpuestosTrasladados'] || 0);
        if (subTotalXml > 0 && trasladosXml > 0) {
           factorIvaXml = 1 + (trasladosXml / (subTotalXml - descuentoXml));
        }
      }
`;
  ts = ts.replace(/const emisor = comprobante\['cfdi:Emisor'\];/, extractIvaXml + '      const emisor = comprobante[\'cfdi:Emisor\'];');

  // Multiplicar costoUnitarioReal por factorIvaXml
  ts = ts.replace(/const costoUnitarioReal = cantidad > 0 \? \(\(valorUnitario \* cantidad\) - descuento\) \/ cantidad : valorUnitario;/, 'const costoUnitarioReal = (cantidad > 0 ? ((valorUnitario * cantidad) - descuento) / cantidad : valorUnitario) * factorIvaXml;');
}

fs.writeFileSync('../pv-aup-back/src/pos/pos.service.ts', ts, 'utf8');
console.log("pos.service.ts updated with automatic IVA extraction");
