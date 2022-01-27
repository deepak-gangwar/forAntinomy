const heroPara1 = document.querySelector('.line1-paragraph p');
const heroPara2 = document.querySelector('.line2-paragraph p');

window.addEventListener('load', () => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        heroPara1.innerHTML = 'Individual with an eye for good design and passionate about motion and immersive experience on the web.';
        heroPara2.innerHTML = 'Creative Developer based in India. Providing creative and functional solutions for your brand.';
      }
})


//to change background colors
// const background = document.querySelector('.a-background');
// const processSection = document.querySelector('.s-process');
// const workflowSection = document.querySelector('.s-workflow');
// const mottoSection = document.querySelector('.s-motto');

// const distanceFromViewport = (el) => {
//   return el.getBoundingClientRect().top;
// }

// window.addEventListener('scroll', () => {
//   if(distanceFromViewport(processSection) < 200) {
//     background.style.backgroundColor = 'rgb(233, 227, 220)';
//   }
//   if(distanceFromViewport(workflowSection) < 200) {
//     background.style.backgroundColor = 'rgb(211, 226, 231)';
//   }
//   if(distanceFromViewport(mottoSection) < 200) {
//     background.style.backgroundColor = 'rgb(215, 216, 202)';
//   }
// })
