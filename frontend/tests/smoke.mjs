// Tests de logique dans un environnement DOM minimal ; ne remplace pas un test visuel.
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    innerHTML: '', textContent: '', classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {}, focus() {}, setSelectionRange() {}, scrollIntoView() {},
    showModal() { this.open = true; }, close() { this.open = false; },
    querySelector() { return element('nested'); }
  });
  return elements.get(id);
}
const storage = new Map();
const context = vm.createContext({
  console, Intl, Date, Set, Map, Number, String, Array, Object, JSON, Math,
  RegExp, Error, Blob, URL, setTimeout, clearTimeout, FormData,
  document: { querySelector: element, querySelectorAll: () => [], createElement: () => ({ click() {} }) },
  localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
  location: { hash: '' }, window: { addEventListener() {}, scrollTo() {} }
});
vm.runInContext(await readFile(new URL('../app.js', import.meta.url), 'utf8'), context);
vm.runInContext(`
  function check(condition, message) { if (!condition) throw Error(message); }
  check(scoped().length === 84, 'Jeu de démonstration incorrect');
  for (const r of ['dashboard','transactions','graph','temporal','alerts','assistant','import']) {
    route=r; render(); check(main.innerHTML.includes('<h1>'), 'Écran vide : '+r);
  }
  role='admin'; for (const r of ['import','settings','users']) { route=r; render(); }
  role='analyst'; route='settings'; render();
  check(main.innerHTML.includes('Accès réservé'), 'Accès interface administrateur exposé');
  check(reply('Pourquoi TX-084321 est signalée ?').includes('96/100'), 'Réponse transaction incorrecte');
  check(reply('TX-999999').includes('ne trouve pas'), 'Donnée absente inventée');
  check(reply('Analyse C10284').includes('Sources'), 'Réponse compte sans sources');
  range='1'; check(scoped().length===12, 'Filtre de période incorrect'); range='7';
  check(csvRows('id;source\\n"A;B";C')[1][0]==='A;B', 'CSV cité incorrect');
`, context);
await vm.runInContext(`(async () => {
  role='admin'; route='import'; render();
  const header='id,source,target,amount,type,date,score\\n';
  const row='QA-1,C10284,C20817,100,TRANSFER,2026-11-19T12:00:00,90';
  await importCsv({ size:120, text:async()=>header+row });
  check(transactions.length===85, 'Import valide échoué');
  await importCsv({ size:120, text:async()=>header+row });
  check(transactions.length===85, 'Doublon importé');
  await importCsv({ size:120, text:async()=>header+'QA-2,C10284,C20817,-1,TRANSFER,2026-11-19T12:00:00,90' });
  check(transactions.length===85, 'Montant négatif accepté');
  check(document.querySelector('#import-result').innerHTML.includes('invalide'), 'Erreur non affichée');
  await importCsv({ size:20, text:async()=>'wrong,columns\\n1,2' });
  check(document.querySelector('#import-result').innerHTML.includes('Colonnes manquantes'), 'Colonnes invalides acceptées');
})()`, context);
console.log('OK : écrans, accès simulés, période, assistant, import CSV, doublons et rejets des données invalides.');
