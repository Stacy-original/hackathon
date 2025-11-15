// composables/useTranslations.ts

// Define the translation keys for TypeScript
type TranslationKey = 
  | 'welcome'
  | 'viewInteractiveMap'
  | 'pathogenInformation'
  | 'waterQualityParameters'
  | 'monitoringSites'
  | 'dataCollection'
  | 'parameters'
  | 'systemUptime'
  | 'northKazakhstanWaterPortal'
  | 'monitoringHydrological'
  | 'waterLevel'
  | 'monitorCurrentWater'
  | 'waterTransparency'
  | 'analyzeClarity'
  | 'temperature'
  | 'trackWaterTemperature'
  | 'electricalConductivity'
  | 'measureSalinity'
  | 'pathogenRisk'
  | 'assessContamination'
  | 'interactiveMap'
  | 'exploreAllMonitoring'
  | 'petropavlSKO'
  | 'petropavlNorthernKazakhstan'
  | 'coordinates'
  | 'waterLevelMeters'
  | 'waterTransparencyMeters'
  | 'waterTemperature'
  | 'electricalConductivityUnit'
  | 'metersSecchiDepth'
  | 'meters'
  | 'degreesCelsius'
  | 'microsiemensPerCm'
  | 'pathogensRisk'
  // Sidebar translations
  | 'home'
  | 'report'
  | 'information'
  | 'maps'
  | 'levelOfWater'
  | 'transparency'
  | 'temperatureShort'
  | 'electricalConductivityShort'
  | 'search'
  | 'allRightsReserved'
  // Reports page translations
  | 'waterConditionReports'
  | 'helpUsMonitor'
  | 'submitNewReport'
  | 'reportType'
  | 'locationName'
  | 'coordinatesOptional'
  | 'description'
  | 'severityLevel'
  | 'emailOptional'
  | 'phoneOptional'
  | 'submitReport'
  | 'submitting'
  | 'recentCommunityReports'
  | 'refresh'
  | 'loadingReports'
  | 'noReportsYet'
  | 'pollution'
  | 'algaeBloom'
  | 'unusualOdor'
  | 'colorChange'
  | 'flooding'
  | 'wildlifeImpact'
  | 'other'
  | 'low'
  | 'medium'
  | 'high'
  | 'critical'
  | 'pending'
  | 'reviewed'
  | 'resolved'

// Define the structure of our translations
interface Translations {
  en: Record<TranslationKey, string>
  ru: Record<TranslationKey, string>
  kk: Record<TranslationKey, string>
}

export const useTranslations = () => {
  const translations: Translations = {
    en: {
      welcome: 'Welcome',
      viewInteractiveMap: 'View Interactive Map',
      pathogenInformation: 'Pathogen Information',
      waterQualityParameters: 'Water Quality Parameters',
      monitoringSites: 'Monitoring Sites',
      dataCollection: 'Data Collection',
      parameters: 'Parameters',
      systemUptime: 'System Uptime',
      northKazakhstanWaterPortal: 'North Kazakhstan Water Portal',
      monitoringHydrological: 'Monitoring hydrological parameters and water quality across reservoirs in the Petropavlovsk region',
      waterLevel: 'Water Level',
      monitorCurrentWater: 'Monitor current water levels and historical trends in regional reservoirs',
      waterTransparency: 'Water Transparency',
      analyzeClarity: 'Analyze clarity and turbidity measurements across different water bodies',
      temperature: 'Temperature',
      trackWaterTemperature: 'Track water temperature variations and thermal patterns',
      electricalConductivity: 'Electrical Conductivity',
      measureSalinity: 'Measure salinity and mineral content through conductivity readings',
      pathogenRisk: 'Pathogen Risk',
      assessContamination: 'Assess contamination levels and potential health risks',
      interactiveMap: 'Interactive Map',
      exploreAllMonitoring: 'Explore all monitoring locations and real-time data visualization',
      petropavlSKO: 'Petropavl (SKO)',
      petropavlNorthernKazakhstan: 'Petropavl, Northern Kazakhstan',
      coordinates: 'Coordinates',
      waterLevelMeters: 'Water level',
      waterTransparencyMeters: 'Water transparency',
      waterTemperature: 'Water temperature',
      electricalConductivityUnit: 'Electrical conductivity',
      metersSecchiDepth: 'meters Secchi depth',
      meters: 'meters',
      degreesCelsius: '°C',
      microsiemensPerCm: 'µS/cm',
      pathogensRisk: 'Pathogens risk',
      // Sidebar translations
      home: 'Home',
      report: 'Report',
      information: 'Information',
      maps: 'Maps',
      levelOfWater: 'Level of Water',
      transparency: 'Transparency',
      temperatureShort: 'Temperature',
      electricalConductivityShort: 'Electrical Conductivity',
      search: 'Search...',
      allRightsReserved: 'All rights reserved',
      // Reports page translations
      waterConditionReports: 'Water Condition Reports',
      helpUsMonitor: 'Help us monitor water quality by reporting unusual conditions, pollution, or changes in your local water bodies',
      submitNewReport: 'Submit a New Report',
      reportType: 'Report Type',
      locationName: 'Location Name',
      coordinatesOptional: 'Coordinates (Optional)',
      description: 'Description',
      severityLevel: 'Severity Level',
      emailOptional: 'Email (Optional)',
      phoneOptional: 'Phone (Optional)',
      submitReport: 'Submit Report',
      submitting: 'Submitting...',
      recentCommunityReports: 'Recent Community Reports',
      refresh: 'Refresh',
      loadingReports: 'Loading reports...',
      noReportsYet: 'No reports yet. Be the first to submit one!',
      pollution: 'Pollution',
      algaeBloom: 'Algae Bloom',
      unusualOdor: 'Unusual Odor',
      colorChange: 'Color Change',
      flooding: 'Flooding',
      wildlifeImpact: 'Wildlife Impact',
      other: 'Other',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
      pending: 'pending',
      reviewed: 'reviewed',
      resolved: 'resolved'
    },
    ru: {
      welcome: 'Добро пожаловать',
      viewInteractiveMap: 'Посмотреть интерактивную карту',
      pathogenInformation: 'Информация о патогенах',
      waterQualityParameters: 'Параметры качества воды',
      monitoringSites: 'Мониторинговые точки',
      dataCollection: 'Сбор данных',
      parameters: 'Параметры',
      systemUptime: 'Время работы системы',
      northKazakhstanWaterPortal: 'Водный портал Северного Казахстана',
      monitoringHydrological: 'Мониторинг гидрологических параметров и качества воды в водоемах Петропавловского региона',
      waterLevel: 'Уровень воды',
      monitorCurrentWater: 'Мониторинг текущих уровней воды и исторических тенденций в региональных водоемах',
      waterTransparency: 'Прозрачность воды',
      analyzeClarity: 'Анализ измерений прозрачности и мутности в различных водных объектах',
      temperature: 'Температура',
      trackWaterTemperature: 'Отслеживание изменений температуры воды и тепловых режимов',
      electricalConductivity: 'Электропроводность',
      measureSalinity: 'Измерение солености и минерального содержания через показания проводимости',
      pathogenRisk: 'Риск патогенов',
      assessContamination: 'Оценка уровней загрязнения и потенциальных рисков для здоровья',
      interactiveMap: 'Интерактивная карта',
      exploreAllMonitoring: 'Исследуйте все точки мониторинга и визуализацию данных в реальном времени',
      petropavlSKO: 'Петропавловск (СКО)',
      petropavlNorthernKazakhstan: 'Петропавловск, Северный Казахстан',
      coordinates: 'Координаты',
      waterLevelMeters: 'Уровень воды',
      waterTransparencyMeters: 'Прозрачность воды',
      waterTemperature: 'Температура воды',
      electricalConductivityUnit: 'Электропроводность',
      metersSecchiDepth: 'метров (диск Секки)',
      meters: 'метров',
      degreesCelsius: '°C',
      microsiemensPerCm: 'мкСм/см',
      pathogensRisk: 'Риск патогенов',
      // Sidebar translations
      home: 'Главная',
      report: 'Отчет',
      information: 'Информация',
      maps: 'Карты',
      levelOfWater: 'Уровень воды',
      transparency: 'Прозрачность',
      temperatureShort: 'Температура',
      electricalConductivityShort: 'Электропроводность',
      search: 'Поиск...',
      allRightsReserved: 'Все права защищены',
      // Reports page translations
      waterConditionReports: 'Отчеты о состоянии воды',
      helpUsMonitor: 'Помогите нам контролировать качество воды, сообщая о необычных условиях, загрязнении или изменениях в местных водных объектах',
      submitNewReport: 'Отправить новый отчет',
      reportType: 'Тип отчета',
      locationName: 'Название места',
      coordinatesOptional: 'Координаты (необязательно)',
      description: 'Описание',
      severityLevel: 'Уровень серьезности',
      emailOptional: 'Email (необязательно)',
      phoneOptional: 'Телефон (необязательно)',
      submitReport: 'Отправить отчет',
      submitting: 'Отправка...',
      recentCommunityReports: 'Недавние отчеты сообщества',
      refresh: 'Обновить',
      loadingReports: 'Загрузка отчетов...',
      noReportsYet: 'Пока нет отчетов. Будьте первым!',
      pollution: 'Загрязнение',
      algaeBloom: 'Цветение водорослей',
      unusualOdor: 'Необычный запах',
      colorChange: 'Изменение цвета',
      flooding: 'Наводнение',
      wildlifeImpact: 'Влияние на дикую природу',
      other: 'Другое',
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      critical: 'Критический',
      pending: 'в ожидании',
      reviewed: 'рассмотрен',
      resolved: 'решено'
    },
    kk: {
      welcome: 'Қош келдіңіз',
      viewInteractiveMap: 'Интерактивті картаны қарау',
      pathogenInformation: 'Патогендер туралы ақпарат',
      waterQualityParameters: 'Су сапасы параметрлері',
      monitoringSites: 'Мониторинг нүктелері',
      dataCollection: 'Деректер жинау',
      parameters: 'Параметрлер',
      systemUptime: 'Жүйенің жұмыс уақыты',
      northKazakhstanWaterPortal: 'Солтүстік Қазақстан су порталы',
      monitoringHydrological: 'Петропавл аймағындағы су қоймаларының гидрологиялық параметрлері мен су сапасын мониторинг',
      waterLevel: 'Су деңгейі',
      monitorCurrentWater: 'Аймақтық су қоймаларындағы ағымдағы су деңгейлері мен тарихи тенденцияларды бақылау',
      waterTransparency: 'Су өткізгіштігі',
      analyzeClarity: 'Әртүрлі су объектілеріндегі мөлдірлік пен ластық өлшемдерін талдау',
      temperature: 'Температура',
      trackWaterTemperature: 'Су температурасының өзгерулерін және жылу режимдерін бақылау',
      electricalConductivity: 'Электр өткізгіштік',
      measureSalinity: 'Өткізгіштік көрсеткіштері арқылы тұздылық пен минералдық құрамды өлшеу',
      pathogenRisk: 'Патогендер қауіпі',
      assessContamination: 'Ластану деңгейлерін және денсаулыққа әлеуетті тәуекелдерді бағалау',
      interactiveMap: 'Интерактивті карта',
      exploreAllMonitoring: 'Барлық мониторинг нүктелерін зерттеңіз және нақты уақыт режимінде деректерді визуализациялаңыз',
      petropavlSKO: 'Петропавл (СҚО)',
      petropavlNorthernKazakhstan: 'Петропавл, Солтүстік Қазахстан',
      coordinates: 'Координаттар',
      waterLevelMeters: 'Су деңгейі',
      waterTransparencyMeters: 'Су өткізгіштігі',
      waterTemperature: 'Су температурасы',
      electricalConductivityUnit: 'Электр өткізгіштік',
      metersSecchiDepth: 'метр (Секки дискісі)',
      meters: 'метр',
      degreesCelsius: '°C',
      microsiemensPerCm: 'мкСм/см',
      pathogensRisk: 'Патогендер қауіпі',
      // Sidebar translations
      home: 'Басты',
      report: 'Есеп',
      information: 'Ақпарат',
      maps: 'Карталар',
      levelOfWater: 'Су деңгейі',
      transparency: 'Өткізгіштік',
      temperatureShort: 'Температура',
      electricalConductivityShort: 'Электр өткізгіштік',
      search: 'Іздеу...',
      allRightsReserved: 'Барлық құқықтар қорғалған',
      // Reports page translations
      waterConditionReports: 'Су жағдайы туралы есептер',
      helpUsMonitor: 'Жергілікті су объектілеріндегі ерекше жағдайлар, ластану немесе өзгерістер туралы хабарлау арқылы су сапасын бақылауға көмектесіңіз',
      submitNewReport: 'Жаңа есепті жіберу',
      reportType: 'Есеп түрі',
      locationName: 'Орналасқан жер атауы',
      coordinatesOptional: 'Координаттар (міндетті емес)',
      description: 'Сипаттама',
      severityLevel: 'Маңыздылық деңгейі',
      emailOptional: 'Электрондық пошта (міндетті емес)',
      phoneOptional: 'Телефон (міндетті емес)',
      submitReport: 'Есепті жіберу',
      submitting: 'Жіберілуде...',
      recentCommunityReports: 'Қауымдастықтың соңғы есептері',
      refresh: 'Жаңарту',
      loadingReports: 'Есептер жүктелуде...',
      noReportsYet: 'Әлі есептер жоқ. Бірінші болыңыз!',
      pollution: 'Ластану',
      algaeBloom: 'Балдырлардың гүлденуі',
      unusualOdor: 'Ерекше иіс',
      colorChange: 'Түс өзгеруі',
      flooding: 'Сел',
      wildlifeImpact: 'Жануарлар әлеміне әсер',
      other: 'Басқа',
      low: 'Төмен',
      medium: 'Орташа',
      high: 'Жоғары',
      critical: 'Сыни',
      pending: 'күтілуде',
      reviewed: 'қаралды',
      resolved: 'шешілді'
    }
  }

  const { locale } = useI18n()
  
  const t = (key: TranslationKey) => {
    const currentLocale = locale.value as keyof Translations
    return translations[currentLocale]?.[key] || key
  }

  return { t }
}