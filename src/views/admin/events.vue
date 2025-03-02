<template>
  <div>
    <HeaderComponent />

    <!-- Admin Panel Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 mb-3">
              <h3 class="mt-4">لوحة تحكم الأحداث</h3>

              <!-- Filters -->
              <div class="filters mb-4">
                <input
                  type="text"
                  v-model="filterEventName"
                  placeholder="ابحث باسم الحدث"
                  class="form-control mb-2"
                />
                <input
                  type="date"
                  v-model="filterEventDate"
                  class="form-control mb-2"
                />
              </div>

              <!-- Add Event Button -->
              <button @click="openAddEventModal" class="btn btn-primary mb-3">
                إضافة حدث جديد
              </button>

              <!-- Events Table -->
              <table class="table">
                <thead>
                  <tr>
                    <th>اسم الحدث</th>
                    <th>الوصف</th>
                    <th>التاريخ</th>
                    <th>المشاركون</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="event in filteredEvents" :key="event._id">
                    <td>{{ event.eventName }}</td>
                    <td>{{ event.eventDescription }}</td>
                    <td>{{ formatDate(event.eventDate) }}</td>
                    <td>
                      <ul>
                        <li v-for="(participant, index) in event.participants" :key="index">
                          {{ participant }}
                        </li>
                      </ul>
                    </td>
                    <td>
                      <button
                        @click="editEvent(event)"
                        class="btn btn-primary"
                      >
                        تعديل
                      </button>
                      <button
                        @click="deleteEvent(event)"
                        class="btn btn-danger"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Logout Button -->
              <button
                v-if="isAuthenticated"
                class="custom-btn logout-btn"
                @click="logout"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Event Modal -->
    <div v-if="showEventModal" class="modal fade show" style="display: block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEditing ? "تعديل الحدث" : "إضافة حدث جديد" }}
            </h5>
            <button type="button" class="btn-close" @click="closeEventModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveEvent">
              <div class="mb-3">
                <label for="eventName" class="form-label">اسم الحدث</label>
                <input
                  type="text"
                  v-model="currentEvent.eventName"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="eventDescription" class="form-label">الوصف</label>
                <textarea
                  v-model="currentEvent.eventDescription"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="eventDate" class="form-label">التاريخ</label>
                <input
                  type="datetime-local"
                  v-model="currentEvent.eventDate"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="participants" class="form-label">المشاركون</label>
                <input
                  type="text"
                  v-model="newParticipant"
                  class="form-control"
                  placeholder="أضف مشاركًا"
                />
                <button
                  type="button"
                  @click="addParticipant"
                  class="btn btn-secondary mt-2"
                >
                  إضافة مشارك
                </button>
                <ul>
                  <li v-for="(participant, index) in currentEvent.participants" :key="index">
                    {{ participant }}
                    <button
                      type="button"
                      @click="removeParticipant(index)"
                      class="btn btn-sm btn-danger"
                    >
                      حذف
                    </button>
                  </li>
                </ul>
              </div>
              <button type="submit" class="btn btn-primary">
                {{ isEditing ? "حفظ التعديلات" : "إضافة الحدث" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../../public/global/headerComponent.vue";
import FooterComponent from "../../../public/global/footerComponent.vue";

export default {
  name: "AdminPanelEvents",
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      isAuthenticated: false,
      events: [],
      filterEventName: "",
      filterEventDate: "",
      showEventModal: false,
      isEditing: false,
      currentEvent: {
        eventName: "",
        eventDescription: "",
        eventDate: "",
        participants: [],
      },
      newParticipant: "",
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter((event) => {
        return (
          (!this.filterEventName ||
            event.eventName
              .toLowerCase()
              .includes(this.filterEventName.toLowerCase())) &&
          (!this.filterEventDate ||
            new Date(event.eventDate).toISOString().split("T")[0] ===
              this.filterEventDate)
        );
      });
    },
  },
  mounted() {
    this.checkAuthentication();
    this.loadEvents();
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
      if (!this.isAuthenticated) {
        this.$router.push("/adminpanel"); // Redirect to login if not authenticated
      }
    },
    logout() {
      this.isAuthenticated = false;
      sessionStorage.removeItem("isAuthenticated");
      this.$router.push("/adminpanel"); // Redirect to login after logout
    },
    async loadEvents() {
      try {
        const response = await fetch("https://aiusu-backend.vercel.app/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        this.events = await response.json();
      } catch (error) {
        console.error("Error loading events:", error);
        alert("فشل تحميل الأحداث");
      }
    },
    openAddEventModal() {
      this.isEditing = false;
      this.currentEvent = {
        eventName: "",
        eventDescription: "",
        eventDate: "",
        participants: [],
      };
      this.showEventModal = true;
    },
    closeEventModal() {
      this.showEventModal = false;
    },
    addParticipant() {
      if (this.newParticipant) {
        this.currentEvent.participants.push(this.newParticipant);
        this.newParticipant = "";
      }
    },
    removeParticipant(index) {
      this.currentEvent.participants.splice(index, 1);
    },
    async saveEvent() {
      try {
        const url = this.isEditing
          ? `https://aiusu-backend.vercel.app/events/${this.currentEvent._id}`
          : "https://aiusu-backend.vercel.app/events";
        const method = this.isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.currentEvent),
        });

        if (!response.ok) throw new Error("Failed to save event");

        this.showEventModal = false;
        this.loadEvents(); // Refresh the list
      } catch (error) {
        console.error("Error saving event:", error);
        alert("فشل حفظ الحدث");
      }
    },
    editEvent(event) {
      this.isEditing = true;
      this.currentEvent = { ...event };
      this.showEventModal = true;
    },
    async deleteEvent(event) {
      if (confirm("هل أنت متأكد من حذف هذا الحدث؟")) {
        try {
          await fetch(`https://aiusu-backend.vercel.app/events/${event._id}`, {
            method: "DELETE",
          });
          this.events = this.events.filter((e) => e._id !== event._id);
          alert("تم حذف الحدث بنجاح");
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("فشل حذف الحدث");
        }
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString(); // Format date and time
    },
  },
};
</script>

<style scoped>
.inner-lay {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.form-control {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.table th {
  background-color: #0f106c;
  color: white;
}

.btn {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
}

.btn-primary {
  background-color: #0f106c;
  color: white;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.custom-btn {
  background-color: #c42326;
  color: white;
  padding: 10px;
  display: block;
  width: 100%;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.custom-btn:hover {
  background-color: white;
  color: #c42326;
  border: 1px solid #c42326;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>