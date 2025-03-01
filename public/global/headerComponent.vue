<template>
  <div>
    <head>
      <!-- Meta and CSS Preload Links -->
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AIUSU - اتحاد طلاب جامعة العلمين الدولية</title>

      <!-- Favicon and Touch Icons -->
      <link rel="apple-touch-icon" sizes="180x180" href="/images/Fav/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/Fav/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/Fav/favicon-16x16.png">
      <link rel="manifest" href="/images/Fav/site.webmanifest">
      <link rel="mask-icon" href="/images/Fav/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <!-- SEO Meta Tags -->
      <meta name="description" content="AIUSU يوفر معلومات شاملة للطلاب في جامعة العلمين الدولية. تعرف على اللجان، كيفية الانضمام، والانتخابات الطلابية.">
      <meta name="keywords" content="اتحاد طلاب جامعة العلمين الدولية, AIUSU, لجان الطلاب, انتخابات الطلاب, الانضمام للاتحاد, الدراسة في مصر, الحياة الجامعية, فرص العمل, المنح الدراسية, التواصل الطلابي">

      <!-- Stylesheets -->
      <link rel="stylesheet" href="/css/bootstrap.min.css">
      <link rel="stylesheet" href="/css/fontawsom-all.min.css">
      <link rel="stylesheet" href="/plugins/slider/css/owl.carousel.min.css">
      <link rel="stylesheet" href="/plugins/slider/css/owl.theme.default.css">
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <nav class="navbar">
      <div class="logo-container">
        <router-link to="/">
          <img :src="logoSrc" alt="AIUSU Logo" class="logo" />
        </router-link>
      </div>
      <div class="nav-right">
        <div class="dropdown" @click="toggleMenu">
          <i class="fas fa-bars dropbtn"></i>
        </div>
      </div>
    </nav>
    <div v-if="menuOpen" class="menu">
      <router-link to="/about">معلومات عن الاتحاد</router-link>
      <router-link to="/rules">لائحة الاتحاد</router-link>
      <router-link to="/members">اعضاء الاتحاد الحالي</router-link>
      <!--<router-link to="/Calander">تقويم الانشطة</router-link>-->
      <a href="https://linktr.ee/aiustudentunion" target="_blank" rel="noopener noreferrer">
        الاشتراك في انشطة الاتحاد
      </a>
      <!--<router-link to="/Complaints_Suggestions">صندوق الشكاوي والمقترحات</router-link>-->
      <router-link to="/join">الانضمام الي الاتحاد</router-link>
      <router-link to="/elections">معرفة لجنتك الانتخابية</router-link>
      <router-link to="/adminpanel" class="login-button">تسجيل الدخول</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      logoSrc: require('../../images/logo.png'),
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
  
};
</script>

<style scoped>
.navbar {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px; /* Increased top and bottom padding */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-top: -40px;
  margin-bottom: -40px;
}

.logo {
  max-height: 200px; /* Adjust the max height to make the logo larger */
  max-width: 100%; /* Keep the logo responsive */
}

.nav-right {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
}

.dropdown {
  cursor: pointer;
  font-size: 24px;
  color: #007bff;
}

.menu {
  background-color: white;
  width: 100%;
  padding: 20px 0; /* Increased top and bottom padding */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu a {
  color: black;
  padding: 15px; /* Increased padding */
  text-decoration: none;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.menu a:hover {
  background-color: #f1f1f1;
}
</style>
