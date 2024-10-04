<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">ابحث عن لجنتك الانتخابية</h2>
            <form @submit.prevent="findCommittee">
                <div class="mb-3">
                    <label for="universityNumber" class="form-label">رقمك الجامعي:</label>
                    <input type="text" v-model="universityNumber" class="form-control" id="universityNumber" required />
                </div>
                <button type="submit" class="btn btn-primary">إبحث</button>
            </form>
            <div v-if="committeeInfo" class="mt-4">
                <h4>معلومات لجنتك:</h4>
                <p>الاسم: {{ committeeInfo.name }}</p>
                <p>الكلية: {{ committeeInfo.faculty }}</p>
                <p>الرقم الجامعي: {{ committeeInfo.universityNumber }}</p>
                <p>المستوى: {{ committeeInfo.level }}</p>
                <p>مكان اللجنة: {{ committeeInfo.committeeLocation }}</p>
                <p>رقمك في الكشف: {{ committeeInfo.listNumber }}</p>
                <h5>المرشحين:</h5>
                <ul>
                    <li v-for="candidate in committeeInfo.candidates" :key="candidate.id">
                        <img :src="candidate.photo" alt="مرشح" style="width: 50px; height: auto;"/>
                        {{ candidate.name }}
                    </li>
                </ul>
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
            committeeInfo: null
        };
    },
    methods: {
        async findCommittee() {
            // هنا هتضيف الكود الخاص بالبحث في قاعدة البيانات
            // لنموذج مبدئي، سنقوم بتعيين معلومات اللجنة يدويًا
            const exampleData = {
                name: "محمد أحمد",
                faculty: "الهندسة",
                universityNumber: this.universityNumber,
                level: "الثالث",
                committeeLocation: "قاعة 101",
                listNumber: "5",
                candidates: [
                    { id: 1, name: "علي مصطفى", photo: "../../images/candidates/candidate1.jpg" },
                    { id: 2, name: "سارة أحمد", photo: "../../images/candidates/candidate2.jpg" },
                ]
            };
            this.committeeInfo = exampleData;
        }
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>
