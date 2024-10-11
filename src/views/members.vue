<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">مجلس الاتحاد</h2>
            <div class="organization-chart">
                <div class="position president">
                    <div class="title">رئيس الاتحاد</div>
                    <div class="subordinates">
                        <div class="position vice-president">
                            <div class="title">نائب رئيس الاتحاد</div>
                            <div class="subordinates">
                                <div class="position head" v-for="(committee, index) in committees" :key="index">
                                    <div class="title">أمين {{ committee.name }}</div>
                                    <div class="subordinates">
                                        <div class="position vice-head">
                                            <div class="title">أمين مساعد {{ committee.name }}</div>
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
                            <div class="title">أمين اللجنة</div>
                            <div class="subordinates">
                                <div class="position vice-head">
                                    <div class="title">أمين مساعد اللجنة</div>
                                    <div class="members">
                                        <div class="member" v-for="memberIndex in 8" :key="memberIndex">
                                            <div class="title">عضو باللجنة</div>
                                        </div>
                                    </div>
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
                { name: 'لجنة الأسر' },
                { name: 'اللجنة الرياضية' },
                { name: 'اللجنة الثقافية والإعلامية' },
                { name: 'اللجنة الفنية' },
                { name: 'لجنة الجوالة والخدمة العامة' },
                { name: 'اللجنة الاجتماعية والرحلات' },
                { name: 'اللجنة العلمية والتكنولوجية' },
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
.title {
    font-weight: bold;
    padding: 5px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #f8f9fa;
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
    justify-content: space-around;
    flex-wrap: wrap;
}
.member {
    margin: 5px;
    padding: 5px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
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
}
</style>
