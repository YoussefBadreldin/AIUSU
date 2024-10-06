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
            <div v-if="findplace" class="mt-4">
                <h4><strong>معلومات لجنتك</strong></h4>
                <p><strong>الاسم:</strong> {{ findplace.student_name }}</p>
                <p><strong>الكلية:</strong> {{ findplace.student_faculty }}</p>
                <p><strong>الرقم الجامعي:</strong> {{ findplace.student_id }}</p>
                <p><strong>المستوى:</strong> {{ findplace.student_level }}</p>
                <p>{{ findplace.student_location }} <strong> :مكان اللجنة</strong></p>
                <p><strong>رقم الكشف:</strong> {{ findplace.student_number }}</p>

                <br>
                <h4><strong>المرشحون الذين لك الحق في انتخابهم</strong></h4>

                <!-- Container for each committee -->
                <div v-for="(committee, index) in committees" :key="index" class="committee-container mb-4">
                    <h6>{{ committee.name }}</h6>
                    <ul>
                        <li v-for="candidate in committee.candidates" :key="candidate.id" class="candidate-item">
                            <div class="candidate-photo">
                                <img :src="`../../images/candidates/${candidate.candidate_id}.jpg`" alt="مرشح" />
                            </div>
                            <div class="candidate-details">
                                <span class="candidate-name">{{ candidate.candidate_name }}</span>
                                <span class="candidate-faculty">{{ candidate.candidate_falculty }}</span>
                                <span class="candidate-level">{{ candidate.candidate_level }}</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Election Guidelines Section -->
                <div class="election-guidelines mt-4">
                    <h4><strong>إرشادات هامة</strong></h4>
                    <div class="video-container mt-4">
                        <iframe width="350" height="180" src="https://www.youtube.com/embed/87vnQi8zsiQ?si=IwxCPZCQvBf_pAab" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <br>
                    <h5>: نظام الانتخابات</h5>
                    <ul>
                        <li>(أي 2 في كل لجنة) ستقوم بانتخاب 14 عضوًا لسبع لجان</li>
                    </ul>
                    <h5>: خطوات التصويت</h5>
                    <ol>
                        <li>قم بالتوقيع في كشف الحضور قبل أن تبدأ بالتصويت</li>
                        <br>
                        <li>ستتلقى ورقة انتخابية مخصصة لك</li>
                        <br>
                        <li>اكتب أسماء 14 مرشحًا، بحيث يكون لكل اثنين في لجنة</li>
                        <br>
                        <li>تأكد من كتابة 14 اسمًا، لأن أي ورقة تحتوي على أقل أو أكثر من 14 اسمًا أو أي علامات ستعتبر باطلة</li>
                    </ol>
                    <h5>: ملاحظات هامة</h5>
                    <ul>
                        <li>يمكنك انتخاب المرشحين المذكورين في القائمة أعلاه فقط، ولا يمكنك انتخاب طلاب آخرين</li>
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
            findplace: null,
            errorMessage: '',
            committees: [],
        };
    },
    methods: {
        async findCommittee() {
            this.errorMessage = '';
            this.findplace = null; // Hide previous data

            // Fetch student data from the API
            const studentData = await this.fetchStudentData(this.universityNumber);

            if (!studentData) {
                this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
                return;
            }

            this.findplace = studentData;
            this.committees = await this.fetchCommitteesByLevel(studentData.student_level);
        },

        async fetchStudentData(universityNumber) {
            // Fetch all students from the API
            const response = await fetch('https://aiusu-backend.vercel.app/students');
            if (!response.ok) return null;
            const students = await response.json();

            // Find the student with the matching student_id
            return students.find(student => student.student_id === universityNumber) || null;
        },

        async fetchCommitteesByLevel(level) {
            const committeeURLs = [
                'https://aiusu-backend.vercel.app/clubs',
                'https://aiusu-backend.vercel.app/sports',
                'https://aiusu-backend.vercel.app/cultural',
                'https://aiusu-backend.vercel.app/arts',
                'https://aiusu-backend.vercel.app/scout',                
                'https://aiusu-backend.vercel.app/social',
                'https://aiusu-backend.vercel.app/scientific',
            ];

            // Mapping of URLs to committee names
            const committeeNames = {
                'https://aiusu-backend.vercel.app/clubs': 'لجنة الاسر',
                'https://aiusu-backend.vercel.app/sports': 'اللجنة الرياضية',
                'https://aiusu-backend.vercel.app/cultural': 'اللجنة الثقافية والاعلامية',
                'https://aiusu-backend.vercel.app/arts': 'اللجنة الفنية',
                'https://aiusu-backend.vercel.app/scout': 'لجنة الجوالة والخدمة العامة',
                'https://aiusu-backend.vercel.app/social': 'اللجنة الاجتماعية والرحلات',
                'https://aiusu-backend.vercel.app/scientific': 'اللجنة العلمية والتكنولوجية',
            };

            const committeePromises = committeeURLs.map(async (url) => {
                const response = await fetch(url);
                if (!response.ok) return null;

                const candidates = await response.json();

                // Filter candidates by level and assign photo path
                const filteredCandidates = candidates
                    .filter(candidate => candidate.candidate_level === level)
                    .map(candidate => ({
                        ...candidate,
                        photo: `../../images/candidates/${candidate.id}.jpg`, // Set the photo path
                    }));

                // Use the mapping to get the correct committee name
                return {
                    name: committeeNames[url], // Use the mapped name
                    candidates: filteredCandidates,
                };
            });

            const committees = await Promise.all(committeePromises);
            // Remove null results and return the committees with candidates
            return committees.filter(committee => committee && committee.candidates.length > 0);
        },
    },
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
    display: flex; /* Use flexbox for the list */
    flex-wrap: wrap; /* Allow wrapping to the next line if needed */
    justify-content: space-between; /* Space out items evenly */
}
.candidate-item {
    display: flex;
    flex-direction: column; /* Stack the elements vertically */
    align-items: center; /* Center align items */
    margin: 15px; /* Space between candidates */
    flex: 0 1 calc(33.333% - 30px); /* Allow a maximum of 3 items per row */
    box-sizing: border-box; /* Ensure padding and margin are included in width */
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
