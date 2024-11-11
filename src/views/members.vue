<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">أعضاء الاتحاد</h2>
            <div class="organization-chart">
                <div class="position president">
                    <div class="profile">
                        <img :src="`../../images/students/${president.member_id}.jpg`" :alt="president.member_name" class="circle-photo" v-if="president.member_id" />
                    </div>
                    <div class="details">
                        <div class="name">{{ president.member_name || 'جاري التحميل..' }}</div>
                        <div class="title">رئيس الاتحاد</div>
                        <div class="faculty">{{ president.member_faculty ? `كلية ${president.member_faculty}` : 'جاري التحميل..' }}</div>
                        <div class="level">{{ president.member_level || 'جاري التحميل..' }}</div>
                    </div>
                    <div class="subordinates">
                        <div class="position vice-president">
                            <div class="profile">
                                <img :src="`../../images/students/${vicePresident.member_id}.jpg`" :alt="vicePresident.member_name" class="circle-photo" v-if="vicePresident.member_id" />
                            </div>
                            <div class="details">
                                <div class="name">{{ vicePresident.member_name || 'جاري التحميل..' }}</div>
                                <div class="title">نائب رئيس الاتحاد</div>
                                <div class="faculty">{{ vicePresident.member_faculty ? `كلية ${vicePresident.member_faculty}` : 'جاري التحميل..' }}</div>
                                <div class="level">{{ vicePresident.member_level || 'جاري التحميل..' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="executive-committee">
                <div v-for="(committee, key) in committees" :key="key" class="committee-box">
                    <div class="committee-title">{{ committee.title }}</div>
                    <div class="committee-content">
                        <div class="position head">
                            <div class="profile">
                                <img :src="`../../images/students/${heads[committee.headKey].member_id}.jpg`" :alt="heads[committee.headKey].member_name" class="circle-photo" v-if="heads[committee.headKey].member_id" />
                            </div>
                            <div class="details">
                                <div class="name">{{ heads[committee.headKey].member_name || 'جاري التحميل..' }}</div>
                                <div class="title">أمين اللجنة</div>
                                <div class="faculty">{{ heads[committee.headKey].member_faculty ? `كلية ${heads[committee.headKey].member_faculty}` : 'جاري التحميل..' }}</div>
                                <div class="level">{{ heads[committee.headKey].member_level || 'جاري التحميل..' }}</div>
                            </div>
                            <div class="subordinates">
                                <div class="position vice-head">
                                    <div class="profile">
                                        <img :src="`../../images/students/${viceHeads[committee.viceHeadKey].member_id}.jpg`" :alt="viceHeads[committee.viceHeadKey].member_name" class="circle-photo" v-if="viceHeads[committee.viceHeadKey].member_id" />
                                    </div>
                                    <div class="details">
                                        <div class="name">{{ viceHeads[committee.viceHeadKey].member_name || 'جاري التحميل..' }}</div>
                                        <div class="title">أمين مساعد اللجنة</div>
                                        <div class="faculty">{{ viceHeads[committee.viceHeadKey].member_faculty ? `كلية ${viceHeads[committee.viceHeadKey].member_faculty}` : 'جاري التحميل..' }}</div>
                                        <div class="level">{{ viceHeads[committee.viceHeadKey].member_level || 'جاري التحميل..' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="members">
                            <div class="member" v-for="member in members[committee.memberKey]" :key="member.member_id">
                                <div class="profile">
                                    <img :src="`../../images/students/${member.member_id}.jpg`" :alt="member.member_name" class="circle-photo" v-if="member.member_id" />
                                </div>
                                <div class="details">
                                    <div class="name">{{ member.member_name || 'جاري التحميل..' }}</div>
                                    <div class="title">عضو باللجنة</div>
                                    <div class="faculty">{{ member.member_faculty ? `كلية ${member.member_faculty}` : 'جاري التحميل..' }}</div>
                                    <div class="level">{{ member.member_level || 'جاري التحميل..' }}</div>
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
    name: 'FindCommittee',
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            president: {},
            vicePresident: {},
            heads: {
                Head_Scout: {},
                Head_Scientific: {},
                Head_Cultural: {},
                Head_Clubs: {},
                Head_Arts: {},
                Head_Sports: {},
                Head_Social: {},
            },
            viceHeads: {
                Vice_Scout: {},
                Vice_Scientific: {},
                Vice_Cultural: {},
                Vice_Clubs: {},
                Vice_Arts: {},
                Vice_Sports: {},
                Vice_Social: {},
            },
            members: {
                Member_Scout: [],
                Member_Scientific: [],
                Member_Cultural: [],
                Member_Clubs: [],
                Member_Arts: [],
                Member_Sports: [],
                Member_Social: [],
            },
            loading: true,
            errorMessage: '',
            studentsMap: {},
            committees: [
                { title: 'لجنة الأسر', headKey: 'Head_Clubs', viceHeadKey: 'Vice_Clubs', memberKey: 'Member_Clubs' },
                { title: 'اللجنة الرياضية', headKey: 'Head_Sports', viceHeadKey: 'Vice_Sports', memberKey: 'Member_Sports' },
                { title: 'اللجنة الثقافية والاعلامية', headKey: 'Head_Cultural', viceHeadKey: 'Vice_Cultural', memberKey: 'Member_Cultural' },
                { title: 'اللجنة الاجتماعية', headKey: 'Head_Social', viceHeadKey: 'Vice_Social', memberKey: 'Member_Social' },
                { title: 'اللجنة الفنية', headKey: 'Head_Arts', viceHeadKey: 'Vice_Arts', memberKey: 'Member_Arts' },
                { title: 'اللجنة العلمية والتكنولوجية', headKey: 'Head_Scientific', viceHeadKey: 'Vice_Scientific', memberKey: 'Member_Scientific' },
                { title: 'لجنة الجوالة والخدمة العامة', headKey: 'Head_Scout', viceHeadKey: 'Vice_Scout', memberKey: 'Member_Scout' },
            ],
        };
    },
    mounted() {
        window.scrollTo(0, 0);
        this.loadMemberData();
    },
    methods: {
        async loadMemberData() {
            try {
                await this.loadStudentData();
                const response = await fetch('https://aiusu-backend.vercel.app/members');
                if (!response.ok) throw new Error('Failed to fetch member data');
                const memberData = await response.json();
                this.organizeMembers(memberData);
                this.loading = false;
            } catch (error) {
                this.errorMessage = 'خطأ في تحميل بيانات الأعضاء';
                console.error('Error loading member data:', error);
                this.loading = false;
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
            }
        },

        organizeMembers(members) {
            members.forEach(member => {
                const studentInfo = this.studentsMap[member.member_id];
                if (studentInfo) {
                    member.member_name = studentInfo.student_name;
                    member.member_faculty = studentInfo.student_faculty;
                    member.member_level = studentInfo.student_level;
                } else {
                    member.member_name = 'غير معروف';
                    member.member_faculty = 'غير معروف';
                    member.member_level = 'غير معروف';
                }
            });

            this.president = members.find(m => m.member_title === 'President') || {};
            this.vicePresident = members.find(m => m.member_title === 'Vice') || {};

            const titles = [
                'Head_Scout', 'Head_Scientific', 'Head_Cultural', 'Head_Clubs',
                'Head_Arts', 'Head_Sports', 'Head_Social'
            ];
            const viceTitles = [
                'Vice_Scout', 'Vice_Scientific', 'Vice_Cultural', 'Vice_Clubs',
                'Vice_Arts', 'Vice_Sports', 'Vice_Social'
            ];

            titles.forEach(title => {
                this.heads[title] = members.find(m => m.member_title === title) || {};
            });

            viceTitles.forEach(title => {
                this.viceHeads[title] = members.find(m => m.member_title === title) || {};
            });

            this.members['Member_Scout'] = members.filter(m => m.member_title === 'Member_Scout') || [];
            this.members['Member_Scientific'] = members.filter(m => m.member_title === 'Member_Scientific') || [];
            this.members['Member_Cultural'] = members.filter(m => m.member_title === 'Member_Cultural') || [];
            this.members['Member_Clubs'] = members.filter(m => m.member_title === 'Member_Clubs') || [];
            this.members['Member_Arts'] = members.filter(m => m.member_title === 'Member_Arts') || [];
            this.members['Member_Sports'] = members.filter(m => m.member_title === 'Member_Sports') || [];
            this.members['Member_Social'] = members.filter(m => m.member_title === 'Member_Social') || [];
        },
    },
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

/* Ensure uniform size for names and limit to 2 lines */
.name {
    font-weight: bold;
    color: #0e116c; /* Change to your desired color */
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit the name to 2 lines */
    -webkit-box-orient: vertical; /* Ensure the text is treated as a vertical box */
    overflow: hidden; /* Hide the overflowing text */
    text-align: center;
    word-break: break-word; /* Allow breaking of long words */
    hyphens: auto; /* Enable hyphenation for better word distribution */
    white-space: normal; /* Allow normal wrapping */
}

/* Ensure uniform size for titles */
.title {
    font-weight: bold;
    color: #cb2025;
    font-size: 1rem; /* Set all titles to the same size */
}

/* Ensure uniform size for committee titles */
.committee-title {
    font-weight: bold;
    font-size: 1.2rem; /* Set uniform size for committee titles */
    text-align: center;
    margin-bottom: 10px;
}

/* Ensure uniform size for faculty */
.faculty {
    font-size: 0.7rem; /* Set all faculty to the same size */
}

/* Ensure uniform size for levels */
.level {
    font-size: 0.8rem; /* Set all levels to the same size */
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
    width: calc(50% - 10px); /* 2 boxes per row */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; /* Include padding and border in element's total width and height */
}

.committee-content {
    display: flex;
    flex-direction: column;
}

.members {
    display: flex;
    flex-wrap: wrap; /* Allow members to wrap to the next line */
    justify-content: space-between; /* Distribute space between members */
}

/* Default member styling */
.member {
    width: calc(25% - 10px); /* 4 members per row with space */
    margin-bottom: 10px; /* Add some space between rows */
    box-sizing: border-box; /* Include padding and borders in width */
    text-align: center; /* Center member details */
}

/* Media Queries for Smaller Screens */
@media (max-width: 768px) {
    .committee-box {
        width: calc(50% - 20px); /* 2 boxes per row on tablets */
    }

    .member {
        width: calc(25% - 10px); /* 4 members per row on tablets */
    }

    .name, .title, .faculty, .level {
        font-size: 0.9rem; /* Slightly smaller font size on tablets */
    }

    .committee-title {
        font-size: 1rem; /* Reduce font size for committee titles */
    }

    .circle-photo {
        width: 60px; /* Adjust size for smaller screens */
        height: 60px; /* Ensure it’s a circle */
    }
}

@media (max-width: 576px) {
    .committee-box {
        width: 100%; /* 1 box per row on mobile */
    }

    .members {
        flex-direction: row; /* Ensure members are in a row on mobile */
        justify-content: space-between; /* Distribute members evenly */
    }

    .member {
        width: calc(25% - 10px); /* 4 members per row on mobile */
        margin-bottom: 10px; /* Maintain spacing between rows */
    }

    .name, .title, .faculty, .level {
        font-size: 0.4rem; /* Further reduce font size on small screens */
    }

    .committee-title {
        font-size: 0.9rem; /* Further reduce font size for committee titles */
    }

    .circle-photo {
        width: 60px; /* Maintain the circle size */
        height: 60px; /* Ensure it’s a circle */
    }
}
</style>