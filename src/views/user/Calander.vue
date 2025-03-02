<template>
  <div>
    <HeaderComponent />
    <div class="container">
      <h2 class="text-center my-4">تقويم الانشطة</h2>

      <!-- Calendar Component -->
      <FullCalendar
        ref="calendar"
        :options="calendarOptions"
        @dateClick="handleDateClick"
        @eventClick="handleEventClick"
      />

      <!-- Event Details Modal -->
      <div v-if="selectedEvent" class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="eventModalLabel">{{ selectedEvent.title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>الوصف:</strong> {{ selectedEvent.description }}</p>
              <p><strong>التاريخ:</strong> {{ selectedEvent.start }}</p>
              <ul>
                <li v-for="(participant, index) in selectedEvent.participants" :key="index">{{ participant }}</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import FullCalendar from '@fullcalendar/vue3'; // Updated for Vue 3
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from 'bootstrap'; // For Bootstrap modal

export default {
  name: 'ElectionCalendar',
  components: {
    HeaderComponent,
    FooterComponent,
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: [], // Events will be populated from the database
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        },
        locale: 'ar', // Arabic locale
        direction: 'rtl', // Right-to-left layout
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        height: 'auto', // Make calendar height responsive
        contentHeight: 'auto',
        aspectRatio: 1.5, // Adjust aspect ratio for better responsiveness
        eventContent: this.renderEventContent, // Custom event content renderer
      },
      selectedEvent: null, // Selected event for modal
    };
  },
  mounted() {
    this.fetchEvents(); // Fetch events when the component is mounted
  },
  methods: {
    // Fetch events from the database
    async fetchEvents() {
      try {
        const response = await fetch('https://aiusu-backend.vercel.app/events'); // Fetch from localhost:3000
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();

        // Map events to FullCalendar's expected format
        this.calendarOptions.events = events.map(event => ({
          title: event.eventName, // Use eventName from your backend
          start: event.eventDate, // Use eventDate from your backend
          extendedProps: {
            description: event.eventDescription, // Use eventDescription from your backend
            participants: event.participants, // Use participants from your backend
          },
        }));
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('فشل تحميل الأحداث. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    },

    // Handle date click (e.g., add a new event)
    handleDateClick(info) {
      alert(`تم النقر على التاريخ: ${info.dateStr}`);
    },

    // Handle event click (show event details in a modal)
    handleEventClick(info) {
      this.selectedEvent = {
        title: info.event.title,
        start: info.event.start.toLocaleString(),
        description: info.event.extendedProps.description,
        participants: info.event.extendedProps.participants,
      };
      const modal = new Modal(document.getElementById('eventModal'));
      modal.show();
    },

    // Custom event content renderer
    renderEventContent(eventInfo) {
      return {
        html: `<div class="event-title">${eventInfo.event.title}</div>`, // Add a class for styling
      };
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

/* FullCalendar styling */
:deep(.fc) {
  direction: rtl; /* Right-to-left layout */
}

:deep(.fc-header-toolbar) {
  margin-bottom: 1em;
}

:deep(.fc-toolbar-title) {
  font-size: 1.5em;
}

:deep(.fc-daygrid-event) {
  cursor: pointer;
  display: flex; /* Use Flexbox for centering */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  text-align: center; /* Ensure text is centered */
  height: 100%; /* Ensure the event takes full height of the cell */
}

:deep(.event-title) {
  font-size: 14px; /* Adjust font size as needed */
  padding: 5px; /* Add padding for better spacing */
  word-break: break-word; /* Ensure long titles wrap */
}

/* Modal styling */
.modal-content {
  direction: rtl;
}

.modal-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.modal-title {
  font-weight: bold;
}

.modal-body {
  padding: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.fc-header-toolbar) {
    flex-direction: column;
    align-items: center;
  }

  :deep(.fc-toolbar-title) {
    font-size: 1.2em;
  }

  :deep(.fc-button-group) {
    margin-top: 10px;
  }

  .modal-dialog {
    margin: 10px;
  }

  :deep(.event-title) {
    font-size: 12px; /* Smaller font size for mobile */
  }
}
</style>