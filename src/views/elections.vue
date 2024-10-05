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
            errorMessage: '',
            committees: []
        };
    },
    methods: {
        async findCommittee() {
            this.errorMessage = '';

const validUniversityNumbers = ["20100294", "20100295", "20100296", "20100297", "20100298"];

if (!validUniversityNumbers.includes(this.universityNumber)) {
    this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
    return;
}

const studentData = {
    "20100294": {
        name: "يوسف محمد جمال الدين سامي بدر الدين",
        faculty: "علوم وهندسة الحاسب",
        level: "الرابع",
        committeeLocation: "B10-145",
        listNumber: "33",
    },
    "20100295": {
        name: "علي محمد علي",
        faculty: "صيدلة",
        level: "الثالث",
        committeeLocation: "B10-150",
        listNumber: "12",
    },
    "20100296": {
        name: "حمراوي أحمد",
        faculty: "طب الأسنان",
        level: "الثاني",
        committeeLocation: "B10-155",
        listNumber: "25",
    },
    "20100297": {
        name: "محمد سعيد",
        faculty: "علوم أساسية",
        level: "الأول",
        committeeLocation: "B10-160",
        listNumber: "45",
    },
    "20100298": {
        name: "شهاد عادل",
        faculty: "صحة عامة",
        level: "الخامس",
        committeeLocation: "B10-165",
        listNumber: "22",
    },
};

const exampleData = studentData[this.universityNumber];

this.committeeInfo = exampleData;
this.committees = await this.fetchCommitteesByLevel(exampleData.level);
        },

        async fetchCommitteesByLevel(level) {
           const committeesData = {
    "لجنة الأسر": {
        "الأول": [
            { id: 1, name: "أحمد علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 2, name: "سارة محمود", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 3, name: "خالد مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 4, name: "منى حسين", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 5, name: "محمود سالم", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 6, name: "إبراهيم يوسف", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 7, name: "أمل علي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 8, name: "سامي أحمد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 9, name: "خالد ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 10, name: "إيمان حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 11, name: "علي سيد", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 12, name: "مروة جمال", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 13, name: "نادر علي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 14, name: "ياسمين سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 15, name: "محمد جمال", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 16, name: "خالد حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 17, name: "محمود علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 18, name: "فاطمة سيد", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 19, name: "نورا محمود", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 20, name: "عبد الله جمال", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    },
    "اللجنة الرياضية": {
        "الأول": [
            { id: 21, name: "حسام علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 22, name: "مروان مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 23, name: "عبد الرحمن علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 24, name: "أحمد محمد", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 25, name: "سليم محمود", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 26, name: "شيماء حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 27, name: "هشام سعد", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 28, name: "رؤى أحمد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 29, name: "أميرة سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 30, name: "حسن مجدي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 31, name: "جميلة ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 32, name: "زيد محمد", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 33, name: "ياسمين أحمد", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 34, name: "خالد حمدي", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 35, name: "سعاد حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 36, name: "سعيد علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 37, name: "أماني أحمد", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 38, name: "فاطمة سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 39, name: "علي كريم", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 40, name: "أحمد عمر", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    },
    "اللجنة الثقافية": {
        "الأول": [
            { id: 41, name: "علياء نبيل", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 42, name: "أحمد هشام", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 43, name: "مريم سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 44, name: "باسل عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 45, name: "دينا سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 46, name: "إسلام مجدي", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 47, name: "أميرة عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 48, name: "فريدة سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 49, name: "مصطفى طه", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 50, name: "هالة مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 51, name: "منال علي", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 52, name: "يوسف سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 53, name: "عمر عبد الله", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 54, name: "فاطمة جاد", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 55, name: "ناهد يوسف", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 56, name: "رامي سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 57, name: "آلاء رمضان", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 58, name: "يوسف أمين", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 59, name: "ليلى مراد", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 60, name: "عادل يوسف", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    },
    "اللجنة الاجتماعية": {
        "الأول": [
            { id: 61, name: "عائشة جاد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 62, name: "علي عبد الرحمن", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 63, name: "ميادة سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 64, name: "سليمان ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 65, name: "يوسف حمدي", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 66, name: "عفاف أيمن", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 67, name: "راوية أكرم", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 68, name: "علياء ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 69, name: "أكرم عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 70, name: "أحمد عماد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 71, name: "نجلاء حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 72, name: "سيف الدين حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 73, name: "عمر محمود", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 74, name: "سوسن جاد", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 75, name: "جهاد أحمد", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 76, name: "خالد عمر", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 77, name: "ناجي محمد", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 78, name: "فاطمة ممدوح", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 79, name: "ماهر لطفي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 80, name: "سحر ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    },
    "لجنة الجوالة والخدمة العامة": {
        "الأول": [
            { id: 81, name: "محمود علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 82, name: "منى عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 83, name: "عمر مصطفى", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 84, name: "نجوى سعد", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 85, name: "فاطمة شريف", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 86, name: "إبراهيم ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 87, name: "علياء فرج", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 88, name: "هاجر يوسف", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 89, name: "رامي أبو زيد", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 90, name: "سارة عماد", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 91, name: "أحمد عبد الله", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 92, name: "نور الدين سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 93, name: "هالة عبد الكريم", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 94, name: "أحمد شريف", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 95, name: "خالد حمدي", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 96, name: "مايا ناصر", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 97, name: "أحمد جلال", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 98, name: "جمال لطفي", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 99, name: "شيماء علي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 100, name: "سمير أمين", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    },
    "اللجنة العلمية والتكنولوجية": {
        "الأول": [
            { id: 101, name: "سعاد خليل", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 102, name: "علي حسني", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 103, name: "طارق زكي", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 104, name: "ليلى عبد الله", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم اساسية" }
        ],
        "الثاني": [
            { id: 105, name: "مجدي صلاح", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 106, name: "أماني جابر", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 107, name: "أحمد فتحي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 108, name: "سلمى نبيل", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الثالث": [
            { id: 109, name: "محمد أمين", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 110, name: "نجلاء حمدي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
            { id: 111, name: "مصطفى رجب", photo: "../../images/candidates/candidate1.jpg", faculty: "علاج طبيعي" },
            { id: 112, name: "أنس حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ],
        "الرابع": [
            { id: 113, name: "سمر عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 114, name: "إيمان رمضان", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" },
            { id: 115, name: "علي حمدي", photo: "../../images/candidates/candidate1.jpg", faculty: "علوم وهندسة الحاسب" },
            { id: 116, name: "عائشة حسن", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" }
        ],
        "الخامس": [
            { id: 117, name: "عمرو سعيد", photo: "../../images/candidates/candidate1.jpg", faculty: "صحة عامة" },
            { id: 118, name: "عز الدين علي", photo: "../../images/candidates/candidate1.jpg", faculty: "اسنان" },
            { id: 119, name: "منار سامي", photo: "../../images/candidates/candidate1.jpg", faculty: "فنون وتصميم" },
            { id: 120, name: "سارة عادل", photo: "../../images/candidates/candidate1.jpg", faculty: "اعمال" }
        ]
    }
            };

            // Return the committee data for the specified level
            return Object.entries(committeesData).map(([committeeName, levels]) => ({
                name: committeeName,
                candidates: levels[level] || []
            }));
        }
    }
};
</script>

<style scoped>
.committee-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
}

.candidate-item {
    display: flex;
    align-items: center;
}

.candidate-photo {
    margin-right: 10px;
}

.candidate-photo img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.candidate-details {
    display: flex;
    flex-direction: column;
}

.candidate-name {
    font-weight: bold;
}

.candidate-faculty {
    font-size: 12px;
    color: #666;
}
</style>
