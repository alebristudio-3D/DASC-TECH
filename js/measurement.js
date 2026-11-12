(function(){
 'use strict';
 // Sin identificador aprobado no se carga ningún proveedor de analítica.
 const id=window.DASC_ANALYTICS_ID;
 if(!/^G-[A-Z0-9]+$/.test(id||'')||window.DASC_ANALYTICS_CONSENT!==true)return;
 const script=document.createElement('script');script.async=true;
 script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.append(script);
 window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 window.gtag('js',new Date());window.gtag('config',id);
})();
