<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <h2 class="text-center my-4">إنضم إلى الإتحاد</h2>
            <p>في هذه الصفحة، يمكنك شرح كيفية الترشح للاتحاد...</p>
            <p>تفاصيل متعلقة بالمستندات المطلوبة، المواعيد النهائية، وآلية التقديم.</p>
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
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
}
</style>
