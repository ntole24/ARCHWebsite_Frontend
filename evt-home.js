const videos = [
  {
    title: "Video Title",
    date: "January 1, 2025",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=320&fit=crop&sat=-20",
  },
  {
    title: "Second Video",
    date: "January 2, 2025",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=320&fit=crop&sat=-20",
  },
  {
    title: "Third Video",
    date: "January 3, 2025",
    image: "https://images.unsplash.com/photo-1544717440-6dfccbbdae25?w=600&h=320&fit=crop&sat=-20",
  },
  {
    title: "Fourth Video",
    date: "January 4, 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=320&fit=crop&sat=-20",
  },
  {
    title: "Fifth Video",
    date: "January 5, 2025",
    image: "https://images.unsplash.com/photo-1546200664-dd4ddce53bdf?w=600&h=320&fit=crop&sat=-20",
  },
  {
    title: "Sixth Video",
    date: "January 6, 2025",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=320&fit=crop&sat=-20",
  }
];

let currentVideoIndex = 0;
let currentScrollIndex = 0;
const thumbnailWidth = 98; 

function generateThumbnails() {
  const track = document.getElementById('thumbnailTrack');
  if (!track) return; 
  
  track.innerHTML = '';
  

  const totalThumbnails = videos.length * 3;
  
  for (let i = 0; i < totalThumbnails; i++) {
    const videoIndex = i % videos.length;
    const video = videos[videoIndex];
    
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.setAttribute('data-video-index', videoIndex);
    thumbnail.setAttribute('data-position', i);
    
    if (i === videos.length) { 
      thumbnail.classList.add('active');
    }
    
    thumbnail.innerHTML = `
      <img src="${video.thumb}" alt="Video ${videoIndex + 1}">
      <div class="thumbnail-overlay">
        Video ${videoIndex + 1}
      </div>
    `;
    
    thumbnail.onclick = () => selectVideo(videoIndex);
    track.appendChild(thumbnail);
  }
  

  track.style.transform = `translateX(-${videos.length * thumbnailWidth}px)`;
}

function selectVideo(videoIndex) {
  currentVideoIndex = videoIndex;
  

  const mainVideo = document.getElementById('mainVideo');
  const videoTitle = document.getElementById('videoTitle');
  const videoDate = document.getElementById('videoDate');
  
  if (!mainVideo || !videoTitle || !videoDate) return; 
  
  const video = videos[videoIndex];
  mainVideo.src = video.image;
  videoTitle.textContent = video.title;
  videoDate.textContent = video.date;
  

  updateActiveThumbnail();
}

function updateActiveThumbnail() {
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    const videoIndex = parseInt(thumb.getAttribute('data-video-index'));
    thumb.classList.toggle('active', videoIndex === currentVideoIndex);
  });
}

function scrollThumbnails(direction) {
  const track = document.getElementById('thumbnailTrack');
  if (!track) return; // Safety check
  
  if (direction === 'next') {
    currentScrollIndex++;
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  } else {
    currentScrollIndex--;
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  }
  

  const position = -(videos.length * thumbnailWidth + currentScrollIndex * thumbnailWidth);
  track.style.transform = `translateX(${position}px)`;
  

  setTimeout(() => {
    if (currentScrollIndex >= videos.length) {

      currentScrollIndex = 0;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${videos.length * thumbnailWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.3s ease';
      }, 50);
    } else if (currentScrollIndex <= -videos.length) {

      currentScrollIndex = -1;
      track.style.transition = 'none';
      track.style.transform = `translateX(-${videos.length * thumbnailWidth - thumbnailWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'transform 0.3s ease';
      }, 50);
    }
  }, 300);

  selectVideo(currentVideoIndex);
}


document.addEventListener('DOMContentLoaded', function() {

  setTimeout(() => {
    generateThumbnails();
    selectVideo(0);
  }, 100);
});


window.addEventListener('resize', () => {
  generateThumbnails();
  selectVideo(currentVideoIndex);
});