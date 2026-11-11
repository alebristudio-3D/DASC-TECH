const data=require('../assets/data/vocacional-abierto.json');
function evaluate(answers){
  if(!answers||typeof answers!=='object'||Array.isArray(answers))throw Error('answers');
  const sums={interest:{},domain:{},skill:{}};const counts={interest:{},domain:{},skill:{}};
  for(const block of data.blocks)for(const item of block.items){const value=answers[item.id];if(item.kind==='choice'){if(!item.options.some(o=>o[0]===value))throw Error(item.id);continue;}if(!Number.isInteger(value)||value<1||value>5)throw Error(item.id);sums[item.kind][item.key]=(sums[item.kind][item.key]||0)+(value-1)/4;counts[item.kind][item.key]=(counts[item.kind][item.key]||0)+1;}
  for(const kind of Object.keys(sums))for(const key of Object.keys(sums[kind]))sums[kind][key]/=counts[kind][key];
  const ranked=data.careers.map(c=>{const interest=c.interests.reduce((sum,key,i)=>sum+sums.interest[key]*[.5,.3,.2][i],0);const domain=c.domains.reduce((sum,key)=>sum+sums.domain[key],0)/c.domains.length;return {...c,score:Number((.5*interest+.35*domain+.15*sums.skill[c.skill]).toFixed(5))};}).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  const ratings=Object.values(answers).filter(Number.isInteger);const spread=Math.max(...ratings)-Math.min(...ratings);const tied=ranked[0].score-ranked[2].score<.025;
  return {version:data.version,careers:ranked.slice(0,3),alternatives:ranked.slice(3,6),broad:spread<=1||tied,context:{motivation:answers.motivation,learning:answers.learning,constraint:answers.constraint},signals:Object.entries(sums.interest).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]),note:'Exploración educativa de elaboración propia; no es el instrumento oficial O*NET ni una prueba psicométrica validada. Las respuestas son autoinformes y no acreditan aptitud o admisión.'};
}
module.exports={evaluate,data};
