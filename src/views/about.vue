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
                <li><strong>لجنة الأسر:</strong> تهتم بتكوين الأسر الطلابية وتنسيق الأنشطة بين أعضائها.</li>
                <li><strong>اللجنة الرياضية:</strong> تنظم البطولات الرياضية والمسابقات على مستوى الجامعة.</li>
                <li><strong>اللجنة الثقافية:</strong> مسؤولة عن تنظيم الفعاليات الثقافية مثل الندوات والمحاضرات والمسابقات الأدبية.</li>
                <li><strong>اللجنة الاجتماعية:</strong> تهتم بتنظيم الأنشطة الاجتماعية والرحلات وتقديم الدعم للطلاب ذوي الاحتياجات الخاصة.</li>
                <li><strong>لجنة الجوالة والخدمة العامة:</strong> تعمل على تنظيم الأنشطة الكشفية وخدمة المجتمع.</li>
                <li><strong>اللجنة العلمية والتكنولوجية:</strong> تهدف إلى تعزيز الابتكار والبحث العلمي بين الطلاب.</li>
            </ul>

            <h3 class="my-4">الأنشطة التي ينظمها اتحاد الطلاب</h3>
            <ul>
                <li>تنظيم الأنشطة الرياضية مثل دوري الجامعات والبطولات المحلية والدولية.</li>
                <li>إقامة الندوات العلمية والمحاضرات الثقافية لتعزيز المعرفة بين الطلاب.</li>
                <li>تنظيم الرحلات والمعسكرات لتطوير العلاقات بين الطلاب وتعزيز الروح الجماعية.</li>
                <li>المشاركة في تنظيم المبادرات المجتمعية والخيرية، والمساهمة في تقديم خدمات للبيئة الجامعية والمجتمع الخارجي.</li>
            </ul>

            <h3 class="my-4">الانتخابات الطلابية</h3>
            <p>
                تُجرى انتخابات اتحاد الطلاب سنوياً في كافة الجامعات المصرية لاختيار ممثلي الطلاب في اللجان المختلفة. تبدأ عملية الانتخابات بفتح باب الترشح، ثم الإعلان عن الكشوف المبدئية والنهائية للمرشحين، مروراً بيوم الانتخابات، وأخيراً إعلان النتائج.
            </p>

            <p class="mt-4">
                اتحاد الطلاب هو الوسيلة التي يتم من خلالها تفعيل دور الطلاب في الحياة الجامعية. يساهم في تنمية الشخصية الطلابية من خلال الأنشطة المتنوعة، بالإضافة إلى كونه مساحة للتعبير عن آراء الطلاب وتمثيلهم داخل الجامعة.
            </p>
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
