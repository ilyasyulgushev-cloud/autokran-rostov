'use strict';
const contacts = window.SITE_CONTACTS;
if (!contacts.maxUrl) document.body.classList.add('no-max');
const message = 'Здравствуйте! Нужен автокран.\n\nДата и время: \nГород и адрес объекта: \nЧто нужно поднять: \nПримерная масса груза: \nРасстояние до места установки: \nУсловия подъезда: ';
const mailUrl = `mailto:${contacts.email}?subject=${encodeURIComponent('Заказ автокрана')}&body=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-contact="phone"]').forEach(a => a.href = `tel:${contacts.phone}`);
document.querySelectorAll('[data-contact="email"]').forEach(a => a.href = mailUrl);
document.querySelectorAll('[data-phone-label]').forEach(a => a.textContent = contacts.phoneLabel);
document.querySelectorAll('[data-email-label]').forEach(a => a.textContent = contacts.email);
if (/^https:\/\/([a-z0-9-]+\.)?max\.ru\//i.test(contacts.maxUrl)) {
 document.querySelectorAll('[data-contact="max"]').forEach(button => {
  const a = document.createElement('a');
  a.className = button.className; a.innerHTML = button.innerHTML;
  a.href = contacts.maxUrl; a.target = '_blank'; a.rel = 'noopener noreferrer';
  a.dataset.contact = 'max'; button.replaceWith(a);
 });
}
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Открыть меню');nav.classList.remove('open');}
toggle.addEventListener('click', () => {const open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(nav.classList.contains('open'))toggle.focus();closeMenu();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu();});
let toastTimer;
function announce(text){const box=document.getElementById('toast');box.textContent=text;box.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('visible'),4000);}
document.getElementById('copy-email').addEventListener('click',async()=>{
 try { if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(contacts.email);announce('Адрес почты скопирован'); }
 catch {const link=document.querySelector('[data-email-label]');const range=document.createRange();range.selectNodeContents(link);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);announce('Адрес выделен. Скопируйте его через меню браузера.');}
});
