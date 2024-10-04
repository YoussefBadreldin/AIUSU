<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">ابحث عن لجنتك الانتخابية</h2>
            <form @submit.prevent="findCommittee">
                <div class="mb-3">
                    <label for="universityNumber" class="form-label"><strong>:رقمك الجامعي</strong></label>
                    <input type="text" v-model="universityNumber" class="form-control" id="universityNumber" required />
                </div>
                <button type="submit" class="btn btn-primary">إبحث</button>
            </form>
            <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div> <!-- Error message -->
            <div v-if="committeeInfo" class="mt-4">
                <h4><strong>معلومات لجنتك</strong></h4>
                <p><strong>الاسم:</strong> {{ committeeInfo.name }}</p>
                <p><strong>الكلية:</strong> {{ committeeInfo.faculty }}</p>
                <p><strong>الرقم الجامعي:</strong> {{ committeeInfo.universityNumber }}</p>
                <p><strong>المستوى:</strong> {{ committeeInfo.level }}</p>
                <p> {{ committeeInfo.committeeLocation }} <strong>مكان اللجنة:</strong></p>
                <p><strong>رقمك في الكشف:</strong> {{ committeeInfo.listNumber }}</p>

                <br>
                <h4><strong>المرشحون الذين لك الحق في انتخابهم</strong></h4>

                <!-- Container for each committee -->
                <div v-for="(committee, index) in committees" :key="index" class="committee-container mb-4">
                    <h6>{{ committee.name }}</h6>
                    <ul>
                        <li v-for="candidate in committee.candidates" :key="candidate.id" class="candidate-item">
                            <div class="candidate-photo">
                                <img :src="candidate.photo" alt="مرشح" />
                            </div>
                            <div class="candidate-details">
                                <span class="candidate-name">{{ candidate.name }}</span>
                                <span class="candidate-faculty">{{ candidate.faculty }}</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Election Guidelines Section -->
                <div class="election-guidelines mt-4">
                    <h4><strong>إرشادات هامة</strong></h4>
                    <div class="video-container mt-4">
                        <iframe width="300" height="157" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <h5> :نظام الانتخابات</h5>
                    <ul>
                        <li>(اي 2 في كل لجنة) ستقوم بانتخاب 14 عضوًا لسبع لجان</li>
                    </ul>
                    <h5> :خطوات التصويت</h5>
                    <ol>
                        <li>قم بالتوقيع في كشف الحضور قبل أن تبدأ بالتصويت</li>
                        <br>
                        <li>ستتلقى ورقة انتخابية مخصصة لك</li>
                        <br>
                        <li>اكتب أسماء 14 مرشحًا، بحيث يكون لكل اثنين في لجنة </li>
                        <br>
                        <li>تأكد من كتابة 14 اسمًا، لأن أي ورقة تحتوي على أقل او أكثر من 14 اسمًا أو اي علامات ستعتبر باطلة</li>
                    </ol>
                    <h5> :ملاحظات هامة</h5>
                    <ul>
                        <li>يمكنك انتخاب المرشحين المذكورين في القائمة اعلاه فقط، ولا يمكنك انتخاب طلاب اخري</li>
                    </ul>
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
    name: 'FindCommittee',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            universityNumber: '',
            committeeInfo: null,
            errorMessage: '', // Variable to hold error messages
            committees: [ // Updated committees data with new faculties
                { 
                    name: "لجنة الأسر", 
                    candidates: [{ id: 1, name: "علي مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }] 
                },
                { 
                    name: "اللجنة الرياضية", 
                    candidates: [{ id: 2, name: "سارة أحمد", photo: "../../images/candidates/candidate2.jpg", faculty: "اسنان" }] 
                },
                { 
                    name: "اللجنة الثقافية", 
                    candidates: [{ id: 3, name: "خالد محمود", photo: "../../images/candidates/candidate3.jpg", faculty: "صحة عامة" }] 
                },
                { 
                    name: "اللجنة الاجتماعية", 
                    candidates: [{ id: 4, name: "أحمد ناصر", photo: "../../images/candidates/candidate4.jpg", faculty: "علوم اساسية" }] 
                },
                { 
                    name: "لجنة الجوالة والخدمة العامة", 
                    candidates: [{ id: 5, name: "منى إبراهيم", photo: "../../images/candidates/candidate5.jpg", faculty: "علاج طبيعي" }] 
                },
                { 
                    name: "اللجنة العلمية والتكنولوجية", 
                    candidates: [{ id: 6, name: "محمود سيد", photo: "../../images/candidates/candidate6.jpg", faculty: "اعمال" }] 
                },
                { 
                    name: "اللجنة الفنية", 
                    candidates: [{ id: 7, name: "جمال الدين", photo: "../../images/candidates/candidate7.jpg", faculty: "فنون وتصميم" }] 
                },
            ]
        };
    },
    methods: {
        async findCommittee() {
            // Clear previous error message
            this.errorMessage = '';
            
            // Simulate database fetching logic
            const validUniversityNumbers = ["20100294", "20100297", "20100357", "21100837", "21100796", "21100822"]; // Example valid IDs
            
            if (!validUniversityNumbers.includes(this.universityNumber)) {
                this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه'; // Error message if ID is wrong
                return; // Exit the method if ID is invalid
            }

            const exampleData = {
                name: "يوسف محمد جمال الدين سامي بدر الدين",
                faculty: "علوم وهندسة الحاسب",
                universityNumber: this.universityNumber,
                level: "الرابع",
                committeeLocation: "B10-145",
                listNumber: "33",
            };
            this.committeeInfo = exampleData;
        }
    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
}
.committee-container {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
}
.committee-container h6 {
    margin-bottom: 10px;
    font-size: 1.5em; /* Larger font size for committee name */
    font-weight: bold; /* Bold the committee name */
}
.committee-container ul {
    list-style: none;
    padding-left: 0;
}
.candidate-item {
    display: flex;
    flex-direction: column; /* Stack the elements vertically */
    align-items: center; /* Center align items */
    margin-bottom: 15px; /* Space between candidates */
}
.candidate-photo img {
    width: 70px; /* Adjust width as needed */
    height: auto; /* Maintain aspect ratio */
    border-radius: 50%; /* Optional: make photo circular */
}
.candidate-name {
    font-weight: bold; /* Bold text for name */
    margin-top: 5px; /* Space between photo and name */
    font-size: 1em; /* Default font size for candidate name */
}
.candidate-faculty {
    color: #555; /* Optional: different color for faculty */
    margin-top: 2px; /* Space between name and faculty */
    display: block; /* Ensure faculty is on a new line */
    font-size: 0.9em; /* Slightly smaller font size for faculty */
}
.alert {
    margin-top: 20px; /* Margin for alert message */
}
.video-container {
    margin-top: 20px; /* Margin for video container */
}
</style>
