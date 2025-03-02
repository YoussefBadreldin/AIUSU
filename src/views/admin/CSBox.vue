<template>
  <div>
    <HeaderComponent />

    <!-- Admin Panel Section -->
    <div class="About-Us" dir="rtl">
      <div class="inner-lay">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 mb-3">
              <h3 class="mt-4">لوحة تحكم صندوق الشكاوي والمقترحات</h3>

              <!-- Filters -->
              <div class="filters mb-4">
                <input
                  type="text"
                  v-model="filterStudentId"
                  placeholder="ابحث بالرقم الجامعي"
                  class="form-control mb-2"
                />
                <select v-model="filterStatus" class="form-control mb-2">
                  <option value="">جميع الحالات</option>
                  <option value="قيد المراجعة">قيد المراجعة</option>
                  <option value="تمت المعالجة">تمت المعالجة</option>
                  <option value="مرفوض">مرفوض</option>
                </select>
                <select v-model="filterRequestType" class="form-control mb-2">
                  <option value="">جميع أنواع الطلبات</option>
                  <option>شكوى</option>
                  <option>مقترح</option>
                </select>
                <select v-model="filterRequestScope" class="form-control mb-2">
                  <option value="">جميع نطاقات الطلبات</option>
                  <option>القطاع الأكاديمي</option>
                  <option>القطاع الإداري</option>
                  <option>القطاع المالي (حسابات الطلاب)</option>
                  <option>الخدمات اللوجيستية (الإسكان والانتقالات)</option>
                  <option>الأنشطة الطلابية</option>
                  <option>مرافق الحرم الجامعي</option>
                  <option>غير ذلك</option>
                </select>
              </div>

              <!-- Requests Table -->
              <table class="table">
                <thead>
                  <tr>
                    <th>رقم الطلب</th>
                    <th>الرقم الجامعي</th>
                    <th>اسم الطالب</th>
                    <th>الكلية</th>
                    <th>البريد الإلكتروني</th>
                    <th>نوع الطلب</th>
                    <th>نطاق الطلب</th>
                    <th>التفاصيل</th>
                    <th>تاريخ الإنشاء</th>
                    <th>حالة الطلب</th>
                    <th>الرد</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="request in sortedRequests" :key="request.requestNumber">
                    <td>{{ request.requestNumber }}</td>
                    <td>{{ request.student_id }}</td>
                    <td>{{ request.student_name }}</td>
                    <td>{{ request.student_faculty }}</td>
                    <td>{{ request.student_email }}</td>
                    <td>{{ request.requestType }}</td>
                    <td>{{ request.requestScope }}</td>
                    <td>{{ request.details }}</td>
                    <td>{{ formatDate(request.createdAt) }}</td>
                    <td>{{ request.requestStatus }}</td>
                    <td>{{ request.requestResponse || "لا يوجد" }}</td>
                    <td>
                      <button
                        @click="editRequest(request)"
                        class="btn btn-primary"
                      >
                        تعديل
                      </button>
                      <button
                        @click="deleteRequest(request)"
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

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "../../../public/global/headerComponent.vue";
import FooterComponent from "../../../public/global/footerComponent.vue";

export default {
  name: "AdminPanel",
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      isAuthenticated: false,
      requests: [],
      studentsMap: {}, // Map to store student data
      filterStudentId: "",
      filterStatus: "",
      filterRequestType: "",
      filterRequestScope: "",
    };
  },
  computed: {
    filteredRequests() {
      return this.requests.filter((request) => {
        return (
          (!this.filterStudentId ||
            request.student_id.includes(this.filterStudentId)) &&
          (!this.filterStatus || request.requestStatus === this.filterStatus) &&
          (!this.filterRequestType || request.requestType === this.filterRequestType) &&
          (!this.filterRequestScope || request.requestScope === this.filterRequestScope)
        );
      });
    },
    sortedRequests() {
      // Return a new sorted array without modifying the original data
      return [...this.filteredRequests].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    },
  },
  mounted() {
    this.checkAuthentication();
    this.loadRequests();
    this.loadStudentData();
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
    async loadRequests() {
      try {
        const response = await fetch(
          "https://aiusu-backend.vercel.app/complaints-suggestions/list"
        );
        if (!response.ok) throw new Error("Failed to fetch requests");
        this.requests = await response.json();
      } catch (error) {
        console.error("Error loading requests:", error);
        alert("فشل تحميل الطلبات");
      }
    },
    async loadStudentData() {
      try {
        const response = await fetch("https://aiusu-backend.vercel.app/students");
        if (!response.ok) throw new Error("Failed to fetch student data");
        const students = await response.json();
        this.studentsMap = students.reduce((map, student) => {
          map[student.student_id] = student;
          return map;
        }, {});
        // Attach student data to requests
        this.requests = this.requests.map((request) => {
          const student = this.studentsMap[request.student_id];
          return {
            ...request,
            student_name: student ? student.student_name : "غير معروف",
            student_faculty: student ? student.student_faculty : "غير معروف",
            student_email: student ? student.student_email : "غير معروف",
          };
        });
      } catch (error) {
        console.error("Error loading student data:", error);
        alert("فشل تحميل بيانات الطلاب");
      }
    },
    editRequest(request) {
      const response = prompt("أدخل الرد على الطلب:", request.requestResponse || "");
      if (response !== null) {
        const status = prompt(
          "أدخل حالة الطلب (قيد المراجعة/تمت المعالجة/مرفوض):",
          request.requestStatus
        );
        if (status) {
          this.updateRequest(request.requestNumber, response, status);
        }
      }
    },
    async updateRequest(requestNumber, response, status) {
      try {
        await fetch(
          `https://aiusu-backend.vercel.app/complaints-suggestions/${requestNumber}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requestResponse: response,
              requestStatus: status,
            }),
          }
        );
        alert("تم تحديث الطلب بنجاح");
        this.loadRequests(); // Refresh the list
      } catch (error) {
        console.error("Error updating request:", error);
        alert("فشل تحديث الطلب");
      }
    },
    async deleteRequest(request) {
      if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
        try {
          await fetch(
            `https://aiusu-backend.vercel.app/complaints-suggestions/${request.requestNumber}`,
            {
              method: "DELETE",
            }
          );
          this.requests = this.requests.filter(
            (req) => req.requestNumber !== request.requestNumber
          );
          alert("تم حذف الطلب بنجاح");
        } catch (error) {
          console.error("Error deleting request:", error);
          alert("فشل حذف الطلب");
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
</style>