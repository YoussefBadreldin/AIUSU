<template> 
  <div>
    <HeaderComponent />

    <!-- About Us Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-4 mb-3">

              <!-- Login Form -->
              <div v-if="!isAuthenticated" class="login-form">
                <h2>تسجيل الدخول</h2>
                <form @submit.prevent="handleLogin">
                  <div class="form-group">
                    <label for="username">اسم المستخدم:</label>
                    <input type="text" v-model="username" id="username" required />
                  </div>
                  <div class="form-group">
                    <label for="password">كلمة المرور:</label>
                    <input type="password" v-model="password" id="password" required />
                  </div>
                  <button type="submit" class="custom-btn login-btn">تسجيل</button>
                </form>
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
              </div>

              <!-- Button (Visible After Login) -->
              <button 
                v-if="isAuthenticated && !showInquiryForm" 
                class="custom-btn btn-lg btn-block" 
                @click="showInquiryForm = true"
              >
                استعلام عن طالب
              </button>

                            <button 
                v-if="isAuthenticated && !showRegisteration" 
                class="custom-btn btn-lg btn-block" 
                @click="showRegisteration = true"
              >
                تسجيل الانشطة
              </button>

              <!-- Inquiry Form -->
              <div v-if="isAuthenticated && showInquiryForm" class="login-form">
                <form @submit.prevent="findStudent">
                  <h2 class="text-center my-4">الاستعلام عن طالب</h2>
                  <div class="mb-3">
                    <label for="universityNumber" class="form-label"><strong>الرقم الجامعي:</strong></label>
                    <input type="text" v-model="universityNumber" class="form-control" id="universityNumber" required />
                  </div>
                  <button type="submit" class="custom-btn login-btn">إبحث</button>
                  <br />
                  <button type="button" class="custom-btn cancel-btn" @click="showInquiryForm = false">الغاء</button>
                </form>

                <div v-if="loading" class="alert alert-info mt-4">برجاء الانتظار قليلًا، جاري تحميل البيانات</div>
                <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>

                <div v-if="eligibility && !loading" class="mt-4">
                  <div class="status-box">
                    <p v-if="eligibilityStatus" :style="{ color: eligibilityStatus.color, textAlign: 'center' }">
                      {{ eligibilityStatus.message }}
                    </p>
                  </div>
                  <br>
                  <h4 style="color: #0f106c;"><strong>بيانات الطالب</strong></h4>
                  <p><strong class="title-color" style="color: black;">اسم الطالب:</strong> {{ eligibility.student_name }}</p>
                  <p><strong class="title-color" style="color: black;">الجنسية:</strong> {{ eligibility.student_NAT }}</p>
                  <p><strong class="title-color" style="color: black;">الرقم القومي:</strong> {{ eligibility.student_NATid }}</p>
                  <p><strong class="title-color" style="color: black;">الكلية:</strong> {{ eligibility.student_faculty }}</p>
                  <p><strong class="title-color" style="color: black;">الرقم الجامعي:</strong> {{ eligibility.student_id }}</p>
                  <p><strong class="title-color" style="color: black;">المستوى طبقا لعدد الساعات المجتازة:</strong> {{ studentLevelLastWord }}</p>
                  <p><strong class="title-color" style="color: black;">المعدل التراكمي:</strong> {{ eligibility.student_gpa }}</p>
                  <p><strong class="title-color" style="color: black;">العقوبات:</strong> {{ eligibility.student_punish || 'يرجي مراجعة الشوؤن القانونية' }}</p>
                  <p><strong class="title-color" style="color: black;">الانشطة السابقة:</strong> {{ eligibility.student_activity || 'لا يوجد' }}</p>
                </div>

                              <!-- Event Creation and Registration -->
              <div v-if="isAuthenticated && showRegisteration" class="login-form event-section">
                              <h3 class="mt-4">قائمة الأنشطة</h3>
                <div v-if="events.length > 0">
                  <ul class="event-list">
                    <li v-for="event in events" :key="event.id">
                      <button class="event-btn" @click="openEvent(event)">
                        {{ event.name }}
                      </button>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p>لا توجد أنشطة حالياً.</p>
                </div>
                <h2>إضافة نشاط</h2>
                <form @submit.prevent="createEvent">
                  <div class="form-group">
                    <label for="eventName">اسم النشاط:</label>
                    <input type="text" v-model="newEvent.name" id="eventName" required />
                  </div>
                  <div class="form-group">
                    <label for="eventDescription">تاريخ النشاط:</label>
                    <textarea v-model="newEvent.description" id="eventDescription" required></textarea>
                  </div>
                  <button type="submit" class="custom-btn btn-sm">إضافة النشاط</button>
                </form>



                <!-- Register for Event -->
                <div v-if="selectedEvent" class="mt-4">
                  <h4>التسجيل في النشاط: {{ selectedEvent.name }}</h4>
                  <input type="text" v-model="studentId" placeholder="ادخل الرقم الجامعي" />
                  <button @click="registerForEvent" class="custom-btn">تسجيل</button>
                </div>

                <!-- Registration Table -->
                <div v-if="registeredStudents.length > 0" class="mt-4">
                  <h5>الطلاب المسجلين</h5>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>الاسم</th>
                        <th>الرقم الجامعي</th>
                        <th>الكلية</th>
                        <th>الايميل الجامعي</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="student in registeredStudents" :key="student.student_id">
                        <td>{{ student.student_name }}</td>
                        <td>{{ student.student_id }}</td>
                        <td>{{ student.student_faculty }}</td>
                        <td>{{ student.student_faculty }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- Export Button -->
                  <button @click="exportToPDF" class="custom-btn btn-sm mt-2">تصدير إلى PDF</button>
                </div>
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';
import _ from 'lodash'; // Import lodash for debouncing

export default {
  name: 'MainComponent',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isAuthenticated: false,
      showLogin: false,
      showInquiryForm: false, // New state to show/hide inquiry form
      username: '',
      password: '',
      universityNumber: '',
      errorMessage: '',
      eligibility: null,
      loading: false,
      studentsMap: {}, // A hash map for fast student lookup
    };
  },
  mounted() {
    this.loadStudentData(); // Load student data on component mount
    this.checkAuthentication(); // Check authentication on mount
  },
  computed: {
    studentLevelLastWord() {
      return this.eligibility && this.eligibility.student_level
        ? this.eligibility.student_level.split(' ').pop()
        : '';
    },
    eligibilityStatus() {
      const { student_NAT, student_gpa, student_punish, student_activity, student_level, student_id } = this.eligibility || {};
      let statusMessage;
      let statusColor;
      let reasons = [];

      // Check Punish
      if (student_punish && student_punish !== 'N/A' && student_punish !== '') {
        reasons.push('لديه عقوبة سابقة');
      }

      // Check GPA (except for students with student_id starting with "24" and level "المستوى الأول")
      if (
        student_gpa !== 'N/A' &&
        student_gpa < 2.0 &&
        !(student_id.startsWith('24') && student_level === 'المستوى الأول')
      ) {
        reasons.push('المعدل التراكمي أقل من 2.0');
      }

      // Check Activity (except for students with student_id starting with "24" and level "المستوى الأول")
      if (!student_activity && !(student_id.startsWith('24') && student_level === 'المستوى الأول')) {
        reasons.push('ليس له انشطة سابقة');
      }

      // Check NAT
      if (student_NAT !== 'مصرية' && student_NAT !== 'مصري') {
        reasons.push('الجنسية غير مصرية');
      }

      // If there are any reasons, the student is not eligible
      if (reasons.length > 0) {
        statusMessage = `لا يحق له الترشح، ${reasons.join(' و')}`;
        statusColor = 'red'; // Red color for not eligible
      } else {
        statusMessage = 'يحق له الترشح';
        statusColor = 'green'; // Green color for eligible
      }

      return { message: statusMessage, color: statusColor };
    },
  },
  methods: {
    checkAuthentication() {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        this.isAuthenticated = true; // Restore authentication state
      }
    },
    handleLogin() {
      const validUsername = 'admin'; // Placeholder for real validation
      const validPassword = 'AIU_su20##25'; // Placeholder for real validation

      // Check credentials
      if (this.username === validUsername && this.password === validPassword) {
        this.isAuthenticated = true;
        this.showLogin = false; // Hide login form after successful login
        this.showInquiryForm = false; // Reset inquiry form visibility
        this.errorMessage = '';
        sessionStorage.setItem('isAuthenticated', 'true'); // Store auth state in session storage
      } else {
        this.errorMessage = 'اسم المستخدم او كلمة المرور غير صحيحة!';
      }
    },

    // Method to find student by university number with debouncing
    findStudent: _.debounce(async function() {
      this.loading = true; // Start loading
      this.errorMessage = '';
      this.eligibility = null; // Reset eligibility data

      // Ensure studentsMap is loaded before checking
      if (Object.keys(this.studentsMap).length === 0) {
        this.loading = false; // Stop loading if data is not available
        return;
      }

      const studentData = this.studentsMap[this.universityNumber];

      if (!studentData) {
        this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
        this.loading = false; // Stop loading
        return;
      }

      // Fetch student activity data
      const activityData = await this.fetchActivityData(this.universityNumber);
      studentData.student_activity = activityData ? activityData.student_activity : null;

      // Simulate a delay to demonstrate loading (optional)
      setTimeout(() => {
        this.eligibility = { ...studentData }; // Set the entire student data including student_activity
        this.loading = false; // Stop loading
      }, 1000); // Delay for 1 second (you can adjust this as needed)
    }, 300), // Debounce time: 300ms

    async loadStudentData() {
      try {
        const response = await fetch('https://aiusu-backend.vercel.app/students');
        if (!response.ok) throw new Error('Failed to fetch student data');
        const students = await response.json();
        this.studentsMap = students.reduce((map, student) => {
          map[student.student_id] = student;
          return map;
        }, {});
      } catch (error) {
        console.error('Error loading student data:', error);
        this.errorMessage = 'فشل تحميل بيانات الطلاب';
      }
    },

    // Fetch activity data directly from the API instead of storing it in a map
    async fetchActivityData(studentId) {
      try {
        const response = await fetch('https://aiusu-backend.vercel.app/activities');
        if (!response.ok) throw new Error('Failed to fetch activity data');
        const activities = await response.json();
        const activityData = activities.find(activity => activity.student_id === studentId);
        return activityData || null;
      } catch (error) {
        console.error('Error fetching activity data:', error);
        return null;
      }
    },

    logout() {
      this.isAuthenticated = false;
      sessionStorage.removeItem('isAuthenticated'); // Clear auth state from session storage
    }
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
.login-form {
  max-width: 400px;
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #c42326; /* Same background color as the button */
  color: white; /* Same text color as the button */
}

/* Style the form input fields */
.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Button Styles */
.custom-btn {
  background-color: #c42326 !important;
  color: white !important;
  border: 2px solid #ffffff; /* Add white border */
  padding: 10px;
  transition: background-color 0.3s, border-color 0.3s; /* Transition for border color */
  text-align: center;
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.custom-btn:hover {
  background-color: #ffffff; /* Change background on hover */
  color: #c42326; /* Change text color on hover */
  border-color: #c42326; /* Change border color on hover */
}

.error {
  color: white;
}

.title-color {
  color: #c42326; /* Change the title color */
}

.status-box {
  background-color: white; /* White background for eligibility status */
  border: 1px solid #ccc; /* Light gray border */
  padding: 15px; /* Padding around the content */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  color: black; /* Black text for better contrast */
}
</style>
