

  let max_particles = 25000;
  let particles = [];
  let frequency = 10;
  let init_num = max_particles;
  let max_time = frequency * max_particles;
  let time_to_recreate = false;

  // Enable repopolate
  setTimeout(function () {
    time_to_recreate = true;
  }.bind(this), max_time);

  // Popolate particles
  populate(max_particles);

  var Tell = document.createElement('canvas');

  // var Tell = document.querySelector("#main");
  Tell.width = $(window).width();
  // height for canvas from this $(window).height()  to  $(window).height() * 5
  Tell.height = $(window).height();
  $("body").append(Tell);

 
  var canvas = Tell.getContext('2d');
// --------------------------------------------------------------------- 
// responsive canvas resizeCanvas
  function resizeCanvas() {
    Tell.width = window.innerWidth;
    Tell.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
// style tryied to streach canvas all the way to bottom with css {but failed}
Tell.style.position = 'absolute';
Tell.style.zIndex = -10;
Tell.style.bottom = '0';
// style 

// --------------------------------------------------------
  class Particle {
    constructor(canvas) {
      let random = Math.random();
      this.progress = 0;
      this.canvas = canvas;
      this.center = {
        x: $(window).width() / 2,
        y: $(window).height() / 2 };

      this.point_of_attraction = {
        x: $(window).width() / 1.3,
        y: $(window).height() /1.9 };




      if (Math.random() > 0.5) {
        this.x = $(window).width() * Math.random();
        // Here you have to change height in next line for particals from = $(window).height() to ($(window).height() * 5)
        this.y = Math.random() > 0.5 ? -Math.random() - 100 : $(window).height() + Math.random() + 100;
      } else {
        this.x = Math.random() > 0.5 ? -Math.random() - 100 : $(window).width() + Math.random() + 100;
        this.y = $(window).height() * Math.random();

      }

      this.s = Math.random() * 1;
      this.a = 0;
      this.w = $(window).width();
      this.h = $(window).height();
      this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
      this.color = random > .2 ? "#694FB9" : "#9B0127";
      this.radius = random > .8 ? Math.random() * 2.2 : this.radius;
      this.color = random > .8 ? "#3CFBFF" : this.color;
    }

    calculateDistance(v1, v2) {
      let x = Math.abs(v1.x - v2.x);
      let y = Math.abs(v1.y - v2.y);
      return Math.sqrt(x * x + y * y);
    }

    render() {
      this.canvas.beginPath();
      this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.canvas.lineWidth = 2;
      this.canvas.fillStyle = this.color;
      this.canvas.fill();
      this.canvas.closePath();
    }

    move() {

      let p1 = {
        x: this.x,
        y: this.y };


      let distance = this.calculateDistance(p1, this.point_of_attraction);
      let force = Math.max(100, 1 + distance);

      let attr_x = (this.point_of_attraction.x - this.x) / force;
      let attr_y = (this.point_of_attraction.y - this.y) / force;

      this.x += Math.cos(this.a) * this.s + attr_x;
      this.y += Math.sin(this.a) * this.s + attr_y;
      this.a += Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2;

      if (distance < 30 + Math.random() * 100) {
        return false;
      }

      this.render();
      this.progress++;
      return true;
    }}


  function populate(num) {
    for (var i = 0; i < num; i++) {
      setTimeout(
      function (x) {
        return function () {
          // Add particle
          particles.push(new Particle(canvas));
        };
      }(i),
      frequency * i);
    }
    return particles.length;
  }
  function createSpheral() {
    let radius = 180;
    let center = {
      x: $(window).width() / 2,
      y: $(window).height() / 2 };

  }

  function clear() {
    canvas.globalAlpha = 0.08;
    canvas.fillStyle = '#110031';
    canvas.fillRect(0, 0, Tell.width, Tell.height);
    canvas.globalAlpha = 1;
  }
  /*
  * Function to update particles in canvas
  */
  function update() {
    particles = particles.filter(function (p) {return p.move();});
    // Recreate particles
    if (time_to_recreate) {
      if (particles.length < init_num) {populate(1);console.log("Ricers");}
    }
    clear();
    requestAnimationFrame(update.bind(this));
  }
  update();

  // certidace start
  
  const certificateImg = document.querySelectorAll(".certificate__img");
const certificateContent = document.querySelectorAll(".certificate__content");
let carousel;

const carouselFun = function () {
  let imgCount = 0;
  let carouselLength = certificateImg.length;
  carousel = setInterval(() => {
    if (imgCount < carouselLength - 1) {
      certificateImg.forEach((img) => {
        img.style.transition = "all .8s";
        img.style.transform = `translateX(-${120 * (imgCount + 1)}%)`;
      });

      imgCount++;
    } else {
      imgCount = 0;
      certificateImg.forEach((i) => {
        i.style.transition = "all 0s";
        i.style.transform = "translateX(0%)";
      });
    }
  }, 3000);
};
carouselFun();

//* Hover condition on certificate
certificateContent.forEach((content, index) => {
  // MOUSE OVER CERTIFICATE
  content.addEventListener("mouseover", (e) => {
    // 1. stop carousel
    clearInterval(carousel);

    // 2.go to first column
    certificateImg.forEach((i) => {
      i.style.transform = `translateX(-${120 * index}%)`;
    });

    // 3. show current certificate
    certificateImg[index].style.gridRow = "1 / 2";
  });

  // MOUSE OUT CONSITION

  content.addEventListener("mouseout", (e) => {
    carouselFun();
  });
});

  // certifacet end

  // document.querySelector('#contact-form').addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   e.target.elements.name.value = '';
  //   e.target.elements.email.value = '';
  //   e.target.elements.message.value = '';
  // });



  //Contact backgraound page End 
