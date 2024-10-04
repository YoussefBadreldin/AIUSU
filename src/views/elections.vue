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
                <h4><strong>معلومات لجنتك</strong></h4> <!-- Bolded title -->
                <p><strong>الاسم:</strong> {{ committeeInfo.name }}</p>
                <p><strong>الكلية:</strong> {{ committeeInfo.faculty }}</p>
                <p><strong>الرقم الجامعي:</strong> {{ committeeInfo.universityNumber }}</p>
                <p><strong>المستوى:</strong> {{ committeeInfo.level }}</p>
                <p>{{ committeeInfo.committeeLocation }}: <strong>مكان اللجنة</strong></p>
                <p><strong>رقمك في الكشف:</strong> {{ committeeInfo.listNumber }}</p>
                
                <br>
                <h4>المرشحون الذين لك الحق في انتخابهم</h4>
                
                <!-- Container for committees in a grid layout -->
                <div class="committee-grid">
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
            // Updated committees data with new faculties and candidates
            committees: [
                { 
                    name: "لجنة الأسر", 
                    candidates: [
                        { id: 1, name: "علي مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
                        { id: 2, name: "أحمد علي", photo: "../../images/candidates/candidate8.jpg", faculty: "صيدلة" },
                        { id: 3, name: "سارة محمد", photo: "../../images/candidates/candidate9.jpg", faculty: "صيدلة" },
                    ]
                },
                { 
                    name: "اللجنة الرياضية", 
                    candidates: [
                        { id: 4, name: "سارة أحمد", photo: "../../images/candidates/candidate2.jpg", faculty: "اسنان" },
                        { id: 5, name: "محمد عبد الله", photo: "../../images/candidates/candidate10.jpg", faculty: "اسنان" },
                        { id: 6, name: "منى طارق", photo: "../../images/candidates/candidate11.jpg", faculty: "اسنان" },
                    ]
                },
                { 
                    name: "اللجنة الثقافية", 
                    candidates: [
                        { id: 7, name: "خالد محمود", photo: "../../images/candidates/candidate3.jpg", faculty: "صحة عامة" },
                        { id: 8, name: "فاطمة علي", photo: "../../images/candidates/candidate12.jpg", faculty: "صحة عامة" },
                        { id: 9, name: "عمر سامي", photo: "../../images/candidates/candidate13.jpg", faculty: "صحة عامة" },
                    ]
                },
                { 
                    name: "اللجنة الاجتماعية", 
                    candidates: [
                        { id: 10, name: "أحمد ناصر", photo: "../../images/candidates/candidate4.jpg", faculty: "علوم اساسية" },
                        { id: 11, name: "عائشة سعيد", photo: "../../images/candidates/candidate14.jpg", faculty: "علوم اساسية" },
                        { id: 12, name: "يوسف عمر", photo: "../../images/candidates/candidate15.jpg", faculty: "علوم اساسية" },
                    ]
                },
                { 
                    name: "لجنة الجوالة والخدمة العامة", 
                    candidates: [
                        { id: 13, name: "منى إبراهيم", photo: "../../images/candidates/candidate5.jpg", faculty: "علاج طبيعي" },
                        { id: 14, name: "هشام أحمد", photo: "../../images/candidates/candidate16.jpg", faculty: "علاج طبيعي" },
                        { id: 15, name: "فاطمة محمد", photo: "../../images/candidates/candidate17.jpg", faculty: "علاج طبيعي" },
                    ]
                },
                { 
                    name: "اللجنة العلمية والتكنولوجية", 
                    candidates: [
                        { id: 16, name: "محمود سيد", photo: "../../images/candidates/candidate6.jpg", faculty: "اعمال" },
                        { id: 17, name: "نجلاء علي", photo: "../../images/candidates/candidate18.jpg", faculty: "اعمال" },
                        { id: 18, name: "أسامة شريف", photo: "../../images/candidates/candidate19.jpg", faculty: "اعمال" },
                    ]
                },
                { 
                    name: "اللجنة الفنية", 
                    candidates: [
                        { id: 19, name: "جمال الدين", photo: "../../images/candidates/candidate7.jpg", faculty: "فنون وتصميم" },
                        { id: 20, name: "إيمان ياسر", photo: "../../images/candidates/candidate20.jpg", faculty: "فنون وتصميم" },
                        { id: 21, name: "رضا ناصر", photo: "../../images/candidates/candidate21.jpg", faculty: "فنون وتصميم" },
                    ]
                },
                { 
                    name: "لجنة علوم وهندسة الحاسب", 
                    candidates: [
                        { id: 22, name: "عبد الله كريم", photo: "../../images/candidates/candidate22.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 23, name: "نور محمد", photo: "../../images/candidates/candidate23.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 24, name: "علي أحمد", photo: "../../images/candidates/candidate24.jpg", faculty: "علوم وهندسة الحاسب" },
                    ]
                },
                { 
                    name: "لجنة الهندسة", 
                    candidates: [
                        { id: 25, name: "سارة جلال", photo: "../../images/candidates/candidate25.jpg", faculty: "هندسة" },
                        { id: 26, name: "جلال سعيد", photo: "../../images/candidates/candidate26.jpg", faculty: "هندسة" },
                        { id: 27, name: "إسلام رضا", photo: "../../images/candidates/candidate27.jpg", faculty: "هندسة" },
                    ]
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
                this.errorMessage = 'الرقم  الذي ادخلتة غير صحيح، يرجى التحقق منه'; // Error message if ID is wrong
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

.committee-grid {
    display: flex;
    flex-wrap: wrap; /* Allow items to wrap to the next line */
    justify-content: space-between; /* Space items evenly */
}

.committee-container {
    width: calc(33.33% - 20px); /* Set width to one-third minus spacing */
    box-sizing: border-box; /* Include padding in width */
    margin-bottom: 20px; /* Space between rows */
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
</style>
