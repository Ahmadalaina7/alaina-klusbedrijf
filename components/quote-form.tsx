'use client';

import { ArrowLeft, ArrowRight, Check, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { services } from '@/content/services';
import { trackEvent } from '@/lib/analytics';

type QuoteFormProps = { initialJobType?: string };
type QuoteData = {
  jobType: string; description: string; timing: string; postalCode: string; city: string; budget: string;
  name: string; phone: string; email: string; preferredContact: 'phone'|'email'|'whatsapp'; contactConsent: boolean;
  website: string; utm: Record<string,string>;
};
type PhotoData = { name: string; type: string; size: number; data: string } | null;
const initialData: QuoteData = { jobType: '', description: '', timing: '', postalCode: '', city: '', budget: '', name: '', phone: '', email: '', preferredContact: 'phone', contactConsent: false, website: '', utm: {} };
const steps = ['Type klus','Omschrijving','Planning','Locatie','Contact'];
const jobs = services.map((service) => service.title);
const timings = ['Zo snel mogelijk','Binnen 1 maand','Binnen 1–3 maanden','Binnen 3–6 maanden','Ik ben me aan het oriënteren'];

function isEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function getStepError(step: number, data: QuoteData): string | null {
  if (step === 0 && !data.jobType) return 'Kies het type klus.';
  if (step === 1 && data.description.trim().length < 15) return 'Vertel in minimaal 15 tekens iets meer over de klus.';
  if (step === 2 && !data.timing) return 'Kies wanneer je de klus wilt uitvoeren.';
  if (step === 3) {
    if (data.postalCode.trim().length < 4) return 'Vul een geldige postcode in.';
    if (data.city.trim().length < 2) return 'Vul je woonplaats in.';
  }
  if (step === 4) {
    if (data.name.trim().length < 2) return 'Vul je naam in.';
    if (data.phone.replace(/\D/g,'').length < 8) return 'Vul een geldig telefoonnummer in.';
    if (!isEmail(data.email)) return 'Vul een geldig e-mailadres in.';
    if (!data.contactConsent) return 'Geef toestemming om je over deze aanvraag te contacteren.';
  }
  return null;
}

export function QuoteForm({ initialJobType = '' }: QuoteFormProps) {
  const [data,setData] = useState<QuoteData>({...initialData,jobType:initialJobType});
  const [step,setStep] = useState(0);
  const [error,setError] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [finished,setFinished] = useState(false);
  const [photo,setPhoto] = useState<PhotoData>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parameters = new URLSearchParams(window.location.search);
    const utm: Record<string,string> = {};
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
      const value = parameters.get(key);
      if (value) utm[key] = value.slice(0,200);
    }
    if (Object.keys(utm).length) setData(current=>({...current,utm}));
    if (initialJobType && jobs.includes(initialJobType)) setData(current=>({...current,jobType:initialJobType}));
  },[initialJobType]);

  useEffect(() => { panelRef.current?.focus({preventScroll:true}); },[step]);
  function update<K extends keyof QuoteData>(key: K,value: QuoteData[K]) {
    setData(current=>({...current,[key]:value}));
    if (error) setError('');
  }
  function continueStep(event?: FormEvent) {
    event?.preventDefault();
    const issue=getStepError(step,data);
    if (issue) { setError(issue); return; }
    setError('');
    setStep(current=>Math.min(current+1,steps.length-1));
    trackEvent('start_quote',{step:step+1});
  }
  function previousStep() { setError('');setStep(current=>Math.max(current-1,0)); }
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file=event.target.files?.[0];
    if (!file) {setPhoto(null);return;}
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) {setError('Voeg alleen een JPEG-, PNG- of WebP-afbeelding toe.');event.target.value='';return;}
    if (file.size>5*1024*1024) {setError('De foto is te groot. De maximale bestandsgrootte is 5 MB.');event.target.value='';return;}
    try {
      const buffer=await file.arrayBuffer();
      const base64=await new Promise<string>((resolve,reject)=>{
        const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]??'');reader.onerror=()=>reject(new Error('read failed'));
        reader.readAsDataURL(new Blob([buffer],{type:file.type}));
      });
      setPhoto({name:file.name.slice(0,120),type:file.type,size:file.size,data:base64});setError('');
    } catch {setError('De foto kon niet worden verwerkt. Probeer het opnieuw.');}
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    const issue=getStepError(4,data);
    if (issue) {setError(issue);return;}
    setIsSubmitting(true);setError('');
    trackEvent('submit_quote');
    try {
      const response=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({ ...data,description:data.description.trim(),name:data.name.trim(),phone:data.phone.trim(),email:data.email.trim(),fileName:photo?.name??'',fileType:photo?.type??'',fileSize:photo?.size??0,fileData:photo?.data??'' })});
      const result=await response.json() as {ok?:boolean;error?:string};
      if (!response.ok||!result.ok) throw new Error(result.error||'De aanvraag kon niet worden bevestigd. Probeer het later opnieuw.');
      setFinished(true);
      trackEvent('submit_quote_success');
    } catch (submissionError) {
      setError(submissionError instanceof Error?submissionError.message:'Er ging iets mis. Je ingevulde gegevens zijn bewaard. Probeer het opnieuw.');
      trackEvent('form_error');
    } finally {setIsSubmitting(false);}
  }

  if (finished) return <div className="thank-you-panel"><span className="thank-you-mark"><Check size={28} aria-hidden="true" /></span><div className="eyebrow" style={{justifyContent:'center'}}><span/> VERSTUURD</div><h1>Bedankt, {data.name.split(' ')[0]}.</h1><p>Je aanvraag is veilig afgeleverd. Alaina Bouw kan je bereiken via je voorkeurscontact.</p><Link className="button button-primary" href="/">Terug naar de startpagina <ArrowRight size={16} aria-hidden="true"/></Link></div>;

  return <div className="quote-layout">
    <aside className="quote-sidebar"><span className="eyebrow"><span/> EEN GOED BEGIN</span><h2>Vertel over je plannen.</h2><p>Met een paar gegevens wordt duidelijker wat je zoekt. Foto’s toevoegen is optioneel.</p><div className="quote-progress">{steps.map((label,index)=><div key={label} className={index===step?'active':''}><span className="quote-progress-number">{index<step?<Check size={14} aria-hidden="true"/>:`0${index+1}`}</span><span>{label}</span></div>)}</div></aside>
    <form className="quote-panel" onSubmit={step===steps.length-1?submit:continueStep} noValidate>
      <div className="quote-panel-top"><div className="eyebrow"><span/> VRIJBLIJVEND BEGINNEN</div><span>Stap {step+1} van {steps.length}</span></div>
      <div ref={panelRef} tabIndex={-1} aria-live="polite"><h2>{['Wat voor klus heb je?','Vertel iets meer.','Wanneer wil je beginnen?','Waar is de klus?','Hoe kunnen we je bereiken?'][step]}</h2><p>{['Kies het onderwerp dat het beste past. Je kunt de details later aanvullen.','Een paar zinnen over de ruimte en je wensen zijn genoeg.','Een globale indicatie is voldoende. Een datum wordt later samen afgestemd.','Zo kan de eigenaar beoordelen of je locatie binnen het werkgebied valt.','Je gegevens worden alleen gebruikt om op je aanvraag te reageren.'][step]}</p></div>
      {step===0&&<fieldset className="quote-fieldset"><legend className="sr-only">Type klus</legend><div className="choice-grid">{jobs.map((job)=><div className="choice-card" key={job}><input id={`job-${job}`} type="radio" name="jobType" value={job} checked={data.jobType===job} onChange={()=>update('jobType',job)}/><label htmlFor={`job-${job}`}>{job}</label></div>)}</div></fieldset>}
      {step===1&&<div className="form-stack"><div className="field"><label htmlFor="description">Wat moet er gebeuren? <span aria-hidden="true">*</span></label><textarea id="description" value={data.description} onChange={event=>update('description',event.target.value)} placeholder="Bijvoorbeeld: Ik wil de woonkamer laten stucen en daarna schilderen." maxLength={3000} aria-describedby="description-hint"/><span id="description-hint" className="field-hint">{data.description.length}/3000 tekens · Je kunt ook aangeven wat nog onzeker is.</span></div></div>}
      {step===2&&<fieldset className="quote-fieldset"><legend className="sr-only">Gewenste start</legend><div className="choice-grid">{timings.map((timing)=><div className="choice-card" key={timing}><input id={`timing-${timing}`} type="radio" name="timing" value={timing} checked={data.timing===timing} onChange={()=>update('timing',timing)}/><label htmlFor={`timing-${timing}`}>{timing}</label></div>)}</div></fieldset>}
      {step===3&&<div className="form-stack"><div className="form-grid-2"><div className="field"><label htmlFor="postalCode">Postcode <span aria-hidden="true">*</span></label><input id="postalCode" autoComplete="postal-code" value={data.postalCode} onChange={event=>update('postalCode',event.target.value.toUpperCase())} placeholder="Bijv. 1234 AB" maxLength={12}/></div><div className="field"><label htmlFor="city">Plaats <span aria-hidden="true">*</span></label><input id="city" autoComplete="address-level2" value={data.city} onChange={event=>update('city',event.target.value)} placeholder="Woonplaats" maxLength={100}/></div></div><div className="field"><label htmlFor="budget">Budget (optioneel)</label><select id="budget" value={data.budget} onChange={event=>update('budget',event.target.value)}><option value="">Dat bespreek ik liever later</option><option>Tot € 2.500</option><option>€ 2.500 – € 5.000</option><option>€ 5.000 – € 10.000</option><option>€ 10.000 – € 25.000</option><option>€ 25.000 of meer</option><option>Dat weet ik nog niet</option></select><span className="field-hint">Een indicatie is optioneel en geen offerte of prijsafspraak.</span></div></div>}
      {step===4&&<div className="form-stack" onChange={(event)=>{if((event.target as HTMLElement).matches('input[type=file]'))trackEvent('upload_photo');}}><div className="form-grid-2"><div className="field"><label htmlFor="name">Naam <span aria-hidden="true">*</span></label><input id="name" autoComplete="name" value={data.name} onChange={event=>update('name',event.target.value)} placeholder="Je naam" maxLength={120}/></div><div className="field"><label htmlFor="phone">Telefoonnummer <span aria-hidden="true">*</span></label><input id="phone" type="tel" autoComplete="tel" value={data.phone} onChange={event=>update('phone',event.target.value)} placeholder="06 1234 5678" maxLength={32}/></div></div><div className="field"><label htmlFor="email">E-mailadres <span aria-hidden="true">*</span></label><input id="email" type="email" autoComplete="email" value={data.email} onChange={event=>update('email',event.target.value)} placeholder="naam@voorbeeld.nl" maxLength={254}/></div><fieldset className="quote-fieldset"><legend>Wat is je voorkeurscontact?</legend><div className="choice-grid">{(['phone','email','whatsapp'] as const).map((option,index)=>{const label=['Telefonisch','Per e-mail','WhatsApp'][index];return <div className="choice-card" key={option}><input id={`contact-${option}`} type="radio" name="preferredContact" value={option} checked={data.preferredContact===option} onChange={()=>update('preferredContact',option)}/><label htmlFor={`contact-${option}`}>{label}</label></div>})}</div></fieldset><div className="file-upload"><label htmlFor="photo" className="field"><span>Foto toevoegen <span className="field-hint">(optioneel)</span></span></label><input id="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile}/><span className="field-hint">JPEG, PNG of WebP · maximaal 5 MB · één afbeelding. Verstuur geen gevoelige of persoonlijke foto’s.</span>{photo&&<div className="field-hint" role="status">{photo.name} ({(photo.size/1024/1024).toFixed(1)} MB) <button type="button" aria-label="Verwijder toegevoegde foto" onClick={()=>setPhoto(null)}><X size={13} aria-hidden="true"/> Verwijderen</button></div>}</div><label className="consent-row"><input type="checkbox" checked={data.contactConsent} onChange={event=>update('contactConsent',event.target.checked)}/><span>Ik geef toestemming om mij over deze aanvraag te contacteren. Deze toestemming geldt alleen voor deze aanvraag. Zie de <Link href="/privacy">privacyverklaring</Link>. <span aria-hidden="true">*</span></span></label><label className="honeypot" aria-hidden="true">Laat dit veld leeg<input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={event=>update('website',event.target.value)}/></label></div>}
      {error&&<p className="form-error" role="alert">{error}</p>}
      <div className="form-navigation">{step>0&&<button type="button" className="button button-outline" onClick={previousStep} disabled={isSubmitting}><ArrowLeft size={16} aria-hidden="true"/> Vorige</button>}<button type="submit" className="button button-primary" disabled={isSubmitting}>{isSubmitting?'Bezig met verzenden…':step===steps.length-1?'Aanvraag veilig versturen':'Verder'}{step===steps.length-1?<CheckCircle2 size={16} aria-hidden="true"/>:<ArrowRight size={16} aria-hidden="true"/>}</button></div>
    </form>
  </div>;
}
