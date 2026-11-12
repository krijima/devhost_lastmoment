(() => {
  const rules = [
    {id:'shaming', name:'Confirm-shaming', expression:/no thanks.{0,35}(pay|saving|benefit|lose)|i (prefer|want|like) to (pay|lose)|give up my benefits/i, explanation:'This wording attaches guilt or loss to your choice. Choose based on your goal.'},
    {id:'urgency', name:'Urgency pressure', expression:/\b(\d{1,2}:\d{2}|hurry|last chance|offer expires|only \d+ left|act now)\b/i, explanation:'A countdown or urgency claim is present. Shadow cannot verify whether it is genuine; it will not change your goal.'},
    {id:'retention', name:'Retention offer', expression:/\b(stay and save|before you go|pause instead|special offer|\d+% off|one more chance)\b/i, explanation:'This offer may keep the subscription active. Review its terms only if you want to change your goal.'},
    {id:'continuity', name:'Automatic renewal', expression:/auto.?renew|renews automatically|automatically renew|billed until.{0,25}cancel/i, explanation:'Payment continues automatically unless you cancel. Check the renewal date and cancellation outcome.'}
  ];
  function scan(doc) {
    const findings=[]; const seen=new Set();
    const visible=el=> !el.closest('[data-shadow-root],script,style,noscript,[hidden],[aria-hidden="true"]') && doc.defaultView.getComputedStyle(el).display!=='none' && doc.defaultView.getComputedStyle(el).visibility!=='hidden';
    const add=(id,name,explanation,el,quote)=>{const key=id+':'+quote; if(!seen.has(key)){seen.add(key);findings.push({id,name,explanation,quote:quote.slice(0,180),element:el});}};
    for(const el of doc.querySelectorAll('h1,h2,h3,p,label,button,a,span,small,div')) {
      if(!visible(el)||el.children.length>0) continue;
      const text=(el.textContent||'').trim().replace(/\s+/g,' '); if(!text||text.length>700)continue;
      for(const rule of rules) if(rule.expression.test(text))add(rule.id,rule.name,rule.explanation,el,text);
    }
    for(const el of doc.querySelectorAll('input[type=checkbox]:checked')) {
      if(!visible(el))continue;
      const label=el.labels?.[0]?.textContent?.trim()||el.getAttribute('aria-label')||'';
      if(/market|partner|track|personal|analytics|promotion/i.test(label))add('preselected','Preselected optional consent','This optional preference is already selected. Review it before continuing.',el,label);
    }
    for(const el of doc.querySelectorAll('a,button')) {
      if(!visible(el)||!/cancel|reject|decline/i.test(el.textContent))continue;
      if(parseFloat(doc.defaultView.getComputedStyle(el).fontSize)<12) add('hidden','De-emphasized choice','A cancellation or refusal option uses unusually small text. It may be easy to overlook.',el,el.textContent.trim());
    }
    return findings.slice(0,40);
  }
  function candidates(doc,goal){
    const patterns={cancel:/cancel|continue.*cancel|give up my benefits|no thanks.*pay/i,privacy:/reject|decline|essential only|necessary only/i,refund:/refund|return|claim/i};
    return [...doc.querySelectorAll('a,button,input[type=submit]')].filter(el=>!el.closest('[data-shadow-root]')&&!el.disabled&&!el.hidden&&doc.defaultView.getComputedStyle(el).display!=='none'&&doc.defaultView.getComputedStyle(el).visibility!=='hidden'&&(patterns[goal]||patterns.cancel).test(el.innerText||el.textContent||el.value||''));
  }
  globalThis.ShadowEngine={scan,candidates};
})();
