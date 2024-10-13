<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <div class="video-container mt-4">
            <iframe width="350" height="180" src="https://www.youtube.com/embed/h_i07JhOqq4?si=QGQ1iOwr-trBwPmn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <h2 class="text-center my-4">عن اتحاد الطلاب </h2>
            <p>
                يعد اتحاد الطلاب أحد أركان الحياة الجامعية في مصر. يهدف إلى تفعيل مشاركة الطلاب في الأنشطة المختلفة، وتنمية قدراتهم في القيادة، والمسؤولية، والعمل الجماعي. يعمل الاتحاد وفقاً لقوانين ولوائح وزارة التعليم العالي والبحث العلمي.
            </p>
            
            <h3 class="my-4">الأهداف الرئيسية لاتحاد الطلاب</h3>
            <ul>
                <li>تمثيل الطلاب أمام الهيئات الجامعية وإدارة الجامعة، والعمل على تلبية احتياجاتهم والدفاع عن حقوقهم.</li>
                <li>تنظيم الفعاليات الثقافية، الرياضية، والعلمية التي تهدف إلى تطوير مهارات الطلاب وتعزيز مشاركتهم.</li>
                <li>إتاحة الفرصة للطلاب للمشاركة في صنع القرار داخل الجامعة من خلال الهيئات الطلابية المختلفة.</li>
                <li>تعزيز قيم الانتماء والمواطنة من خلال الأنشطة الاجتماعية والمجتمعية.</li>
            </ul>

            <h3 class="my-4">اللجان الأساسية لاتحاد الطلاب</h3>
            <ul>
                <li><strong>لجنة الأسر:</strong></li>
                <br>
                <li><strong>اللجنة الرياضية:</strong></li>
                <br>
                <li><strong>اللجنة الثقافية والاعلامية:</strong></li>
                <br>
                <li><strong>اللجنة الفنية:</strong></li>
                <br>
                <li><strong>اللجنة الاجتماعية:</strong></li>
                <br>
                <li><strong>لجنة الجوالة والخدمة العامة:</strong></li>
                <br>
                <li><strong>اللجنة العلمية والتكنولوجية:</strong></li>
            </ul>
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
    },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.container {
    padding: 20px;
    direction: rtl; /* Set text direction to RTL */
}
h2, h3 {
    color: #343a40;
}
ul {
    list-style-type: disc;
    padding-left: 20px;
}
p, ul {
    font-size: 1.1rem;
    line-height: 1.6;
}
</style>
