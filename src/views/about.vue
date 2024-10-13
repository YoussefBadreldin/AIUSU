<template>
    <div>
        <HeaderComponent />
        <div class="container">
            <div class="video-container mt-4">
                <iframe width="350" height="180" src="https://www.youtube.com/embed/h_i07JhOqq4?si=QGQ1iOwr-trBwPmn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <h2 class="text-center my-4">عن اتحاد الطلاب </h2>
            <p>
                يعد اتحاد الطلاب أحد أركان الحياة الجامعية في مصر. يهدف إلى تفعيل مشاركة الطلاب في الأنشطة المختلفة، وتنمية قدراتهم في القيادة، والمسؤولية، والعمل الجماعي. يعمل وفقاً لقوانين ولوائح وزارة التعليم العالي والبحث العلمي.
            </p>
<br>
            <h3 class="my-4">الأهداف الرئيسية لاتحاد الطلاب</h3>
            <ul>
                <li>- تمثيل الطلاب أمام الهيئات الجامعية وإدارة الجامعة، والعمل على تلبية احتياجاتهم والدفاع عن حقوقهم.</li>
                <br>
                <li>- تنظيم الفعاليات الثقافية، الرياضية، والعلمية التي تهدف إلى تطوير مهارات الطلاب وتعزيز مشاركتهم.</li>
                <br>
                <li>- إتاحة الفرصة للطلاب للمشاركة في صنع القرار داخل الجامعة من خلال الهيئات الطلابية المختلفة.</li>
                <br>
                <li>- تعزيز قيم الانتماء والمواطنة من خلال الأنشطة الاجتماعية والمجتمعية.</li>
            </ul>

<br>
            <h3 class="my-4">آداب وقواعد اتحاد الطلاب</h3>
            <ul>
                <li>- الاحترام المتبادل: التعامل بأدب واحترام مع جميع أعضاء هيئة التدريس والهيئة المعاونة والإداريين والطلاب.</li>
                <br>
                <li>- الالتزام باللوائح والقوانين: احترام القوانين والسياسات المعمول بها في الجامعة وحث الطلاب على احترامها.</li>
                <br>
                <li>- العمل الجماعي: التعاون مع الأعضاء لتحقيق الأهداف المرجوة.</li>
                <br>
                <li>- التمثيل الأمين للطلاب: نقل احتياجات الطلاب بصدق وبدون تحيز.</li>
                <br>
                <li>- المشاركة الفعالة: حضور الاجتماعات والمشاركة في الأنشطة لتجنب سحب الثقة.</li>
                <br>
                <li>- تشجيع المشاركة الطلابية: حث الطلاب على المشاركة في الأنشطة.</li>
                <br>
            </ul>

            <h3 class="my-4">لجان اتحاد الطلاب</h3>
            <ul>
                <li>
                    <strong>لجنة الأسر</strong>
                    <img src="../../images/clubs.jpg" alt="لجنة الأسر" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الاجتماعية مثل:</p>
                </li>
                <li>
                    <strong>اللجنة الرياضية</strong>
                    <img src="../../images/sports.jpg" alt="اللجنة الرياضية" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الرياضية مثل:</p>
                </li>
                <li>
                    <strong>اللجنة الثقافية والإعلامية</strong>
                    <img src="../../images/cultural.jpg" alt="اللجنة الثقافية والإعلامية" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الثقافية والإعلامية مثل:</p>
                </li>
                <li>
                    <strong>اللجنة الفنية</strong>
                    <img src="../../images/arts.jpg" alt="اللجنة الفنية" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الفنية مثل:</p>
                </li>
                <li>
                    <strong>لجنة الجوالة والخدمة العامة</strong>
                    <img src="../../images/scout.jpg" alt="لجنة الجوالة والخدمة العامة" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الخدمية والمجتمعية مثل:</p>
                </li>
                <li>
                    <strong>اللجنة الاجتماعية والرحلات</strong>
                    <img src="../../images/social.jpg" alt="اللجنة الاجتماعية" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة الاجتماعية والرحلات مثل:</p>
                </li>
                <li>
                    <strong>اللجنة العلمية والتكنولوجية</strong>
                    <img src="../../images/scientific.jpg" alt="اللجنة العلمية والتكنولوجية" class="committee-image">
                    <p>تركز هذه اللجنة على الأنشطة العلمية والتكنولوجية مثل:</p>
                </li>
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
img {
    margin-top: 10px;
    border-radius: 8px; /* Optional: to make the images look nicer */
}
.committee-image {
    width: 600px; /* Fixed width */
    height: 400px; /* Fixed height */
    object-fit: cover; /* Ensures the image covers the set area without distortion */
    display: block;
    margin: 0 auto; /* Centers the images */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 1024px) {
    /* Reduce padding and font sizes for laptops */
    .container {
        padding: 15px;
    }
    p, ul {
        font-size: 1rem;
    }
    .committee-image {
        width: 450px;
        height: 300px;
    }
}

@media (max-width: 768px) {
    /* Adjust layout for tablets */
    .container {
        padding: 10px;
    }
    h2, h3 {
        font-size: 1.5rem;
    }
    p, ul {
        font-size: 0.95rem;
    }
    .committee-image {
        width: 350px;
        height: 230px;
    }
}

@media (max-width: 480px) {
    /* Further scaling down for mobile phones */
    .container {
        padding-right: 30px;
    }
    h2, h3 {
        font-size: 1.3rem;
        text-align: center; /* Center align headers for a cleaner look on small screens */
    }
    p, ul {
        font-size: 0.85rem;
        line-height: 1.4;
    }
    .committee-image {
        width: 100%; /* Make images full width for mobile */
        height: auto; /* Let the height scale proportionally */
    }
}
</style>
