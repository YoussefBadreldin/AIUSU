
<template>
  <div>
    <HeaderComponent />

    <!-- About Us Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-4 mb-3">
              <button v-if="!showLogin && !isAuthenticated" class="custom-btn btn-lg btn-block" @click="showLogin = true">
                استعلام عن طالب
              </button>

              <div v-if="showLogin && !isAuthenticated" class="login-form">
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
                  <br />
                  <button type="button" @click="showLogin = false" class="custom-btn cancel-btn">الغاء</button>
                </form>
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
              </div>

              <div v-if="isAuthenticated" class="login-form">
                <form @submit.prevent="findStudent">
                  <h2 class="text-center my-4">الاستعلام عن طالب</h2>
                  <div class="mb-3">
                    <label for="universityNumber" class="form-label"><strong>الرقم الجامعي:</strong></label>
                    <input type="text" v-model="universityNumber" class="form-control" id="universityNumber" required />
                  </div>
                  <button type="submit" class="custom-btn login-btn">إبحث</button>
                </form>

                <div v-if="loading" class="alert alert-info mt-4">جاري التحميل...</div>
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
              <p><strong class="title-color" style="color: black;">المستوى:</strong> {{ studentLevelLastWord }}</p>
              <p><strong class="title-color" style="color: black;">المعدل التراكمي:</strong> {{ eligibility.student_gpa }}</p>
              <p><strong class="title-color" style="color: black;">العقوبات:</strong> {{ eligibility.student_punish || 'لا يوجد' }}</p>
              <p><strong class="title-color" style="color: black;">الانشطة السابقة:</strong> {{ eligibility.student_activity || 'لا يوجد' }}</p>
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

      // Check for the new conditions: if student_level is "المستوى الأول", student_activity is null, and student_id starts with "24"
      if (student_level === "المستوى الأول" && !student_activity && student_id.startsWith('24')) {
        statusMessage = 'يحق له الترشح';
        statusColor = 'green';
      } else if (student_NAT === 'مصرية' && student_gpa >= 2.0 && !student_punish && student_activity) {
        statusMessage = 'يحق له الترشح';
        statusColor = 'green'; // Green color for eligible
      } else {
        let reasons = [];
        if (student_NAT !== 'مصرية') reasons.push('الجنسية غير مصرية');
        if (student_gpa < 2.0) reasons.push('المعدل التراكمي أقل من 2.0');
        if (student_punish) reasons.push('لدية عقوبة سابقة');
        if (!student_activity) reasons.push('ليس له أنشطة سابقة');
        statusMessage = `لا يحق له الترشح، ${reasons.join(' و')}`;
        statusColor = 'red'; // Red color for not eligible
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
      const validPassword = 'admin'; // Placeholder for real validation

      // Check credentials
      if (this.username === validUsername && this.password === validPassword) {
        this.isAuthenticated = true;
        this.showLogin = false; // Hide login form after successful login
        this.errorMessage = '';
        sessionStorage.setItem('isAuthenticated', 'true'); // Store auth state in session storage
      } else {
        this.errorMessage = 'اسم المستخدم او كلمة المرور غير صحيحة!';
      }
    },

    // Method to find student by university number
    findStudent() {
      this.loading = true; // Start loading
      this.errorMessage = '';
      this.eligibility = null; // Reset eligibility data

      const studentData = this.studentsMap[this.universityNumber];

      if (!studentData) {
        this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
        this.loading = false; // Stop loading
        return;
      }

      // Simulate a delay to demonstrate loading (optional)
      setTimeout(() => {
        this.eligibility = studentData; // Set eligibility data
        this.loading = false; // Stop loading
      }, 1000); // Delay for 1 second (you can adjust this as needed)
    },

    async loadStudentData() {
      try {
        const response = await fetch('https://aiusu-backend.vercel.app/students');
        if (!response.ok) throw new Error('Failed to fetch student data');
        const students = await response.json();

        // Create a hash map for faster lookups
        this.studentsMap = students.reduce((map, student) => {
          map[student.student_id] = student;
          return map;
        }, {});
      } catch (error) {
        console.error('Error loading student data:', error);
        this.errorMessage = 'فشل تحميل بيانات الطلاب';
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
  color: red;
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
