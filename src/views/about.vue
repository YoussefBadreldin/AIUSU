<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">عن اتحاد الطلاب</h2>
            <p>هنا يمكنك إضافة محتوى عن الاتحاد ولجانه...</p>
            <p>مثلاً، دور الاتحاد، أهدافه، والأنشطة التي ينظمها.</p>
        </div>
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../public/global/headerComponent.vue';
import FooterComponent from '../../public/global/footerComponent.vue';

export default {
    name: 'AboutUnion',
    components: {
        HeaderComponent,
        FooterComponent,
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>
