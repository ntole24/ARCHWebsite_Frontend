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

// --- LIVE STREAM AND PHOTO CAROUSELS (updated) ---

// 🟢 LIVE STREAM DATA
const liveStreams = [
  {
    title: "DLSU Pep Rally 2025",
    date: "Live Now",
    embed: "https://www.youtube.com/embed/5qap5aO4i9A",
    thumb: "https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg",
  },
  {
    title: "La Salle Sports Coverage",
    date: "Nov 3, 2025",
    embed: "https://www.youtube.com/embed/JGwWNGJdvx8",
    thumb: "https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg",
  },
  {
    title: "Campus News Live",
    date: "Nov 2, 2025",
    embed: "https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg",
  },
  {
    title: "Culture Night 2025",
    date: "Nov 1, 2025",
    embed: "https://www.youtube.com/embed/L_jWHffIx5E",
    thumb: "https://img.youtube.com/vi/L_jWHffIx5E/hqdefault.jpg",
  },
];

// 🟣 PHOTO ALBUM DATA
const albumPhotos = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800",
];

// -----------------------------------------------------------------------------
// 🎥 LIVE STREAM CAROUSEL (matches Video Highlights)
// -----------------------------------------------------------------------------
let currentLiveIndex = 0;
let currentLiveScroll = 0;
const liveThumbWidth = 98;

function generateLiveThumbnails() {
  const track = document.getElementById("liveThumbnailTrack");
  if (!track) return;
  track.innerHTML = "";

  const totalThumbnails = liveStreams.length * 3;

  for (let i = 0; i < totalThumbnails; i++) {
    const idx = i % liveStreams.length;
    const stream = liveStreams[idx];

    const thumb = document.createElement("div");
    thumb.className = "thumbnail";
    thumb.setAttribute("data-live-index", idx);
    thumb.innerHTML = `
      <img src="${stream.thumb}" alt="${stream.title}">
      <div class="thumbnail-overlay">${stream.title}</div>
    `;

    thumb.onclick = () => selectLiveStream(idx);
    track.appendChild(thumb);
  }

  track.style.transform = `translateX(-${liveStreams.length * liveThumbWidth}px)`;
}

function selectLiveStream(index) {
  currentLiveIndex = index;
  const iframe = document.getElementById("liveMainVideo");
  const title = document.getElementById("liveVideoTitle");
  const date = document.getElementById("liveVideoDate");

  const stream = liveStreams[index];
  iframe.src = stream.embed;
  title.textContent = stream.title;
  date.textContent = stream.date;

  document.querySelectorAll("#liveThumbnailTrack .thumbnail").forEach((t) => {
    const i = parseInt(t.getAttribute("data-live-index"));
    t.classList.toggle("active", i === index);
  });
}

function scrollLiveThumbnails(direction) {
  const track = document.getElementById("liveThumbnailTrack");
  if (!track) return;

  if (direction === "next") {
    currentLiveScroll++;
    currentLiveIndex = (currentLiveIndex + 1) % liveStreams.length;
  } else {
    currentLiveScroll--;
    currentLiveIndex = (currentLiveIndex - 1 + liveStreams.length) % liveStreams.length;
  }

  const pos = -(liveStreams.length * liveThumbWidth + currentLiveScroll * liveThumbWidth);
  track.style.transform = `translateX(${pos}px)`;

  setTimeout(() => {
    if (currentLiveScroll >= liveStreams.length) {
      currentLiveScroll = 0;
      track.style.transition = "none";
      track.style.transform = `translateX(-${liveStreams.length * liveThumbWidth}px)`;
      setTimeout(() => (track.style.transition = "transform 0.3s ease"), 50);
    } else if (currentLiveScroll <= -liveStreams.length) {
      currentLiveScroll = -1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${
        liveStreams.length * liveThumbWidth - liveThumbWidth
      }px)`;
      setTimeout(() => (track.style.transition = "transform 0.3s ease"), 50);
    }
  }, 300);

  selectLiveStream(currentLiveIndex);
}

// -----------------------------------------------------------------------------
// 🖼️ PHOTO ALBUM CAROUSEL (simple horizontal scroll)
// -----------------------------------------------------------------------------
let scrollPositions = { photo: 0 };

function loadPhotoCarousel() {
  const track = document.getElementById("photoTrack");
  if (!track) return;
  track.innerHTML = "";

  albumPhotos.forEach((url) => {
    const item = document.createElement("div");
    item.className = "carousel-item";
    item.innerHTML = `<img src="${url}" alt="Event Photo">`;
    track.appendChild(item);
  });
}

function scrollCarousel(type, direction) {
  if (type !== "photo") return;
  const track = document.getElementById("photoTrack");
  if (!track) return;

  const cardWidth = 300; // including gap
  const visibleCount = Math.floor(track.parentElement.offsetWidth / cardWidth);
  const maxScroll = (track.children.length - visibleCount) * cardWidth;

  if (direction === "next") {
    scrollPositions.photo = Math.min(scrollPositions.photo + cardWidth, maxScroll);
  } else {
    scrollPositions.photo = Math.max(scrollPositions.photo - cardWidth, 0);
  }

  track.style.transform = `translateX(-${scrollPositions.photo}px)`;
}

// -----------------------------------------------------------------------------
// 🚀 INIT
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  generateLiveThumbnails();
  selectLiveStream(0);
  loadPhotoCarousel();
});
