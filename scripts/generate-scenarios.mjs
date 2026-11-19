import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('../src/types').Scenario[]} */
const scenarios = [
  {
    id: 'shuttle-welcome',
    title: 'Welcoming the guest at the shuttle stop',
    topicId: 'airport-shuttle',
    grammarFocus: 'Polite greetings; May I…?; present simple for routines',
    summary:
      'Confirm the guest name at bus stop 14, give a wristband, and explain the free shuttle wait.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Good afternoon. Welcome to ODAL Rent-a-Car. May I have your name, please?',
        hints: [{ word: 'May I have', ko: '~을/를 주시겠어요?' }],
      },
      {
        speaker: 'customer',
        text: 'Yes. My name is Kim Min-jun. I booked a compact car.',
      },
      {
        speaker: 'staff',
        text: 'Thank you, Mr. Kim. Here is your wristband. Please wait next to the ODAL sign. The shuttle runs about every 20 minutes.',
        hints: [
          { word: 'wristband', ko: '손목띠' },
          { word: 'shuttle', ko: '셔틀버스' },
        ],
      },
      {
        speaker: 'customer',
        text: 'How long is the ride to the shop?',
      },
      {
        speaker: 'staff',
        text: 'It takes about 20 to 25 minutes. You do not need to call if a staff member is here.',
      },
    ],
    exercises: [
      {
        id: 'shuttle-welcome-fb',
        type: 'fillBlank',
        prompt: 'Complete the polite request.',
        sentence: '___ I have your name, please?',
        blanks: ['May'],
        explanation: 'Use May I…? for a polite request at the counter or shuttle stop.',
      },
      {
        id: 'shuttle-welcome-mc',
        type: 'multipleChoice',
        prompt: 'Which sentence correctly describes the shuttle routine?',
        choices: [
          'The shuttle is running every 20 minutes yesterday.',
          'The shuttle runs about every 20 minutes.',
          'The shuttle run every 20 minutes.',
          'The shuttle will runs every 20 minutes.',
        ],
        correctIndex: 1,
        explanation: 'Present simple (runs) is used for regular schedules and routines.',
      },
      {
        id: 'shuttle-welcome-so',
        type: 'sentenceOrder',
        prompt: 'Put the words in order.',
        words: ['Please', 'wait', 'next', 'to', 'the', 'ODAL', 'sign'],
        correctOrder: ['Please', 'wait', 'next', 'to', 'the', 'ODAL', 'sign'],
        explanation: 'Please + imperative makes a polite instruction. next to = beside.',
      },
      {
        id: 'shuttle-welcome-pc',
        type: 'politeChoice',
        prompt: 'Choose the more polite line.',
        options: ['Give me your name.', 'May I have your name, please?'],
        correctIndex: 1,
        explanation: 'May I…? and please soften the request for guests.',
      },
    ],
  },
  {
    id: 'shuttle-lost',
    title: 'No staff at stop 14 / the guest is lost',
    topicId: 'airport-shuttle',
    grammarFocus: 'Imperatives and sequence words; prepositions of place',
    summary:
      'Guide a guest from international arrivals to domestic bus stop 14, and explain who to contact if staff are missing.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Hello? I am at the international terminal. Where is the ODAL shuttle?',
      },
      {
        speaker: 'staff',
        text: 'Please go out on the first floor. Then walk about eight minutes toward the domestic terminal.',
        hints: [{ word: 'domestic terminal', ko: '국내선 터미널' }],
      },
      {
        speaker: 'staff',
        text: 'Wait at bus stop 14 in front of the domestic terminal, next to the ODAL sign — not behind a pillar.',
        hints: [{ word: 'bus stop 14', ko: '14번 정류장' }],
      },
      {
        speaker: 'customer',
        text: 'What if nobody is there?',
      },
      {
        speaker: 'staff',
        text: 'From 08:00 to 09:00, please phone our emergency number. From 09:00 to 18:00, contact KakaoTalk 오키나와달인.',
      },
    ],
    exercises: [
      {
        id: 'shuttle-lost-fb',
        type: 'fillBlank',
        prompt: 'Complete the direction.',
        sentence: 'Walk ___ the domestic terminal and wait ___ bus stop 14.',
        blanks: ['toward', 'at'],
        explanation: 'toward = in the direction of; at + stop for a waiting place.',
      },
      {
        id: 'shuttle-lost-mc',
        type: 'multipleChoice',
        prompt: 'Choose the clearest sequence.',
        choices: [
          'Wait first, then go out, finally walk.',
          'Go out on the first floor, then walk toward the domestic terminal, then wait at stop 14.',
          'Wait at stop 14, go out, walk toward domestic.',
          'Phone first every time, then walk.',
        ],
        correctIndex: 1,
        explanation: 'Use first / then / after that to order steps clearly for lost guests.',
      },
      {
        id: 'shuttle-lost-so',
        type: 'sentenceOrder',
        prompt: 'Order the instruction.',
        words: ['Please', 'wait', 'next', 'to', 'the', 'ODAL', 'sign'],
        correctOrder: ['Please', 'wait', 'next', 'to', 'the', 'ODAL', 'sign'],
        explanation: 'next to marks position beside the sign so staff can see the guest.',
      },
      {
        id: 'shuttle-lost-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer instruction.',
        options: [
          'Somewhere near domestic maybe stop.',
          'Please wait at bus stop 14 in front of the domestic terminal.',
        ],
        correctIndex: 1,
        explanation: 'Specific place phrases (at / in front of) reduce confusion.',
      },
    ],
  },
  {
    id: 'checkin-docs',
    title: 'Check-in and documents',
    topicId: 'counter-checkin',
    grammarFocus: 'Could/would/please; I’m afraid we can’t…; must / have to',
    summary:
      'Ask every driver for the original International Driving Permit and Korean license, and explain that an English-language license is not accepted.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Welcome. Could you show me your International Driving Permit and your Korean driver’s license, please?',
        hints: [
          { word: 'International Driving Permit', ko: '국제운전면허증' },
          { word: 'driver’s license', ko: '운전면허증' },
        ],
      },
      {
        speaker: 'customer',
        text: 'I have an English-language Korean license. Is that OK?',
      },
      {
        speaker: 'staff',
        text: 'I’m afraid we can’t accept an English-language license. You must have the original Geneva Convention IDP.',
      },
      {
        speaker: 'staff',
        text: 'The English spelling on the IDP also has to match your passport.',
        hints: [{ word: 'passport', ko: '여권' }],
      },
      {
        speaker: 'customer',
        text: 'Understood. Here are both documents.',
      },
    ],
    exercises: [
      {
        id: 'checkin-docs-fb',
        type: 'fillBlank',
        prompt: 'Complete the soft refusal.',
        sentence: 'I’m afraid we ___ accept an English-language license.',
        blanks: ["can't"],
        explanation: 'I’m afraid + can’t softens bad news at the counter.',
      },
      {
        id: 'checkin-docs-mc',
        type: 'multipleChoice',
        prompt: 'Which sentence shows obligation correctly?',
        choices: [
          'You can must bring the IDP.',
          'You must have the original IDP.',
          'You maybe have the original IDP.',
          'You must to have the original IDP.',
        ],
        correctIndex: 1,
        explanation: 'must + base verb expresses a firm rule (original IDP required).',
      },
      {
        id: 'checkin-docs-so',
        type: 'sentenceOrder',
        prompt: 'Order the polite request.',
        words: ['Could', 'you', 'show', 'me', 'your', 'IDP', 'please'],
        correctOrder: ['Could', 'you', 'show', 'me', 'your', 'IDP', 'please'],
        explanation: 'Could you… please? is a standard polite request pattern.',
      },
      {
        id: 'checkin-docs-pc',
        type: 'politeChoice',
        prompt: 'Choose the more polite refusal.',
        options: [
          'English license? No. Impossible.',
          'I’m afraid we can’t accept an English-language license.',
        ],
        correctIndex: 1,
        explanation: 'I’m afraid… keeps the tone respectful while stating the rule.',
      },
    ],
  },
  {
    id: 'forgot-idp',
    title: 'The guest forgot the IDP',
    topicId: 'counter-checkin',
    grammarFocus: 'Conditionals; softening bad news',
    summary:
      'Explain that the car cannot be released without an IDP, and that a same-day cancel still has a fee (50% of payment, max 100,000 KRW).',
    dialogue: [
      {
        speaker: 'customer',
        text: 'I left my International Driving Permit in Korea. Can I still rent today?',
      },
      {
        speaker: 'staff',
        text: 'I’m sorry. If you don’t have the original IDP, we cannot rent the car.',
      },
      {
        speaker: 'customer',
        text: 'Then I need to cancel. Is the cancellation free?',
      },
      {
        speaker: 'staff',
        text: 'Unfortunately, a same-day cancel still has a fee: 50% of the amount paid, up to 100,000 KRW. Forgetting the IDP is treated as a personal reason.',
        hints: [{ word: 'cancellation fee', ko: '취소 수수료' }],
      },
      {
        speaker: 'staff',
        text: 'If you cancel up to one day before the rental start date, you get a full refund.',
      },
    ],
    exercises: [
      {
        id: 'forgot-idp-fb',
        type: 'fillBlank',
        prompt: 'Complete the conditional.',
        sentence: 'If you don’t have the IDP, we ___ rent the car.',
        blanks: ['cannot'],
        explanation: 'First conditional / real result: If + present, result with cannot/will not.',
      },
      {
        id: 'forgot-idp-mc',
        type: 'multipleChoice',
        prompt: 'What is the same-day cancel fee for ODAL?',
        choices: [
          'Full refund always',
          '50% of the amount paid, maximum 100,000 KRW',
          '20,000 yen',
          'No fee if you forgot the IDP',
        ],
        correctIndex: 1,
        explanation: 'Verified policy: same-day cancel or no-show = 50% (max 100,000 KRW).',
      },
      {
        id: 'forgot-idp-so',
        type: 'sentenceOrder',
        prompt: 'Order the soft bad-news sentence.',
        words: ['I’m', 'sorry', 'we', 'cannot', 'rent', 'the', 'car'],
        correctOrder: ['I’m', 'sorry', 'we', 'cannot', 'rent', 'the', 'car'],
        explanation: 'I’m sorry + clear result softens firm policy language.',
      },
      {
        id: 'forgot-idp-pc',
        type: 'politeChoice',
        prompt: 'Choose the softer explanation.',
        options: [
          'No IDP, no car. Pay the fee.',
          'I’m sorry — without the original IDP, we cannot release the car today.',
        ],
        correctIndex: 1,
        explanation: 'Empathy + clear rule is better for difficult counter moments.',
      },
    ],
  },
  {
    id: 'additional-driver',
    title: 'Registering an additional driver',
    topicId: 'counter-checkin',
    grammarFocus: 'can / may; anyone who will drive; present perfect',
    summary:
      'Additional drivers are free. Every driver must show an original IDP and be registered now, or they are not insured.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Can my wife drive too?',
      },
      {
        speaker: 'staff',
        text: 'Yes, you may register additional drivers for free. Anyone who will drive must show an original IDP today.',
        hints: [{ word: 'additional driver', ko: '추가 운전자' }],
      },
      {
        speaker: 'staff',
        text: 'Have you all brought your permits?',
      },
      {
        speaker: 'customer',
        text: 'Yes. Here is hers as well.',
      },
      {
        speaker: 'staff',
        text: 'Perfect. Unregistered drivers are not insured, so we add everyone now.',
      },
    ],
    exercises: [
      {
        id: 'additional-driver-fb',
        type: 'fillBlank',
        prompt: 'Complete the present perfect question.',
        sentence: '___ you all brought your permits?',
        blanks: ['Have'],
        explanation: 'Have you brought…? checks completed preparation before departure.',
      },
      {
        id: 'additional-driver-mc',
        type: 'multipleChoice',
        prompt: 'Which sentence is correct?',
        choices: [
          'Anyone who will drive must be registered.',
          'Anyone who will driving must be registered.',
          'Anyone who drive must registered.',
          'Anyone will drive must to register.',
        ],
        correctIndex: 0,
        explanation: 'Relative clause: anyone who will drive + must + be registered.',
      },
      {
        id: 'additional-driver-so',
        type: 'sentenceOrder',
        prompt: 'Order the permission sentence.',
        words: ['You', 'may', 'register', 'additional', 'drivers', 'for', 'free'],
        correctOrder: ['You', 'may', 'register', 'additional', 'drivers', 'for', 'free'],
        explanation: 'may = polite permission. for free = no charge.',
      },
      {
        id: 'additional-driver-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer staff line.',
        options: [
          'Maybe she drive, whatever.',
          'Yes — we can add her free if she shows her original IDP now.',
        ],
        correctIndex: 1,
        explanation: 'State permission, condition, and timing in one clear sentence.',
      },
    ],
  },
  {
    id: 'insurance-noc',
    title: 'Explaining insurance and NOC',
    topicId: 'insurance-noc',
    grammarFocus: 'Conditionals; passives; included vs extra',
    summary:
      'Comprehensive insurance is included. Premium NOC is already paid, so the 20,000 / 50,000 yen NOC fee is not charged when the plan applies. Explain key exclusions.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Is insurance included? What is NOC?',
      },
      {
        speaker: 'staff',
        text: 'Yes. Comprehensive motor insurance is included in the rental rate. Premium NOC is also already included for ODAL customers.',
        hints: [
          { word: 'insurance', ko: '보험' },
          { word: 'NOC', ko: '휴차 영업손실 부담금' },
        ],
      },
      {
        speaker: 'staff',
        text: 'If you have an accident and can drive the car back, the NOC would normally be 20,000 yen. If the car must be towed, it would be 50,000 yen. With Premium NOC, you do not pay that fee.',
      },
      {
        speaker: 'customer',
        text: 'Is everything covered?',
      },
      {
        speaker: 'staff',
        text: 'No. For example, no police report, an unregistered driver, drunk driving, wrong fuel, or driving on islands not connected by bridge is not covered.',
      },
    ],
    exercises: [
      {
        id: 'insurance-noc-fb',
        type: 'fillBlank',
        prompt: 'Complete the passive.',
        sentence: 'Comprehensive insurance ___ included in the rental rate.',
        blanks: ['is'],
        explanation: 'Passive: is included = the company already provides it; the guest does not add it.',
      },
      {
        id: 'insurance-noc-mc',
        type: 'multipleChoice',
        prompt: 'Without a NOC plan, what would a towed-car NOC be?',
        choices: ['20,000 yen', '50,000 yen', '100,000 KRW', '550 yen'],
        correctIndex: 1,
        explanation: 'Verified: 20,000 yen if driven back; 50,000 yen if towed or left on the road.',
      },
      {
        id: 'insurance-noc-so',
        type: 'sentenceOrder',
        prompt: 'Order the conditional.',
        words: ['If', 'you', 'can', 'drive', 'back', 'NOC', 'is', '20,000', 'yen'],
        correctOrder: ['If', 'you', 'can', 'drive', 'back', 'NOC', 'is', '20,000', 'yen'],
        explanation: 'If + present ability, result states the fee that Premium NOC waives.',
      },
      {
        id: 'insurance-noc-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer explanation.',
        options: [
          'NOC thing already paid so don’t worry forever about anything.',
          'Premium NOC is included, so you do not pay the 20,000 or 50,000 yen loss-of-use fee when the plan applies.',
        ],
        correctIndex: 1,
        explanation: 'Name the plan, the fee, and the condition (when the plan applies).',
      },
    ],
  },
  {
    id: 'child-seat',
    title: 'Child seat for a child under 6',
    topicId: 'free-items',
    grammarFocus: 'must / have to / are required to; offers; comparatives',
    summary:
      'Japanese law requires a child seat for children under 6. At ODAL seats are free. Offer installation in a rear seat without an airbag.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Will any child under six ride with you today?',
        hints: [{ word: 'child seat', ko: '카시트' }],
      },
      {
        speaker: 'customer',
        text: 'Yes, our daughter is four. Do we have to use a seat?',
      },
      {
        speaker: 'staff',
        text: 'Yes. Children under six are required to use a child seat. It is Japanese law, and we cannot rent without one.',
      },
      {
        speaker: 'staff',
        text: 'Would you like me to help install it in a rear seat without an airbag?',
      },
      {
        speaker: 'customer',
        text: 'Yes, please. This one looks a little small.',
      },
      {
        speaker: 'staff',
        text: 'No problem. We can change the type today if stock allows.',
      },
    ],
    exercises: [
      {
        id: 'child-seat-fb',
        type: 'fillBlank',
        prompt: 'Complete the offer.',
        sentence: 'Would you like me ___ help install it?',
        blanks: ['to'],
        explanation: 'Would you like me to + verb is a polite offer of help.',
      },
      {
        id: 'child-seat-mc',
        type: 'multipleChoice',
        prompt: 'Which obligation sentence is correct?',
        choices: [
          'Children under six must to use a child seat.',
          'Children under six are required to use a child seat.',
          'Children under six can required use a child seat.',
          'Children under six should required using a child seat.',
        ],
        correctIndex: 1,
        explanation: 'are required to + verb states a legal obligation clearly.',
      },
      {
        id: 'child-seat-so',
        type: 'sentenceOrder',
        prompt: 'Order the comparative sentence.',
        words: ['This', 'seat', 'is', 'too', 'small', 'for', 'her'],
        correctOrder: ['This', 'seat', 'is', 'too', 'small', 'for', 'her'],
        explanation: 'too + adjective = more than needed; useful when changing seat type.',
      },
      {
        id: 'child-seat-pc',
        type: 'politeChoice',
        prompt: 'Choose the better offer.',
        options: ['Install it yourself.', 'Would you like me to help install it?'],
        correctIndex: 1,
        explanation: 'Offers with Would you like…? sound helpful and professional.',
      },
    ],
  },
  {
    id: 'car-walkaround',
    title: 'Car walk-around and existing damage',
    topicId: 'car-inspection',
    grammarFocus: 'let’s / shall we; there is/are; present perfect',
    summary:
      'Invite the guest to inspect the car with you and confirm existing scratches before departure.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Shall we walk around the car together before you leave?',
        hints: [{ word: 'walk-around', ko: '차량 외관 점검' }],
      },
      {
        speaker: 'customer',
        text: 'Sure. There is a small scratch on the rear bumper.',
      },
      {
        speaker: 'staff',
        text: 'Thank you for noticing. Has this scratch already been recorded on the check-in?',
      },
      {
        speaker: 'customer',
        text: 'I’m not sure.',
      },
      {
        speaker: 'staff',
        text: 'Let’s note it now so you are not charged later. There are no other marks on this side.',
      },
    ],
    exercises: [
      {
        id: 'car-walkaround-fb',
        type: 'fillBlank',
        prompt: 'Complete the present perfect passive.',
        sentence: 'Has this scratch already ___ recorded?',
        blanks: ['been'],
        explanation: 'Has … been recorded? checks a completed action with present relevance.',
      },
      {
        id: 'car-walkaround-mc',
        type: 'multipleChoice',
        prompt: 'Choose the correct there is/are sentence.',
        choices: [
          'There is two scratches on the door.',
          'There are a scratch on the door.',
          'There is a small scratch on the rear bumper.',
          'There are small scratch on the rear bumper.',
        ],
        correctIndex: 2,
        explanation: 'there is + singular; there are + plural.',
      },
      {
        id: 'car-walkaround-so',
        type: 'sentenceOrder',
        prompt: 'Order the invitation.',
        words: ['Shall', 'we', 'walk', 'around', 'the', 'car', 'together'],
        correctOrder: ['Shall', 'we', 'walk', 'around', 'the', 'car', 'together'],
        explanation: 'Shall we…? invites shared action politely.',
      },
      {
        id: 'car-walkaround-pc',
        type: 'politeChoice',
        prompt: 'Choose the better invitation.',
        options: [
          'Check the car. Hurry.',
          'Shall we walk around the car together before you leave?',
        ],
        correctIndex: 1,
        explanation: 'Shall we…? + before you leave sets cooperative timing.',
      },
    ],
  },
  {
    id: 'self-checkin',
    title: 'Self check-in and how to start the car',
    topicId: 'car-inspection',
    grammarFocus: 'Imperatives and sequencing; Make sure you…',
    summary:
      'Explain QR self check-in after the guest finds the car matching their number ticket, then cover basic start checks.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'First, find the car that matches your number ticket and load your luggage.',
        hints: [{ word: 'number ticket', ko: '번호표' }],
      },
      {
        speaker: 'staff',
        text: 'Then complete self check-in with the QR code after you inspect the car.',
        hints: [{ word: 'self check-in', ko: '셀프체크인' }],
      },
      {
        speaker: 'customer',
        text: 'Where are the keys?',
      },
      {
        speaker: 'staff',
        text: 'After that, take the keys and make sure the lights are off when you park. All our cars are automatic.',
      },
    ],
    exercises: [
      {
        id: 'self-checkin-fb',
        type: 'fillBlank',
        prompt: 'Complete the caution.',
        sentence: 'Make sure you ___ the lights are off when you park.',
        blanks: ['check'],
        explanation: 'Make sure you + verb = remind the guest of an important step.',
      },
      {
        id: 'self-checkin-mc',
        type: 'multipleChoice',
        prompt: 'Which sequence marker fits best in the middle step?',
        choices: ['First', 'Then', 'Finally forever', 'Because'],
        correctIndex: 1,
        explanation: 'Then / after that connect ordered instructions.',
      },
      {
        id: 'self-checkin-so',
        type: 'sentenceOrder',
        prompt: 'Order the instruction.',
        words: ['Complete', 'self', 'check-in', 'with', 'the', 'QR', 'code'],
        correctOrder: ['Complete', 'self', 'check-in', 'with', 'the', 'QR', 'code'],
        explanation: 'Imperative + with + tool is a clear procedure line.',
      },
      {
        id: 'self-checkin-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer instruction set.',
        options: [
          'Do QR somehow after car.',
          'First find your car, then inspect it, then complete QR self check-in.',
        ],
        correctIndex: 1,
        explanation: 'Numbered sequence words help intermediate learners follow procedures.',
      },
    ],
  },
  {
    id: 'etc-card',
    title: 'ETC card and highway tolls',
    topicId: 'driving-tips',
    grammarFocus: 'Instructions; should / shouldn’t; as soon as / before',
    summary:
      'ODAL ETC card and unlimited Okinawa expressway tolls are free. Show insertion and warn to enter ETC lanes at 20 km/h or below.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Your ETC card is free, and unlimited highway tolls are included with ODAL.',
        hints: [
          { word: 'ETC card', ko: 'ETC 카드' },
          { word: 'highway toll', ko: '고속도로 통행료' },
        ],
      },
      {
        speaker: 'staff',
        text: 'Please insert the card in the on-board unit before you leave the shop.',
      },
      {
        speaker: 'customer',
        text: 'How fast should I enter the ETC lane?',
      },
      {
        speaker: 'staff',
        text: 'You should enter at 20 km/h or below. There is still a barrier bar. Watch the left side — Japan drives on the left.',
      },
    ],
    exercises: [
      {
        id: 'etc-card-fb',
        type: 'fillBlank',
        prompt: 'Complete the advice.',
        sentence: 'You ___ enter the ETC lane at 20 km/h or below.',
        blanks: ['should'],
        explanation: 'should gives strong advice without sounding like a legal threat.',
      },
      {
        id: 'etc-card-mc',
        type: 'multipleChoice',
        prompt: 'Which timing phrase is correct?',
        choices: [
          'Insert the card after you already left forever.',
          'Insert the card before you leave the shop.',
          'Insert the card as soon you leave.',
          'Insert the card unless you leave the shop.',
        ],
        correctIndex: 1,
        explanation: 'before + clause marks the required earlier action.',
      },
      {
        id: 'etc-card-so',
        type: 'sentenceOrder',
        prompt: 'Order the benefit sentence.',
        words: ['Unlimited', 'highway', 'tolls', 'are', 'included', 'with', 'ODAL'],
        correctOrder: ['Unlimited', 'highway', 'tolls', 'are', 'included', 'with', 'ODAL'],
        explanation: 'Passive are included states a selling point clearly.',
      },
      {
        id: 'etc-card-pc',
        type: 'politeChoice',
        prompt: 'Choose the safer instruction.',
        options: [
          'Go into ETC fast so the bar opens.',
          'You should enter the ETC lane at 20 km/h or below.',
        ],
        correctIndex: 1,
        explanation: 'Safety advice must be exact; speed limit language prevents accidents.',
      },
    ],
  },
  {
    id: 'driving-tips',
    title: 'Giving driving directions and Google Maps advice',
    topicId: 'driving-tips',
    grammarFocus: 'should / I recommend that you…; prepositions; present simple for rules',
    summary:
      'Recommend Google Maps over in-car navi, remind guests that Japan drives on the left, and encourage a slow start.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'I recommend that you use Google Maps on your phone. The in-car navi search is often in Japanese.',
        hints: [{ word: 'navigation', ko: '내비게이션' }],
      },
      {
        speaker: 'staff',
        text: 'A phone holder and charging cable are already in the car. In Japan, we drive on the left.',
      },
      {
        speaker: 'customer',
        text: 'Any other tips for the first day?',
      },
      {
        speaker: 'staff',
        text: 'You should start slowly and watch pedestrians carefully. Japan’s road law is strict about crosswalks.',
      },
    ],
    exercises: [
      {
        id: 'driving-tips-fb',
        type: 'fillBlank',
        prompt: 'Complete the recommendation.',
        sentence: 'I recommend that you ___ Google Maps.',
        blanks: ['use'],
        explanation: 'I recommend that you + base verb is a polite recommendation pattern.',
      },
      {
        id: 'driving-tips-mc',
        type: 'multipleChoice',
        prompt: 'Which rule statement is correct?',
        choices: [
          'In Japan, we driving on the left.',
          'In Japan, we drive on the left.',
          'In Japan, we are drive on the left.',
          'In Japan, we drives on the left.',
        ],
        correctIndex: 1,
        explanation: 'Present simple states permanent rules and facts.',
      },
      {
        id: 'driving-tips-so',
        type: 'sentenceOrder',
        prompt: 'Order the advice.',
        words: ['You', 'should', 'start', 'slowly', 'on', 'the', 'first', 'day'],
        correctOrder: ['You', 'should', 'start', 'slowly', 'on', 'the', 'first', 'day'],
        explanation: 'should + adverb makes calm, professional safety advice.',
      },
      {
        id: 'driving-tips-pc',
        type: 'politeChoice',
        prompt: 'Choose the better recommendation.',
        options: [
          'Don’t use Maps. Navi is fine somehow.',
          'I recommend that you use Google Maps on your phone.',
        ],
        correctIndex: 1,
        explanation: 'Direct, positive recommendations are easier for intermediate staff.',
      },
    ],
  },
  {
    id: 'class-unavailable',
    title: 'Booked class unavailable / offering another car',
    topicId: 'special-situations',
    grammarFocus: 'would you mind / would you like; comparatives; I’m sorry, but…',
    summary:
      'Explain that guests book a car class, not a specific color or year. Offer an alternative politely if stock requires a change.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'I’m sorry, but the exact model you hoped for is not available in that class today.',
      },
      {
        speaker: 'customer',
        text: 'I reserved a Sienta. Can I choose the color?',
      },
      {
        speaker: 'staff',
        text: 'Specific color, year, and options cannot be reserved. Would you like a similar wagon in the same class?',
      },
      {
        speaker: 'staff',
        text: 'If we must offer a smaller car after an accident swap, the price difference is not refunded.',
      },
    ],
    exercises: [
      {
        id: 'class-unavailable-fb',
        type: 'fillBlank',
        prompt: 'Complete the soft apology.',
        sentence: 'I’m sorry, ___ the exact model is not available today.',
        blanks: ['but'],
        explanation: 'I’m sorry, but… introduces disappointing news politely.',
      },
      {
        id: 'class-unavailable-mc',
        type: 'multipleChoice',
        prompt: 'Which offer is grammatically correct?',
        choices: [
          'Would you like a larger car?',
          'Would you liking a larger car?',
          'Would you like to a larger car?',
          'Would you liked a larger car?',
        ],
        correctIndex: 0,
        explanation: 'Would you like + noun/verb phrase is the standard offer form.',
      },
      {
        id: 'class-unavailable-so',
        type: 'sentenceOrder',
        prompt: 'Order the policy sentence.',
        words: ['Specific', 'color', 'cannot', 'be', 'reserved'],
        correctOrder: ['Specific', 'color', 'cannot', 'be', 'reserved'],
        explanation: 'cannot be reserved = passive prohibition for booking limits.',
      },
      {
        id: 'class-unavailable-pc',
        type: 'politeChoice',
        prompt: 'Choose the more polite offer.',
        options: [
          'Take this smaller one. No refund.',
          'Would you like a similar car in the same class today?',
        ],
        correctIndex: 1,
        explanation: 'Offers should present a choice before stating fee limits.',
      },
    ],
  },
  {
    id: 'fuel-policy',
    title: 'Fuel policy at pickup or return',
    topicId: 'fuel-return',
    grammarFocus: 'Future will; if clauses; countable/uncountable nouns',
    summary:
      'Return the car full with regular gasoline (red nozzle) and keep the nearby station receipt. An unrefueled return is billed above street price in won on My Page.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Please return the car with a full tank of regular gasoline — the red nozzle.',
        hints: [
          { word: 'refuel', ko: '주유' },
          { word: 'regular gasoline', ko: '레귤러 휘발유' },
        ],
      },
      {
        speaker: 'staff',
        text: 'Keep the receipt from a nearby station. We check it at return.',
        hints: [{ word: 'receipt', ko: '영수증' }],
      },
      {
        speaker: 'customer',
        text: 'What if the tank is not full?',
      },
      {
        speaker: 'staff',
        text: 'If the tank is not full, you will be charged above the street price for the missing liters, in won on My Page.',
      },
    ],
    exercises: [
      {
        id: 'fuel-policy-fb',
        type: 'fillBlank',
        prompt: 'Complete the future result.',
        sentence: 'If the tank is not full, you ___ be charged above street price.',
        blanks: ['will'],
        explanation: 'If + present, will + verb states a real future consequence.',
      },
      {
        id: 'fuel-policy-mc',
        type: 'multipleChoice',
        prompt: 'Which noun use is correct?',
        choices: [
          'Please keep a receipt and fill fuel full.',
          'Please keep the receipt and return with a full tank of fuel.',
          'Please keep receiptes and fuels.',
          'Please keep the fuels receipt full.',
        ],
        correctIndex: 1,
        explanation: 'fuel is usually uncountable; a receipt is countable; a full tank is the set phrase.',
      },
      {
        id: 'fuel-policy-so',
        type: 'sentenceOrder',
        prompt: 'Order the fuel instruction.',
        words: ['Use', 'regular', 'gasoline', 'the', 'red', 'nozzle'],
        correctOrder: ['Use', 'regular', 'gasoline', 'the', 'red', 'nozzle'],
        explanation: 'Staff should name fuel type and nozzle color to prevent wrong-fuel damage.',
      },
      {
        id: 'fuel-policy-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer warning.',
        options: [
          'Maybe pay later if empty somehow.',
          'If the tank is not full, you will be charged above street price on My Page.',
        ],
        correctIndex: 1,
        explanation: 'State condition + exact billing channel so guests are not surprised.',
      },
    ],
  },
  {
    id: 'return-shuttle',
    title: 'Return at the shop and the airport shuttle',
    topicId: 'fuel-return',
    grammarFocus: 'Prepositions of time; It takes…; don’t / you need to',
    summary:
      'The car must be returned at the shop, not the airport. Free shuttle 08:00–18:00; optional Kokusai-dori runs at 15:30 and 17:00.',
    dialogue: [
      {
        speaker: 'staff',
        text: 'Please return the car at the ODAL Naha Airport shop. You cannot leave it at the airport itself.',
      },
      {
        speaker: 'customer',
        text: 'How do we get back to the airport?',
      },
      {
        speaker: 'staff',
        text: 'The free shuttle runs from 08:00 to 18:00. It takes about 20 minutes, and the maximum wait is about 20 minutes.',
      },
      {
        speaker: 'staff',
        text: 'If you want Kokusai-dori, the return-only shuttle leaves the shop at 15:30 and 17:00. You need to tell us if you want Akamine Station.',
      },
    ],
    exercises: [
      {
        id: 'return-shuttle-fb',
        type: 'fillBlank',
        prompt: 'Complete the duration phrase.',
        sentence: 'It takes ___ 20 minutes to the airport.',
        blanks: ['about'],
        explanation: 'It takes about + time is the natural duration pattern.',
      },
      {
        id: 'return-shuttle-mc',
        type: 'multipleChoice',
        prompt: 'Which time preposition sentence is correct?',
        choices: [
          'The shuttle runs at 08:00 to 18:00.',
          'The shuttle runs from 08:00 to 18:00.',
          'The shuttle runs on 08:00 until 18:00.',
          'The shuttle runs in 08:00 for 18:00.',
        ],
        correctIndex: 1,
        explanation: 'from … to … marks an open operating window.',
      },
      {
        id: 'return-shuttle-so',
        type: 'sentenceOrder',
        prompt: 'Order the rule.',
        words: ['You', 'cannot', 'leave', 'the', 'car', 'at', 'the', 'airport'],
        correctOrder: ['You', 'cannot', 'leave', 'the', 'car', 'at', 'the', 'airport'],
        explanation: 'cannot + base verb states a firm location rule.',
      },
      {
        id: 'return-shuttle-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer return instruction.',
        options: [
          'Drop anywhere near airport OK.',
          'Please return the car at the shop. Then take our free shuttle to the airport.',
        ],
        correctIndex: 1,
        explanation: 'Separate return location and passenger transfer clearly.',
      },
    ],
  },
  {
    id: 'early-flight',
    title: 'Early-morning flight',
    topicId: 'fuel-return',
    grammarFocus: 'should / had better; by / before / the day before; first conditional',
    summary:
      'Returns are not possible before 08:00. If the international flight is before 10:30 (or domestic before 09:30), recommend returning the day before.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Our international flight is at 09:40. Can we return at 07:00?',
      },
      {
        speaker: 'staff',
        text: 'I’m sorry. Returns are not possible before 08:00. The 08:00 shuttle reaches the airport around 08:15–08:25.',
      },
      {
        speaker: 'staff',
        text: 'If your international flight is before 10:30, you should return the day before.',
      },
      {
        speaker: 'customer',
        text: 'So we had better bring the car back tomorrow evening?',
      },
      {
        speaker: 'staff',
        text: 'Yes. That is safer for check-in time.',
      },
    ],
    exercises: [
      {
        id: 'early-flight-fb',
        type: 'fillBlank',
        prompt: 'Complete the recommendation.',
        sentence: 'If your flight is before 10:30, you ___ return the day before.',
        blanks: ['should'],
        explanation: 'If + present, should + verb gives strong practical advice.',
      },
      {
        id: 'early-flight-mc',
        type: 'multipleChoice',
        prompt: 'Which time expression fits?',
        choices: [
          'Return the day before your early flight.',
          'Return the day behind your early flight.',
          'Return before day your early flight.',
          'Return by yesterday your early flight.',
        ],
        correctIndex: 0,
        explanation: 'the day before = on the previous calendar day.',
      },
      {
        id: 'early-flight-so',
        type: 'sentenceOrder',
        prompt: 'Order the rule.',
        words: ['Returns', 'are', 'not', 'possible', 'before', '08:00'],
        correctOrder: ['Returns', 'are', 'not', 'possible', 'before', '08:00'],
        explanation: 'before + clock time sets the hard limit clearly.',
      },
      {
        id: 'early-flight-pc',
        type: 'politeChoice',
        prompt: 'Choose the stronger but polite advice.',
        options: [
          'Come whenever. Maybe OK.',
          'For a 09:40 international flight, you had better return the day before.',
        ],
        correctIndex: 1,
        explanation: 'had better signals important advice for early flights.',
      },
    ],
  },
  {
    id: 'late-return',
    title: 'Late return or extension',
    topicId: 'fuel-return',
    grammarFocus: 'may / might; as long as / unless; conditionals',
    summary:
      'Being 30–60 minutes late usually needs no call. More than one hour requires a phone request and may incur an extra fee. Unapproved overtime is not insured.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'We might be 40 minutes late. Is that OK?',
      },
      {
        speaker: 'staff',
        text: 'As long as you are less than one hour late, you usually do not need to call.',
      },
      {
        speaker: 'staff',
        text: 'If you will be more than one hour late, you must phone us. An extra fee may apply.',
      },
      {
        speaker: 'staff',
        text: 'Unless an extension is approved, an accident during overtime is not insured.',
      },
    ],
    exercises: [
      {
        id: 'late-return-fb',
        type: 'fillBlank',
        prompt: 'Complete the condition.',
        sentence: '___ long as you are under one hour late, you usually do not need to call.',
        blanks: ['As'],
        explanation: 'as long as = on the condition that.',
      },
      {
        id: 'late-return-mc',
        type: 'multipleChoice',
        prompt: 'Which modal fits the possible fee?',
        choices: [
          'An extra fee must always apply for 40 minutes.',
          'An extra fee may apply if you are more than one hour late.',
          'An extra fee can must apply.',
          'An extra fee shoulded apply.',
        ],
        correctIndex: 1,
        explanation: 'may = possible, not certain — matches the published policy wording.',
      },
      {
        id: 'late-return-so',
        type: 'sentenceOrder',
        prompt: 'Order the insurance warning.',
        words: ['Unless', 'approved', 'overtime', 'is', 'not', 'insured'],
        correctOrder: ['Unless', 'approved', 'overtime', 'is', 'not', 'insured'],
        explanation: 'Unless + condition introduces an important insurance exclusion.',
      },
      {
        id: 'late-return-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer guidance.',
        options: [
          'Late is fine forever without calling.',
          'If you will be more than one hour late, please call us — a fee may apply.',
        ],
        correctIndex: 1,
        explanation: 'Give the threshold, the action, and the possible consequence.',
      },
    ],
  },
  {
    id: 'accident-call',
    title: 'Accident call (even a small scratch)',
    topicId: 'accidents',
    grammarFocus: 'Urgent imperatives; must / mustn’t; even if; reported speech help',
    summary:
      'Stay at the scene, set the warning triangle, call police 110 and ODAL, and fill in the report. No report means no insurance.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'I hit a pole. It is only a small scratch. Can I just come back later?',
      },
      {
        speaker: 'staff',
        text: 'Please do not leave the scene. Move to a safe place and put out the warning triangle from the trunk.',
        hints: [{ word: 'warning triangle', ko: '안전삼각대' }],
      },
      {
        speaker: 'staff',
        text: 'You must call the police on 110 and call ODAL’s 24-hour Korean accident number on the sticker in the car.',
      },
      {
        speaker: 'staff',
        text: 'Even if the scratch is small, you must report it. If there is no police report, insurance is not applied.',
        hints: [{ word: 'police report', ko: '경찰 신고' }],
      },
      {
        speaker: 'staff',
        text: 'Please tell them you need an accident report for the rental car.',
      },
    ],
    exercises: [
      {
        id: 'accident-call-fb',
        type: 'fillBlank',
        prompt: 'Complete the prohibition.',
        sentence: 'Please do ___ leave the scene.',
        blanks: ['not'],
        explanation: 'do not + imperative is a clear urgent instruction.',
      },
      {
        id: 'accident-call-mc',
        type: 'multipleChoice',
        prompt: 'Which sentence is correct?',
        choices: [
          'Even if the scratch is small, you must report it.',
          'Even if the scratch is small, you mustn’t report it.',
          'Even the scratch is small, you report must.',
          'Even if scratch small, no report OK.',
        ],
        correctIndex: 0,
        explanation: 'even if + clause emphasizes the rule still applies.',
      },
      {
        id: 'accident-call-so',
        type: 'sentenceOrder',
        prompt: 'Order the urgent steps.',
        words: ['Call', '110', 'and', 'call', 'ODAL', 'immediately'],
        correctOrder: ['Call', '110', 'and', 'call', 'ODAL', 'immediately'],
        explanation: 'Short imperatives are best in emergencies.',
      },
      {
        id: 'accident-call-pc',
        type: 'politeChoice',
        prompt: 'Choose the safer staff response.',
        options: [
          'Small scratch? Just wash it. No call.',
          'Even for a small scratch, you must call 110 and ODAL from the scene.',
        ],
        correctIndex: 1,
        explanation: 'Insurance depends on proper reporting — never wave it away.',
      },
    ],
  },
  {
    id: 'replacement-car',
    title: 'Replacement car after an accident',
    topicId: 'accidents',
    grammarFocus: 'will / may / can; passives; polite apology',
    summary:
      'One replacement is free. Dispatch may take about three hours during business hours. A smaller car may be offered. A second dispatch has a regional fee.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Can we get another car today?',
      },
      {
        speaker: 'staff',
        text: 'I’m sorry about the accident. A replacement can be provided once for free if we have stock.',
        hints: [{ word: 'replacement car', ko: '대차' }],
      },
      {
        speaker: 'staff',
        text: 'It may take about three hours after the report during business hours (08:00–18:00).',
      },
      {
        speaker: 'staff',
        text: 'A lower class may be offered, and the difference is not refunded. A second dispatch will be charged by region.',
      },
    ],
    exercises: [
      {
        id: 'replacement-car-fb',
        type: 'fillBlank',
        prompt: 'Complete the passive offer.',
        sentence: 'A replacement ___ be provided if we have stock.',
        blanks: ['can'],
        explanation: 'can be provided = passive possibility depending on stock.',
      },
      {
        id: 'replacement-car-mc',
        type: 'multipleChoice',
        prompt: 'Which timing sentence matches policy?',
        choices: [
          'It may take about three hours after a report in business hours.',
          'It must take exactly one minute.',
          'It will never take time.',
          'It can took three hours yesterday only.',
        ],
        correctIndex: 0,
        explanation: 'may take about three hours matches the usage-guide timing.',
      },
      {
        id: 'replacement-car-so',
        type: 'sentenceOrder',
        prompt: 'Order the apology + fact.',
        words: ['I’m', 'sorry', 'a', 'smaller', 'car', 'may', 'be', 'offered'],
        correctOrder: ['I’m', 'sorry', 'a', 'smaller', 'car', 'may', 'be', 'offered'],
        explanation: 'Apology + modal passive prepares the guest for limits.',
      },
      {
        id: 'replacement-car-pc',
        type: 'politeChoice',
        prompt: 'Choose the more professional line.',
        options: [
          'Wait. Maybe car. Or not.',
          'I’m sorry — one free replacement can be arranged, but it may take about three hours.',
        ],
        correctIndex: 1,
        explanation: 'Combine empathy, benefit, and realistic timing.',
      },
    ],
  },
  {
    id: 'smoking-pets',
    title: 'Smoking, pets, or a dirty/wet seat',
    topicId: 'special-situations',
    grammarFocus: 'must not / cannot; that’s not allowed; consequences with if',
    summary:
      'All cars are non-smoking and pets are not allowed. Explain possible cleaning fees up to 50,000 yen for smoking, vomit, or a child seat wet from water play.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Can our dog ride in the car? Also, is smoking OK near an open window?',
      },
      {
        speaker: 'staff',
        text: 'I’m sorry, that’s not allowed. Pets cannot ride, and all cars are non-smoking.',
        hints: [
          { word: 'non-smoking', ko: '금연' },
          { word: 'pets', ko: '반려동물' },
        ],
      },
      {
        speaker: 'staff',
        text: 'If someone smokes in the car, a cleaning fee of up to 50,000 yen may be charged.',
      },
      {
        speaker: 'staff',
        text: 'A seat soiled by vomit or a child seat wet from water play can also cost up to 50,000 yen.',
      },
    ],
    exercises: [
      {
        id: 'smoking-pets-fb',
        type: 'fillBlank',
        prompt: 'Complete the rule.',
        sentence: 'Pets ___ ride in the car.',
        blanks: ['cannot'],
        explanation: 'cannot states a hard prohibition.',
      },
      {
        id: 'smoking-pets-mc',
        type: 'multipleChoice',
        prompt: 'Which consequence sentence is correct?',
        choices: [
          'If someone smokes, a cleaning fee of up to 50,000 yen may be charged.',
          'If someone smokes, fee mustn’t charged.',
          'If someone smoke, fee are free.',
          'If smoking, pay 20,000 KRW only.',
        ],
        correctIndex: 0,
        explanation: 'If + present, may be charged describes a possible fee with the verified cap.',
      },
      {
        id: 'smoking-pets-so',
        type: 'sentenceOrder',
        prompt: 'Order the refusal.',
        words: ['I’m', 'sorry', 'that’s', 'not', 'allowed'],
        correctOrder: ['I’m', 'sorry', 'that’s', 'not', 'allowed'],
        explanation: 'Short refusal formula for rules without sounding rude.',
      },
      {
        id: 'smoking-pets-pc',
        type: 'politeChoice',
        prompt: 'Choose the firmer polite refusal.',
        options: [
          'Dog OK if cute.',
          'I’m sorry, pets are not allowed in ODAL rental cars.',
        ],
        correctIndex: 1,
        explanation: 'Be warm but firm; do not invent exceptions.',
      },
    ],
  },
  {
    id: 'lost-item',
    title: 'Lost item after return',
    topicId: 'special-situations',
    grammarFocus: 'Past simple vs present perfect; indirect questions',
    summary:
      'Help describe the item and where it might be. Explain shipping costs and that some electronics with batteries often cannot be mailed.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'I think I left my passport in the glove box.',
      },
      {
        speaker: 'staff',
        text: 'I’m sorry to hear that. Have you checked your bag again? Did you leave it in the glove box or the door pocket?',
        hints: [{ word: 'lost item', ko: '분실물' }],
      },
      {
        speaker: 'customer',
        text: 'I already searched my bag. Could you tell me how shipping works?',
      },
      {
        speaker: 'staff',
        text: 'Please ask on the 1:1 board. Shipping to Korea is Japan Post EMS plus a handling fee. Devices with batteries often cannot be mailed.',
      },
    ],
    exercises: [
      {
        id: 'lost-item-fb',
        type: 'fillBlank',
        prompt: 'Complete the present perfect question.',
        sentence: '___ you checked your bag again?',
        blanks: ['Have'],
        explanation: 'Have you checked…? asks about a recent action with present relevance.',
      },
      {
        id: 'lost-item-mc',
        type: 'multipleChoice',
        prompt: 'Choose the correct tense contrast.',
        choices: [
          'Did you leave it in the glove box? / Have you checked your bag?',
          'Have you left it yesterday in the glove box?',
          'Did you have checked your bag?',
          'Have you leave it in the glove box yesterday?',
        ],
        correctIndex: 0,
        explanation: 'Past simple for a finished past action; present perfect for life/experience up to now.',
      },
      {
        id: 'lost-item-so',
        type: 'sentenceOrder',
        prompt: 'Order the indirect question.',
        words: ['Could', 'you', 'tell', 'me', 'where', 'it', 'might', 'be'],
        correctOrder: ['Could', 'you', 'tell', 'me', 'where', 'it', 'might', 'be'],
        explanation: 'Could you tell me + wh-clause is a polite indirect question.',
      },
      {
        id: 'lost-item-pc',
        type: 'politeChoice',
        prompt: 'Choose the more helpful response.',
        options: [
          'Not our problem.',
          'Have you checked the glove box and door pockets? We can help if you post on the 1:1 board.',
        ],
        correctIndex: 1,
        explanation: 'Guide the search and the official next step.',
      },
    ],
  },
  {
    id: 'cancel-change',
    title: 'Changing or cancelling a booking',
    topicId: 'cancellations',
    grammarFocus: 'Comparatives; as long as; numbers and percentages',
    summary:
      'Changes are free via My Page or the 1:1 board. Cancel up to 1 day before for a full refund; same-day/no-show is 50% (max 100,000 KRW). Requests after 18:00 count as the next business day.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Can I change my return date?',
      },
      {
        speaker: 'staff',
        text: 'Yes. Changes are free on My Page or the 1:1 board.',
        hints: [{ word: 'change', ko: '예약 변경' }],
      },
      {
        speaker: 'customer',
        text: 'What if I cancel today? My rental starts today.',
      },
      {
        speaker: 'staff',
        text: 'A same-day cancel is 50% of the amount paid, up to 100,000 KRW. It is cheaper if you cancel by yesterday — up to one day before is a full refund.',
      },
      {
        speaker: 'staff',
        text: 'As long as we receive the request by 18:00 on a business day, it counts for that day.',
      },
    ],
    exercises: [
      {
        id: 'cancel-change-fb',
        type: 'fillBlank',
        prompt: 'Complete the comparative advice.',
        sentence: 'It is ___ if you cancel one day before.',
        blanks: ['cheaper'],
        explanation: 'Comparative adjective cheaper contrasts fee outcomes.',
      },
      {
        id: 'cancel-change-mc',
        type: 'multipleChoice',
        prompt: 'Which ODAL cancel rule is correct?',
        choices: [
          'Up to 1 day before: full refund; same-day: 50% (max 100,000 KRW)',
          'Always 100% fee',
          'Free only 3 days before according to marketing only — ignore FAQ',
          'Cash refund at the counter',
        ],
        correctIndex: 0,
        explanation: 'Use the refund page/FAQ rules, not the older marketing meta text.',
      },
      {
        id: 'cancel-change-so',
        type: 'sentenceOrder',
        prompt: 'Order the cutoff sentence.',
        words: ['Requests', 'after', '18:00', 'count', 'as', 'the', 'next', 'business', 'day'],
        correctOrder: [
          'Requests',
          'after',
          '18:00',
          'count',
          'as',
          'the',
          'next',
          'business',
          'day',
        ],
        explanation: 'after + time + count as clarifies administrative cutoffs.',
      },
      {
        id: 'cancel-change-pc',
        type: 'politeChoice',
        prompt: 'Choose the clearer fee explanation.',
        options: [
          'Cancel fee something percent maybe.',
          'Same-day cancel is 50% of what you paid, with a maximum of 100,000 KRW.',
        ],
        correctIndex: 1,
        explanation: 'Say percentage and cap together so guests hear the full rule.',
      },
    ],
  },
  {
    id: 'typhoon-delay',
    title: 'Typhoon or delayed flight',
    topicId: 'cancellations',
    grammarFocus: 'First conditionals; in case / if; polite reassurance',
    summary:
      'A cancelled flight can be fully refunded with an airline certificate after official cancellation. Delays during open hours usually need no call. An already-started rental can be extended free until the next flight if new details are sent on the 1:1 board.',
    dialogue: [
      {
        speaker: 'customer',
        text: 'Our flight may be cancelled because of a typhoon. What should we do?',
        hints: [
          { word: 'typhoon', ko: '태풍' },
          { word: 'flight cancellation', ko: '결항' },
        ],
      },
      {
        speaker: 'staff',
        text: 'You don’t need to worry. If the airline officially cancels the flight, you can get a full refund with the cancellation certificate on the 1:1 board.',
      },
      {
        speaker: 'staff',
        text: 'If you are already in Okinawa, extensions until the next flight are free for rent, NOC, ETC, and tolls — if you send the new return date and flight number.',
      },
      {
        speaker: 'customer',
        text: 'And if the flight is only delayed this evening?',
      },
      {
        speaker: 'staff',
        text: 'If the flight is delayed during branch hours, ODAL waits for the new arrival time. You usually do not need to call, unless you will arrive after hours.',
      },
    ],
    exercises: [
      {
        id: 'typhoon-delay-fb',
        type: 'fillBlank',
        prompt: 'Complete the reassurance.',
        sentence: 'You don’t need ___ worry.',
        blanks: ['to'],
        explanation: 'don’t need to + verb reassures without dismissing the problem.',
      },
      {
        id: 'typhoon-delay-mc',
        type: 'multipleChoice',
        prompt: 'Which conditional matches the refund rule?',
        choices: [
          'If the airline officially cancels the flight, you can get a full refund with a certificate.',
          'If you cancel before any notice, you always get a full refund.',
          'If typhoon, cash at counter immediately.',
          'If delayed, insurance ends automatically.',
        ],
        correctIndex: 0,
        explanation: 'Full refund requires the official cancellation certificate path.',
      },
      {
        id: 'typhoon-delay-so',
        type: 'sentenceOrder',
        prompt: 'Order the free-extension condition.',
        words: ['Send', 'the', 'new', 'return', 'date', 'and', 'flight', 'number'],
        correctOrder: ['Send', 'the', 'new', 'return', 'date', 'and', 'flight', 'number'],
        explanation: 'Guests must provide both date and flight number for the free extension.',
      },
      {
        id: 'typhoon-delay-pc',
        type: 'politeChoice',
        prompt: 'Choose the calmer staff reply.',
        options: [
          'Typhoon! Nothing we can do. Bye.',
          'You don’t need to worry — if the flight is officially cancelled, we can process a full refund with your certificate.',
        ],
        correctIndex: 1,
        explanation: 'Reassure first, then state the exact condition and document needed.',
      },
    ],
  },
];

const out = join(__dirname, '../src/data/scenarios.json');
writeFileSync(out, JSON.stringify(scenarios, null, 2));
console.log(`Wrote ${scenarios.length} scenarios to ${out}`);
console.log(scenarios.map((s) => s.id).join('\n'));
