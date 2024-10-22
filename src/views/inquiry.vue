<template>
  <div>
    <HeaderComponent />

    <!-- About Us Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center"> <!-- Center content in the row -->
            <div class="col-lg-6 col-md-4 mb-3">
              <!-- Button to show login form (hidden after click) -->
              <button v-if="!showLogin && !isAuthenticated" class="custom-btn btn-lg btn-block" @click="showLogin = true">استعلام عن طالب</button>

              <!-- Login Form (shown inside About Us container after button is clicked) -->
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
                  <br>
                  <button type="button" @click="showLogin = false" class="custom-btn cancel-btn">الغاء</button>
                </form>
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
              </div>

              <!-- Content after authentication -->
              <div v-if="isAuthenticated" class="login-form">
                <form @submit.prevent="findCommittee">
                  <h2 class="text-center my-4">الاستعلام عن طالب</h2>
                  <div class="mb-3">
                    <label for="universityNumber" class="form-label"><strong>الرقم الجامعي:</strong></label>
                    <input type="text" v-model="universityNumber" class="form-control" id="universityNumber" required />
                  </div>
                  <button type="submit" class="custom-btn login-btn">إبحث</button>
                </form>

                <div v-if="loading" class="alert alert-info mt-4">جاري التحميل...</div> <!-- Loading message -->
                <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div> <!-- Error message -->

                <div v-if="eligibility && !loading" class="mt-4">
                  <p><strong>اسم الطالب:</strong> {{ eligibility.student_name }}</p>
                  <p><strong>الجنسية :</strong> {{ eligibility.student_NAT }}</p>
                  <p><strong>الرقم القومي:</strong> {{ eligibility.student_NATid }}</p>
                  <p><strong>الكلية:</strong> {{ eligibility.student_faculty }}</p>
                  <p><strong>الرقم الجامعي:</strong> {{ eligibility.student_id }}</p>
                  <p><strong>المستوى:</strong> {{ studentLevelLastWord }}</p>
                  <p><strong>التقدير:</strong> {{ eligibility.student_gpa }}</p>
                  <p><strong>العقوبات:</strong> {{ eligibility.student_punish }}</p>
                  <p><strong>الانشطة السابقة:</strong> {{ eligibility.student_activity }}</p>
                </div>
                <br>
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
import { useRouter } from 'vue-router';
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
      isAuthenticated: false,  // Track authentication status
      showLogin: false,        // Manage visibility of the login form
      username: '',
      password: '',
      universityNumber: '',
      errorMessage: '',
      eligibility: null, // Changed from findplace to eligibility
      loading: false,
      studentLevelLastWord: 'المستوي الرابع', // Add additional properties as needed
    };
  },
  setup() {
    const router = useRouter();

    const navigateToPage = (path) => {
      router.push(path);
    };

    return {
      navigateToPage,
    };
  },
  methods: {
    handleLogin() {
      const validUsername = 'admin';
      const validPassword = 'admin';

      // Check credentials
      if (this.username === validUsername && this.password === validPassword) {
        this.isAuthenticated = true;
        this.showLogin = false; // Hide login form after successful login
        this.errorMessage = '';
      } else {
        this.errorMessage = 'اسم المستخدم او كلمة المرور غير صحيحة!';
      }
    },
    findCommittee() {
      // Implement the logic to find the committee based on universityNumber
      this.loading = true;
      // Simulate an API call
      setTimeout(() => {
        // Here you would usually set this.eligibility based on the API response
        this.eligibility = { 
          student_name: 'يوسف محمد جمال الدين سامي بدرالدين',
          student_faculty: 'علوم وهندسة الحاسب',
          student_id: this.universityNumber,
          student_NAT: 'مصري', // Example national ID
          student_NATid: '30301030102252', // Example national ID
          student_punish: 'لا يوجد عقوبات', // Example punishments
          student_activity: 'اتحاد الطلاب 2023', // Example activities
          student_gpa: '3.8', // Example activities
        };
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* Style for login form */
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
