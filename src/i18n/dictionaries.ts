export type Locale = 'pl' | 'en'

export type Dictionary = {
  header: {
    brand: string
    tagline: string
    nav: {
      location: string
      about: string
      photos: string
      contact: string
      insights: string
    }
    lang: { pl: string; en: string }
  }
  hero: { title: string; subtitle: string; airbnb: string; booking: string }
  location: { title: string; address: string; mapTitle: string }
  about: {
    title: string
    description: string
    keyFactsTitle: string
    keyFacts: Array<{ label: string; value: string; hint?: string }>
    features: Array<{ icon: string; title: string; text: string }>
    tabs: { description: string; amenities: string; rules: string; neighborhood: string; practical: string }
    amenities?: Array<{ group: string; items: Array<{ icon: string; label: string }> }>
    neighborhood: {
      intro: string
      highlights: Array<{ name: string; distanceKm: number; description: string }>
      dayTripsTitle: string
      dayTrips: Array<{ name: string; distanceKm: number; description: string }>
      discoverMore: string
    }
  }
  practical: {
    title: string
    intro: string
    toggleOpen: string
    toggleClose: string
    cards: Array<{ mode: string; icon: string; routes: Array<{ origin: string; distance: string; duration: string; description: string }> }>
    tipsTitle: string
    tips: string[]
  }
  photos: {
    title: string
    showMore: string
    showLess: string
    alt: string
    openLabel: string
    closeLabel: string
    prevLabel: string
    nextLabel: string
  }
  contact: {
    title: string
    lead: string
    reserveLead: string
    airbnb: string
    booking: string
    airbnbUrl: string
    bookingUrl: string
    form: { name: string; email: string; phone: string; message: string; submit: string; sending: string }
    hostLabel: string
    hostName: string
    hostBio: string
    successMessage: string
    errorMessage?: string
    hostAvg?: number
    hostLanguages?: string[]
    hostPassions?: string[]
  }
  reviews: {
    title: string
    items: Array<{ name: string; rating: number; text: string; date?: string; nights?: number }>
    rating: string
    outOf: string
    showAll: string
    externalSummaryTitle: string
    aggregateLabel: string
    aggregateFootnote: string
    updatedLabel: string
    reviewsCountLabel: string
    external: Array<{ source: string; rating: number; scale: number; reviews: number; url: string; updated: string }>
  }
  rules: { title: string; items: string[]; note?: string }
  faq: { title: string; items: Array<{ question: string; answer: string }> }
  footer: {
    company: string
    addressLabel: string
    registerInfo: string
    taxIdLabel: string
    taxIdValue: string
    legalLinks: Array<{ label: string; url: string }>
    copyright: string
  }
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    keywords: string[]
  }
  ui: {
    scrollTop: string
  }
}

export const dictionaries: Record<Locale, Dictionary> = {
  pl: {
    header: {
      brand: 'Przystanek Okrężna',
      tagline: 'Apartament w sercu Ząbkowic Śląskich',
      nav: {
        location: 'Lokalizacja',
        about: 'O obiekcie',
        photos: 'Zdjęcia',
        contact: 'Kontakt',
        insights: 'FAQ & Opinie',
      },
      lang: { pl: 'Polski', en: 'English' },
    },
    hero: {
      title: 'Witaj w Przystanku Okrężna',
      subtitle: 'Twój idealny wybór na komfortowy pobyt w sercu miasta',
      airbnb: 'Zarezerwuj na Airbnb',
      booking: 'Zarezerwuj na Booking',
    },
    location: { title: 'Lokalizacja', address: 'Okrężna 15, 57-200 Ząbkowice Śląskie, Polska', mapTitle: 'Mapa lokalizacji' },
    about: {
      title: 'O obiekcie',
      description:
        'Przytulne mieszkanie w Ząbkowicach Śląskich, zaledwie 10 minut spacerem od centrum miasta. To doskonała lokalizacja dla tych, którzy chcą odkrywać uroki lokalnych gór, Kotliny Kłodzkiej, czy okolicznych tras rowerowych. Idealne miejsce na aktywny wypoczynek ale także dla osób, które pragną chwili relaksu w spokojnej, zielonej okolicy - z dala od miejskiego zgiełku. Jeśli szukasz wygodnej bazy do zwiedzania lub po prostu ciszy i kontaktu z naturą, spodoba Ci się nasze mieszkanie.',
      keyFactsTitle: 'Najważniejsze atuty mieszkania',
      keyFacts: [
        { label: 'Powierzchnia', value: '55 m²', hint: 'Druga kondygnacja domu jednorodzinnego tylko dla Ciebie' },
        { label: 'Maks. gości', value: '4 osoby', hint: 'Sypialnia z łóżkiem queen + rozkładana kanapa w salonie' },
        { label: 'Sypialnie', value: '1 sypialnia', hint: 'Osobna sypialnia z zaciemniającymi roletami' },
        { label: 'Łóżka', value: '1× queen, 1× sofa', hint: 'Świeża pościel oraz dodatkowe koce' },
      ],
      features: [
        { icon: '🏠', title: 'Prywatne mieszkanie', text: 'Obejmuje całe drugie piętro domu jednorodzinnego' },
        { icon: '🍳', title: 'W pełni wyposażone', text: 'Duży salon z aneksem kuchennym, łazienka oraz osobna sypialnia' },
        { icon: '🚗', title: 'Parking', text: 'Bezpieczne miejsce dla Twojego samochodu (lub rowerów)' },
      ],
      tabs: {
        description: 'Najważniejsze informacje',
        amenities: 'Udogodnienia',
        rules: 'Zasady pobytu',
        neighborhood: 'Okolica',
        practical: 'Wskazówki dojazdu',
      },
      amenities: [
        {
          group: 'Łazienka', items: [
            { icon: '💨', label: 'Suszarka do włosów' },
            { icon: '🧹', label: 'Środki czystości' },
            { icon: '🧴', label: 'Szampon i żel pod prysznic' },
            { icon: '🧼', label: 'Mydło' },
            { icon: '🧺', label: 'Pralka' },
          ]
        },
        {
          group: 'Kuchnia i jadalnia', items: [
            { icon: '🗄️', label: 'Lodówka z zamrażarką' },
            { icon: '🍲', label: 'Garnki i patelnie' },
            { icon: '🍽️', label: 'Naczynia i sztućce' },
            { icon: '🧼', label: 'Zmywarka do naczyń' },
            { icon: '🎛️', label: 'Płyta indukcyjna i piekarnik' },
            { icon: '☕', label: 'Ekspres do kawy i czajnik' },
            { icon: '🍷', label: 'Kieliszki do wina' },
          ]
        },
        { group: 'Ogrzewanie i chłodzenie', items: [{ icon: '❄️', label: 'Klimatyzacja' }, { icon: '🔥', label: 'Ogrzewanie' }] },
        { group: 'Dodatkowe', items: [{ icon: '🧳', label: 'Dostępna przechowalnia bagażu (w razie wcześniejszego zameldowania lub późniejszego wymeldowania)' }, { icon: '📶', label: 'Szybkie Wi‑Fi z prywatnym routerem' }, { icon: '🚪', label: 'Prywatne wejście' }, { icon: '🤝', label: 'Gospodarz zawsze Cię powita' }] },
      ],
      neighborhood: {
        intro:
          'Ząbkowice Śląskie to historyczne miasteczko z klimatycznym rynkiem, słynną Krzywą Wieżą i licznymi trasami pieszymi oraz rowerowymi. Nasze mieszkanie to świetna baza wypadowa w Kotlinę Kłodzką i Góry Sowie.',
        highlights: [
          { name: 'Rynek z ratuszem i kawiarniami', distanceKm: 0.9, description: 'Spacerkiem dojdziesz w 12 minut do tętniącego życiem rynku z restauracjami i lodziarniami.' },
          { name: 'Krzywa Wieża', distanceKm: 1.1, description: 'Średniowieczna wieża odchylona o 2 metry – wejdź na górę i zobacz panoramę miasta.' },
          { name: 'Zamek książęcy', distanceKm: 1.5, description: 'Ruiny dawného zamku z tarasem widokowym i sezonowymi wydarzeniami.' },
          { name: 'Park Miejski im. Sybiraków', distanceKm: 0.6, description: 'Zielony park z placem zabaw i strefą relaksu – idealny na poranny jogging.' },
        ],
        dayTripsTitle: 'Pomysły na jednodniowe wycieczki',
        dayTrips: [
          { name: 'Twierdza Srebrna Góra', distanceKm: 12, description: 'Monumentalna pruska twierdza górska z rekonstrukcjami historycznymi i widokami na Góry Sowie.' },
          { name: 'Przełom Bardzki', distanceKm: 9, description: 'Spływ pontonem lub kajakiem po Nysie Kłodzkiej i widokowa bazylika w Bardzie.' },
          { name: 'Kłodzko', distanceKm: 35, description: 'Urokliwe miasto z twierdzą, podziemiami i bogatą ofertą restauracji.' },
          { name: 'Zieleniec Ski Arena', distanceKm: 55, description: 'Całoroczna stacja górska – latem trasy MTB, zimą narty oraz biegówki.' },
        ],
        discoverMore: 'Podpowiemy też mniej oczywiste miejsca – zapytaj nas o lokalne perełki!',
      },
    },
    practical: {
      title: 'Praktyczne informacje',
      intro: 'Dojedziesz do nas wygodnie samochodem, pociągiem lub autobusem. Kilka sprawdzonych tras poniżej:',
      toggleOpen: 'Pokaż szczegóły',
      toggleClose: 'Zwiń sekcję',
      cards: [
        {
          mode: 'Samochodem',
          icon: '🚗',
          routes: [
            { origin: 'Wrocław', distance: '78 km', duration: 'ok. 1 h 15 min', description: 'DK8 na Kudowę-Zdrój, zjazd na Ząbkowice Śląskie. Parking dostępny bezpośrednio przy domu.' },
            { origin: 'Kłodzko', distance: '35 km', duration: 'ok. 35 min', description: 'Szybka trasa DK8 przez Bardo – świetna baza do dalszych wycieczek.' },
            { origin: 'Katowice', distance: '190 km', duration: 'ok. 2 h 30 min', description: 'A4 do Wrocławia, następnie DK8. Polecamy postój przy Punkcie Widokowym w Bardzie.' },
          ],
        },
        {
          mode: 'Pociągiem',
          icon: '🚆',
          routes: [
            { origin: 'Wrocław Główny', distance: 'Linia D29-276', duration: 'ok. 1 h 45 min', description: 'Bezpośrednie połączenia Kolei Dolnośląskich. Dworzec oddalony o 1,4 km od apartamentu – polecamy spacer lub taxi (ok. 7 min).' },
            { origin: 'Kłodzko Miasto', distance: '35 km', duration: 'ok. 40 min', description: 'Bezpośredni pociąg co 2 godziny – podróż z widokiem na Przełom Bardzki.' },
          ],
        },
        {
          mode: 'Autobusem',
          icon: '🚌',
          routes: [
            { origin: 'Bardo', distance: '9 km', duration: 'ok. 15 min', description: 'Lokalne busy zatrzymują się przy ul. Wrocławskiej. Najbliższy przystanek (Okrężna) znajduje się 400 m od domu.' },
            { origin: 'Wałbrzych', distance: '55 km', duration: 'ok. 1 h 10 min', description: 'Połączenia przez Dzierżoniów. Polecamy kupić bilet online – przewoźnicy: Voyager, PKS.' },
          ],
        },
      ],
      tipsTitle: 'Przydatne wskazówki',
      tips: [
        'Zamówienie taxi z rynku to koszt ok. 12–15 zł – współpracujemy z lokalną korporacją, numer prześlemy po rezerwacji.',
        'Dla rowerzystów: trasa Singletrack Glacensis zaczyna się 8 km od domu, zapewniamy miejsce na przechowanie sprzętu.',
        'W sezonie letnim sprawdź godziny otwarcia atrakcji – niektóre zamykają się wcześniej w tygodniu.',
      ],
    },
    photos: {
      title: 'Zdjęcia',
      showMore: 'Zobacz więcej',
      showLess: 'Pokaż mniej',
      alt: 'Zdjęcie',
      openLabel: 'Powiększ zdjęcie',
      closeLabel: 'Zamknij',
      prevLabel: 'Poprzednie zdjęcie',
      nextLabel: 'Następne zdjęcie',
    },
    contact: {
      title: 'Kontakt',
      lead: 'Masz pytania? Skontaktuj się z nami!',
      reserveLead: 'Aby zarezerwować, skorzystaj z linków poniżej:',
      airbnb: 'Zarezerwuj na Airbnb',
      booking: 'Zarezerwuj na Booking',
      airbnbUrl: 'https://www.airbnb.com/rooms/1388217247080410873?&locale=pl&currency=PLN',
      bookingUrl: 'https://www.booking.com/hotel/pl/przystanek-okrezna.pl.html',
      form: { name: 'Imię i nazwisko', email: 'Email', phone: 'Telefon', message: 'Wiadomość', submit: 'Wyślij wiadomość', sending: 'Wysyłanie...' },
      hostLabel: 'Gospodarz',
      hostName: 'Alicja',
      hostBio: 'Mieszkam w okolicy i chętnie podpowiem co zobaczyć oraz gdzie dobrze zjeść. Zawsze dbam o komfort gości.',
      successMessage: 'Dziękujemy za wiadomość! Skontaktujemy się wkrótce.',
      errorMessage: 'Ups! Coś poszło nie tak. Spróbuj ponownie za chwilę.',
      hostLanguages: ['polski', 'angielski'],
      hostPassions: ['podróże', 'rower', 'kawa'],
    },
    reviews: {
      title: 'Opinie gości',
      items: [],
      rating: 'Ocena',
      outOf: 'na',
      showAll: 'Pokaż wszystkie recenzje',
      externalSummaryTitle: 'Oceny na portalach',
      aggregateLabel: 'Łączna średnia',
      aggregateFootnote: 'Średnia ważona na podstawie liczby opinii – przeliczona na skalę 5-punktową.',
      updatedLabel: 'Aktualizacja',
      reviewsCountLabel: 'opinii',
      external: [
        { source: 'Airbnb', rating: 4.94, scale: 5, reviews: 68, url: 'https://www.airbnb.com/rooms/1388217247080410873/reviews', updated: '2025-10-12' },
        { source: 'Booking.com', rating: 9.3, scale: 10, reviews: 54, url: 'https://www.booking.com/hotel/pl/przystanek-okrezna.pl.html#tab-reviews', updated: '2025-09-28' },
      ],
    },
    rules: {
      title: 'Regulamin domu',
      items: [
        'Szanuj prosimy sąsiadów – nocna cisza trwa od 22:00 do 6:00.',
        'Zameldowanie: 15:00 – 22:00 (daj znać, jeśli planujesz przyjazd poza tymi godzinami).',
        'Wymeldowanie: do godziny 11:00 – przy zameldowaniu ustalimy szczegóły dotyczące zwrotu kluczy.',
        'W mieszkaniu obowiązuje zakaz palenia oraz organizacji imprez.',
        'Jeśli coś się uszkodzi, poinformuj nas jak najszybciej – wspólnie znajdziemy rozwiązanie.',
      ],
      note: 'W razie dodatkowych pytań, skontaktuj się z nami przed rezerwacją za pomocą formularza kontaktowego.',
    },
    faq: {
      title: 'Najczęstsze pytania',
      items: [
        {
          question: 'Czy mogę przyjechać z dziećmi?',
          answer: 'Tak, mieszkanie jest przyjazne dla rodzin z dziećmi. Nie posiadamy łóżeczka dziecięcego ani krzesełka do karmienia, ale możemy pomóc w ich wypożyczeniu na życzenie.',
        },
        {
          question: 'Czy mogę dokonać rezerwacji bezpośrednio przez formularz kontaktowy?',
          answer: 'Niestety, rezerwacje można dokonać tylko poprzez platformy Airbnb lub Booking.com za pomocą podanych linków.',
        },
        {
          question: 'Czy można przyjechać z pupilem?',
          answer: 'Niestety, na parterze mieszka już jeden czworonożny domownik, więc dla komfortu zarówno Twojego, jak i naszego zwierzaka, nie akceptujemy rezerwacji ze zwierzętami.',
        },
        {
          question: 'Jak wygląda samo zameldowanie?',
          answer: 'Spotkamy się na miejscu, aby przekazać klucze i krótkie wskazówki. Jeśli planujesz przyjazd późno wieczorem, daj nam znać z wyprzedzeniem.',
        },
      ],
    },
    footer: {
      company: 'Przystanek Okrężna • Alicja O.',
      addressLabel: 'Adres: Okrężna 15, 57-200 Ząbkowice Śląskie',
      registerInfo: 'Działalność nierejestrowa prowadzona zgodnie z polskimi przepisami turystycznymi.',
      taxIdLabel: 'NIP',
      taxIdValue: 'do uzupełnienia',
      legalLinks: [
        { label: 'Polityka prywatności (PDF)', url: '#' },
        { label: 'Regulamin pobytu (PDF)', url: '#' },
      ],
      copyright: '2025 Przystanek Okrężna. Wszystkie prawa zastrzeżone.',
    },
    seo: {
      title: 'Przystanek Okrężna – Apartament w Ząbkowicach Śląskich',
      description:
        'Przystanek Okrężna to komfortowy apartament o powierzchni 55 m² w Ząbkowicach Śląskich. Parking, klimatyzacja, w pełni wyposażona kuchnia i świetna baza wypadowa w Kotlinę Kłodzką.',
      ogTitle: 'Przystanek Okrężna | Przytulny apartament w Kotlinie Kłodzkiej',
      ogDescription:
        'Zarezerwuj nocleg w Przystanku Okrężna – prywatne mieszkanie, parking, klimatyzacja i wyśmienite opinie gości. Idealne na weekend, pracę zdalną i górskie wycieczki.',
      keywords: [
        'apartament Ząbkowice Śląskie',
        'noclegi Kotlina Kłodzka',
        'Przystanek Okrężna',
        'nocleg góry Sowie',
        'apartament z parkingiem',
      ],
    },
    ui: {
      scrollTop: 'Wróć na górę',
    },
  },

  en: {
    header: {
      brand: 'Przystanek Okrężna',
      tagline: 'Apartment in the heart of Ząbkowice Śląskie',
      nav: {
        location: 'Location',
        about: 'About',
        photos: 'Photos',
        contact: 'Contact',
        insights: 'FAQ & Reviews',
      },
      lang: { pl: 'Polish', en: 'English' },
    },
    hero: {
      title: 'Welcome to Przystanek Okrężna',
      subtitle: 'Your ideal choice for a comfortable stay in the city center',
      airbnb: 'Book on Airbnb',
      booking: 'Book on Booking',
    },
    location: { title: 'Location', address: 'Okrężna 15, 57-200 Ząbkowice Śląskie, Poland', mapTitle: 'Location map' },
    about: {
      title: 'About',
      description:
        'A cozy apartment in Ząbkowice Śląskie, just a 10-minute walk from the town center. Perfect for exploring local mountains, the Kłodzko Valley, and cycling routes. Great for active trips or peaceful relaxation in a green, quiet area away from city noise. Ideal as a base for sightseeing or simply enjoying nature. The space: a large living room with a kitchenette, a bathroom, and a separate bedroom. It occupies the entire second floor of a detached house and is fully lockable for privacy and security. Other things to note: possibility to safely store bicycles.',
      keyFactsTitle: 'Key apartment facts',
      keyFacts: [
        { label: 'Floor area', value: '55 m²', hint: 'Entire second floor reserved exclusively for guests' },
        { label: 'Guests', value: 'Up to 4 people', hint: 'Queen bedroom plus sofa-bed in the living room' },
        { label: 'Bedrooms', value: '1 bedroom', hint: 'Blackout blinds and cotton linens included' },
        { label: 'Beds', value: '1× queen, 1× sofa-bed', hint: 'Fresh bedding and extra blankets provided' },
      ],
      features: [
        { icon: '📶', title: 'Free Wi‑Fi', text: 'Fast and reliable internet connection.' },
        { icon: '🍳', title: 'Equipped kitchen', text: 'Everything you need for cooking.' },
        { icon: '🚗', title: 'Parking', text: 'Safe place for your car.' },
      ],
      tabs: {
        description: 'Key information',
        amenities: 'Amenities',
        rules: 'House rules',
        neighborhood: 'Neighborhood',
        practical: 'Travel guidance',
      },
      amenities: [
        {
          group: 'Bathroom', items: [
            { icon: '🧴', label: 'Hair dryer' },
            { icon: '🧼', label: 'Cleaning products' },
            { icon: '🧴', label: 'Shampoo' },
            { icon: '🧼', label: 'Body soap' },
            { icon: '♨️', label: 'Hot water' },
            { icon: '🚿', label: 'Shower gel' },
          ]
        },
        { group: 'Entertainment', items: [{ icon: '📚', label: 'Books and reading materials' }] },
        { group: 'Heating and cooling', items: [{ icon: '❄️', label: 'Air conditioning' }, { icon: '🔥', label: 'Heating' }] },
        { group: 'Home safety', items: [{ icon: '🔥', label: 'Smoke alarm' }] },
        { group: 'Internet and office', items: [{ icon: '📶', label: 'Wi‑Fi' }, { icon: '💻', label: 'Dedicated workspace' }] },
        {
          group: 'Kitchen and dining', items: [
            { icon: '🍽️', label: 'Kitchen' },
            { icon: '🥘', label: 'Space to cook' },
            { icon: '🧊', label: 'Refrigerator' },
            { icon: '🍳', label: 'Cooking basics' },
            { icon: '🍲', label: 'Pots and pans, oil, salt and pepper' },
            { icon: '🍽️', label: 'Dishes and silverware' },
            { icon: '🥣', label: 'Bowls, plates, cups etc.' },
            { icon: '🧊', label: 'Freezer' },
            { icon: '🧼', label: 'Dishwasher' },
            { icon: '🔥', label: 'Stovetop' },
            { icon: '🍞', label: 'Oven' },
            { icon: '☕', label: 'Kettle' },
            { icon: '☕', label: 'Coffee maker' },
            { icon: '🍷', label: 'Wine glasses' },
            { icon: '🍽️', label: 'Dining table' },
            { icon: '☕', label: 'Coffee' },
          ]
        },
        { group: 'Location features', items: [{ icon: '🚪', label: 'Private entrance' }, { icon: '🚪', label: 'Street-level private entry' }] },
        { group: 'Parking and facilities', items: [{ icon: '🅿️', label: 'Free parking on premises' }] },
        { group: 'Services', items: [{ icon: '🧳', label: 'Luggage dropoff allowed' }, { icon: '🤝', label: 'Host greets you' }] },
      ],
      neighborhood: {
        intro:
          'Ząbkowice Śląskie is a charming medieval town with a vibrant market square, the famous Leaning Tower and plenty of scenic cycling routes. Our apartment is a perfect base for the Kłodzko Valley and the Owl Mountains.',
        highlights: [
          { name: 'Market Square & cafés', distanceKm: 0.9, description: 'A 12-minute walk takes you to colourful townhouses, local bakeries and outdoor dining.' },
          { name: 'Leaning Tower', distanceKm: 1.1, description: 'Climb the 139 steps of the 15th-century tower and enjoy the panoramic view.' },
          { name: 'Ducal Castle ruins', distanceKm: 1.5, description: 'Explore the hilltop ruins and seasonal cultural events in the castle courtyard.' },
          { name: 'Sybiracy City Park', distanceKm: 0.6, description: 'Green park with a playground, running paths and shaded benches for a relaxing afternoon.' },
        ],
        dayTripsTitle: 'Day-trip ideas',
        dayTrips: [
          { name: 'Srebrna Góra Fortress', distanceKm: 12, description: 'Impressive 18th-century mountain fortress with reenactments and sweeping views.' },
          { name: 'Bardo Gorge', distanceKm: 9, description: 'White-water rafting or kayak trips on the Nysa Kłodzka river plus the baroque basilica.' },
          { name: 'Kłodzko', distanceKm: 35, description: 'Discover underground tunnels, the fortress and a lively culinary scene.' },
          { name: 'Zieleniec Ski Arena', distanceKm: 55, description: 'All-season mountain resort: MTB trails in summer, skiing and cross-country in winter.' },
        ],
        discoverMore: 'Looking for underrated spots? Ask us for local tips tailored to your plans.',
      },
    },
    practical: {
      title: 'Practical information',
      intro: 'Arrive comfortably by car, train or coach. We gathered the most popular routes for you:',
      toggleOpen: 'Show details',
      toggleClose: 'Hide section',
      cards: [
        {
          mode: 'By car',
          icon: '🚗',
          routes: [
            { origin: 'Wrocław', distance: '78 km', duration: 'approx. 1 h 15 min', description: 'Follow national road DK8 towards Kudowa-Zdrój, exit for Ząbkowice Śląskie. Free parking available on-site.' },
            { origin: 'Kłodzko', distance: '35 km', duration: 'approx. 35 min', description: 'Scenic DK8 drive via Bardo – perfect if you plan to explore the valley.' },
            { origin: 'Katowice', distance: '190 km', duration: 'approx. 2 h 30 min', description: 'Take A4 to Wrocław and continue on DK8. We recommend a short stop at the Bardo viewpoint.' },
          ],
        },
        {
          mode: 'By train',
          icon: '🚆',
          routes: [
            { origin: 'Wrocław Główny', distance: 'Line D29-276', duration: 'approx. 1 h 45 min', description: 'Direct Koleje Dolnośląskie trains. The railway station is 1.4 km from the apartment – it is an easy walk or a 7-minute taxi ride.' },
            { origin: 'Kłodzko Miasto', distance: '35 km', duration: 'approx. 40 min', description: 'Direct train every two hours with stunning views of the Bardo Gorge.' },
          ],
        },
        {
          mode: 'By coach',
          icon: '🚌',
          routes: [
            { origin: 'Bardo', distance: '9 km', duration: 'approx. 15 min', description: 'Local minibuses stop on Wrocławska Street. The nearest stop (Okrężna) is 400 m from the house.' },
            { origin: 'Wałbrzych', distance: '55 km', duration: 'approx. 1 h 10 min', description: 'Connections via Dzierżoniów. Buy tickets online – providers include Voyager and PKS.' },
          ],
        },
      ],
      tipsTitle: 'Useful tips',
      tips: [
        'Local taxi from the market square costs around 15 PLN – we share a trusted number after booking.',
        'Cyclists welcome: Singletrack Glacensis trailhead is 8 km away; secure bike storage is available.',
        'Summer attractions may close earlier on weekdays – check opening hours in advance.',
      ],
    },
    photos: {
      title: 'Photos',
      showMore: 'Show more',
      showLess: 'Show less',
      alt: 'Photo',
      openLabel: 'Zoom image',
      closeLabel: 'Close',
      prevLabel: 'Previous image',
      nextLabel: 'Next image',
    },
    contact: {
      title: 'Contact',
      lead: 'Have questions? Get in touch!',
      reserveLead: 'To book, use the links below:',
      airbnb: 'Book on Airbnb',
      airbnbUrl: 'https://www.airbnb.com/rooms/1388217247080410873?&locale=en&currency=USD',
      bookingUrl: 'https://www.booking.com/hotel/pl/przystanek-okrezna.html',
      booking: 'Book on Booking',
      form: { name: 'Full name', email: 'Email', phone: 'Phone', message: 'Message', submit: 'Send message', sending: 'Sending...' },
      hostLabel: 'Host',
      hostName: 'Alicja',
      hostBio: 'I live nearby and I’m happy to share tips on what to see and where to eat. I always care about guests’ comfort.',
      successMessage: 'Thanks for your message! We will contact you soon.',
      errorMessage: 'Something went wrong. Please try again in a moment.',
      hostLanguages: ['Polish', 'English'],
      hostPassions: ['travel', 'cycling', 'coffee'],
    },
    reviews: {
      title: 'Guest Reviews',
      items: [],
      rating: 'Rating',
      outOf: 'out of',
      showAll: 'Show all reviews',
      externalSummaryTitle: 'External ratings',
      aggregateLabel: 'Weighted average',
      aggregateFootnote: 'Weighted average calculated across platforms and converted to a 5-point scale.',
      updatedLabel: 'Last updated',
      reviewsCountLabel: 'reviews',
      external: [
        { source: 'Airbnb', rating: 4.94, scale: 5, reviews: 68, url: 'https://www.airbnb.com/rooms/1388217247080410873/reviews', updated: '2025-10-12' },
        { source: 'Booking.com', rating: 9.3, scale: 10, reviews: 54, url: 'https://www.booking.com/hotel/pl/przystanek-okrezna.html#tab-reviews', updated: '2025-09-28' },
      ],
    },
    rules: {
      title: 'House rules',
      items: [
        'Quiet hours are in place from 10:00 PM to 6:00 AM – thank you for respecting our neighbours.',
        'Check-in: 3:00 PM – 10:00 PM (let us know if you arrive later).',
        'Check-out: by 11:00 AM – please leave the keys on the kitchen table.',
        'No smoking and no parties in the apartment.',
        'Please sort waste using the labelled bins next to the carport.',
        'Report any damage immediately so we can arrange a repair together.',
      ],
      note: 'You will receive the full house manual after booking, including safety and data protection details.',
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          question: 'Is the apartment family-friendly?',
          answer: 'Yes, we welcome families. A highchair and travel cot are available on request – please let us know before arrival.',
        },
        {
          question: 'Can I get an invoice?',
          answer: 'We provide personal invoices. For business invoices, send us your company details when booking.',
        },
        {
          question: 'Are pets allowed?',
          answer: 'Small, well-behaved pets are welcome after prior confirmation. A one-time deep-cleaning fee of 80 PLN applies.',
        },
        {
          question: 'How does check-in work?',
          answer: 'We usually meet you in person to hand over the keys and share tips. Self check-in with a lockbox is also possible.',
        },
        {
          question: 'Are there shops and restaurants nearby?',
          answer: 'Within 600 m you will find a Dino supermarket, a bakery and Napoli pizzeria. The market square offers bistros, an ice-cream parlour and a specialty café.',
        },
      ],
    },
    footer: {
      company: 'Przystanek Okrężna • Alicja O.',
      addressLabel: 'Address: Okrężna 15, 57-200 Ząbkowice Śląskie, Poland',
      registerInfo: 'Informal hospitality business operated in compliance with Polish regulations.',
      taxIdLabel: 'Tax ID',
      taxIdValue: 'to be provided',
      legalLinks: [
        { label: 'Privacy policy (PDF)', url: '#' },
        { label: 'Terms of stay (PDF)', url: '#' },
      ],
      copyright: '2025 Przystanek Okrężna. All rights reserved.',
    },
    seo: {
      title: 'Przystanek Okrężna – Apartment in Ząbkowice Śląskie',
      description:
        'Stay at Przystanek Okrężna: a 55 m² apartment with private parking, air conditioning and a fully equipped kitchen. Perfect base for the Owl Mountains and the Kłodzko Valley.',
      ogTitle: 'Przystanek Okrężna | Cozy apartment near the Owl Mountains',
      ogDescription:
        'Book Przystanek Okrężna – private flat with parking, AC and excellent guest reviews. Ideal for weekend breaks, remote work and mountain getaways.',
      keywords: [
        'apartment Ząbkowice Śląskie',
        'lodging Kłodzko Valley',
        'Przystanek Okrężna',
        'Owl Mountains stay',
        'apartment with parking',
      ],
    },
    ui: {
      scrollTop: 'Back to top',
    },
  },
}

export function getDictionary(locale: string): Dictionary {
  const key = (['pl', 'en'] as const).includes(locale as any) ? (locale as Locale) : 'pl'
  return dictionaries[key]
}
