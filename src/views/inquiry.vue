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
                  <p><strong class="title-color">اسم الطالب:</strong> {{ eligibility.student_name }}</p>
                  <p><strong class="title-color">الجنسية:</strong> {{ eligibility.student_NAT }}</p>
                  <p><strong class="title-color">الرقم القومي:</strong> {{ eligibility.student_NATid }}</p>
                  <p><strong class="title-color">الكلية:</strong> {{ eligibility.student_faculty }}</p>
                  <p><strong class="title-color">الرقم الجامعي:</strong> {{ eligibility.student_id }}</p>
                  <p><strong class="title-color">المستوى:</strong> {{ studentLevelLastWord }}</p>
                  <p><strong class="title-color">التقدير:</strong> {{ eligibility.student_gpa }}</p>
                  <p><strong class="title-color">العقوبات:</strong> {{ eligibility.student_punish || 'لا يوجد' }}</p>
                  <p><strong class="title-color">الانشطة السابقة:</strong> {{ eligibility.student_activity || 'لا يوجد' }}</p>
                  <br>
                  <p v-if="eligibilityStatus" class="title-color"> {{ eligibilityStatus }}</p>
                </div>

                <br />
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
  },
  computed: {
    studentLevelLastWord() {
      return this.eligibility && this.eligibility.student_level
        ? this.eligibility.student_level.split(' ').pop()
        : '';
    },
    eligibilityStatus() {
      const { student_NAT, student_gpa, student_punish, student_activity } = this.eligibility || {};
      if (student_NAT === 'مصري' && student_gpa > 2.0 && !student_punish && student_activity) {
        return 'يحق له الترشح';
      } else {
        let reasons = [];
        if (student_NAT !== 'مصري') reasons.push('الجنسية غير مصرية');
        if (student_gpa <= 2.0) reasons.push('التقدير أقل من 2.0');
        if (student_punish) reasons.push('{{eligibility.student_punish}} لدية عقوبة سابقة وهي');
        if (!student_activity) reasons.push('ليس له أنشطة سابقة');
        return `لا يحق له الترشح، ${reasons.join(' و')}`;
      }
    },
  },
  methods: {
    handleLogin() {
      const validUsername = 'admin'; // Placeholder for real validation
      const validPassword = 'admin'; // Placeholder for real validation

      // Check credentials
      if (this.username === validUsername && this.password === validPassword) {
        this.isAuthenticated = true;
        this.showLogin = false; // Hide login form after successful login
        this.errorMessage = '';
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

      this.eligibility = studentData; // Set eligibility data
      this.loading = false; // Stop loading
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
  border-radius: 5px; /* Add border-radius for rounded corners */
}

.custom-btn:hover {
  background-color: #b11d22 !important;
  border-color: #e6e6e6; /* Change border color on hover */
}

/* Title Color */
.title-color {
  color: #0f106c; /* Set the color for titles */
}

/* Center the row content */
.row {
  display: flex;
  justify-content: center; /* Center items horizontally */
}

/* Error message style */
.error {
  color: white; /* Adjusted color */
  margin-top: 10px;
}

/* Spacing for Mobile */
@media (max-width: 768px) {
  .About-Us .row > div {
    margin-bottom: 15px;
  }
}
</style>
