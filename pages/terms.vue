<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
          {{ $t('termsOfService') }}
        </h1>
        <p class="text-lg dark:text-[#A9B4C6] text-[#5A6A85]">
          {{ $t('lastUpdated') }}: {{ formattedDate }}
        </p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg dark:prose-invert max-w-none">
        <!-- Educational Purpose Disclaimer -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('educationalPurpose') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              <strong>{{ $t('disclaimer') }}:</strong> {{ $t('educationalPurposeText') }}
            </p>
            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p class="text-yellow-800 dark:text-yellow-200 font-medium">
                ⚠️ {{ $t('importantNotice') }}
              </p>
            </div>
          </div>
        </section>

        <!-- No Warranty -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('noWarranty') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              <strong>{{ $t('noWarrantyTitle') }}:</strong> {{ $t('noWarrantyText') }}
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>{{ $t('warrantyPoint1') }}</li>
              <li>{{ $t('warrantyPoint2') }}</li>
              <li>{{ $t('warrantyPoint3') }}</li>
              <li>{{ $t('warrantyPoint4') }}</li>
            </ul>
            <p>
              <strong>{{ $t('limitationOfLiability') }}:</strong> {{ $t('limitationText') }}
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>{{ $t('liabilityPoint1') }}</li>
              <li>{{ $t('liabilityPoint2') }}</li>
              <li>{{ $t('liabilityPoint3') }}</li>
              <li>{{ $t('liabilityPoint4') }}</li>
            </ul>
          </div>
        </section>

        <!-- Data Accuracy -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('dataAndInformation') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              <strong>{{ $t('simulatedData') }}:</strong> {{ $t('simulatedDataText') }}
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>{{ $t('dataPoint1') }}</li>
              <li>{{ $t('dataPoint2') }}</li>
              <li>{{ $t('dataPoint3') }}</li>
              <li>{{ $t('dataPoint4') }}</li>
            </ul>
            <p>
              {{ $t('verifyInformation') }}
            </p>
          </div>
        </section>

        <!-- Acceptable Use -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('acceptableUse') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              {{ $t('byUsingPlatform') }}
            </p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li>{{ $t('usePoint1') }}</li>
              <li>{{ $t('usePoint2') }}</li>
              <li>{{ $t('usePoint3') }}</li>
              <li>{{ $t('usePoint4') }}</li>
              <li>{{ $t('usePoint5') }}</li>
            </ul>
          </div>
        </section>

        <!-- Intellectual Property -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('intellectualProperty') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              {{ $t('intellectualPropertyText') }}
            </p>
          </div>
        </section>

        <!-- Contact -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-4">
            {{ $t('contactInformation') }}
          </h2>
          <div class="dark:text-[#A9B4C6] text-[#5A6A85] space-y-4">
            <p>
              {{ $t('contactText') }}
            </p>
          </div>
        </section>

        <!-- Acknowledgement -->
        <section class="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 class="text-lg font-semibold dark:text-[#F1F5FF] text-[#1A1A1A] mb-2">
            {{ $t('acknowledgement') }}
          </h3>
          <p class="dark:text-[#A9B4C6] text-[#5A6A85]">
            {{ $t('acknowledgementText') }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

// Define translations for this page
const { $i18n } = useNuxtApp()

$i18n.mergeLocaleMessage('en', {
  termsOfService: 'Terms of Service',
  lastUpdated: 'Last updated',
  educationalPurpose: '1. Educational Purpose Only',
  disclaimer: 'Disclaimer',
  educationalPurposeText: 'The SKO GEOHYDRO PORTAL is developed and maintained solely for educational and academic research purposes. The platform, including all data, visualizations, analyses, and content provided herein, is intended for educational use only.',
  importantNotice: 'Important Notice: This platform and its data should NOT be used for real-world decision-making, operational purposes, or any critical applications.',
  noWarranty: '2. No Warranty and Limitation of Liability',
  noWarrantyTitle: 'No Warranty',
  noWarrantyText: 'The platform is provided "as is" without any warranties, express or implied. We make no representations or warranties of any kind regarding:',
  warrantyPoint1: 'The accuracy, completeness, or reliability of any data presented',
  warrantyPoint2: 'The suitability of the information for any particular purpose',
  warrantyPoint3: 'The uninterrupted or error-free operation of the platform',
  warrantyPoint4: 'The correctness of any analyses, visualizations, or interpretations',
  limitationOfLiability: 'Limitation of Liability',
  limitationText: 'The authors, developers, and affiliated institutions shall not be held liable for any damages, losses, or consequences arising from:',
  liabilityPoint1: 'Use or misuse of the information provided on this platform',
  liabilityPoint2: 'Any decisions made based on the data or analyses presented',
  liabilityPoint3: 'Technical issues, data inaccuracies, or platform unavailability',
  liabilityPoint4: 'Any third-party use or interpretation of the platform\'s content',
  dataAndInformation: '3. Data and Information',
  simulatedData: 'Simulated/Educational Data',
  simulatedDataText: 'The hydrogeological data presented on this platform may include:',
  dataPoint1: 'Simulated or synthetic data for educational purposes',
  dataPoint2: 'Sample data sets for demonstration',
  dataPoint3: 'Historical data that may not reflect current conditions',
  dataPoint4: 'Data from various sources with varying levels of verification',
  verifyInformation: 'Users should verify any critical information through official sources before relying on it for any purpose beyond educational exploration.',
  acceptableUse: '4. Acceptable Use',
  byUsingPlatform: 'By using this platform, you agree to:',
  usePoint1: 'Use the platform solely for educational and academic purposes',
  usePoint2: 'Not rely on the information for real-world decision making',
  usePoint3: 'Not hold the authors liable for any consequences of platform use',
  usePoint4: 'Cite the platform appropriately in academic work',
  usePoint5: 'Respect the educational nature of this resource',
  intellectualProperty: '5. Intellectual Property',
  intellectualPropertyText: 'All platform code, design, and original content are protected by copyright. Educational use is permitted with proper attribution. Commercial use requires explicit permission.',
  contactInformation: '6. Contact Information',
  contactText: 'For questions about these terms or the educational nature of this platform, please contact us through the platform\'s communication channels.',
  acknowledgement: 'Acknowledgement',
  acknowledgementText: 'By using the SKO GEOHYDRO PORTAL, you acknowledge that you have read, understood, and agree to these Terms of Service, particularly recognizing the educational nature of this platform and the limitations of liability described herein.'
})

$i18n.mergeLocaleMessage('ru', {
  termsOfService: 'Условия обслуживания',
  lastUpdated: 'Последнее обновление',
  educationalPurpose: '1. Только для образовательных целей',
  disclaimer: 'Отказ от ответственности',
  educationalPurposeText: 'SKO GEOHYDRO PORTAL разрабатывается и поддерживается исключительно для образовательных и академических исследовательских целей. Платформа, включая все данные, визуализации, анализы и контент, предоставляемые здесь, предназначена только для образовательного использования.',
  importantNotice: 'Важное уведомление: Эта платформа и ее данные НЕ должны использоваться для принятия решений в реальном мире, операционных целей или любых критических приложений.',
  noWarranty: '2. Отсутствие гарантий и ограничение ответственности',
  noWarrantyTitle: 'Отсутствие гарантий',
  noWarrantyText: 'Платформа предоставляется "как есть" без каких-либо гарантий, явных или подразумеваемых. Мы не даем никаких заверений или гарантий любого рода относительно:',
  warrantyPoint1: 'Точности, полноты или надежности любых представленных данных',
  warrantyPoint2: 'Пригодности информации для любой конкретной цели',
  warrantyPoint3: 'Бесперебойной или безошибочной работы платформы',
  warrantyPoint4: 'Правильности любых анализов, визуализаций или интерпретаций',
  limitationOfLiability: 'Ограничение ответственности',
  limitationText: 'Авторы, разработчики и аффилированные учреждения не несут ответственности за любой ущерб, убытки или последствия, возникающие в результате:',
  liabilityPoint1: 'Использования или неправильного использования информации, предоставленной на этой платформе',
  liabilityPoint2: 'Любых решений, принятых на основе представленных данных или анализов',
  liabilityPoint3: 'Технических проблем, неточностей данных или недоступности платформы',
  liabilityPoint4: 'Любого использования или интерпретации контента платформы третьими сторонами',
  dataAndInformation: '3. Данные и информация',
  simulatedData: 'Симулированные/Образовательные данные',
  simulatedDataText: 'Гидрогеологические данные, представленные на этой платформе, могут включать:',
  dataPoint1: 'Симулированные или синтетические данные для образовательных целей',
  dataPoint2: 'Примеры наборов данных для демонстрации',
  dataPoint3: 'Исторические данные, которые могут не отражать текущие условия',
  dataPoint4: 'Данные из различных источников с разным уровнем проверки',
  verifyInformation: 'Пользователи должны проверять любую критически важную информацию через официальные источники, прежде чем полагаться на нее для любых целей, выходящих за рамки образовательного исследования.',
  acceptableUse: '4. Приемлемое использование',
  byUsingPlatform: 'Используя эту платформу, вы соглашаетесь:',
  usePoint1: 'Использовать платформу исключительно для образовательных и академических целей',
  usePoint2: 'Не полагаться на информацию для принятия решений в реальном мире',
  usePoint3: 'Не привлекать авторов к ответственности за любые последствия использования платформы',
  usePoint4: 'Надлежащим образом цитировать платформу в академической работе',
  usePoint5: 'Уважать образовательный характер этого ресурса',
  intellectualProperty: '5. Интеллектуальная собственность',
  intellectualPropertyText: 'Весь код платформы, дизайн и оригинальный контент защищены авторским правом. Образовательное использование разрешено при условии правильного указания авторства. Коммерческое использование требует явного разрешения.',
  contactInformation: '6. Контактная информация',
  contactText: 'По вопросам, касающимся этих условий или образовательного характера этой платформы, пожалуйста, свяжитесь с нами через каналы связи платформы.',
  acknowledgement: 'Подтверждение',
  acknowledgementText: 'Используя SKO GEOHYDRO PORTAL, вы подтверждаете, что прочитали, поняли и согласны с этими Условиями обслуживания, в частности признавая образовательный характер этой платформы и описанные здесь ограничения ответственности.'
})

$i18n.mergeLocaleMessage('kk', {
  termsOfService: 'Қызмет көрсету шарттары',
  lastUpdated: 'Соңғы жаңартылған',
  educationalPurpose: '1. Тек білім беру мақсатында',
  disclaimer: 'Жауапкершіліктен бас тарту',
  educationalPurposeText: 'SKO GEOHYDRO PORTAL тек білім беру және академиялық зерттеу мақсаттары үшін әзірленген және қолдау көрсетіледі. Бұл платформа, оның ішінде барлық деректер, визуализациялар, талдаулар және контент тек білім беру үшін арналған.',
  importantNotice: 'Маңызды хабарлама: Бұл платформа және оның деректері нақты әлемдегі шешім қабылдау, операциялық мақсаттар немесе кез келген критикалық қолданбалар үшін пайдаланылмауы керек.',
  noWarranty: '2. Кепілдік жоқ және жауапкершілікті шектеу',
  noWarrantyTitle: 'Кепілдік жоқ',
  noWarrantyText: 'Платформа кез келген кепілдіктерсіз, ашық немесе жанама түрде "өз күйінде" ұсынылады. Біз кез келген түрдегі келесі тұстар бойынша ешқандай бейнелемелер немесе кепілдіктер бермейміз:',
  warrantyPoint1: 'Көрсетілген кез келген деректердің дәлдігі, толықтығы немесе сенімділігі',
  warrantyPoint2: 'Ақпараттың белгілі бір мақсатқа жарамдылығы',
  warrantyPoint3: 'Платформаның үздіксіз немесе қатесіз жұмыс істеуі',
  warrantyPoint4: 'Кез келген талдаулардың, визуализациялардың немесе түсіндірулердің дұрыстығы',
  limitationOfLiability: 'Жауапкершілікті шектеу',
  limitationText: 'Авторлар, әзірлеушілер және серіктестік мекемелер келесі себептерден туындаған кез келген залалдар, шығындар немесе салдарлар үшін жауапты болмайды:',
  liabilityPoint1: 'Бұл платформада ұсынылған ақпаратты пайдалану немесе теріс пайдалану',
  liabilityPoint2: 'Көрсетілген деректер немесе талдаулар негізінде қабылданған кез келген шешімдер',
  liabilityPoint3: 'Техникалық проблемалар, деректердің дәлсіздігі немесе платформаның қолжетімсіздігі',
  liabilityPoint4: 'Платформа контентін үшінші тараптардың кез келген пайдалануы немесе түсіндіруі',
  dataAndInformation: '3. Деректер және ақпарат',
  simulatedData: 'Симуляцияланған/Білім беру деректері',
  simulatedDataText: 'Бұл платформада ұсынылған гидрогеологиялық деректер мыналарды қамтуы мүмкін:',
  dataPoint1: 'Білім беру мақсаттары үшін симуляцияланған немесе синтетикалық деректер',
  dataPoint2: 'Демонстрация үшін үлгі деректер жинақтары',
  dataPoint3: 'Ағымдағы жағдайларды көрсетпеуі мүмкін тарихи деректер',
  dataPoint4: 'Тексеру деңгейі әртүрлі әртүрлі дереккөздерден алынған деректер',
  verifyInformation: 'Пайдаланушылар білім беру зерттеулерінен тыс кез келген мақсаттар үшін сену алдында кез келген критикалық ақпаратты ресми дереккөздер арқылы тексеруі керек.',
  acceptableUse: '4. Қабылданатын пайдалану',
  byUsingPlatform: 'Бұл платформаны пайдалана отырып, сіз келесіге келісесіз:',
  usePoint1: 'Платформаны тек білім беру және академиялық мақсаттар үшін пайдалану',
  usePoint2: 'Нақты әлемдегі шешім қабылдау үшін ақпаратқа сенбеу',
  usePoint3: 'Платформаны пайдалану салдары үшін авторларды жауапты етпеу',
  usePoint4: 'Академиялық жұмыста платформаны тиісті түрде дәйектеу',
  usePoint5: 'Бұл ресурстың білім беру сипатын құрметтеу',
  intellectualProperty: '5. Зияткерлік меншік',
  intellectualPropertyText: 'Платформаның барлық коды, дизайны және түпнұсқа контенті авторлық құқықпен қорғалады. Білім беру мақсатында пайдалану дұрыс атрибуциямен рұқсат етілген. Коммерциялық пайдалану айқын рұқсатты талап етеді.',
  contactInformation: '6. Байланыс ақпараты',
  contactText: 'Осы шарттар немесе бұл платформаның білім беру сипаты туралы сұрақтарыңыз болса, платформаның байланыс арналары арқылы бізбен хабарласыңыз.',
  acknowledgement: 'Мойындау',
  acknowledgementText: 'SKO GEOHYDRO PORTAL-ды пайдалана отырып, сіз осы Қызмет көрсету шарттарын оқығаныңызды, түсінгеніңізді және келіскеніңізді, атап айтқанда бұл платформаның білім беру сипатын және мұнда сипатталған жауапкершілікті шектеуді мойындайсыз.'
})

const formattedDate = new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})

useSeoMeta({
  title: 'Terms of Service - SKO GEOHYDRO PORTAL',
  description: 'Educational disclaimer and terms of service for the SKO GEOHYDRO PORTAL platform'
})
</script>