/* ============================================================
   Dokumentmodell: én beskrivelse av en prøve eller en regelbok-side,
   som kan vises i nettleseren (ark), skrives ut og lastes ned som Word (.docx).
   Ingenting sendes eller lagres. Hele .docx-filen bygges i nettleseren.

   Blokktyper:
     {t:'tittel', tekst, under}        {t:'navn'}          {t:'h2', tekst}      {t:'h3', tekst}
     {t:'p', html, liten?}             {t:'liste', items:[html], num?}
     {t:'opp', nr, html, valg?, rom?, linjer?, svar?, enhet?, poeng?, hjelp?}
     {t:'boks', tittel, rader:[html], farge?, liste?}
     {t:'tabell', rader:[[html]], hode?}
     {t:'linjer', n}                   {t:'side'}          {t:'tekstlinje', html}
   ============================================================ */
(function () {
  'use strict';
  const M = window.MATTE;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const BOKST = 'abcdefgh';

  /* ---------- HTML-visning ---------- */
  function boksHTML(b) {
    const stil = b.farge ? ' style="background:#' + b.farge + '"' : '';
    return '<div class="ark-husk dok-boks"' + stil + '>' + (b.tittel ? '<h2>' + b.tittel + '</h2>' : '') +
      (b.liste ? '<ul>' + b.rader.map(r => '<li>' + r + '</li>').join('') + '</ul>' : b.rader.map(r => '<p>' + r + '</p>').join('')) + '</div>';
  }
  function blokkHTML(b) {
    switch (b.t) {
      case 'tittel': return '<header class="ark-hode"><div class="ark-logo">🧭 Mattereisen</div><h1>' + b.tekst + '</h1>' + (b.under ? '<div class="ark-under">' + b.under + '</div>' : '') + '</header>';
      case 'navn': return '<div class="ark-navn"><span>Navn: <i></i></span><span>Dato: <i></i></span></div>';
      case 'h2': return '<h2' + (b.did ? ' data-did="' + b.did + '"' : '') + '>' + b.tekst + '</h2>';
      case 'h3': return '<h3>' + b.tekst + '</h3>';
      case 'p': return '<p class="dok-p' + (b.liten ? ' liten' : '') + '">' + b.html + '</p>';
      case 'tekstlinje': return '<p class="dok-p">' + b.html + '</p>';
      case 'liste': return (b.num ? '<ol class="dok-liste">' : '<ul class="dok-liste">') + b.items.map(x => '<li>' + x + '</li>').join('') + (b.num ? '</ol>' : '</ul>');
      case 'boks': return boksHTML(b);
      case 'tabell': return '<table class="ark-tab dok-tab">' + b.rader.map((r, i) => '<tr>' + r.map(c => (i === 0 && b.hode !== false ? '<th>' : '<td>') + c + (i === 0 && b.hode !== false ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</table>';
      case 'linjer': { let h = '<div class="ark-linjer">'; for (let i = 0; i < b.n; i++) h += '<i></i>'; return h + '</div>'; }
      case 'opp': {
        let h = '<div class="dok-opp"' + (b.id ? ' data-oid="' + b.id + '"' : '') + '><div class="dok-q"><b>' + b.nr + '.</b> <span>' + b.html + '</span>' + (b.poeng ? ' <span class="dok-poeng">(' + b.poeng + ' p)</span>' : '') + '</div>';
        if (b.valg) h += '<div class="ark-valg">' + b.valg.map((v, i) => '<span>' + BOKST[i] + ') ' + v + '</span>').join('') + '</div>';
        if (b.hjelp) h += '<div class="ark-hjelp">💡 ' + b.hjelp + '</div>';
        if (b.linjer) { h += '<div class="ark-linjer">'; for (let i = 0; i < b.linjer; i++) h += '<i></i>'; h += '</div>'; }
        else if (b.rom) h += '<div class="ark-regn" style="height:' + b.rom + 'mm"></div>';
        if (b.svar) h += '<div class="ark-svar">Svar: <i></i>' + (b.enhet ? ' ' + esc(b.enhet) : '') + '</div>';
        return h + '</div>';
      }
      default: return '';
    }
  }
  /* deler opp ved {t:'side'} og gir én .ark-side per del */
  function html(blokker, opts) {
    const deler = [[]]; blokker.forEach(b => { if (b.t === 'side') deler.push([]); else deler[deler.length - 1].push(b); });
    return deler.filter(d => d.length).map(d => '<section class="ark-side dok' + (opts && opts.klasse ? ' ' + opts.klasse : '') + '">' + d.map(blokkHTML).join('') + (opts && opts.fot ? '<footer class="ark-fot"><span>' + opts.fot + '</span><span>mattereisen</span></footer>' : '') + '</section>').join('');
  }

  /* ---------- tekst med enkel HTML → Word-runs ---------- */
  const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', apos: "'" };
  const dekod = s => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return isNaN(n) ? m : String.fromCodePoint(n); }
    return ENT[e.toLowerCase()] !== undefined ? ENT[e.toLowerCase()] : m;
  });
  const xml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  function runs(h, o) {
    o = o || {}; h = String(h === undefined || h === null ? '' : h);
    const deler = h.split(/(<[^>]+>)/), st = { b: !!o.fet, i: false, sup: false, sub: false, code: false };
    let ut = '';
    const rpr = () => '<w:rPr>' + (st.code ? '<w:rFonts w:ascii="Consolas" w:hAnsi="Consolas" w:cs="Consolas"/>' : '') + (st.b ? '<w:b/>' : '') + (st.i ? '<w:i/>' : '') +
      (o.farge ? '<w:color w:val="' + o.farge + '"/>' : '') + (o.sz ? '<w:sz w:val="' + o.sz + '"/><w:szCs w:val="' + o.sz + '"/>' : '') + (st.sup ? '<w:vertAlign w:val="superscript"/>' : st.sub ? '<w:vertAlign w:val="subscript"/>' : '') + '</w:rPr>';
    deler.forEach(function (d) {
      if (!d) return;
      if (d[0] === '<' && d[d.length - 1] === '>') {
        const m = /^<(\/?)([a-z0-9]+)/i.exec(d); if (!m) return; const lukk = m[1] === '/', tag = m[2].toLowerCase();
        if (tag === 'b' || tag === 'strong') st.b = lukk ? !!o.fet : true;
        else if (tag === 'i' || tag === 'em') st.i = !lukk;
        else if (tag === 'sup') st.sup = !lukk; else if (tag === 'sub') st.sub = !lukk;
        else if (tag === 'code' || tag === 'pre') st.code = !lukk;
        else if (tag === 'br' && !lukk) ut += '<w:r><w:br/></w:r>';
        else if ((tag === 'li' || tag === 'p' || tag === 'div') && lukk) ut += '<w:r><w:br/></w:r>';
        return;
      }
      const tekst = dekod(d); if (!tekst) return;
      ut += '<w:r>' + rpr() + '<w:t xml:space="preserve">' + xml(tekst) + '</w:t></w:r>';
    });
    return ut;
  }
  const tvTekst = h => dekod(String(h || '').replace(/<[^>]+>/g, ''));

  /* ---------- Word-elementer ---------- */
  function para(r, o) {
    o = o || {};
    let pr = '';
    if (o.keep) pr += '<w:keepNext/>';
    if (o.keepLines !== false) pr += '<w:keepLines/>';
    if (o.bdr) pr += '<w:pBdr>' + o.bdr + '</w:pBdr>';
    if (o.shd) pr += '<w:shd w:val="clear" w:color="auto" w:fill="' + o.shd + '"/>';
    pr += '<w:spacing w:before="' + (o.før || 0) + '" w:after="' + (o.etter === undefined ? 80 : o.etter) + '"' + (o.linje ? ' w:line="' + o.linje + '" w:lineRule="auto"' : '') + '/>';
    if (o.venstre || o.hang) pr += '<w:ind w:left="' + (o.venstre || 0) + '"' + (o.hang ? ' w:hanging="' + o.hang + '"' : '') + '/>';
    if (o.jc) pr += '<w:jc w:val="' + o.jc + '"/>';
    if (o.tabs) pr += o.tabs;
    return '<w:p><w:pPr>' + pr + '</w:pPr>' + r + '</w:p>';
  }
  const mm = x => Math.round(x * 56.7);
  function tabellRamme(farge, w) { const k = '<w:{k} w:val="single" w:sz="' + (w || 6) + '" w:space="0" w:color="' + (farge || '000000') + '"/>'; return '<w:tblBorders>' + ['top', 'left', 'bottom', 'right', 'insideH', 'insideV'].map(x => k.replace('{k}', x)).join('') + '</w:tblBorders>'; }
  const spacer = (h) => '<w:p><w:pPr><w:keepLines/><w:spacing w:before="0" w:after="0" w:line="' + h + '" w:lineRule="exact"/><w:rPr><w:sz w:val="2"/></w:rPr></w:pPr></w:p>';
  function celleTabell(innhold, o) {
    o = o || {};
    return '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>' + tabellRamme(o.ramme, o.w) + '<w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>' +
      '<w:tr><w:trPr><w:cantSplit/>' + (o.høyde ? '<w:trHeight w:val="' + o.høyde + '" w:hRule="atLeast"/>' : '') + '</w:trPr><w:tc><w:tcPr><w:tcW w:w="5000" w:type="pct"/>' + (o.shd ? '<w:shd w:val="clear" w:color="auto" w:fill="' + o.shd + '"/>' : '') + '</w:tcPr>' + innhold + '</w:tc></w:tr></w:tbl>' + spacer(110);
  }
  const linjeBdr = '<w:between w:val="single" w:sz="4" w:space="1" w:color="808080"/><w:bottom w:val="single" w:sz="4" w:space="1" w:color="808080"/>';

  function blokkDocx(b) {
    switch (b.t) {
      case 'tittel':
        return para(runs(b.tekst, { fet: true, sz: 40 }), { etter: 40, keep: true }) + (b.under ? para(runs(b.under, { sz: 21, farge: '444444' }), { etter: 120, bdr: '<w:bottom w:val="single" w:sz="18" w:space="4" w:color="000000"/>', keep: true }) : '');
      case 'navn':
        return para('<w:r><w:t xml:space="preserve">Navn: ______________________________    Dato: ______________</w:t></w:r>', { før: 80, etter: 160 });
      case 'h2': return para(runs(b.tekst, { fet: true, sz: 28 }), { før: 200, etter: 80, keep: true });
      case 'h3': return para(runs(b.tekst, { fet: true, sz: 24 }), { før: 140, etter: 60, keep: true });
      case 'p': case 'tekstlinje': return para(runs(b.html, b.liten ? { sz: 19, farge: '444444' } : {}), { etter: 100 });
      case 'liste': return b.items.map((x, i) => para('<w:r><w:t xml:space="preserve">' + (b.num ? (i + 1) + '.' : '•') + '\t</w:t></w:r>' + runs(x), { venstre: 360, hang: 360, etter: 60, tabs: '<w:tabs><w:tab w:val="left" w:pos="360"/></w:tabs>' })).join('');
      case 'boks': {
        let inn = (b.tittel ? para(runs(b.tittel, { fet: true, sz: 24 }), { etter: 60, keep: true }) : '');
        inn += b.rader.map(r => b.liste ? para('<w:r><w:t xml:space="preserve">•\t</w:t></w:r>' + runs(r), { venstre: 300, hang: 300, etter: 40, tabs: '<w:tabs><w:tab w:val="left" w:pos="300"/></w:tabs>' }) : para(runs(r), { etter: 60 })).join('');
        return celleTabell(inn, { shd: b.farge, w: 8 });
      }
      case 'tabell': {
        const kol = Math.max.apply(null, b.rader.map(r => r.length));
        let t = '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/>' + tabellRamme('000000', 4) + '<w:tblCellMar><w:top w:w="40" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="40" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>' + new Array(kol).fill('<w:gridCol w:w="' + Math.floor(9500 / kol) + '"/>').join('') + '</w:tblGrid>';
        b.rader.forEach((r, i) => { t += '<w:tr><w:trPr><w:cantSplit/></w:trPr>' + r.map(c => '<w:tc><w:tcPr><w:tcW w:w="' + Math.floor(5000 / kol) + '" w:type="pct"/>' + (i === 0 && b.hode !== false ? '<w:shd w:val="clear" w:color="auto" w:fill="E5EAF2"/>' : '') + '</w:tcPr>' + para(runs(c, { fet: i === 0 && b.hode !== false }), { etter: 0 }) + '</w:tc>').join('') + '</w:tr>'; });
        return t + '</w:tbl>' + spacer(140);
      }
      case 'linjer': { let s = ''; for (let i = 0; i < b.n; i++) s += para('', { bdr: linjeBdr, etter: 0, linje: 480, keepLines: false }); return s + para('', { etter: 60, keepLines: false }); }
      case 'side': return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      case 'opp': {
        let s = para('<w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">' + b.nr + '.\t</w:t></w:r>' + runs(b.html) + (b.poeng ? '<w:r><w:rPr><w:color w:val="666666"/><w:sz w:val="19"/></w:rPr><w:t xml:space="preserve">  (' + b.poeng + ' p)</w:t></w:r>' : ''),
          { venstre: 454, hang: 454, etter: 60, keep: true, tabs: '<w:tabs><w:tab w:val="left" w:pos="454"/></w:tabs>' });
        if (b.valg) s += para(b.valg.map((v, i) => '<w:r><w:t xml:space="preserve">' + BOKST[i] + ') </w:t></w:r>' + runs(v) + '<w:r><w:t xml:space="preserve">      </w:t></w:r>').join(''), { venstre: 454, etter: 60, keep: true });
        if (b.hjelp) s += para(runs('💡 ' + b.hjelp, { sz: 19, farge: '333333' }), { venstre: 454, etter: 60, shd: 'F2F5F9', keep: true });
        if (b.linjer) { for (let i = 0; i < b.linjer; i++) s += para('', { venstre: 454, bdr: linjeBdr, etter: 0, linje: 480, keepLines: false, keep: i < b.linjer - 1 }); s += para('', { etter: 40, keepLines: false }); }
        else if (b.rom) s += celleTabell(para('<w:r><w:rPr><w:color w:val="999999"/><w:sz w:val="14"/></w:rPr><w:t>Regn her</w:t></w:r>', { etter: 0 }), { høyde: mm(b.rom), ramme: '999999', w: 4 });
        if (b.svar) s += para('<w:r><w:t xml:space="preserve">Svar: ______________________ ' + xml(b.enhet || '') + '</w:t></w:r>', { venstre: 454, etter: 160 });
        else if (!b.rom && !b.linjer) s += para('', { etter: 60, keepLines: false });
        return s;
      }
      default: return '';
    }
  }

  /* ---------- zip (uten komprimering) ---------- */
  const CRC = (function () { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  const enc = new TextEncoder();
  function zip(filer) {
    const deler = [], sentral = []; let pos = 0;
    const u16 = n => [n & 255, (n >>> 8) & 255], u32 = n => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
    filer.forEach(f => {
      const navn = enc.encode(f.navn), data = enc.encode(f.data), crc = crc32(data);
      const lok = new Uint8Array([0x50, 0x4b, 3, 4].concat(u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(crc), u32(data.length), u32(data.length), u16(navn.length), u16(0)));
      deler.push(lok, navn, data);
      sentral.push({ navn: navn, crc: crc, len: data.length, pos: pos });
      pos += lok.length + navn.length + data.length;
    });
    const cd = []; let cdLen = 0;
    sentral.forEach(s => {
      const h = new Uint8Array([0x50, 0x4b, 1, 2].concat(u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0x21), u32(s.crc), u32(s.len), u32(s.len), u16(s.navn.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(s.pos)));
      cd.push(h, s.navn); cdLen += h.length + s.navn.length;
    });
    const slutt = new Uint8Array([0x50, 0x4b, 5, 6].concat(u16(0), u16(0), u16(sentral.length), u16(sentral.length), u32(cdLen), u32(pos), u16(0)));
    const alle = deler.concat(cd, [slutt]); let tot = 0; alle.forEach(a => { tot += a.length; });
    const ut = new Uint8Array(tot); let p = 0; alle.forEach(a => { ut.set(a, p); p += a.length; });
    return ut;
  }

  const CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>';
  const RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>';
  const DOCRELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';
  const STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="nb-NO"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80" w:line="259" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>';
  function bygg(blokker, o) {
    o = o || {};
    const kropp = blokker.map(blokkDocx).join('');
    const doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>' + kropp +
      '<w:sectPr><w:footerReference w:type="default" r:id="rId2"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1000" w:right="1134" w:bottom="1000" w:left="1134" w:header="500" w:footer="500" w:gutter="0"/></w:sectPr></w:body></w:document>';
    const fot = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="2" w:color="999999"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="9638"/></w:tabs><w:spacing w:after="0"/></w:pPr><w:r><w:rPr><w:color w:val="666666"/><w:sz w:val="16"/></w:rPr><w:t xml:space="preserve">' + xml(o.fot || '') + '</w:t></w:r><w:r><w:rPr><w:color w:val="666666"/><w:sz w:val="16"/></w:rPr><w:tab/><w:t>mattereisen</w:t></w:r></w:p></w:ftr>';
    const core = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + xml(o.tittel || 'Mattereisen') + '</dc:title><dc:creator>Mattereisen</dc:creator></cp:coreProperties>';
    return zip([{ navn: '[Content_Types].xml', data: CT }, { navn: '_rels/.rels', data: RELS }, { navn: 'word/document.xml', data: doc }, { navn: 'word/styles.xml', data: STYLES }, { navn: 'word/_rels/document.xml.rels', data: DOCRELS }, { navn: 'word/footer1.xml', data: fot }, { navn: 'docProps/core.xml', data: core }]);
  }
  function blob(blokker, o) { return new Blob([bygg(blokker, o)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }); }

  const CSS = [
    '.ark-side .dok-p{margin:0 0 5px;font-size:11pt}.ark-side .dok-p.liten{font-size:9.5pt;color:#444}',
    '.ark-side .dok-liste{padding-left:6mm;margin:0 0 6px}.ark-side ul.dok-liste{list-style:disc}.ark-side ol.dok-liste{list-style:decimal}.ark-side .dok-liste li{margin:0 0 2px}',
    '.ark-side .dok-opp{margin:0 0 9px;break-inside:avoid;page-break-inside:avoid}',
    '.ark-side .dok-q{font-size:11.5pt;padding-left:6mm;text-indent:-6mm}.ark-side .dok-q b{display:inline-block;width:6mm;text-indent:0}',
    '.ark-side .dok-opp .ark-valg,.ark-side .dok-opp .ark-hjelp,.ark-side .dok-opp .ark-regn,.ark-side .dok-opp .ark-svar,.ark-side .dok-opp .ark-linjer{margin-left:6mm}',
    '.ark-side .dok-poeng{color:#555;font-size:9.5pt}',
    '.ark-side .dok-boks{margin:0 0 7px;break-inside:avoid;page-break-inside:avoid}.ark-side .dok-boks p{margin:2px 0}',
    '.ark-side .dok-tab{margin:4px 0 8px}.ark-side .dok-tab td,.ark-side .dok-tab th{text-align:left;padding:3px 6px;vertical-align:top}'
  ].join('\n');

  M.dok = { html: html, blokk: blokkHTML, docx: bygg, blob: blob, css: CSS, tekst: tvTekst, zip: zip, crc32: crc32, runs: runs };
})();
