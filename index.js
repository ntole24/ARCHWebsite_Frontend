function contact(event) {
    event.preventDefault();

    const message = document.getElementById('message');

    emailjs
        .sendForm(
            'service_5nufpuf',
            'template_q56h19q',
            event.target,
            '5A7nE4A9eKeospPJF'
        )
        .then(() => {
            console.log("Message sent successfully!");

            event.target.reset();
        })
        .catch(() => {
          console.log("Message did not send.")
        });
}

class Carousel {
    constructor(el) {
      this.el = el;
      this.carouselData = [
        {
          'id': '1',
          'src': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face',
          'person': 'Renee',
          'project': 'Women\'s Month Catalogue'
        },
        {
          'id': '2',
          'src': 'https://images.unsplash.com/photo-1754653099086-3bddb9346d37?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'person': 'Kai',
          'project': 'sum shi 1'
        },
        {
          'id': '3',
          'src': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
          'person': 'Noah',
          'project': 'sum shi 2'
        },
        {
          'id': '4',
          'src': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
          'person': 'Maya',
          'project': 'sum shi 3'
        },
        {
          'id': '5',
          'src': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face',
          'person': 'Alex',
          'project': 'smth smth shit 4'
        }
      ];
      this.carouselInView = [1, 2, 3]; 
      this.carouselContainer;
      this.currentIndex = 1; // Center item (0-indexed, so item 2 is in center)
    }

    mounted() {
      this.setupCarousel();
    }

    setupCarousel() {
      const container = this.el.querySelector('.carousel__container');
      const controls = this.el.querySelector('.carousel__controls');

      for (let i = 0; i < 3; i++) {
        const carouselItem = document.createElement('div');
        const img = document.createElement('img');
        
        container.appendChild(carouselItem);
        carouselItem.appendChild(img);
        
        carouselItem.className = `carousel-item carousel-item-${i + 1}`;
        carouselItem.setAttribute('data-index', `${i + 1}`);
        
        img.setAttribute('loading', 'lazy');
      }

      this.updateCarouselContent();

      this.setControls([...controls.children]);
      this.carouselContainer = container;
    }

    setControls(controls) {
      controls.forEach(control => {
        control.onclick = (event) => {
          event.preventDefault();
          this.controlManager(control.dataset.name);
        };
      });
    }

    controlManager(control) {
      if (control === 'previous') return this.previous();
      if (control === 'next') return this.next();
    }

    updateCarouselContent() {
      const itemsToShow = [];
      for (let i = -1; i <= 1; i++) {
        const index = (this.currentIndex + i + this.carouselData.length) % this.carouselData.length;
        itemsToShow.push(this.carouselData[index]);
      }

      itemsToShow.forEach((data, index) => {
        const item = document.querySelector(`.carousel-item-${index + 1} img`);
        if (item) {
          item.src = data.src;
          item.alt = `${data.person} - ${data.project}`;
        }
      });

      const centerItem = itemsToShow[1]; // Middle item is the active one
      const personElement = document.getElementById('current-person');
      const projectElement = document.getElementById('current-project');
      
      if (personElement) {
        personElement.textContent = centerItem.person;
      }
      if (projectElement) {
        projectElement.textContent = centerItem.project;
      }
    }

    previous() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
      this.updateCarouselContent();
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
      this.updateCarouselContent();
    }
}


document.addEventListener('DOMContentLoaded', function() {
  const el = document.querySelector('.talents__carousel'); 
  if (el) {
    const exampleCarousel = new Carousel(el);
    exampleCarousel.mounted();
  }
});