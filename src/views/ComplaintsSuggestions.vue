<template>
    <div>
        <header-component />

        <div class="container">
            <div class="intro-text">
                <h2>صندوق الشكاوى والمقترحات</h2>
                <p>تم إنشاء هذا الصندوق بواسطة اتحاد طلاب جامعة العلمين الدولية للتعامل مع شكاوى ومقترحات الطلاب</p>

                <h3>آلية صندوق الشكاوى والمقترحات</h3>
                <ul>
                    <li>يتم متابعة الصندوق بشكل دوري</li>
                    <li>يتم التحقق من كل طلب للتأكد من أنه يحتوي على جميع المعلومات اللازمة</li>
                    <li>إذا كان الطلب عبارة عن شكوى، يتم التأكد من صحتها قبل تقديمها</li>
                    <li>يتم تصنيف الطلبات بناءً على طبيعتها لتقديمها إلى الجهة المختصة المناسبة</li>
                    <li>يتم إبلاغ الطلاب عن نتيجة الطلب عبر البريد الإلكتروني الجامعي</li>
                </ul>

                <h3>التأكيدات من صندوق الشكاوى والمقترحات</h3>
                <ul>
                    <li>مراجعة شاملة وحل الطلبات المقدمة</li>
                    <li>السرية التامة لبيانات الطلب وتفاصيله</li>
                    <li>ضمان عدم تعرض الطالب لأي عواقب سلبية بسبب طلبهم</li>
                </ul>

                <div class="btn-group">
                    <button @click="showRequestForm = true; showTrackingForm = false; submitted = false" class="btn btn-primary">تقديم طلب</button>
                    <button @click="showRequestForm = false; showTrackingForm = true" class="btn btn-secondary">متابعة طلب</button>
                </div>
            </div>

            <div v-if="showRequestForm && !submitted">
                <div class="row justify-content-center">
                    <div class="col-sm-8 col-md-6 contact-form">
                        <h2 class="text-center">تقديم طلب</h2>
                        <form @submit.prevent="submitForm">
                            <div class="form-group">
    <label for="student_id">الرقم الجامعي</label>
    <input 
        v-model="form.student_id" 
        @input="validateStudentId" 
        type="text" 
        id="student_id" 
        class="form-control" 
        required
    >
    <p v-if="studentIdValid === false" class="text-danger">⚠️ الرقم الجامعي غير صحيح، يرجى التحقق.</p>
    <p v-if="studentIdValid === true" class="text-success">✅ الرقم الجامعي صحيح</p>
</div>


                            <div class="form-group">
                                <label for="requestScope">نطاق الطلب</label>
                                <select v-model="form.requestScope" id="requestScope" class="form-control" required>
                                    <option value="" disabled selected>اختر نطاق الطلب</option>
                                    <option>القطاع الأكاديمي</option>
                                    <option>القطاع الإداري</option>
                                    <option>القطاع المالي (حسابات الطلاب)</option>
                                    <option>الخدمات اللوجيستية (الإسكان والانتقالات)</option>
                                    <option>الأنشطة الطلابية</option>
                                    <option>مرافق الحرم الجامعي</option>
                                    <option>غير ذلك</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="requestType">نوع الطلب</label>
                                <select v-model="form.requestType" id="requestType" class="form-control" required>
                                    <option value="" disabled selected>اختر نوع الطلب</option>
                                    <option>شكوى</option>
                                    <option>مقترح</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="details">تفاصيل الطلب</label>
                                <textarea v-model="form.details" id="details" rows="5" class="form-control" required></textarea>
                            </div>

                            <div class="form-group">
                                <label for="comments">التعليقات/الاقتراحات</label>
                                <textarea v-model="form.comments" id="comments" rows="3" class="form-control"></textarea>
                            </div>

                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-success btn-block" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                    <span v-else>إرسال</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div v-if="submitted" class="thank-you-message text-center">
                <h3>شكراً لك! تم إرسال طلبك بنجاح</h3>
                <p>:رقم الطلب</p>
                <p>{{ requestNumber }}</p>
            </div>

            <div v-if="showTrackingForm">
                <div class="row justify-content-center">
                    <div class="col-sm-8 col-md-6 tracking-form">
                        <h2 class="text-center">متابعة الطلب</h2>
                        <form @submit.prevent="trackRequest">
                            <div class="form-group">
                                <label for="requestNumber">رقم الطلب</label>
                                <input v-model="trackingRequestNumber" type="text" id="requestNumber" class="form-control" required>
                            </div>

                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-success btn-block" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                    <span v-else>متابعة</span>
                                    </button>
                            </div>

                            <div v-if="trackingResult" class="tracking-result">
                            <h4><strong>تفاصيل الطلب</strong></h4>
                            <p> {{ trackingResult.requestNumber }}<strong> :رقم الطلب</strong></p>
                            <p><strong>تاريخ الإنشاء:</strong> {{ new Date(trackingResult.createdAt).toLocaleDateString() }}</p>
                            <p><strong>اسم مقدم الطلب:</strong> {{ trackingResult.student_name }}</p>
                            <p><strong>كلية مقدم الطلب:</strong> {{ trackingResult.student_faculty }}</p>
                            <p><strong>نوع الطلب:</strong> {{ trackingResult.requestType }}</p>
                            <p><strong>نطاق الطلب:</strong> {{ trackingResult.requestScope }}</p>
                            <p><strong>التفاصيل:</strong> {{ trackingResult.details }}</p>
                            <p><strong>التعليقات/الاقتراحات:</strong> {{ trackingResult.comments }}</p>
                            <p><strong>حالة الطلب:</strong> {{ trackingResult.requestStatus }}</p>

                            <!-- Hide the "الرد" section if "حالة الطلب" is "قيد المراجعة" -->
                            <p v-if="trackingResult.requestStatus !== 'قيد المراجعة'">
                                <strong>الرد:</strong>
                                <span v-if="trackingResult.requestResponse">{{ trackingResult.requestResponse }}</span>
                                <span v-else>لم يتم إضافة رد بعد</span>
                            </p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <footer-component />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name: 'ComplaintSuggestionForm',
    components: { HeaderComponent, FooterComponent },
    data() {
        return {
            showRequestForm: false,
            showTrackingForm: false,
            submitted: false,
            requestNumber: '',
            loading: false,
            trackingRequestNumber: '',
            trackingResult: null,
            studentIdValid: null, // Tracks student ID validity
            studentName: '', // Stores student name if found
            form: { student_id: '', requestScope: '', requestType: '', details: '', comments: '' },
            studentsMap: {} // Stores students for quick lookup
        };
    },
    mounted() {
        this.loadStudentData(); // Load student data on component mount
    },
    methods: {
        async validateStudentId() {
            if (!this.form.student_id) {
                this.studentIdValid = null;
                return;
            }

            if (this.studentsMap[this.form.student_id]) {
                this.studentIdValid = true;
                this.studentName = this.studentsMap[this.form.student_id].student_name;
            } else {
                this.studentIdValid = false;
                this.studentName = '';
            }
        },

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
                alert('فشل تحميل بيانات الطلاب');
            }
        },

        submitForm() {
            if (!this.studentIdValid) {
                alert('الرجاء إدخال رقم جامعي صحيح قبل الإرسال.');
                return;
            }

            this.loading = true;
            axios.post('https://aiusu-backend.vercel.app/complaints-suggestions/add', this.form)
                .then(response => {
                    this.requestNumber = response.data.requestNumber;
                    this.submitted = true;
                    this.showRequestForm = false;
                    this.form = { student_id: '', requestScope: '', requestType: '', details: '', comments: '' };
                    this.studentIdValid = null;
                    this.studentName = '';
                })
                .catch(() => alert('حدث خطأ أثناء إرسال النموذج.'))
                .finally(() => { this.loading = false; });
        }
    }
};
</script>



<style scoped>
/* General Styles */
.container {
    max-width: 900px;
    margin: auto;
    padding: 20px;
}

.intro-text {
    text-align: center;
    margin-bottom: 30px;
}

h2, h3 {
    color: #0f106c;
    margin-bottom: 15px;
}

p {
    color: #333;
    line-height: 1.6;
}

ul {
    list-style-type: none;
    padding: 0;
}

ul li {
    padding: 8px 0;
    border-bottom: 1px solid #ddd;
}

/* Button Styles */
.btn-group {
    text-align: center;
    margin-top: 20px;
}

.btn {
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #0f106c;
    border: none;
    color: white;
}

.btn-secondary {
    background-color: #c92126;
    border: none;
    color: white;
}

.btn-success {
    background-color: #0f106c;
    border: none;
    color: white;
}

.btn:hover {
    opacity: 0.8;
}

/* Form Styling */
.contact-form, .tracking-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

/* Thank You Message */
.thank-you-message {
    margin-top: 20px;
    padding: 15px;
    background-color: #d4edda;
    color: #155724;
    border-radius: 5px;
    text-align: center;
}

/* Tracking Result */
.tracking-result {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.tracking-result h4 {
    color: #0f106c;
}

@media (max-width: 768px) {
    .container {
        padding: 15px;
    }
    .btn {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
