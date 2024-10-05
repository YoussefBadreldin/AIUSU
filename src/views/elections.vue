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

            const validUniversityNumbers = ["20100294", "20100297", "20100357", "21100837", "21100796", "21100822"];
            
            if (!validUniversityNumbers.includes(this.universityNumber)) {
                this.errorMessage = 'الرقم الذي أدخلته غير صحيح، يرجى التحقق منه';
                return;
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
            this.committees = await this.fetchCommitteesByLevel(exampleData.level);
        },

        async fetchCommitteesByLevel(level) {
            const committeesData = {
                "لجنة الأسر": {
                    "الأول": [
                        { id: 1, name: "أحمد علي", photo: "../../images/candidates/candidate1.jpg", faculty: "صيدلة" },
                        { id: 2, name: "سارة محمود", photo: "../../images/candidates/candidate2.jpg", faculty: "اسنان" },
                        { id: 3, name: "خالد مصطفى", photo: "../../images/candidates/candidate3.jpg", faculty: "صحة عامة" },
                        { id: 4, name: "منى حسين", photo: "../../images/candidates/candidate4.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 5, name: "محمود سالم", photo: "../../images/candidates/candidate5.jpg", faculty: "علاج طبيعي" },
                        { id: 6, name: "إبراهيم يوسف", photo: "../../images/candidates/candidate6.jpg", faculty: "اعمال" },
                        { id: 7, name: "أمل علي", photo: "../../images/candidates/candidate7.jpg", faculty: "فنون وتصميم" },
                        { id: 8, name: "سامي أحمد", photo: "../../images/candidates/candidate8.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 9, name: "خالد ناصر", photo: "../../images/candidates/candidate9.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 10, name: "إيمان حسن", photo: "../../images/candidates/candidate10.jpg", faculty: "صيدلة" },
                        { id: 11, name: "علي سيد", photo: "../../images/candidates/candidate11.jpg", faculty: "علاج طبيعي" },
                        { id: 12, name: "مروة جمال", photo: "../../images/candidates/candidate12.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 13, name: "نادر علي", photo: "../../images/candidates/candidate13.jpg", faculty: "فنون وتصميم" },
                        { id: 14, name: "ياسمين سامي", photo: "../../images/candidates/candidate14.jpg", faculty: "اعمال" },
                        { id: 15, name: "محمد جمال", photo: "../../images/candidates/candidate15.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 16, name: "خالد حسن", photo: "../../images/candidates/candidate16.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 17, name: "محمود علي", photo: "../../images/candidates/candidate17.jpg", faculty: "صحة عامة" },
                        { id: 18, name: "فاطمة سيد", photo: "../../images/candidates/candidate18.jpg", faculty: "اسنان" },
                        { id: 19, name: "نورا محمود", photo: "../../images/candidates/candidate19.jpg", faculty: "فنون وتصميم" },
                        { id: 20, name: "عبد الله جمال", photo: "../../images/candidates/candidate20.jpg", faculty: "اعمال" }
                    ]
                },
                "اللجنة الرياضية": {
                    "الأول": [
                        { id: 21, name: "حسام علي", photo: "../../images/candidates/candidate21.jpg", faculty: "صيدلة" },
                        { id: 22, name: "مروان مصطفى", photo: "../../images/candidates/candidate22.jpg", faculty: "اسنان" },
                        { id: 23, name: "عبد الرحمن علي", photo: "../../images/candidates/candidate23.jpg", faculty: "صحة عامة" },
                        { id: 24, name: "أحمد محمد", photo: "../../images/candidates/candidate24.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 25, name: "سليم محمود", photo: "../../images/candidates/candidate25.jpg", faculty: "علاج طبيعي" },
                        { id: 26, name: "شيماء حسن", photo: "../../images/candidates/candidate26.jpg", faculty: "اعمال" },
                        { id: 27, name: "هشام سعد", photo: "../../images/candidates/candidate27.jpg", faculty: "فنون وتصميم" },
                        { id: 28, name: "رؤى أحمد", photo: "../../images/candidates/candidate28.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 29, name: "أميرة سامي", photo: "../../images/candidates/candidate29.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 30, name: "حسن مجدي", photo: "../../images/candidates/candidate30.jpg", faculty: "صيدلة" },
                        { id: 31, name: "جميلة ناصر", photo: "../../images/candidates/candidate31.jpg", faculty: "علاج طبيعي" },
                        { id: 32, name: "زيد محمد", photo: "../../images/candidates/candidate32.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 33, name: "ياسمين أحمد", photo: "../../images/candidates/candidate33.jpg", faculty: "فنون وتصميم" },
                        { id: 34, name: "خالد حمدي", photo: "../../images/candidates/candidate34.jpg", faculty: "اعمال" },
                        { id: 35, name: "سعاد حسن", photo: "../../images/candidates/candidate35.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 36, name: "سعيد علي", photo: "../../images/candidates/candidate36.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 37, name: "أماني أحمد", photo: "../../images/candidates/candidate37.jpg", faculty: "صحة عامة" },
                        { id: 38, name: "فاطمة سعيد", photo: "../../images/candidates/candidate38.jpg", faculty: "اسنان" },
                        { id: 39, name: "علي كريم", photo: "../../images/candidates/candidate39.jpg", faculty: "فنون وتصميم" },
                        { id: 40, name: "أحمد عمر", photo: "../../images/candidates/candidate40.jpg", faculty: "اعمال" }
                    ]
                },
                "اللجنة الثقافية": {
                    "الأول": [
                        { id: 41, name: "علياء نبيل", photo: "../../images/candidates/candidate41.jpg", faculty: "صيدلة" },
                        { id: 42, name: "أحمد هشام", photo: "../../images/candidates/candidate42.jpg", faculty: "اسنان" },
                        { id: 43, name: "مريم سامي", photo: "../../images/candidates/candidate43.jpg", faculty: "صحة عامة" },
                        { id: 44, name: "باسل عادل", photo: "../../images/candidates/candidate44.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 45, name: "دينا سعيد", photo: "../../images/candidates/candidate45.jpg", faculty: "علاج طبيعي" },
                        { id: 46, name: "إسلام مجدي", photo: "../../images/candidates/candidate46.jpg", faculty: "اعمال" },
                        { id: 47, name: "أميرة عادل", photo: "../../images/candidates/candidate47.jpg", faculty: "فنون وتصميم" },
                        { id: 48, name: "فريدة سعيد", photo: "../../images/candidates/candidate48.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 49, name: "مصطفى طه", photo: "../../images/candidates/candidate49.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 50, name: "هالة مصطفى", photo: "../../images/candidates/candidate50.jpg", faculty: "صيدلة" },
                        { id: 51, name: "منال علي", photo: "../../images/candidates/candidate51.jpg", faculty: "علاج طبيعي" },
                        { id: 52, name: "يوسف سعيد", photo: "../../images/candidates/candidate52.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 53, name: "عمر عبد الله", photo: "../../images/candidates/candidate53.jpg", faculty: "فنون وتصميم" },
                        { id: 54, name: "فاطمة جاد", photo: "../../images/candidates/candidate54.jpg", faculty: "اعمال" },
                        { id: 55, name: "ناهد يوسف", photo: "../../images/candidates/candidate55.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 56, name: "رامي سامي", photo: "../../images/candidates/candidate56.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 57, name: "سعاد توفيق", photo: "../../images/candidates/candidate57.jpg", faculty: "صحة عامة" },
                        { id: 58, name: "كريم أحمد", photo: "../../images/candidates/candidate58.jpg", faculty: "اسنان" },
                        { id: 59, name: "علا حسين", photo: "../../images/candidates/candidate59.jpg", faculty: "فنون وتصميم" },
                        { id: 60, name: "جلال نور", photo: "../../images/candidates/candidate60.jpg", faculty: "اعمال" }
                    ]
                },
                "اللجنة الاجتماعية": {
                    "الأول": [
                        { id: 61, name: "صلاح الدين", photo: "../../images/candidates/candidate61.jpg", faculty: "صيدلة" },
                        { id: 62, name: "سارة محمد", photo: "../../images/candidates/candidate62.jpg", faculty: "اسنان" },
                        { id: 63, name: "منى جمال", photo: "../../images/candidates/candidate63.jpg", faculty: "صحة عامة" },
                        { id: 64, name: "حمزة سعيد", photo: "../../images/candidates/candidate64.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 65, name: "شريف زين", photo: "../../images/candidates/candidate65.jpg", faculty: "علاج طبيعي" },
                        { id: 66, name: "نور علي", photo: "../../images/candidates/candidate66.jpg", faculty: "اعمال" },
                        { id: 67, name: "أسماء لطفي", photo: "../../images/candidates/candidate67.jpg", faculty: "فنون وتصميم" },
                        { id: 68, name: "أحمد صبري", photo: "../../images/candidates/candidate68.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 69, name: "رفعت أيمن", photo: "../../images/candidates/candidate69.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 70, name: "ليلى سمير", photo: "../../images/candidates/candidate70.jpg", faculty: "صيدلة" },
                        { id: 71, name: "فريدة توفيق", photo: "../../images/candidates/candidate71.jpg", faculty: "علاج طبيعي" },
                        { id: 72, name: "سمير غريب", photo: "../../images/candidates/candidate72.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 73, name: "مجدي عبد الرازق", photo: "../../images/candidates/candidate73.jpg", faculty: "فنون وتصميم" },
                        { id: 74, name: "سوسن مجدي", photo: "../../images/candidates/candidate74.jpg", faculty: "اعمال" },
                        { id: 75, name: "علياء أنور", photo: "../../images/candidates/candidate75.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 76, name: "تامر ناصر", photo: "../../images/candidates/candidate76.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 77, name: "فاطمة محمد", photo: "../../images/candidates/candidate77.jpg", faculty: "صحة عامة" },
                        { id: 78, name: "مصطفى عادل", photo: "../../images/candidates/candidate78.jpg", faculty: "اسنان" },
                        { id: 79, name: "سماح خليل", photo: "../../images/candidates/candidate79.jpg", faculty: "فنون وتصميم" },
                        { id: 80, name: "خالد أيمن", photo: "../../images/candidates/candidate80.jpg", faculty: "اعمال" }
                    ]
                },
                "لجنة الجوالة والخدمة العامة": {
                    "الأول": [
                        { id: 81, name: "أيمن السعيد", photo: "../../images/candidates/candidate81.jpg", faculty: "صيدلة" },
                        { id: 82, name: "فؤاد أسامة", photo: "../../images/candidates/candidate82.jpg", faculty: "اسنان" },
                        { id: 83, name: "سلمى ناصر", photo: "../../images/candidates/candidate83.jpg", faculty: "صحة عامة" },
                        { id: 84, name: "نجلاء سليم", photo: "../../images/candidates/candidate84.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 85, name: "محمود حسين", photo: "../../images/candidates/candidate85.jpg", faculty: "علاج طبيعي" },
                        { id: 86, name: "عزة يونس", photo: "../../images/candidates/candidate86.jpg", faculty: "اعمال" },
                        { id: 87, name: "سلمى العطار", photo: "../../images/candidates/candidate87.jpg", faculty: "فنون وتصميم" },
                        { id: 88, name: "أحمد صلاح", photo: "../../images/candidates/candidate88.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 89, name: "حمزة ناصر", photo: "../../images/candidates/candidate89.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 90, name: "إسراء زكريا", photo: "../../images/candidates/candidate90.jpg", faculty: "صيدلة" },
                        { id: 91, name: "ليلى عادل", photo: "../../images/candidates/candidate91.jpg", faculty: "علاج طبيعي" },
                        { id: 92, name: "معتز فتحي", photo: "../../images/candidates/candidate92.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 93, name: "محمد سعيد", photo: "../../images/candidates/candidate93.jpg", faculty: "فنون وتصميم" },
                        { id: 94, name: "عائشة حمدي", photo: "../../images/candidates/candidate94.jpg", faculty: "اعمال" },
                        { id: 95, name: "خليل أسامة", photo: "../../images/candidates/candidate95.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 96, name: "سارة جلال", photo: "../../images/candidates/candidate96.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 97, name: "علياء إبراهيم", photo: "../../images/candidates/candidate97.jpg", faculty: "صحة عامة" },
                        { id: 98, name: "فريد محمد", photo: "../../images/candidates/candidate98.jpg", faculty: "اسنان" },
                        { id: 99, name: "غادة نور", photo: "../../images/candidates/candidate99.jpg", faculty: "فنون وتصميم" },
                        { id: 100, name: "حسن سامي", photo: "../../images/candidates/candidate100.jpg", faculty: "اعمال" }
                    ]
                },
                "اللجنة العلمية والتكنولوجية": {
                    "الأول": [
                        { id: 101, name: "علي أسامة", photo: "../../images/candidates/candidate101.jpg", faculty: "صيدلة" },
                        { id: 102, name: "نور الدين", photo: "../../images/candidates/candidate102.jpg", faculty: "اسنان" },
                        { id: 103, name: "أميرة فرج", photo: "../../images/candidates/candidate103.jpg", faculty: "صحة عامة" },
                        { id: 104, name: "سحر جمال", photo: "../../images/candidates/candidate104.jpg", faculty: "علوم اساسية" }
                    ],
                    "الثاني": [
                        { id: 105, name: "فتحي حسن", photo: "../../images/candidates/candidate105.jpg", faculty: "علاج طبيعي" },
                        { id: 106, name: "جيهان صلاح", photo: "../../images/candidates/candidate106.jpg", faculty: "اعمال" },
                        { id: 107, name: "أحمد فاروق", photo: "../../images/candidates/candidate107.jpg", faculty: "فنون وتصميم" },
                        { id: 108, name: "هالة أيمن", photo: "../../images/candidates/candidate108.jpg", faculty: "صيدلة" }
                    ],
                    "الثالث": [
                        { id: 109, name: "حسن منصور", photo: "../../images/candidates/candidate109.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 110, name: "شيماء أسامة", photo: "../../images/candidates/candidate110.jpg", faculty: "صيدلة" },
                        { id: 111, name: "نجاح سعيد", photo: "../../images/candidates/candidate111.jpg", faculty: "علاج طبيعي" },
                        { id: 112, name: "علي عبيد", photo: "../../images/candidates/candidate112.jpg", faculty: "اعمال" }
                    ],
                    "الرابع": [
                        { id: 113, name: "هشام ممدوح", photo: "../../images/candidates/candidate113.jpg", faculty: "فنون وتصميم" },
                        { id: 114, name: "عائشة فؤاد", photo: "../../images/candidates/candidate114.jpg", faculty: "اعمال" },
                        { id: 115, name: "عبد الله زين", photo: "../../images/candidates/candidate115.jpg", faculty: "علوم وهندسة الحاسب" },
                        { id: 116, name: "سمية زكريا", photo: "../../images/candidates/candidate116.jpg", faculty: "صيدلة" }
                    ],
                    "الخامس": [
                        { id: 117, name: "باسم أشرف", photo: "../../images/candidates/candidate117.jpg", faculty: "صحة عامة" },
                        { id: 118, name: "أسماء عاطف", photo: "../../images/candidates/candidate118.jpg", faculty: "اسنان" },
                        { id: 119, name: "عبد الله عادل", photo: "../../images/candidates/candidate119.jpg", faculty: "فنون وتصميم" },
                        { id: 120, name: "إيهاب زين", photo: "../../images/candidates/candidate120.jpg", faculty: "اعمال" }
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
