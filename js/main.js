document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector('.grid');
  const blockSize = window.innerWidth * 0.04;
  const cols = 25;
  const rows = Math.ceil(window.innerHeight / blockSize);

  for (let c = 0; c < cols; c++) {
    const col = document.createElement('div');
    col.classList.add('column');
    for (let r = 0; r < rows; r++) {
      const block = document.createElement('div');
      col.appendChild(block);

      block.addEventListener('mouseenter', () => {
        gsap.to(block, { backgroundColor: "white", duration: 0.2 });
        gsap.to(block, { backgroundColor: "transparent", delay: 0.3, duration: 0.5 });
      });
    }
    grid.appendChild(col);
  }
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: "header",
  start: "top top",
  end: "+=100%",
  // pin: true,
  scrub: true,
  pinSpacing: false 
});

document.querySelectorAll("li").forEach(li => {
    const before = li.querySelector("::before"); // псевдо-элемент не поймать напрямую → лучше через GSAP set
  
    li.addEventListener("mouseenter", e => {
      const bounds = li.getBoundingClientRect();
      const offset = e.clientY - bounds.top;
      const fromTop = offset < bounds.height / 2;
  
      // Устанавливаем точку старта (origin)
      gsap.set(li, {
        "--origin": fromTop ? "top" : "bottom"
      });
  
      gsap.to(li, {
        "--scale": 1,
        duration: 0.05,
        overwrite: "auto"
      });
  
      gsap.to(li, { color: "#000", duration: 0.25 });
    });
  
    li.addEventListener("mouseleave", () => {
      gsap.to(li, {
        "--scale": 0,
        duration: 0.3,
        overwrite: "auto"
      });
  
      gsap.to(li, { color: "#fff", duration: 0.25 });
    });
  });

  gsap.utils.toArray(".header").forEach((title) => {
    gsap.to(title, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: ".first-section",
            start: "top",
            end: "bottom 30%",
            scrub: 1,
        },
    });
  });


const tabItem = document.querySelectorAll(".my-project");
// tabItem[0].classList.add('active');
tabItem.forEach(function(item) {
  item.addEventListener('click', function() {
    const isActive = this.classList.contains('active');
    tabItem.forEach(function(el) {
      el.classList.remove('active');
    });
    if (!isActive) {
      this.classList.add('active');
    }
  });
});