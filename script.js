const cards=[...document.querySelectorAll(".gallery-card")];
const filterButtons=[...document.querySelectorAll(".filter-btn")];
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCategory=document.getElementById("lightboxCategory");
const imageCounter=document.getElementById("imageCounter");
const closeBtn=document.getElementById("closeBtn");
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
let visibleCards=[...cards];
let currentIndex=0;

filterButtons.forEach(button=>{
  button.addEventListener("click",()=>{
    filterButtons.forEach(btn=>btn.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    cards.forEach(card=>{
      const show=filter==="all"||card.dataset.category===filter;
      card.classList.toggle("hidden",!show);
    });
    visibleCards=cards.filter(card=>!card.classList.contains("hidden"));
  });
});

cards.forEach(card=>{
  card.addEventListener("click",()=>{
    visibleCards=cards.filter(card=>!card.classList.contains("hidden"));
    currentIndex=visibleCards.indexOf(card);
    openLightbox();
  });
});

function openLightbox(){
  if(!visibleCards.length)return;
  const card=visibleCards[currentIndex];
  const image=card.querySelector("img");
  lightboxImage.src=image.src;
  lightboxImage.alt=image.alt;
  lightboxCategory.textContent=card.dataset.category.charAt(0).toUpperCase()+card.dataset.category.slice(1);
  imageCounter.textContent=`${currentIndex+1} / ${visibleCards.length}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
function showNext(){currentIndex=(currentIndex+1)%visibleCards.length;openLightbox()}
function showPrevious(){currentIndex=(currentIndex-1+visibleCards.length)%visibleCards.length;openLightbox()}
nextBtn.addEventListener("click",showNext);
prevBtn.addEventListener("click",showPrevious);
closeBtn.addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{
  if(!lightbox.classList.contains("open"))return;
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowRight")showNext();
  if(e.key==="ArrowLeft")showPrevious();
});