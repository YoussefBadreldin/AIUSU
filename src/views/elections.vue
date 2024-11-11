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

            <div v-if="loading" class="alert alert-info mt-4">...جاري التحميل</div>
            <div v-if="errorMessage" class="alert alert-danger mt-4">{{ errorMessage }}</div>

            <div v-if="findplace && !loading" class="mt-4">
                <h4><strong>معلومات لجنتك</strong></h4>
                <p><strong>الاسم:</strong> {{ findplace.student_name }}</p>
                <p><strong>الكلية:</strong> {{ findplace.student_faculty }}</p>
                <p><strong>الرقم الجامعي:</strong> {{ findplace.student_id }}</p>
                <p><strong>المستوى:</strong> {{ studentLevelLastWord }}</p>
                <p>{{ findplace.student_location }} <strong>:مكان اللجنة</strong> </p>
                <p><strong>رقم الكشف:</strong> {{ findplace.student_number }}</p>

                <br>
                <h4><strong>المرشحون الذين يحق لك انتخابهم</strong></h4>

                <div v-for="(committee, index) in committees" :key="index" class="committee-container mb-4">
                    <h6>{{ committee.name }}</h6>
                    <ul>
                        <li v-for="candidate in committee.candidates" :key="candidate.candidate_id" class="candidate-item">
                            <div class="candidate-photo">
                                <img :src="`../../images/students/${candidate.candidate_id}.jpg`" alt="مرشح" loading="lazy" />
                            </div>
                            <div class="candidate-details">
                                <span class="candidate-name">{{ candidate.candidate_name }}</span>
                                <span class="candidate-faculty">{{ candidate.candidate_faculty }}</span>
                                <span class="candidate-level">{{ candidate.candidate_level }}</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="election-guidelines mt-4">
                    <h4><strong>إرشادات هامة</strong></h4>
                    <div class="video-container mt-4">
                        <iframe 
                            width="350" 
                            height="180" 
                            src="https://www.youtube.com/embed/87vnQi8zsiQ?controls=1&showinfo=0&rel=0&modestbranding=1" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <br>
                    <h5>: نظام الانتخابات</h5>
                    <ul>
                        <li>.سيتم انتخاب 14 عضوًا موزعين على سبع لجان (اثنين لكل لجنة) -</li>
                    </ul>
                    <br>
                    <h5>: خطوات التصويت</h5>
                    <ul>
                        <li>.قم بالتوقيع في كشف الحضور قبل بدء التصويت -</li>
                        <li>.ستتلقى ورقة انتخابية مخصصة لك -</li>
                        <li>.اكتب أسماء 14 مرشحًا ثلاثيا، بواقع اثنين لكل لجنة -</li>
                        <li>تأكد من كتابة 14 اسمًا بالضبط؛ إذ إن أي ورقة تحتوي على -</li>
                        <li>.أقل أو أكثر من 14 اسمًا أو أي علامات إضافية ستُعتبر باطلة </li>
                    </ul>
                    <br>
                    <h5>: ملاحظات هامة</h5>
                    <ul>
                        <li>يمكنك التصويت فقط للمرشحين المذكورين في -</li>
                        <li>.القائمة أعلاه ولا يُسمح بانتخاب طلاب آخرين</li>
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
import _ from 'lodash'; // Import lodash for debouncing

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
            loading: false,
            studentsMap: {},
            placesMap: {}, // New property for storing places
        };
    },
    mounted() {
        this.loadStudentData();
    },
    computed: {
        studentLevelLastWord() {
            return this.findplace && this.findplace.student_level 
                ? this.findplace.student_level.split(' ').pop() 
                : '';
        }
    },
    methods: {
        async updateCandidateInfo(committees) {
            if (!this.findplace || !this.findplace.student_level) {
                console.warn('findplace is null or does not have a student_level');
                return; // Exit the method early if findplace is null
            }

            for (const committee of committees) {
                committee.candidates = committee.candidates.filter(candidate => {
                    const studentInfo = this.studentsMap[candidate.candidate_id]; // Match candidate_id with student_id
                    if (studentInfo) {
                        candidate.candidate_name = studentInfo.student_name;
                        candidate.candidate_faculty = studentInfo.student_faculty;
                        candidate.candidate_level = studentInfo.student_level; // Add student level

                        // Check if the candidate level matches the student's level
                        return candidate.candidate_level === this.findplace.student_level;
                    } else {
                        candidate.candidate_name = 'غير معروف';
                        candidate.candidate_faculty = 'غير معروف';
                        candidate.candidate_level = 'غير معروف'; // Mark level as unknown
                        return false; // Exclude unknown candidates
                    }
                });
            }
        },

        findCommittee: _.debounce(async function() {
            this.loading = true;
            this.errorMessage = ''; // Remove the error message during loading
            this.findplace = null;

            // Ensure studentsMap is loaded before checking
            if (Object.keys(this.studentsMap).length === 0) {
                return; // Don't proceed with search if students data is not loaded yet
            }

            const studentData = this.studentsMap[this.universityNumber];

            if (!studentData) {
                this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
                this.loading = false;
                return;
            }

            // Fetch place data based on student_id in parallel
            const [placeData, committees] = await Promise.all([
                this.fetchPlaceData(studentData.student_id),
                this.fetchCommittees(),
            ]);

            if (placeData) {
                this.findplace = { ...studentData, ...placeData }; // Combine student and place data
            } else {
                this.findplace = studentData; // Just use student data if no place found
            }

            await this.updateCandidateInfo(committees);
            this.committees = committees;
            this.loading = false;
        }, 300),

        async loadStudentData() {
            try {
                // Check if data is already in cache (sessionStorage/localStorage)
                const cachedData = sessionStorage.getItem('studentsMap');
                if (cachedData) {
                    this.studentsMap = JSON.parse(cachedData);
                } else {
                    const response = await fetch('https://aiusu-backend.vercel.app/students');
                    if (!response.ok) throw new Error('Failed to fetch student data');
                    const students = await response.json();
                    this.studentsMap = students.reduce((map, student) => {
                        map[student.student_id] = student;
                        return map;
                    }, {});
                    // Cache the students data for future use
                    sessionStorage.setItem('studentsMap', JSON.stringify(this.studentsMap));
                }

                console.log('Students Map:', this.studentsMap);

                // After loading student data, automatically trigger the search
                if (this.universityNumber) {
                    this.findCommittee(); // Automatically start searching after data is loaded
                }
            } catch (error) {
                console.error('Error loading student data:', error);
            }
        },

        async fetchPlaceData(studentId) {
            try {
                // Check if place data is already cached
                const cachedPlaceData = this.placesMap[studentId];
                if (cachedPlaceData) {
                    return cachedPlaceData;
                }

                const response = await fetch('https://aiusu-backend.vercel.app/places');
                if (!response.ok) throw new Error('Failed to fetch place data');
                const places = await response.json();

                const placeInfo = places.find(place => place.student_id === studentId);
                if (placeInfo) {
                    this.placesMap[studentId] = placeInfo; // Cache place data
                    return {
                        student_location: placeInfo.student_location,
                        student_number: placeInfo.student_number,
                    };
                }

                return null; // Return null if not found
            } catch (error) {
                console.error('Error loading place data:', error);
                return null; // Return null in case of error
            }
        },

        async fetchCommittees() {
            const committeeURLs = [
                'https://aiusu-backend.vercel.app/clubs',
                'https://aiusu-backend.vercel.app/sports',
                'https://aiusu-backend.vercel.app/cultural',
                'https://aiusu-backend.vercel.app/arts',
                'https://aiusu-backend.vercel.app/scout',                
                'https://aiusu-backend.vercel.app/social',
                'https://aiusu-backend.vercel.app/scientific',
            ];

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
                if (!response.ok) throw new Error('Failed to fetch committee data');
                const candidates = await response.json();

                return {
                    name: committeeNames[url],
                    candidates: candidates.map(candidate => ({
                        candidate_id: candidate.candidate_id, // Ensure candidate_id is fetched correctly
                        candidate_name: '', // Initially empty
                        candidate_faculty: '', // Initially empty
                        candidate_level: '', // Initially empty
                        photo: `../../images/students/${candidate.candidate_id}.jpg`, // Placeholder for image path
                    })),
                };
            });

            return Promise.all(committeePromises);
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
    direction: rtl; /* Ensures the text flows from right to left */
}
.committee-container h6 {
    margin-bottom: 10px;
    font-size: 1.5em;
    font-weight: bold;
}
.committee-container ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    direction: rtl; /* Ensures the list items align right to left */
}
.candidate-item {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers the content horizontally */
    justify-content: center; /* Centers the content vertically */
    margin: 15px;
    flex: 0 1 calc(33.333% - 30px);
    box-sizing: border-box;
    text-align: center; /* Aligns text within the container */
}
.candidate-photo img {
    width: 70px;
    height: auto;
    border-radius: 50%;
}
.candidate-name {
    font-weight: bold;
    margin-top: 5px;
    font-size: 1em;
}
.candidate-faculty {
    color: #555;
    margin-top: 2px;
    display: block;
    font-size: 0.9em;
}
.candidate-level {
    font-size: 0.9em;
    color: #888;
}
.alert {
    margin-top: 20px;
}
.video-container {
    margin-top: 20px;
}
.video-container iframe {
    width: 600px; /* Fixed width */
    height: 340px; /* Fixed height */
    object-fit: cover; /* Ensures the image/video covers the set area without distortion */
    display: block;
    margin: 0 auto; /* Centers the images and video */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 1024px) {
    .video-container iframe {
        width: 450px;
        height: 300px;
    }
}

@media (max-width: 768px) {
    .video-container iframe {
        width: 350px;
        height: 230px;
    }

    li p {
        max-width: 350px; /* Match image width */
    }

    /* Adjust font sizes for candidate details */
    .candidate-name {
        font-size: 0.9em; /* Smaller font size */
    }

    .candidate-faculty {
        font-size: 0.8em; /* Smaller font size */
    }

    .candidate-level {
        font-size: 0.8em; /* Smaller font size */
    }
}

@media (max-width: 480px) {
    .video-container iframe {
        width: 340px; /* Fixed width */
        height: 190px; /* Fixed height */
        object-fit: cover; /* Ensures the image/video covers the set area without distortion */
        display: block;
        margin: 0 auto; /* Centers the images and video */
    }

    /* Adjust font sizes for candidate details */
    .candidate-name {
        font-size: 0.8em; /* Even smaller font size */
    }

    .candidate-faculty {
        font-size: 0.7em; /* Even smaller font size */
    }

    .candidate-level {
        font-size: 0.7em; /* Even smaller font size */
    }
}

</style>
