<template>
  <div>
    <HeaderComponent />

    <!-- About Us Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-4 mb-3">
              
              <div v-if="isAuthenticated">
                <h3 class="mt-4">قائمة الأنشطة</h3>
                <ul v-if="events.length">
                  <li v-for="event in events" :key="event.id">
                    <button class="event-btn" @click="openEvent(event)">
                      {{ event.name }}
                    </button>
                  </li>
                </ul>

                <h2>إضافة نشاط</h2>
                <form @submit.prevent="createEvent">
                  <div class="form-group">
                    <label for="eventName">اسم النشاط:</label>
                    <input type="text" v-model="newEvent.name" id="eventName" required />
                  </div>
                  <button type="submit" class="custom-btn btn-sm">إضافة النشاط</button>
                </form>
              </div>

              <button v-if="isAuthenticated" class="custom-btn logout-btn" @click="logout">تسجيل الخروج</button>

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

export default {
  name: 'EventsPage',
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      isAuthenticated: false,
      events: [],
      newEvent: { name: '' },
    };
  },
  mounted() {
    this.checkAuthentication();
    this.fetchEvents();
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
      if (!this.isAuthenticated) {
        this.$router.push('/adminpanel'); // Redirect to login if not authenticated
      }
    },
    logout() {
      this.isAuthenticated = false;
      sessionStorage.removeItem('isAuthenticated');
      this.$router.push('/adminpanel'); // Redirect to login after logout
    },
    async fetchEvents() {
      try {
        const response = await fetch('https://aiusu-backend.vercel.app/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        this.events = await response.json();
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async createEvent() {
      try {
        await fetch('https://aiusu-backend.vercel.app/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newEvent),
        });
        this.newEvent.name = '';
        this.fetchEvents(); // Refresh event list
      } catch (error) {
        console.error('Error creating event:', error);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #c42326;
  color: white;
}

.custom-btn {
  background-color: #c42326;
  color: white;
  padding: 10px;
  display: block;
  width: 100%;
}

.custom-btn:hover {
  background-color: white;
  color: #c42326;
}
</style>
