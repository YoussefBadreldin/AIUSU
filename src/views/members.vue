<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">مجلس الاتحاد</h2>
            <div class="organization-chart">
                <div class="position president">
                    <div class="profile">
                        <img src="../../images/members/Test.jpg" alt="رئيس الاتحاد" class="circle-photo" />
                    </div>
                    <div class="details">
                        <div class="name">أحمد علي</div>
                        <div class="title">رئيس الاتحاد</div>
                        <div class="faculty"> صيدلة</div>
                        <div class="level">المستوى 5</div>
                    </div>
                    <div class="subordinates">
                        <div class="position vice-president">
                            <div class="profile">
                                <img src="../../images/members/Test.jpg" alt="نائب رئيس الاتحاد" class="circle-photo" />
                            </div>
                            <div class="details">
                                <div class="name">محمد حسن</div>
                                <div class="title">نائب رئيس الاتحاد</div>
                                <div class="faculty"> علوم أساسية</div>
                                <div class="level">المستوى 4</div>
                            </div>
                            <div class="subordinates">
                                <div class="position head" v-for="(committee, index) in committees" :key="index">
                                    <div class="profile">
                                        <img src="../../images/members/Test.jpg" alt="أمين {{ committee.name }}" class="circle-photo" />
                                    </div>
                                    <div class="details">
                                        <div class="name">حمودة</div>
                                        <div class="title">أمين {{ committee.name }}</div>
                                        <div class="faculty"> {{ committee.faculty }}</div>
                                        <div class="level">المستوى {{ committee.level }}</div>
                                    </div>
                                    <div class="subordinates">
                                        <div class="position vice-head">
                                            <div class="profile">
                                                <img src="../../images/members/Test.jpg" alt="أمين مساعد {{ committee.name }}" class="circle-photo" />
                                            </div>
                                            <div class="details">
                                                <div class="name">شدودة</div>
                                                <div class="title">أمين مساعد {{ committee.name }}</div>
                                                <div class="faculty"> {{ committee.faculty }}</div>
                                                <div class="level">المستوى {{ committee.level }}</div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="text-center my-4">المكاتب التنفيذية للجان الأنشطة</h2>
            <div class="executive-committee">
                <div class="committee-box" v-for="(committee, index) in committees" :key="index">
                    <div class="committee-title">{{ committee.name }}</div>
                    <div class="committee-content">
                        <div class="position head">
                            <div class="profile">
                                <img src="../../images/members/Test.jpg" alt="أمين اللجنة" class="circle-photo" />
                            </div>
                            <div class="details">
                                <div class="name">حسونة</div>
                                <div class="title">أمين اللجنة</div>
                                <div class="faculty"> {{ committee.faculty }}</div>
                                <div class="level">المستوى {{ committee.level }}</div>
                            </div>
                            <div class="subordinates">
                                <div class="position vice-head">
                                    <div class="profile">
                                        <img src="../../images/members/Test.jpg" alt="أمين مساعد اللجنة" class="circle-photo" />
                                    </div>
                                    <div class="details">
                                        <div class="name">فتوحة</div>
                                        <div class="title">أمين مساعد اللجنة</div>
                                        <div class="faculty"> {{ committee.faculty }}</div>
                                        <div class="level">المستوى {{ committee.level }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="members">
                            <div class="member" v-for="member in committee.members" :key="member.id">
                                <div class="profile">
                                    <img src="../../images/members/Test.jpg" alt="عضو باللجنة" class="circle-photo" />
                                </div>
                                <div class="details">
                                    <div class="name">{{ member.name }}</div>
                                    <div class="title">عضو باللجنة</div>
                                    <div class="faculty"> {{ committee.faculty }}</div>
                                    <div class="level">المستوى {{ committee.level }}</div>
                                </div>
                            </div>
                        </div>
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
    name: 'JoinUnion',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            committees: [
                {
                    name: 'لجنة الأسر',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'صيدلة',
                    level: 5,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'اللجنة الرياضية',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'علوم أساسية',
                    level: 4,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'اللجنة الثقافية والإعلامية',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'صحة عامة',
                    level: 3,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'اللجنة الفنية',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'فنون وتصميم',
                    level: 4,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'لجنة الجوالة والخدمة العامة',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'صحة عامة',
                    level: 3,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'اللجنة الاجتماعية والرحلات',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'أعمال',
                    level: 5,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
                {
                    name: 'اللجنة العلمية والتكنولوجية',
                    headImage: '../../images/members/Test.jpg',
                    viceHeadImage: '../../images/members/Test.jpg',
                    faculty: 'علوم أساسية',
                    level: 4,
                    members: [
                        { id: 1, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 2, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 3, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 4, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                        { id: 5, name: 'رأفت شريف', image: '../../images/members/Test.jpg' },
                        { id: 6, name: 'علياء فؤاد', image: '../../images/members/Test.jpg' },
                        { id: 7, name: 'سامح خليل', image: '../../images/members/Test.jpg' },
                        { id: 8, name: 'مرام سمير', image: '../../images/members/Test.jpg' },
                    ],
                },
            ],
        };
    },
    mounted() {
        window.scrollTo(0, 0);
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
    direction: rtl; /* Set the text direction to RTL */
}
.organization-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}
.position {
    margin: 10px 0;
    text-align: center;
}
.profile {
    margin: 10px;
}
.circle-photo {
    border-radius: 50%;
    width: 80px; /* Adjust size as necessary */
    height: 80px; /* Ensure it’s a circle */
}
.details {
    padding: 5px;
}
.name {
    font-weight: bold;
}
.title {
    font-weight: bold;
}
.subordinates {
    display: flex;
    justify-content: center;
}
.executive-committee {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping to create multiple rows */
    justify-content: space-between; /* Distribute space between committee boxes */
    gap: 10px; /* Optional: Add some spacing between boxes */
}
.committee-box {
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 10px;
    width: calc(33.33% - 20px); /* 3 boxes per row minus margin */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Include padding and border in element's total width and height */
}
.committee-title {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 10px;
}
.committee-content {
    display: flex;
    flex-direction: column;
}
.members {
    display: flex;
    flex-wrap: wrap; /* Allow members to wrap to the next line */
    justify-content: space-around; /* Center members with space around */
}

.member {
    width: 25%; /* 4 members per row */
    margin-bottom: 10px; /* Add some space between rows */
    box-sizing: border-box; /* Include padding and borders in width */
    text-align: center; /* Center member details */
}
@media (max-width: 768px) {
    .committee-box {
        width: calc(50% - 20px); /* 2 boxes per row on tablets */
    }
}
@media (max-width: 576px) {
    .committee-box {
        width: 100%; /* 1 box per row on mobile */
    }
    .title {
        font-size: 0.8rem; /* Reduce font size on small screens */
    }
    .committee-box {
        width: 100%; /* 1 box per row on mobile */
    }
    .title, .name, .committee-title {
        font-size: 0.45rem; /* Reduce font size on small screens */
    }
    
    h2 {
        font-size: 1.8rem; /* Reduce heading size on mobile */
    }
    .details {
        font-size: 0.45rem; /* Reduce overall details font size */
    }
}

</style>
