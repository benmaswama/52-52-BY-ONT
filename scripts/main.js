// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuClose = document.getElementById('menu-close');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
});
menuClose.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
});

// Modale vidéo
window.openVideoModal = function(url) {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  iframe.src = url;
  modal.classList.remove('hidden');
}
window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  iframe.src = '';
  modal.classList.add('hidden');
}

// Calendrier interactif
document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('prev-month');
  const nextBtn = document.getElementById('next-month');
  const monthLabel = document.getElementById('calendar-month-label');
  const calendarBody = document.getElementById('calendar-body');
  
  // Données pour la démo du calendrier
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  // Données des événements (pour la démo)
  const events = {
    '2025-01-15': { 
      name: 'Festival Musique', 
      color: '#3B1B4A',
      image: 'assets/event-music.jpg'
    },
    '2025-01-22': { 
      name: 'Expo Photo', 
      color: '#00C2B3',
      image: 'assets/event-photo.jpg'
    },
    '2025-02-03': { 
      name: 'Festival Jazz', 
      color: '#3B1B4A',
      image: 'assets/event-jazz.jpg'
    },
    '2025-02-07': { 
      name: 'Kobo Art', 
      color: '#FF2D6A',
      image: 'assets/event-kobo.jpg'
    },
    '2025-02-14': { 
      name: 'Expo Peinture', 
      color: '#00C2B3',
      image: 'assets/event-painting.jpg'
    },
    '2025-02-29': { 
      name: 'Festival', 
      color: '#00C2B3',
      image: 'assets/event-festival.jpg'
    },
    '2025-02-30': { 
      name: 'Art Show', 
      color: '#FF2D6A',
      image: 'assets/event-artshow.jpg'
    },
    '2025-02-31': { 
      name: 'Concert', 
      color: '#3B1B4A',
      image: 'assets/event-concert.jpg'
    },
    '2025-03-10': { 
      name: 'Danse Urbaine', 
      color: '#00A3FF',
      image: 'assets/event-dance.jpg'
    },
    '2025-03-18': { 
      name: 'Théâtre', 
      color: '#FF2D6A',
      image: 'assets/event-theater.jpg'
    },
    '2025-03-25': { 
      name: 'Conférence', 
      color: '#3B1B4A',
      image: 'assets/event-conference.jpg'
    }
  };
  
  // État actuel
  let currentMonth = 1; // Février (0-indexed)
  let currentYear = 2025;
  
  // Fonction pour obtenir le nombre de jours dans un mois
  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  // Fonction pour obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
  
  // Convertir le jour de la semaine au format français (0 = Lundi, 6 = Dimanche)
  function adjustDayOfWeek(day) {
    return day === 0 ? 6 : day - 1;
  }
  
  // Fonction pour générer le calendrier
  function generateCalendar(year, month) {
    // Vider le corps du calendrier
    calendarBody.innerHTML = '';
    
    // Obtenir le nombre de jours dans le mois et le premier jour du mois
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = adjustDayOfWeek(getFirstDayOfMonth(year, month));
    
    // Obtenir le nombre de jours dans le mois précédent
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    
    // Générer les jours du calendrier
    let dayCount = 1;
    let nextMonthDay = 1;
    
    // Créer 6 rangées pour couvrir tous les cas
    for (let i = 0; i < 6; i++) {
      // Créer une nouvelle rangée
      const row = document.createElement('tr');
      row.className = i < 5 ? 'border-b h-24' : 'h-24';
      
      // Créer 7 cellules par rangée
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        cell.className = 'p-1 text-xs align-top pl-2';
        
        // Calculer la date à afficher
        if (i === 0 && j < firstDay) {
          // Jours du mois précédent
          const prevMonthDate = daysInPrevMonth - (firstDay - j) + 1;
          cell.textContent = prevMonthDate;
          cell.classList.add('text-gray-400'); // Grisé
        } else if (dayCount <= daysInMonth) {
          // Jours du mois actuel
          cell.textContent = dayCount;
          cell.classList.add('text-gray-500');
          
          // Vérifier s'il y a un événement ce jour-là
          const dateKey = `${year}-${String(month+1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;
          if (events[dateKey]) {
            cell.classList.add('relative');
            
            const eventDiv = document.createElement('div');
            eventDiv.className = 'mt-1';
            
            // Créer un conteneur pour l'événement avec image et texte
            const eventContent = document.createElement('div');
            eventContent.className = 'relative rounded overflow-hidden mx-1';
            eventContent.style.height = '32px';
            
            // Ajouter l'image d'arrière-plan
            try {
              // Essayer d'ajouter une image si elle existe
              const eventImage = document.createElement('img');
              eventImage.src = events[dateKey].image;
              eventImage.className = 'absolute inset-0 w-full h-full object-cover';
              eventImage.onerror = function() {
                // Fallback si l'image n'existe pas
                this.style.display = 'none';
                eventContent.style.backgroundColor = events[dateKey].color;
              };
              eventContent.appendChild(eventImage);
              
              // Ajouter un overlay semi-transparent
              const overlay = document.createElement('div');
              overlay.className = 'absolute inset-0 bg-black bg-opacity-40';
              eventContent.appendChild(overlay);
            } catch (e) {
              // Fallback si une erreur survient
              eventContent.style.backgroundColor = events[dateKey].color;
            }
            
            // Ajouter le texte de l'événement
            const eventText = document.createElement('div');
            eventText.className = 'absolute inset-0 flex items-center justify-center text-white text-xs p-1';
            eventText.textContent = events[dateKey].name;
            eventContent.appendChild(eventText);
            
            eventDiv.appendChild(eventContent);
            cell.appendChild(eventDiv);
          }
          
          dayCount++;
        } else {
          // Jours du mois suivant
          cell.textContent = nextMonthDay;
          cell.classList.add('text-gray-400'); // Grisé
          nextMonthDay++;
        }
        
        row.appendChild(cell);
      }
      
      calendarBody.appendChild(row);
      
      // Arrêter si on a déjà affiché tous les jours du mois actuel et du mois suivant
      if (dayCount > daysInMonth && i >= 4) break;
    }
  }
  
  // Fonction pour mettre à jour l'affichage du calendrier
  function updateCalendarDisplay() {
    monthLabel.textContent = `${months[currentMonth]} ${currentYear}`;
    generateCalendar(currentYear, currentMonth);
  }
  
  // Initialiser l'affichage
  updateCalendarDisplay();
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11; // Décembre
        currentYear--;
      }
      updateCalendarDisplay();
    });
    
    nextBtn.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0; // Janvier
        currentYear++;
      }
      updateCalendarDisplay();
    });
  }
}); 