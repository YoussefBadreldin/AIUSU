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
                <p> {{ committeeInfo.committeeLocation }} <strong> :مكان اللجنة</strong></p>
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
                        <iframe width="300" height="157" src="https://www.youtube.com/embed/87vnQi8zsiQ?si=IzZF8lzwKqUViH7e" frameborder="0" allowfullscreen></iframe>
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
            committees: [] // Committees list based on student's level
        };
    },
    methods: {
        async findCommittee() {
            // Clear previous error message
            this.errorMessage = '';
            
            // Fetch student info from the 'students' database
            const studentData = await this.fetchStudentInfo(this.universityNumber);
            
            if (!studentData) {
                this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه'; // Error message if ID is wrong
                return; // Exit the method if ID is invalid
            }

            // Fetch committee data based on the student's level
            const committeesData = await this.fetchCommitteesByLevel(studentData.level);

            this.committeeInfo = studentData;
            this.committees = committeesData;
        },

        async fetchStudentInfo(universityNumber) {
            // Simulate fetching data from the 'students' database
            const studentsDatabase = {
                "20100294": { name: "يوسف محمد جمال الدين سامي بدر الدين", faculty: "علوم وهندسة الحاسب", universityNumber: "20100294", level: "الرابع", committeeLocation: "B10-145", listNumber: "33" },
                "20100297": { name: "علي مصطفى", faculty: "صيدلة", universityNumber: "20100297", level: "الثاني", committeeLocation: "B10-148", listNumber: "11" },
                // Add more students as needed
            };
            
            return studentsDatabase[universityNumber] || null;
        },

        async fetchCommitteesByLevel(level) {
            // Simulate fetching data from 7 different databases named after the committees
            const committeesData = {
                "لجنة الأسر": {
                    "الرابع": [{ id: 1, name: "علي مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }],
                    "الثاني": [{ id: 2, name: "محمود حسين", photo: "../../images/candidates/candidate2.jpg", faculty: "اسنان" }]
                },
                "اللجنة الرياضية": {
                    "الرابع": [{ id: 3, name: "سارة أحمد", photo: "../../images/candidates/candidate3.jpg", faculty: "صحة عامة" }],
                    "الثاني": [{ id: 4, name: "أحمد ناصر", photo: "../../images/candidates/candidate4.jpg", faculty: "علوم اساسية" }]
                },
                "اللجنة الثقافية": {
                    "الرابع": [{ id: 5, name: "خالد محمود", photo: "../../images/candidates/candidate5.jpg", faculty: "علاج طبيعي" }],
                    "الثاني": [{ id: 6, name: "منى إبراهيم", photo: "../../images/candidates/candidate6.jpg", faculty: "اعمال" }]
                },
                "اللجنة الاجتماعية": {
                    "الرابع": [{ id: 7, name: "جمال الدين", photo: "../../images/candidates/candidate7.jpg", faculty: "فنون وتصميم" }],
                    "الثاني": [{ id: 8, name: "محمد سيد", photo: "../../images/candidates/candidate8.jpg", faculty: "اعمال" }]
                },
                "لجنة الجوالة والخدمة العامة": {
                    "الرابع": [{ id: 9, name: "أحمد طه", photo: "../../images/candidates/candidate9.jpg", faculty: "علوم وهندسة الحاسب" }],
                    "الثاني": [{ id: 10, name: "إبراهيم علي", photo: "../../images/candidates/candidate10.jpg", faculty: "اسنان" }]
                },
                "اللجنة العلمية والتكنولوجية": {
                    "الرابع": [{ id: 11, name: "محمود سيد", photo: "../../images/candidates/candidate11.jpg", faculty: "اعمال" }],
                    "الثاني": [{ id: 12, name: "سامي جمال", photo: "../../images/candidates/candidate12.jpg", faculty: "علاج طبيعي" }]
                },
                "اللجنة الفنية": {
                    "الرابع": [{ id: 13, name: "ياسمين فؤاد", photo: "../../images/candidates/candidate13.jpg", faculty: "فنون وتصميم" }],
                    "الثاني": [{ id: 14, name: "أميرة سامي", photo: "../../images/candidates/candidate14.jpg", faculty: "صيدلة" }]
                }
            };

            return Object.keys(committeesData).map(committee => ({
                name: committee,
                candidates: committeesData[committee][level] || []
            }));
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
