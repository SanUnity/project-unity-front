export default {
  es: {
    general: {
      yes: 'Sí',
      no: 'No',
    },
    splashScreen: {
      mainTitle: '#QuédateEnCasa',
      mainSubtitle: ' #"TU PAIS"Solidario',
      footerTitle: 'GOBIERNO DE',
      footerSubtitle: '"TU PAIS"',
    },
    routes: {
      test: 'Prueba de salud',
      home: 'Inicio',
      profile: 'Tu perfil',
      family: 'Tu familia',
      contagious: 'Zonas seguras',
      faq: 'Información',
      municipalities: 'Municipios', // NUEVO
      centres: 'Centros de salud',
      news: 'Noticias',
      btstatus: 'Proximidad', // NUEVO
      notifications: 'Buzón', // NUEVO
    },
    welcome: {
      title: '¡Bienvenido!',
      subtitle: 'Gracias por ayudar a "TU PAIS"',
      subtitle_big: 'Con esta App podrás:',
      help_big: 'Ayúdanos a ayudarte',
      help_text: 'Si te registras con tu número telefónico, nos ayudaras a poder entender mejor el estado de la COVID-19 en "TU PAIS", también podríamos contactarte de forma directa en el caso de que necesites ayuda.',
      button: 'Comenzar',
      butonRegister: 'Registrarme',
      enterAnonymously: 'Entrar como anónimo',
      acceptTerms: 'Acepto los términos y condiciones de este servicio y su política de privacidad.', // NUEVO
      continueAsAnonimous: 'Continuar como anónimo', // NUEVO
      item1: 'Conocer tu estado de salud según tus síntomas.',
      item2: 'Obtener instrucciones de qué hacer según cómo te sientes.',
      item3: 'Monitorear tus síntomas cada 6h aunque no estés enfermo.', // NUEVO
      item4: 'Recibir notificaciones cuando haya cambios.', // NUEVO
      selectState: 'Selecciona tu estado', // NUEVO
      selectStatePlaceholder: 'Selecciona', // NUEVO
      selectStateTitle: 'Hemos hecho unos cambios', // NUEVO
      selectStateDescription: 'Para continuar necesitamos que nos indiques en qué estado te encuentras.', // NUEVO
      btnContinue: 'Continuar', // NUEVO
    },
    onboarding: { // TODO NUEVO
      skipBtn: 'En otro momento',
      steps: [
        {
          id: 0,
          title: 'Evalúa tus síntomas y obtén recomendaciones',
          description: 'Realiza una autoevaluación de tu estado de salud y obtén información fiable sobre el Covid-19.',
          action: 'continue',
          actionTxt: 'Siguiente',
          skip: false,
          img: 'assets/images/onboarding/onboarding_1.svg',
        },
        {
          id: 1,
          title: 'Encuentra los centros de salud disponibles para tí',
          description: 'Busca instalaciones de salud si necesita ayuda médica urgente.',
          action: 'continue',
          actionTxt: 'Siguiente',
          skip: false,
          img: 'assets/images/onboarding/onboarding_2.svg',
        },
        {
          id: 2,
          title: 'Activar notificación anónima de proximidad',
          description: 'Gracias al registro, y eventual notificación de proximidad estás un paso por delante del virus. Utilizamos el mismo sistema decentralizado anonimizado que Alemania, Italia o Uruguay para proteger la privacidad de los ciudadanos.',
          action: 'activateBT',
          actionTxt: 'Activar Notificaciones',
          skip: true,
          img: 'assets/images/onboarding/onboarding_3.svg',
        },
      ],
    },
    signup: {
      welcome: '¡Bienvenido!',
      mainTitle: 'Por "TU PAIS"',
      mainSubtitle: '#QuédateEnCasa',
      description: 'Cuida tu salud, estamos contigo.',
      label: '',
      placeholder: 'Ingresa tu número de celular',
      labelPre: ' ', // NUEVO
      placeholderPre: '+00', // NUEVO
      label1: 'Acepto los términos y condiciones de este servicio y su política de privacidad.',
      label2: 'Acepto los',
      label3: 'términos y condiciones',
      label4: 'de este servicio y su política de privacidad.',
      button: 'Continuar',
      snackbar: 'Nº celular y términos son obligatorios',
      maxRetriesExceeded: 'Has superado el máximo de intentos permitidos, por favor inténtalo de nuevo dentro de',
      signupError: 'Ocurrió un error en el registro, por favor inténtalo de nuevo pasados unos minutos.',
    },
    confirmation: {
      welcome: '¡Bienvenido!',
      mainTitle: 'Por "TU PAIS"',
      mainSubtitle: '#QuédateEnCasa',
      description: 'Introduce el código de seguridad \n que te enviamos.',
      hint: 'Espera, esto puede tardar unos segundos.\nSi no lo recibes en 5 minutos te daremos una alternativa para que puedas continuar.',
      askAgain: 'Pedir de nuevo el código',
      enterAsAnonymous: 'Entrar como anónimo',
      button: 'Continuar',
      codeError: 'El código que ingresaste es inválido.\nRevisa e intenta de nuevo',
      maxRetriesExceeded: 'Has superado el máximo de intentos permitidos, por favor inténtalo de nuevo dentro de',
    },
    test: {
      title: 'Por ti, por "TU PAIS"',
      title_profiles: 'Bienvenido',
      mainTitle: 'Queremos conocer tu estado de salud',
      selectLang: 'Seleccionar Lenguaje',
      language: {
        es: 'es',
        en: 'en',
      },
    },
    test1: {
      noName: 'Anónimo',
      yourProfile: 'Tu perfil',
      yourFamily: 'Tu familia',
      description: 'Si tienes sospechas de tener COVID-19 te realizaremos varias preguntas sobre tu estado de salud y con ello te informaremos si tienes síntomas asociados a la enfermedad.',
      hint: 'Recuerda que esto no es un diagnóstico médico, pero te servirá para prevenir y monitorear tus síntomas.',
      buttonStartTest: 'Iniciar tu prueba de salud',
      buttonTestOther: 'Inicia tu prueba de Síntomas',
      helpButtonTxt: 'Haz una prueba de salud para un familiar',
      inviteFamily: 'Realizaremos varias preguntas sobre su estado de tu salud y con ello te informaremos si tiene síntomas asociados al COVID-19.',
      result: {
        low: 'No tienes ningun sintoma de COVID-19, mantente seguro y en casa.',
        medium: 'Algunos síntomas son relacionados a COVID-19, pero mantente tranquilo.',
        'medium-low': 'Algunos síntomas son relacionados a COVID-19, pero mantente tranquilo.',
        high: 'Algunos síntomas son relacionados a COVID-19, pero mantente tranquilo.',
      },
      title_information: 'Información',
      quarantineStart: 'Iniciamos la Fase 3',
      quarantineStartDescription: '¿Ya conoces todas las indicaciones?',
      activateBT: 'Activa tu bluetooth',
      activateBTDescription: 'Descubre si has estado cerca de personas con síntomas de COVID-19',
    },
    test2: {
      description: 'Todo está en orden',
      hint: 'Podrás hacerte una nueva prueba de salud en:',
      buttonHistory: 'Ver historial de pruebas',
      buttonNewUser: 'Hacer prueba a alguien más',
      hours: 'Hrs',
      minutes: 'Min',
      seconds: 'Seg',
      nextTestIn: 'Tu siguiente prueba será en:',
      buttonNewTest: 'Nueva prueba',
      buttonCompleteTest: 'Finaliza tu prueba',
      requestExpired: 'Solicitud Expirada',
      waitTime: 'Espera el tiempo indicado para hacer una nueva prueba de salud.',
      generateRequest: 'Genera una notificación de salida.',
      pcrTestTitle: '¿Deseas recibir el resultado de tu prueba por medio de esta aplicación?', // NUEVO
      newPCRTestBtn: 'Nuevo PCR', // NUEVO
      newPCRTest: 'Prueba física de diagnóstico', // NUEVO
      lastTestDate: 'Fecha de toma de muestra', // NUEVO
      close: 'Cerrar', // NUEVO
      btStatusActive: 'Servicio de proximidad activo', // NUEVO
      btStatusInctive: 'Servicio de proximidad inactivo', // NUEVO
    },
    pcrTest: { // TODO NUEVO
      qrTitle: 'Lee el QR del centro',
      qrDescription: 'Estamos probando este sistema en unos pocos centros. Utilízalo sólo si te lo indican expresamente.',
      formTitle: 'Ingresa la información solicitada para recibir el resultado de tu prueba por medio de esta aplicación',
      continue: 'Continuar',
      name: {
        label: 'Nombre',
        subLabel: '',
        placeholder: 'Escribe tu nombre',
        type: 'text',
        validations: {
          onlyLetters: true,
          required: true,
          maxLength: 20,
        },
      },
      lastname: {
        label: 'Apellido',
        subLabel: '',
        placeholder: 'Escribe tu apellido',
        type: 'text',
        validations: {
          onlyLetters: true,
          required: true,
          maxLength: 20,
        },
      },
      phone: {
        label: 'Teléfono',
        subLabel: '',
        placeholder: 'Escribe tu teléfono',
        type: 'number',
        validations: {
          required: true,
          maxLength: 10,
        },
      },
      phoneValidate: {
        label: 'Debes validar tu número de teléfono',
        subLabel: '',
        placeholder: 'Código recibido por SMS',
        type: 'number',
        validations: {
          required: true,
          maxLength: 6,
        },
      },
      email: {
        label: 'Correo electrónico',
        subLabel: '',
        placeholder: 'Escribelo (opcional)',
        type: 'text',
      },
      emailValidate: {
        label: 'Debes validar tu correo electrónico',
        subLabel: '',
        placeholder: 'Código recibido por correo electrónico',
        type: 'number',
        validations: {
          maxLength: 6,
        },
      },
      gender: {
        label: 'Género',
        subLabel: '',
        placeholder: 'Selecciona',
        type: 'select',
        options: [
          {
            id: 1,
            value: 'male',
            title: 'Masculino',
          },
          {
            id: 2,
            value: 'female',
            title: 'Femenino',
          },
          {
            id: 3,
            value: 'nonBinary',
            title: 'No binario',
          },
        ],
      },
      birthday: {
        label: 'Fecha de nacimiento',
        subLabel: '',
        placeholder: 'Escribe tu fecha de nacimiento',
        type: 'date',
        validations: {
          required: true,
        },
      },
      dateTest: {
        label: 'Fecha del test',
        subLabel: '',
        placeholder: '',
        type: 'date',
        validations: {
          required: true,
        },
      },
      resultTest: {
        label: 'Resultado del test',
        subLabel: 'El resultado del test será contrastado con la base de datos central antes de considerarlo oficial.',
        placeholder: 'Selecciona',
        type: 'select',
        options: [
          {
            id: 1,
            value: '1',
            title: 'Positivo',
          },
          {
            id: 2,
            value: '0',
            title: 'Negativo',
          },
          {
            id: 3,
            value: '2',
            title: 'No procesada',
          },
          {
            id: 4,
            value: '3',
            title: 'Esperando resultado',
          },
        ],
      },
      send: 'Enviar',
      validate: 'Validar',
      qrCodeErrorTitle: 'El código de centro es incorrecto',
      qrCodeErrorCancel: 'Cancelar',
      qrCodeErrorRetry: 'Reintentar',
      mustValidateFields: 'Para poder contrastar tus resultados, te hemos enviado un código para que verifiques los siguientes campos',
      verifyLater: 'Los verificaré después',
      acceptResultsInApp: 'Acepto recibir la información del resultado de mi prueba por medio de esta aplicación',
    },
    legalConditions: {
      title: 'Hemos actualizado nuestros términos',
      subTitle: 'Debes aceptar las nuevas condiciones antes de continuar.',
      actionBtn: 'Continuar',
    },
    welcomepage: {
      toptitle: 'Bienvenido',
      title: 'Gracias por utilizar esta plataforma, aquí podrás',
      item1: 'Conocer tu estado de salud según tus síntomas.',
      item2: 'Obtener instrucciones de qué hacer según cómo te sientes.',
      item3: 'Monitorear tus síntomas cada 6 h\n aunque no estés enfermo.', // NUEVO
      item4: 'Recibir notificaciones cuando haya cambios.', // NUEVO
      button: 'Comenzar',
    },
    faq: {
      title: 'Información',
      tabLabelFirst: 'Consejos',
      tabLabelSecond: 'P. frecuentes', // NUEVO
      tabLabelThird: 'Desescalada', // NUEVO
      firstTab: {
        content_1: 'Lava tus manos con agua y con jabón',
        content_2: 'Acude al médico solo en una urgencia',
        content_3: 'Tose o estornuda en la parte interna de tu codo',
        content_4: 'No difundas noticias falsas',
        // content_1: 'No te automediques: Si presentas algún síntoma, acude a una consulta médica regular, un centro de salud o una unidad médica.',
        // content_3: 'Desinfecta los lugares y superficies con las que tienes contacto como: mesas, teléfonos, puertas, barandales, etc.',
        // content_4: 'Lávate las manos frecuentemente con agua y jabón o utiliza soluciones a base de alcohol en gel al 70%.',
        // content_5: 'Cúbrete la nariz y boca al toser o estornudar, con un pañuelo o con el ángulo interno del brazo.',
        // content_6: 'No te toques la cara con las manos sucias, sobre todo nariz, boca y ojos.',
        // content_7: 'Quédate en casa si presentas alguna enfermedad respiratoria.',
        // content_8: 'Evita el contacto con personas que presentan alguna enfermedad respiratoria.',
        // content_9: 'No escupas. Si es necesario hacerlo, utiliza un pañuelo desechable, tíralo a la basura y después lávate las manos.',
      },
      secondTab: {
        content_1: {
          title: '¿Quiénes forman los grupos de riesgo?',
          text: '• Personas de 60 años o más\n• Mujeres embarazadas\n• Quienes padecen enfermedades inmunodepresivas, crónicas, cardiacas, pulmonares, renales, hepáticas, sanguíneas o metabólicas\n• Quienes padecen obesidad y sobrepeso.',
        },
        content_2: {
          title: '¿Se contagia por el sudor?',
          text: 'El coronavirus no se transmite por el sudor ni por la sangre. Se propaga mediante gotículas procedentes de la nariz o la boca que salen despedidas cuando una persona infectada tose o exhala.',
        },
        content_3: {
          title: '¿Debo usar cubrebocas?',
          text: 'Los cubre bocas no son fuente de protección, ya que los ojos quedan descubiertos y también son una vía de entrada de la enfermedad. Sirven para impedir que el enfermo propague gotas de saliva, pero no es necesario hacer una compra excesiva, en parte porque eso causa escasez y afecta a personal médico y sanitario que sí los necesite.',
        },
        content_4: {
          title: '¿Debo desinfectar toda mi casa, escuela o lugar de trabajo?',
          text: 'Hay que mantener las medidas de higiene, limpiando con agua y con jabón, pero no hay necesidad de desinfectar los espacios de manera especial.',
        },
        content_5: {
          title: '¿Puedo contagiarme de una persona sin síntomas?',
          text: 'El virus se contagia con mayor facilidad cuando una persona infectada presenta síntomas, pero también es posible contagiar el virus antes de que haya síntomas. Por eso, lo mejor es tener las manos limpias y no tocarse el rostro.',
        },
        content_6: {
          title: '¿Mis mascotas pueden contagiarse?',
          text: 'No hay evidencia científica de que el COVID-19 pueda infectar a los animales de compañía, en especial perros y gatos, y tampoco que puedan contagiar a humanos. Sin embargo, en caso de recuperación en casa es buena idea aplicar las medidas de sana distancia también con ellos.',
        },
        content_7: {
          title: '¿Debo aislarme si tuve contacto con un caso confirmado?',
          text: 'El aislamiento es una medida voluntaria: a nadie se le puede obligar, ni siquiera a los casos confirmados. Por fortuna, todos han aceptado la cuarentena para no diseminar la enfermedad.\n\nHay muchos casos de personas que decidieron ponerse en cuarentena al comprobar que estuvieron cerca de alguien que se enfermó de COVID-19.',
        },
        content_8: {
          title: '¿Qué es la transmisión comunitaria?',
          text: 'Esta etapa se da cuando se detectan contagios del virus entre personas dentro del país y que no hayan tenido necesariamente contacto con pacientes expuestos fuera de "TU PAIS". En este periodo de contagio local suele aumentar rápidamente el número de casos registrados y se toman medidas como suspensión de clases, implementación del trabajo a distancia o home office y cancelación de eventos masivos.',
        },
        content_9: {
          title: '¿Qué debo hacer si se produce un brote en mi comunidad?',
          text: 'Mantén la calma y quédate en casa. Conserva la sana distancia y limita el contacto cercano con otras personas tanto como sea posible, aproximadamente 2 metros.\n'
              + 'Continúa practicando las medidas básicas de prevención. Si perteneces a alguno de los grupos de riesgo para complicar y morir por COVID-19, pide a familiares, amigos y profesionales de la salud que te vigilen durante el brote. También mantente en contacto con familiares y amigos con mayor riesgo de desarrollar enfermedades graves, como las personas adultas mayores, personas embarazadas, personas con discapacidad y las personas con enfermedades crónicas.', // REVISAR
        },
        content_10: {
          title: '¿Qué debo hacer si algún miembro de mi familia contrae COVID-19?',
          text: 'Los síntomas de COVID-19 (al menos dos de los siguientes: tos, dolor de de cabeza y fiebre, y acompañado de al menos uno de los que siguen: dolor o ardor de garganta, dolores musculares o de las articulaciones, ojos rojos y para los casos graves dificultad para respirar o dolor en el pecho) se parecen mucho a los de otras enfermedades causadas por otros virus. Si un miembro de su familia tiene dificultades para respirar, diríjanse a un servicio de urgencias médicas o llamen al 911 de inmediato.\n'
              + 'Si presenta un cuadro leve, llame al 800 0044 800 o al 55 5658 1111 para que los oriente si el paciente debe ser tratado en casa, ir a consulta médica.\n',
        },
        content_11: {
          title: '¿Es posible contagiarse de COVID-19 por contacto con una persona que no presente ningún síntoma?',
          text: 'La principal forma de propagación de la enfermedad es a través de las gotas respiratorias expelidas por alguien al toser. El riesgo de contraer la COVID-19 de alguien que no presente ningún síntoma es muy bajo. Sin embargo, muchas personas que lo contraen solo presentan síntomas leves. Esto es particularmente cierto en las primeras etapas de la enfermedad. Por lo tanto, es posible contagiarse de alguien que, por ejemplo, solamente tenga una tos leve y no se sienta enferma, por lo tanto lo más importante es seguir las medidas básicas de prevención.',
        },
        content_12: {
          title: '¿Existe alguna vacuna, medicamento o tratamiento para la COVID-19?',
          text: 'Hasta la fecha, no hay ninguna vacuna ni medicamento antiviral específico para prevenir o tratar la COVID-19. Sin embargo, las personas afectadas pueden recibir atención para aliviar los síntomas. Las personas que presentan casos graves de la enfermedad deben ser hospitalizadas. La mayoría de los pacientes se recuperan con la ayuda de medidas de apoyo.\n'
              + 'No te automediques y en particular debes saber que los antibióticos, no sirven para prevenir o tratar al COVID-19.\n',
        },
        content_13: {
          title: '¿Corren los fumadores y los consumidores de tabaco mayor riesgo de contraer la COVID-19?',
          text: 'Los fumadores son más vulnerables a COVID-19, ya que el acto de fumar supone acercar los dedos (y los cigarrillos, que pueden estar contaminados) a los labios, lo que aumenta la posibilidad de transmisión del virus de la mano a la boca. Los fumadores también pueden padecer una enfermedad pulmonar crónica o tener una capacidad pulmonar disminuida, lo que potencia enormemente el riesgo de enfermedad grave.',
        },
        content_14: {
          title: '¿Puede alguien que ha estado en cuarentena por el COVID-19 propagar la enfermedad a los demás?',
          text: 'En el caso del COVID-19, el periodo de cuarentena es de 14 días desde la última fecha de exposición, ya que 14 días es el periodo más largo de incubación que se ha observado en coronavirus similares. Se considera que la persona a quien se permitió salir de la cuarentena por el COVID-19 no representa un riesgo de propagación del virus a los demás porque durante dicho periodo no presentó la enfermedad, o que ya pasaron los 14 días después del inicio de síntomas (casos leves) y después de terminar sus síntomas (casos graves).',
        },
        content_15: {
          title: '¿Las mujeres embarazadas son más propensas a infectarse con COVID-19? ¿Será peligroso para el feto?',
          text: 'Aún no hay estudios científicos publicados con información sobre la susceptibilidad de las embarazadas a infectarse. Estas personas sufren cambios en el sistema inmune y en su estado fisiológico, lo que puede aumentar sus posibilidades de sufrir infecciones virales de las vías respiratorias, incluyendo la COVID-19.\n'
              + 'Aunque aún se desconoce si una persona embarazada enferma de COVID-19 puede transmitir el virus al feto o al neonato por otras vías de transmisión vertical (antes, durante o después del parto), se clasifican a las personas embarazadas como en mayor riesgo de complicación y muerte por COVID-19 por la experiencia con influenza.\n',
        },
      },
      thirdTab: {
        content_1: {
          title: '¿Quiénes forman los grupos de riesgo?',
          text: '• Personas de 60 años o más\n• Mujeres embarazadas\n• Quienes padecen enfermedades inmunodepresivas, crónicas, cardiacas, pulmonares, renales, hepáticas, sanguíneas o metabólicas\n• Quienes padecen obesidad y sobrepeso.',
        },
        content_2: {
          title: '¿Se contagia por el sudor?',
          text: 'El coronavirus no se transmite por el sudor ni por la sangre. Se propaga mediante gotículas procedentes de la nariz o la boca que salen despedidas cuando una persona infectada tose o exhala.',
        },
        content_3: {
          title: '¿Debo usar cubrebocas?',
          text: 'Los cubre bocas no son fuente de protección, ya que los ojos quedan descubiertos y también son una vía de entrada de la enfermedad. Sirven para impedir que el enfermo propague gotas de saliva, pero no es necesario hacer una compra excesiva, en parte porque eso causa escasez y afecta a personal médico y sanitario que sí los necesite.',
        },
        content_4: {
          title: '¿Debo desinfectar toda mi casa, escuela o lugar de trabajo?',
          text: 'Hay que mantener las medidas de higiene, limpiando con agua y con jabón, pero no hay necesidad de desinfectar los espacios de manera especial.',
        },
        content_5: {
          title: '¿Puedo contagiarme de una persona sin síntomas?',
          text: 'El virus se contagia con mayor facilidad cuando una persona infectada presenta síntomas, pero también es posible contagiar el virus antes de que haya síntomas. Por eso, lo mejor es tener las manos limpias y no tocarse el rostro.',
        },
        content_6: {
          title: '¿Mis mascotas pueden contagiarse?',
          text: 'No hay evidencia científica de que el COVID-19 pueda infectar a los animales de compañía, en especial perros y gatos, y tampoco que puedan contagiar a humanos. Sin embargo, en caso de recuperación en casa es buena idea aplicar las medidas de sana distancia también con ellos.',
        },
        content_7: {
          title: '¿Debo aislarme si tuve contacto con un caso confirmado?',
          text: 'El aislamiento es una medida voluntaria: a nadie se le puede obligar, ni siquiera a los casos confirmados. Por fortuna, todos han aceptado la cuarentena para no diseminar la enfermedad.\n\nHay muchos casos de personas que decidieron ponerse en cuarentena al comprobar que estuvieron cerca de alguien que se enfermó de COVID-19.',
        },
      },
      exposedTitle: 'Los próximos 14 días son claves. Se Cuidadoso.', // NUEVO
      exposedDescription: 'Los casos sospechosos en tu región tienen un nivel alto. Mantén todas las precauciones posibles.\n\nVigila la evolución de tus síntomas rellenando el test online cada mañana durante los próximos 14 días para que podamos ayudarte si lo necesitas.', // NUEVO
    },
    results: {
      componentTitle: 'Tu resultado',
      good: {
        title: 'Todo está en orden',
        subtitle: 'Tu salud se encuentra bien, solo no dejes de cuidarte. Sigue las siguientes medidas al pie de la letra:',
        // secondTitle: 'Por tu bien y el de los demás es necesario que tomes las siguientes medidas de precaución.',
        recomendations: [
          '<span>Mantén sana distancia: al menos 1.5 m entre cada persona.</span>',
          '<span>Evita lugares concurridos: reducidos y con mucha gente.</span>',
          '<span>Lava más tus manos: cuando toques cualquier superficie y al menos por 20 segundos.</span>',
          '<span>Quédate en casa: si no es posible, desinfecta todo lo que traigas contigo y lava tus manos al regresar.</span>',
        ],
      },
      medium_low: {
        title: 'Quédate en casa.',
        subtitle: '... hasta cumplir 14 días después de iniciados los síntomas.',
        // extraSubtitle: 'Por ti y por todos es muy importante que sigas estas recomendaciones:',
        // secondTitle: 'Mantente en aislamiento y toma las siguientes\n precauciones por tu salud y la de todos:',
        recomendations: [
          '<span>Limita tu exposición a sitios concurridos.</span>',
          '<span>Mantenga una sana distancia: al menos 1.5 m entre cada persona.</span>',
          '<span>Informa a las personas con las que has tenido contacto que mantengan una Sana Distancia y estén atentos si llegan a presentar alguna molestia.</span>',
          '<span>Puedes compartirles esta App o hacerles tú mismo un nuevo perfil.</span>',
        ],
      },
      medium: {
        title: 'Quédate en casa.',
        subtitle: 'Mantén una sana distancia',
        // extraSubtitle: 'Por ti y por todos es muy importante que sigas estas recomendaciones:',
        secondTitle: 'Sigue estas recomendaciones e informa a las personas con las que has tenido contacto en los últimos días lo siguiente:',
        recomendations: [
          '<span>Si los síntomas empeoran/se agudizan llama al 911.</span>',
          '<span>Es importante que informes a las personas con las que has tenido contacto que mantengan una Sana Distancia y estén atentos si llegan a presentar alguna molestia.</span>',
          '<span>Puedes compartirles esta App o hacerles tú mismo un nuevo perfil.</span>',
        ],
      },
      medium_high: {
        title: 'Evita complicaciones,\nbusca orientación médica.',
        subtitle: 'Si los síntomas empeoran llama al 911.',
        // extraSubtitle: 'Por ti y por todos es muy importante que sigas estas recomendaciones:',
        secondTitle: 'Sigue estas recomendaciones:',
        recomendations: [
          '<span>Informa a las personas con las que has tenido contacto que mantengan una Sana Distancia y estén atentos si llegan a presentar alguna molestia. </span>',
          '<span>Puedes compartirles esta App o hacerles tú mismo un nuevo perfil.</span>',
        ],
      },
      medium_vulnerable: {
        title: 'Limita tu exposición a sitios concurridos. ',
        subtitle: 'Mantén una sana distancia. ',
        // extraSubtitle: 'Por ti y por todos es muy importante que sigas estas recomendaciones:',
        secondTitle: 'Sigue estas recomendaciones e informa a las personas con las que has tenido contacto en los últimos días lo siguiente:',
        recomendations: [
          '<span>Mantén una sana distancia: al menos 1.5 m entre cada persona.</span>',
          '<span>Estén atentos por si llegan a presentar alguna molestia.</span>',
          '<span>Evita lugares concurridos: reducidos y con mucha gente.</span>',
          '<span>Lava más tus manos: cuando toques cualquier superficie y al menos por 20 segundos.</span>',
          '<span>Quédate en casa: si no es posible, desinfecta todo lo que traigas contigo y lava tus manos al regresar.</span>',
        ],
      },
      bad: {
        title: 'Es importante recibir atención médica.',
        subtitle: 'Marque el 911 o acuda a la unidad de atención médica indicando que tiene síntomas respiratorios.',
        // extraSubtitle: 'Por ti y por todos es muy importante que sigas estas recomendaciones:',
        secondTitle: '',
        contactTitle: '',
        recomendations: [
          '<span>El traslado debe realizarse preferentemente con cubreboca, evitando medios de transporte masivos y directo al centro de atención médica.</span>',
          '<span>Mantenga una sana distancia: al menos 1,5 m entre cada persona</span>',
        ],
      },
      sectionCards: {
        first_1: 'Usa cubre\nbocas',
        first_2: 'Lávate las\nmanos',
        first_3: 'Evita lugares \nconcurridos',
      },
      buttonLabel: 'Ver otros Consejos',
      healthUnits: 'Ver unidades de salud',
      call911: 'Llamar al 911',
      footerTitle: 'Por tu bien y el de "TU PAIS"',
      footerSubtitle: 'Ayúdanos a prevenir más contagios y comparte esta aplicación con tus conocidos.',
      footerOpenTitle: 'Compartir app',
      symptomsChange: 'Si notas algún cambio o síntoma extra envía “COVID-19” al 51515.',
      emergency: 'En caso de emergencia \nmarca al <a href=tel:911>911</a>.',
      emergencyOnly: 'Llama al <a href=tel:911>911</a> sólo en caso de una emergencia.',
      testDate: 'Fecha del test',
      folioNumber: 'Número de folio',
      covid: 'COVID-200320-018400',
      testDetails: 'Detalle del test',
      close: 'Cerrar',
    },
    profileDetails: {
      title: 'Datos Personales',
      hashtag: '#QuédateEnCasa',
      subTitle: 'Actualiza tus datos personales,\n así podemos compartirte recomendaciones\n y mantenerte informado',
      name: {
        label: 'Nombre',
        subLabel: '',
        placeholder: 'Escribe tu nombre, sin apellidos.',
      },
      lastname1: {
        label: 'Primer apellido',
        subLabel: '',
        placeholder: 'Ingrésalo aquí (opcional)',
      },
      lastname2: {
        label: 'Segundo apellido',
        subLabel: '',
        placeholder: 'Ingrésalo aquí (opcional)',
      },
      age: {
        label: 'Edad',
        subLabel: '',
        placeholder: '00',
      },
      gender: {
        label: 'Género',
        subLabel: '',
        placeholder: 'Selecciona',
      },
      home: 'Domicilio',
      postalCode: {
        label: 'Código Postal',
        subLabel: 'Desconozco mi código postal',
        placeholder: 'Ingrésalo aquí',
      },
      street: { label: '¿En qué calle vives?', placeholder: 'Ingrésalo aquí (opcional)' }, // NUEVO
      numberExternal: { label: 'Número Ext.', placeholder: '(opcional)' }, // NUEVO
      numberInternal: { label: 'Número Int.', placeholder: '(opcional)' }, // NUEVO
      municipalityID: { label: '¿En qué alcaldía/municipio vives?', placeholder: 'Ingrésalo aquí' },
      suburbID: {
        label: '¿En qué colonia vives?',
        placeholder: 'Selecciónala',
      },
      select: 'Selecciona',
      genderOptions: [
        {
          id: 1,
          value: 'male',
          title: 'Masculino',
        },
        {
          id: 2,
          value: 'female',
          title: 'Femenino',
        },
        {
          id: 3,
          value: 'nonBinary',
          title: 'No binario',
        },
      ],
      save: 'Guardar',
      delete: 'Eliminar',
      modalTitle: '¿Estás seguro de que deseas borrar este perfil? Esta acción no se puede deshacer',
      cancel: 'Cancelar',
      confirm: 'Aceptar',
      snackbar: '¡Espera! Contesta las preguntas en rojo para continuar.',
      defaultProfileTitle: 'Perfil por defecto', // NUEVO
      defaultProfileDescription: '¿Este perfil es el dueño del teléfono celular?', // NUEVO
    },
    formTest: {
      title: 'Prueba de salud',
      continue: 'Continuar',
      subtitleHeader: '#QuédateEnCasa',
      subtitle: 'Contesta sinceramente sobre\n los siguientes síntomas',
      snackbar: '¡Espera! Contesta las preguntas en rojo para continuar.',
      postalCodeError: 'Código postal incorrecto',
      createProfileError: 'Ocurrió un error, por favor inténtalo de nuevo pasado unos segundos.',
      general: {
        hashtag: '#QuédateEnCasa',
      },
      stepsTitles: {
        step1generic: 'Para comenzar, ingresa\nlos siguientes datos',
        step2generic: 'Contesta sinceramente sobre \nlos siguientes síntomas',
        step3generic: 'Contesta sinceramente sobre \nlos siguientes síntomas',
      },
      name: {
        label: 'Nombre',
        subLabel: '',
        placeholder: 'Escribe tu nombre, sin apellidos.',
      },
      lastname1: {
        label: 'Primer apellido',
        subLabel: '',
        placeholder: 'Ingrésalo aquí (opcional)',
      },
      lastname2: {
        label: 'Segundo apellido',
        subLabel: '',
        placeholder: 'Ingrésalo aquí (opcional)',
      },
      age: {
        label: 'Edad',
        subLabel: '',
        placeholder: '00',
      },
      gender: {
        label: 'Género',
        subLabel: '',
        placeholder: 'Selecciona',
        options: [
          {
            id: 1,
            value: 'male', // DO NOT TRANSLATE
            title: 'Masculino',
          },
          {
            id: 2,
            value: 'female', // DO NOT TRANSLATE
            title: 'Femenino',
          },
          {
            id: 3,
            value: 'nonBinary', // DO NOT TRANSLATE
            title: 'No binario',
          },
        ],
      },
      postalCode: {
        label: 'Código Postal',
        subLabel: '<a href="postal_code_verification_url" target="_blank" rel="noopener noreferrer">Desconozco mi código postal</a>',
        placeholder: 'Ingrésalo aquí',
      },
      symptoms: {
        label: '¿Tienes algún síntoma como: tos, dolor de garganta, dolor de cabeza y/o fiebre igual o mayor a 38ºC?',
        subLabel: '',
        placeholder: '',
      },
      symptomWeek: {
        label: '¿Llegaste a tener alguno de estos síntomas en la última semana?',
        subLabel: 'Si tuviste un síntoma en los últimos 7 días y desapareció',
        placeholder: '',
      },
      diabetes: {
        label: '¿Tienes diabetes?',
        subLabel: '',
        placeholder: '',
      },
      obesity: {
        label: '¿Tienes obesidad?',
        subLabel: '',
        placeholder: '',
      },
      hypertension: {
        label: '¿Tienes hipertensión?',
        subLabel: '',
        placeholder: '',
      },
      defenses: {
        label: '¿Padeces una enfermedad o usas un medicamento que baje tus defensas?',
        subLabel: '',
        placeholder: '',
      },
      pregnant: {
        label: '¿Estás embarazada?',
        subLabel: '',
        placeholder: '',
      },
      pregnant6: {
        label: '¿Tienes 6 o más meses de embarazo?',
        subLabel: '',
        placeholder: '',
      },
      breathing: {
        label: '¿Presentas alguno de los siguientes sintomas: falta de aire, respiración rápida, dificultad para respirar o desorientación?',
        subLabel: '',
        placeholder: '',
      },

      /* CDMX QUESTIONS */

      meet: {
        label: '¿Has estado con alguna persona que tenga COVID-19 (Coronavirus)?',
        subLabel: '',
      },
      fever: {
        label: '¿Tienes fiebre?',
        subLabel: 'Temperatura igual o mayor a 38°C.',
      },
      headache: {
        label: '¿Tienes dolor de cabeza?',
        subLabel: 'Constante y sin que los analgésicos típicos te lo quiten.',
      },
      cough: {
        label: '¿Tienes tos?',
        subLabel: 'Tos seca y constante.',
      },
      chestPain: {
        label: '¿Tienes dolor de pecho?',
        subLabel: 'Molestia constante.',
      },
      throatPain: {
        label: '¿Tienes dolor de garganta?',
        subLabel: 'Incluso cuando pasas saliva.',
      },
      breathingCDMX: {
        label: '¿Tienes dificultad para respirar?',
        subLabel: 'Sientes presión en el pecho.',
      },
      snot: {
        label: '¿Tienes escurrimiento nasal?',
        subLabel: 'Constante y fluido.',
      },

      pain: {
        label: '¿Tienes dolor en el cuerpo?',
        subLabel: 'Muscular, como si fueras a enfermarte.',
      },
      conjunctivitis: {
        label: '¿Tienes conjuntivitis?',
        subLabel: 'Ojos rojos, comezón, dolor, ardor o secreciones.',
      },
      days: {
        label: '¿Hace cuántos días iniciaron tus síntomas?',
        subLabel: 'Recuerda a partir de cuándo te sientes así. Si iniciaron hoy, responde "0".',
        placeholder: 'Días',
      },
      blue: {
        label: '¿Tienes coloración azul o morada en los labios, dedos o uñas?',
        subLabel: 'Identifica si no tenías estos tintes antes.',
        flagType: ['serious'],
      },
      conditions: {
        label: '¿Tienes alguna de las siguientes condiciones?',
        subLabel: 'Problemas cardiacos, diabetes, obesidad, hipertensión, cáncer, asma, EPOC o VIH.',
      },

      respiratoryPain: {
        label: '¿Sientes dolor al respirar?',
        subLabel: 'Molestia o incomodidad cada que respiras.',
      },
      breathing2: {
        label: '¿Sientes falta de aire al hablar o caminar algunos pasos?',
        subLabel: 'O cualquier actividad que no requiere esfuerzo.',
      },

      imss: {
        label: '¿Eres derechohabiente \ndel IMSS?',
        subLabel: '',
      },
      sickFamily: {
        label: '¿Alguno de tus familiares o conocidos ha desarrollado alguno de estos síntomas?',
        subLabel: '',
      },


      street: {
        label: '¿En qué calle vives?',
        placeholder: 'Ingrésalo aquí',
      },
      numberExternal: {
        label: 'Número Ext.',
        placeholder: 'Ingrésalo aquí',
      },
      numberInternal: {
        label: 'Número Int.',
        placeholder: 'Ingrésalo aquí',
      },
      municipalityID: {
        label: '¿En qué alcaldía vives?',
        placeholder: 'Selecciónala',
        options: [],
      },
      suburbID: {
        label: '¿En qué colonia vives?',
        placeholder: 'Selecciónala',
        options: [],
      },
      isAddressCorrect: {
        label: '¿Tu dirección es correcta?',
      },

      /* END CDMX QUESTIONS */


      subTitle: 'Datos personales',
      postalCodeParagraph: 'Se generará un mapa digital para indicarte zonas de seguridad con tu Código Postal.',
      inputPlaceholder: 'Ingrésalo aquí',
      inputAgePlaceholder: '00',
      postalCodeHelpText: 'Desconozco mi código postal',
      quedateEnCasa: '#QuédateEnCasa',
      submitTest: 'Enviar test',
    },
    contagionMap: {
      title: 'Contagios',
      tabLabelFirst: 'Mapa',
      tabLabelSecond: 'Lista',
      filter: 'Filtrar',
      filters: {
        filter_1: 'hospital',
        filter_2: 'pharmacy',
        filter_3: 'supermarket',
      },
      noResults: 'No hay resultados',
    },
    testingCenters: {
      title: 'Centros de Salud',
      state: 'Estado',
      municipality: 'Municipio',
      location: 'ubicación',
      level1: 'Atención de 1er Nivel',
      level2: 'Atención de 2do Nivel',
      level3: 'Atención de 3er Nivel',
      levelDetail1: 'Primer nivel de atención',
      levelDetail1Desc: 'Esta es una unidad de primer nivel de atención de la salud. Solo atiende casos leves de enfermedades respiratorias y preferentemente a grupos de mayor riesgo de complicarse (mayores de 60 años, personas embarazadas, con discapacidad, con enfermedades como diabetes, hipertensión, obesidad, cáncer, VIH/SIDA e inmunosupresión). Si tienes síntomas leves y no perteneces a alguno de estos grupos, quédate en casa, evita contagios y sigue vigilando tu salud.',
      levelDetail2: 'Segundo nivel de atención',
      levelDetail2Desc: 'Esta es una unidad del segundo nivel de atención en salud. Se atiende a todas aquellas personas que tienen sospecha de estar enfermas de COVID, y que presentan dificultad para respirar, falta de aire o dolor en el pecho. Si no tienes estos síntomas y perteneces al grupo de mayor riesgo de complicaciones por COVID (mayor de 60 años, embarazada, con discapacidad, con enfermedades como diabetes, hipertensión, obesidad, cáncer, VIH/SIDA e inmunosupresión), acude a una unidad de primer nivel.',
      levelDetail3: 'Tercer nivel de atención',
      levelDetail3Desc: 'Este es un hospital de alta especialidad. En esta unidad recibimos los casos más graves y complicados. Lo mejor es que si sospechas de tener COVID y tienes dificultad para respirar, falta de aire o dolor en el pecho, primero acudas a una unidad del segundo nivel de atención.',
      select: 'Selecciona',
      tabLabelFirst: 'Mapa',
      tabLabelSecond: 'Lista',
      filter: 'Filtrar',
      loadingDescription: 'Cargando...',
      attentionLevel: 'Nivel de atención',
      timetableAttention: 'Horarios de atención',
      noColony: 'Sin Colonia',
      filters: {
        filter_1: {
          googleKey: '',
          title: 'All',
        },
        filter_2: {
          googleKey: 'hospital',
          title: 'Hospitals',
        },
        filter_3: { googleKey: 'pharmacy', title: 'Pharmacies' },
        filter_4: { googleKey: 'supermarket', title: 'Supermarkets' },
      },
      noResults: 'No hay resultados',
      report: 'Reportar concurrencia',
      cancel: 'Cancelar',
      close: 'Cerrar',
      available_for_atention: 'Disponible para atención',
      less_1h: '< 1h',
      between_1_4: 'Entre 1-4h',
      more_4: '4h o más',
      select_your_time: 'Selecciona cuál es o fue tu tiempo de espera',
      send_report: 'Enviar reporte',
      hospital: 'Hospital',
      phone: 'Teléfono',
      call: 'Llamar',
      search: 'Ingresa tu colonia',
      go: 'Ir',
      levelTitle: 'Nivel de Atención',
      typeHospitalOptions: [
        {
          id: 0,
          value: 0,
          title: 'Todos',
        },
        {
          id: 1,
          value: 1,
          title: 'Atención de 1er Nivel',
        },
        {
          id: 2,
          value: 2,
          title: 'Atención de 2do y 3er Nivel',
        },
        {
          id: 3,
          value: 3,
          title: 'Hospitales COVID',
        },
      ],
    },
    profile: {
      tabLabelFirst: 'Notificar Salida',
      tabLabelSecond: 'Hist. Salud',
      tabLabelThird: 'Hist. PCR', // NUEVO
      generateNewExitRequest: 'Genera una notificación de salida',
      emptyTitle: 'Cuarentena',
      emptyDescription: 'Es importante mantenerse en casa, en caso de necesitarlo debes notificar tu salida.',
      motive: 'Motivo',
      destination: 'Destino',
      notifyNewExitRequest: 'Notificar una nueva salida +',
      delete: 'Eliminar',
      expired: 'Solicitud Expirada',
      showQR: 'Muestra este código QR en caso de ser necesario',
      notifyExit: 'Notificar salida',
      cancel: 'Cerrar',
      whatIsTheMotive: '¿Cuál es el motivo?',
      reasonToGoOut: 'Escribe la razón para salir',
      modalTitle: 'Sal de la cuarentena,\nsólo si es indispensable',
      modalSubtitle: 'Debemos ser más precavidos, y debido a estar en Fase 3, necesitamos avisar de la salida fuera de tu domicilio y evitar sanciones por partes de la autoridad.',
      destiny: '¿A dónde te diriges?',
      direction: 'Escribe la dirección o la zona',
      notifyTheExit: 'Notificar la salida',
      notifyQR: 'Esta notificación, genera un código QR que podrás mostrar en caso de ser necesario',
      modalDeleteTitle: '¿Está seguro de que quiere borrar esta notificación de salida?',
      modalDeleteConfirm: 'Eliminar',
      modalDeleteCancel: 'Cancelar',
    },
    news: {
      title: 'Noticias',
      tabLabelFirst: 'Comunicados',
      tabLabelSecond: 'Conferencias',
      confVideo: 'Video de la conferencia',
      docTec: 'Comunicado técnico',
      noNews: 'No hay comunicados',
    },
    municipalities: { // TODO NUEVO
      title: 'Municipios',
      state: 'Estado',
      municipality: 'Municipio',
      status: 'Estatus',
      cases: 'Casos',
      confirmed: 'Confirmados',
      suspicious: 'Sospechosos',
      negative: 'Negativos',
      death: 'Defunciones',
      statusTxt: {
        low: 'Vuelve a tus actividades',
        medium: 'Alta',
        high: 'Intermedia',
        'very-high': 'Alerta máxima',
      },
      filterBy: 'Filtrar por',
      filterStates: 'Estados de alerta',
      maximum: 'Máxima',
      high: 'Alta',
      intermediate: 'Intermedia',
      low: 'Baja',
      location: 'ubicación',
      level1: 'Atención de 1er Nivel',
      level2: 'Atención de 2do Nivel',
      level3: 'Atención de 3er Nivel',
      levelDetail1: 'Primer nivel de atención',
      levelDetail1Desc: 'Esta es una unidad de primer nivel de atención de la salud. Solo atiende casos leves de enfermedades respiratorias y preferentemente a grupos de mayor riesgo de complicarse (mayores de 60 años, personas embarazadas, con discapacidad, con enfermedades como diabetes, hipertensión, obesidad, cáncer, VIH/SIDA e inmunosupresión). Si tienes síntomas leves y no perteneces a alguno de estos grupos, quédate en casa, evita contagios y sigue vigilando tu salud.',
      levelDetail2: 'Segundo nivel de atención',
      levelDetail2Desc: 'Esta es una unidad del segundo nivel de atención en salud. Se atiende a todas aquellas personas que tienen sospecha de estar enfermas de COVID, y que presentan dificultad para respirar, falta de aire o dolor en el pecho. Si no tienes estos síntomas y perteneces al grupo de mayor riesgo de complicaciones por COVID (mayor de 60 años, embarazada, con discapacidad, con enfermedades como diabetes, hipertensión, obesidad, cáncer, VIH/SIDA e inmunosupresión), acude a una unidad de primer nivel.',
      levelDetail3: 'Tercer nivel de atención',
      levelDetail3Desc: 'Este es un hospital de alta especialidad. En esta unidad recibimos los casos más graves y complicados. Lo mejor es que si sospechas de tener COVID y tienes dificultad para respirar, falta de aire o dolor en el pecho, primero acudas a una unidad del segundo nivel de atención.',
      select: 'Selecciona',
      tabLabelFirst: 'Mapa',
      tabLabelSecond: 'Lista',
      filter: 'Filtrar',
      loadingDescription: 'Cargando...',
      attentionLevel: 'Nivel de atención',
      timetableAttention: 'Horarios de atención',
      noColony: 'Sin Colonia',
      filters: {
        filter_1: {
          googleKey: '',
          title: 'All',
        },
        filter_2: {
          googleKey: 'hospital',
          title: 'Hospitals',
        },
        filter_3: { googleKey: 'pharmacy', title: 'Pharmacies' },
        filter_4: { googleKey: 'supermarket', title: 'Supermarkets' },
      },
      noResults: 'No hay resultados',
      report: 'Reportar concurrencia',
      cancel: 'Cancelar',
      close: 'Cerrar',
      available_for_atention: 'Disponible para atención',
      less_1h: '< 1h',
      between_1_4: 'Entre 1-4h',
      more_4: '4h o más',
      select_your_time: 'Selecciona cuál es o fue tu tiempo de espera',
      send_report: 'Enviar reporte',
      hospital: 'Hospital',
      phone: 'Teléfono',
      call: 'Llamar',
      search: 'Busca tu estado',
      go: 'Ir',
      levelTitle: 'Nivel de Atención',
      states: 'Estados',
      favorite: 'Favorito',
      favorites: 'Favoritos',
      markAsFavorite: 'Hacer favorito',
      savingFavorite: 'Guardando...',
      typeHospitalOptions: [
        {
          id: 0,
          value: 0,
          title: 'Todos',
        },
        {
          id: 1,
          value: 1,
          title: 'Atención de 1er Nivel',
        },
        {
          id: 2,
          value: 2,
          title: 'Atención de 2do y 3er Nivel',
        },
        {
          id: 3,
          value: 3,
          title: 'Hospitales COVID',
        },
      ],
    },
    btstatus: { // TODO NUEVO
      titleActive: 'Servicio <strong>activo</strong>',
      descriptionActive: 'Gracias al registro de proximidad, estás un paso por delante del virus.',
      titleInactive: 'Servicio <strong>inactivo</strong>',
      descriptionInactive: 'Toma las medidas necesarias para evitar extender el confinamiento y poner en riesgo tu salud.',
      modaleTitleInactive: 'Cómo activar las notificaciones de exposición',
      modaleTitleBTInactive: 'Cómo activar el Bluetooth',
      modaleTitleNotificationsInactive: 'Cómo activar las notificaciones',
      incompatibleTitle: 'Dispositivo <strong>incompatible</strong>',
      incompatibleDescription: 'Los sentimos, pero tu dispositivo no es compatible con las funciones de exposición.',
      incompatibleDescriptionIOS: 'Para tener acceso a las notificaciones de exposición, debe usar un iPhone con iOS 13.5 o posterior.',
      incompatibleDescriptionAndroid: '',
      actionInactive: 'Activar registro',
      actionSettings: 'Abrir los ajustes',
      information: 'Información',
      btInfo: 'Gracias a notificaciones de proximidad podemos romper la cadena de transmisión y reducir el impacto en salud y en economía.',
      protocolInfo: 'Seguimos el protocolo más estricto utilizado en Alemania, Suiza y Uruguay para que tus valores de proximidad se queden en tu dispositivo.',
      nowMore: 'Saber más',
      withNotificationsTitle: 'Notificando Proximidad',
      withNotificationsDescription: 'Si se actúa al identificar y se aisla a los dispositivos con notificación de proximidad, ¡la cadena de transmisión se rompe!.',
      withoutNotificationsTitle: 'Sin Notificar Proximidad',
      withoutNotificationsDescription: 'Si no se actúa, esto es lo que sucedería en un vecindario con un Paciente Cero.',
      protocols: [
        {
          img: '/assets/images/protocol_01.svg',
          description: 'Trabajamos con protocolo <strong>decentralizado</strong> para que los datos y los cálculos ocurran en el dispositivo de cada usuario.',
        },
        {
          img: '/assets/images/protocol_02.svg',
          description: 'Los datos de fecha, duración e intensidad de la señal asociados a proximidad se quedan correctamente <strong>anonimizados</strong>.',
        },
        {
          img: '/assets/images/protocol_03.svg',
          description: 'Al hacer una prueba física de Covid19, <strong>sólo tú tendrás la llave</strong> para decidir compartir tus valores anonimizados de proximidad.',
        },
        {
          img: '/assets/images/protocol_04.svg',
          description: 'Toma el control de tu proximidady trabajemos juntos para frenar el Covid19. Consulta todos los detalles de privacidad pinchando en el vinculo:',
        },
      ],
      privacy: 'Aviso de privacidad app COVID-19MX',
    },
    pcrResults: { // TODO NUEVO
      profile: 'Perfil',
      dateTest: 'Fecha del test',
      title: 'Resultado de tus tests',
      positiveTitle: '¡Hola! La muestra de laboratorio que te tomamos resultó positiva a SARS-COV-2, eso quiere decir que tienes la enfermedad COVID-19.',
      positiveDescription: 'Por favor, toma las siguientes precauciones:',
      positiveStep1: `
        <p><strong>1)</strong> Si perteneces a alguno de los siguientes grupos: </p>
        <ul>
          <li>a) Ser persona adulta mayor con 60 años cumplidos.</li>
          <li>b) Estar en estado de embarazo.</li>
          <li>c) Vivir con hipertensión, diabetes mellitus o enfermedades pulmonares como el EPOC.</li>
          <li>d) Haber recibido un trasplante.</li>
          <li>e) Vivir con VIH o alguna otra enfermedad que debilite tu sistema inmune o recibes un tratamiento inmunosupresor por vivir con alguna otra enfermedad como cáncer.</li>
        </ul>
        <p>Tienes <strong>mayor riesgo</strong> de tener <strong>complicaciones</strong>. Vigila tu salud y si tienes <strong>algún síntoma de enfermedad respiratoria <a href="tel:911">llama al 911</a></strong> indicando tu condición.</p>
        <p><strong>2)</strong> Aíslate tanto como sea posible.</p>
      `,
      positiveStep2: `
        <p><strong>3)</strong> Recuerda cuándo iniciaste con los síntomas, <strong>avísale a tus contactos de los dos días anteriores a que iniciaste el cuadro de COVID-19.</strong></p>
        <p>Envíales este mensaje aconsejándoles que se aíslen y que vigilen su salud durante 14 días.</p>
      `,
      positiveStep21: `
        <p>Si tus <strong>contactos inician con síntomas</strong>, deben hacer lo mismo: <strong>avisar a sus contactos</strong> de dos días antes de empezar con su enfermedad para que ellos se <strong>aíslen 14 días.</strong></p>
      `,
      positiveStep3: `
        <p><strong>4)</strong> Si deseas <strong>ayudar a cortar las cadenas de contagio, compártenos el nombre y número de teléfono de las personas que hayan estado contigo</strong> desde los dos días previos al inicio de tus síntomas.</p>
      `,
      positiveStep4: '<strong>5)</strong> Mantente al día sobre COVID-19 en las secciones',
      positiveStep41: 'y',
      positiveStep42: 'de esta App.',
      shareMessage: '¡Hola! El resultado de mi muestra de laboratorio resultó positivo a SARS-COV-2, eso quiere decir que tengo la enfermedad COVID-19. Te mando este mensaje pidiéndote que sigas estas recomendaciones:',
      shareURL: 'https://landing.coronavirus.gob.mx/auto-cuidado/',
      information: 'Información',
      news: 'Noticias',
      btnNext: 'Siguiente',
      btnFinish: 'Terminar',
      btnUploadContacts: 'Seleccionar contactos',
      btnSendMessage: 'Enviar mensaje',
      btnShareMessage: 'Compartir mensaje',
      btnAllowNotify: 'Enviar mensaje anónimo',
      noContact: 'No he estado en contacto con nadie en los ultimos 14 días',
      yourContacts: 'Tus contactos',
      notificationSent: 'Gracias por ayudarnos a evitar más contagios, las notificaciones han sido enviadas a los contactos que has seleccionado.',
      negativeTitle: 'Tu test ha dado "Negativo"',
      negativeDescription: 'Tu salud se encuentra bien, solo no dejes de cuidarte.\n\nContinúa manteniendo las medidas de seguridad y juntos lograremos vencer este virus.',
      reapeatTestTitle: 'Prueba no Realizada',
      reapeatTestDescription: 'La muestra que le fue tomada no se procesó, por lo tanto le pedimos que acuda nuevamente al Centro de Salud para que se repita la muestra',
      notify: 'Notificar',
      share: 'Compartir',
      close: 'Cerrar',
      received: 'Recibido',
    },
    notifications: {
      close: 'Cerrar',
      hashtag: 'Buzón',
      noNotifications: 'No hay mensajes',
    },
  },
};
