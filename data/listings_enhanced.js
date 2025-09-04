
(function(){
  if(!window.LISTINGS) return;
  function derive(x){
    const t = (x.title||'').toLowerCase();
    const p = Number(x.price||0);
    const hasRent = /เช่า|ให้เช่า|rent/.test(t) || (!!p && p < 100000) || !!x.priceRent;
    const hasSale = /ขาย|sale/.test(t) || (!!p && p >= 100000) || !!x.priceSale;
    let status = x.status || (hasRent && hasSale ? 'both' : hasRent ? 'rent' : 'sale');
    let priceSale = x.priceSale || (hasSale && p>=100000 ? p : null);
    let priceRent = x.priceRent || (hasRent && p<100000 ? p : null);
    return Object.assign({}, x, { status, priceSale, priceRent });
  }
  window.LISTINGS = (window.LISTINGS||[]).map(derive);
})();
