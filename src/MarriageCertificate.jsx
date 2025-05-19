import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

// Register Hindi font
Font.register({
  family: 'NotoSansDevanagari',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-devanagari@4.5.0/files/noto-sans-devanagari-all-400-normal.woff',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-devanagari@4.5.0/files/noto-sans-devanagari-all-700-normal.woff',
      fontWeight: 700,
      fontStyle: 'normal',
    },
  ],
});

// Create Tailwind instance with exact styling
const tw = createTw({
  theme: {
    fontFamily: {
      hindi: ['NotoSansDevanagari'],
    },
    extend: {
      colors: {
        maroon: '#722F37',
        lightPink: '#FFF0F0',
      },
    },
  },
});

// Format date to DD/MM/YYYY
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
};

// Checkbox component with proper fill
const Checkbox = ({ isChecked }) => (
  <View
    style={tw('w-3 h-3 border border-black mr-1 items-center justify-center')}
  >
    {isChecked && <View style={tw('w-2 h-2 bg-black')} />}
  </View>
);

// Field with dotted line - proper spacing
const FieldWithDots = ({ label, value, dots = 25 }) => (
  <View style={tw('flex flex-row items-center mb-2')}>
    <Text style={tw('text-xs font-hindi w-40')}>{label}</Text>
    <Text
      style={tw(
        'text-xs font-hindi flex-1 border-b border-dotted border-black'
      )}
    >
      {value || ''}
    </Text>
  </View>
);

// Marriage Certificate Component
const MarriageCertificate = ({ boyData, girlData }) => {
  // Determine checkbox states based on data
  const isAdult = boyData?.isAdult === 'Yes' && girlData?.isAdult === 'Yes';
  const isDowryFree =
    boyData?.isDowryFree === 'Yes' && girlData?.isDowryFree === 'Yes';
  const agreeWithRules =
    boyData?.agreeWithRules === 'Yes' && girlData?.agreeWithRules === 'Yes';
  const boyMarried = boyData?.isAlreadyMarried === 'Yes';
  const girlMarried = girlData?.isAlreadyMarried === 'Yes';

  return (
    <Document>
      <Page size="A4" style={tw('p-6 font-hindi')}>
        <View style={tw('h-full p-4')}>
          {/* Header Section */}
          <View style={tw('flex flex-row items-center mb-4')}>
            {/* Left Logo */}
            <View style={tw('w-16 h-16 mr-3')}>
              <Image
                src="src/assets/logo-ramini.png"
                style={tw('w-full h-full object-contain')}
              />
            </View>

            {/* Center Content */}
            <View style={tw('flex-1 text-center')}>
              <Text style={tw('text-xl font-bold text-maroon mb-1')}>
                सतलोक आश्रम रमैणी सेवा, मुंडका
              </Text>
              <Text style={tw('text-sm font-bold mb-1')}>
                Mob : +91 92668-61466
              </Text>
              <Text style={tw('text-sm mb-1')}>मुंडका, दिल्ली (110081)</Text>
              <View style={tw('bg-maroon  px-3 py-1')}>
                <Text style={tw('text-xs  text-white text-center')}>
                  www.ramaini.org
                </Text>
              </View>
            </View>

            {/* Right Photo */}
            <View style={tw('w-16 h-16 ml-3')}>
              <Image
                src="src/assets/spiritual_leader.png"
                style={tw('w-full h-full object-contain')}
              />
            </View>
          </View>

          {/* Date and Serial Number */}
          <View style={tw('flex flex-row justify-between items-center mb-3')}>
            <Text style={tw('text-sm font-hindi')}>दिनांक :</Text>
            <Text style={tw('text-sm font-hindi')}>
              रमैणी क्रमांक : 1,00,0___
            </Text>
          </View>

          <View style={tw('border-t border-black mb-2')} />

          {/* Subject */}
          <Text style={tw('text-sm font-bold font-hindi mb-1')}>
            विषय: विवाह (रमैणी) हेतु अनुज्ञा - दोनों परिवारों की सहमति सहित
          </Text>
          <Text style={tw('text-sm font-hindi mb-2')}>सत साहेब जी,</Text>

          {/* Main Description */}
          <Text
            style={tw('text-xs font-hindi leading-relaxed mb-3 text-justify')}
          >
            निवेदन है कि निम्नलिखित वर व वधू के परिवारों ने आपसी सहमति से अपने
            बच्चों का विवाह (रमैणी) मतलोक आश्रम के नियमों अनुसार कराने का आग्रह
            किया है। दोनों पक्षों ने निर्वात सहमति-पत्र प्रस्तुत किया है, जिसकी
            सत्यता का परीक्षण हमारे स्तर पर कर लिया गया है। अतः{' '}
            <Text style={tw('font-bold')}>सतलोक आश्रम रमैणी सेवा मुंडका</Text>{' '}
            की ओर से सविनय निवेदन है कि उपरोक्त निम्नलिखित नामों की रमैणी आगामी
            निर्धारित
            <Text style={tw('font-bold')}>
              दिनांक : ................................
            </Text>{' '}
            पर सतलोक आश्रम की व्यवस्था अनुसार कराई जाए।
          </Text>

          {/* Notice Box - No border */}
          <View style={tw('mb-3')}>
            <Text style={tw('text-xs font-bold text-center font-hindi')}>
              निवेदन: सतगुरु जी के विश्व कल्याण मिशन के अंतर्गत दहेज़-मुक्त
              विवाह की मिसाल स्थापित करने हेतु रमैणी का आयोजन समारोह के समय
              सतलोक आश्रम में ही किया जाए। केवल विशेष परिस्थितियों में ही इसका
              आयोजन नामदान केंद्र अथवा सत्संग स्थल पर किया जाए।
            </Text>
          </View>

          {/* Two Column Family Information */}
          <View style={tw('flex flex-row mb-3')}>
            {/* Boy's Information */}
            <View style={tw('flex-1 pr-2')}>
              <Text
                style={tw(
                  'text-sm font-bold text-center text-maroon mb-2 font-hindi'
                )}
              >
                लड़के के परिवार की जानकारी
              </Text>

              <FieldWithDots label="लड़के का नाम :" value={boyData?.boyName} />
              <FieldWithDots
                label="लड़के की जन्मतिथि :"
                value={formatDate(boyData?.boyDOB)}
              />
              <FieldWithDots
                label="लड़के के पिता का नाम :"
                value={boyData?.boyFatherName}
              />
              <FieldWithDots
                label="लड़के की माता का नाम :"
                value={boyData?.boyMotherName}
              />
              <FieldWithDots label="पूरा पता :" value={boyData?.fullAddress} />
              <FieldWithDots label="तहसील :" value={boyData?.tehsil} />
              <FieldWithDots label="जिला :" value={boyData?.district} />
              <FieldWithDots label="राज्य :" value={boyData?.state} />
              <FieldWithDots
                label="मोबाइल नंबर :"
                value={boyData?.mobileNumber}
              />
              <FieldWithDots
                label="प्रथम नाम प्राप्ति तिथि :"
                value={formatDate(boyData?.firstNameReceiptDate)}
              />
              <FieldWithDots
                label="सतनाम प्राप्ति तिथि :"
                value={formatDate(boyData?.satnamReceiptDate)}
              />
              <FieldWithDots
                label="सारनाम प्राप्ति तिथि :"
                value={formatDate(boyData?.dateOfNameReceipt)}
              />
              <FieldWithDots
                label="सारशब्द प्राप्ति तिथि :"
                value={formatDate(boyData?.abstractReceiptDate)}
              />

              {/* Photo Section */}
              <View style={tw('border border-black p-2 mt-2 items-center')}>
                <View
                  style={tw(
                    'border border-gray-400 items-center justify-center'
                  )}
                  style={{ width: 60, height: 80 }}
                >
                  <Image
                    src={boyData?.boyPhoto || 'src/assets/dummy-person.jpg'}
                    style={tw('w-full h-full object-cover')}
                  />
                </View>
                <Text style={tw('text-xs font-hindi text-center mt-1')}>
                  लड़के का फोटो
                </Text>
              </View>
            </View>

            {/* Vertical Line */}
            <View style={tw('w-0.5 bg-black mx-2')} />

            {/* Girl's Information */}
            <View style={tw('flex-1 pl-2')}>
              <Text
                style={tw(
                  'text-sm font-bold text-center text-maroon mb-2 font-hindi'
                )}
              >
                लड़की के परिवार की जानकारी
              </Text>

              <FieldWithDots
                label="लड़की का नाम :"
                value={girlData?.girlName}
              />
              <FieldWithDots
                label="लड़की की जन्मतिथि :"
                value={formatDate(girlData?.girlDOB)}
              />
              <FieldWithDots
                label="लड़की के पिता का नाम :"
                value={girlData?.girlFatherName}
              />
              <FieldWithDots
                label="लड़की की माता का नाम :"
                value={girlData?.girlMotherName}
              />
              <FieldWithDots label="पूरा पता :" value={girlData?.fullAddress} />
              <FieldWithDots label="तहसील :" value={girlData?.tehsil} />
              <FieldWithDots label="जिला :" value={girlData?.district} />
              <FieldWithDots label="राज्य :" value={girlData?.state} />
              <FieldWithDots
                label="मोबाइल नंबर :"
                value={girlData?.mobileNumber}
              />
              <FieldWithDots
                label="प्रथम नाम प्राप्ति तिथि :"
                value={formatDate(girlData?.firstNameReceiptDate)}
              />
              <FieldWithDots
                label="सतनाम प्राप्ति तिथि :"
                value={formatDate(girlData?.satnamReceiptDate)}
              />
              <FieldWithDots
                label="सारनाम प्राप्ति तिथि :"
                value={formatDate(girlData?.dateOfNameReceipt)}
              />
              <FieldWithDots
                label="सारशब्द प्राप्ति तिथि :"
                value={formatDate(girlData?.abstractReceiptDate)}
              />

              {/* Photo Section */}
              <View style={tw('border border-black p-2 mt-2 items-center')}>
                <View
                  style={tw(
                    'border border-gray-400 items-center justify-center'
                  )}
                  style={{ width: 60, height: 80 }}
                >
                  <Image
                    src={girlData?.girlPhoto || 'src/assets/dummy-person.jpg'}
                    style={tw('w-full h-full object-cover')}
                  />
                </View>
                <Text style={tw('text-xs font-hindi text-center mt-1')}>
                  लड़की का फोटो
                </Text>
              </View>
            </View>
          </View>

          {/* Declaration */}
          <Text style={tw('text-xs font-hindi text-justify mb-2')}>
            हम दोनों परिवार पूर्ण सहमति से अपने बच्चों का यर विवाह (रमैणी) कर
            रहे हैं। हम यह सुनिश्चित करते हैं कि वर और वधू{' '}
            <Text style={tw('font-bold')}>भारतीय विवाह अधिनियम, 1955</Text> के
            अंतर्गत निर्धारित आयु सीमा को पूर्ण करते हैं तथा इस विवाह/रमैणी के
            लिए सभी आवश्यक कानूनी प्रक्रियाओं का पालन किया गया है।
          </Text>

          {/* Questions Section - With proper checkbox reflection */}
          <View style={tw('mb-3')}>
            {/* Question 1 */}
            <View style={tw('flex flex-row items-start mb-1')}>
              <Text style={tw('text-xs font-hindi mr-1')}>●</Text>
              <Text style={tw('text-xs font-hindi flex-1 mr-2')}>
                क्या आपके पुत्र/पुत्री की आयु (लड़की 18 वर्ष, लड़का 21 वर्ष)
                सरकार के नियमों के अनुसार पूर्ण हो चुकी है?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <Checkbox isChecked={isAdult} />
                <Text style={tw('text-xs font-hindi mr-2')}>हां</Text>
                <Checkbox isChecked={!isAdult} />
                <Text style={tw('text-xs font-hindi')}>नहीं</Text>
              </View>
            </View>

            {/* Question 2 */}
            <View style={tw('flex flex-row items-start mb-1')}>
              <Text style={tw('text-xs font-hindi mr-1')}>●</Text>
              <Text style={tw('text-xs font-hindi flex-1 mr-2')}>
                क्या दोनों पक्षों ने अपने देश, गांव आदि का मान रखते हुये एक
                विवाह (रमैणी) करने का निर्णय लिया है?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <Checkbox isChecked={isDowryFree} />
                <Text style={tw('text-xs font-hindi mr-2')}>हां</Text>
                <Checkbox isChecked={!isDowryFree} />
                <Text style={tw('text-xs font-hindi')}>नहीं</Text>
              </View>
            </View>

            {/* Question 3 */}
            <View style={tw('flex flex-row items-start mb-1')}>
              <Text style={tw('text-xs font-hindi mr-1')}>●</Text>
              <Text style={tw('text-xs font-hindi flex-1 mr-2')}>
                क्या आप सतलोक आश्रम के अंतर्गत होने वाले रमैणी विवाह के नियमों
                से सहमत हैं?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <Checkbox isChecked={agreeWithRules} />
                <Text style={tw('text-xs font-hindi mr-2')}>हां</Text>
                <Checkbox isChecked={!agreeWithRules} />
                <Text style={tw('text-xs font-hindi')}>नहीं</Text>
              </View>
            </View>

            {/* Question 4 */}
            <View style={tw('flex flex-row items-start mb-1')}>
              <Text style={tw('text-xs font-hindi mr-1')}>●</Text>
              <Text style={tw('text-xs font-hindi flex-1 mr-2')}>
                क्या लड़का पहले से विवाहित है?
              </Text>
              <View style={tw('flex flex-row items-center mr-3')}>
                <Checkbox isChecked={boyMarried} />
                <Text style={tw('text-xs font-hindi mr-1')}>हां</Text>
                <Checkbox isChecked={!boyMarried} />
                <Text style={tw('text-xs font-hindi mr-2')}>नहीं</Text>
              </View>
              <Text style={tw('text-xs font-hindi mr-1')}>
                क्या लड़की पहले से विवाहित है?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <Checkbox isChecked={girlMarried} />
                <Text style={tw('text-xs font-hindi mr-1')}>हां</Text>
                <Checkbox isChecked={!girlMarried} />
                <Text style={tw('text-xs font-hindi')}>नहीं</Text>
              </View>
            </View>
          </View>

          {/* Additional Note */}
          <Text style={tw('text-xs font-hindi mb-2')}>
            (अगर हां तो तलाक के पेपर फॉर्म के साथ लगाना अनिवार्य है, अन्यथा
            रमैणी नहीं कराई जावेगी)
          </Text>

          {/* Wedding Details */}
          <Text style={tw('text-xs font-hindi mb-2')}>
            हम अपने बच्चों (उपरोक्त दी गई परिवार की जानकारी) का विवाह दिनांक:
            ...........................
            <Text style={tw('font-bold')}> स्थान: नामदान केंद्र/आश्रम</Text>
            ..................................... में करना चाहते हैं।
          </Text>

          {/* Declaration Text */}
          <Text style={tw('text-xs font-hindi mb-3')}>
            हम यह भी घोषणा करते हैं कि हमारे द्वारा दी गई उपरोक्त जानकारी सत्य,
            पूर्ण और सही है। यदि हमारी इस घोषणा में कोई त्रुटि या असत्यता पाई
            जाती है, तो हम इसके लिए पूर्ण रूप से जिम्मेदार रहेंगे।
          </Text>

          {/* Signature Section */}
          <View style={tw('flex flex-row justify-between')}>
            {/* Boy's Signature */}
            <View style={tw('w-2/5')}>
              <Text style={tw('text-xs font-hindi text-center mb-1')}>
                लड़के (वर) के हस्ताक्षर
              </Text>

              {/* Boy's Signature Image */}
              <View style={tw('h-8 mb-3 items-center justify-center')}>
                <Image
                  src={boyData?.boySignature || 'src/assets/dummy-sign.png'}
                  style={tw('max-w-full max-h-full object-contain')}
                />
              </View>

              <Text style={tw('text-xs font-hindi font-bold mb-1')}>
                लड़के (वर) के परिजन के हस्ताक्षर
              </Text>

              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  नाम :{' '}
                  {boyData?.boySignatureName ||
                    boyData?.boyFatherName ||
                    '............................'}
                </Text>
              </View>
              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  मोबाइल नंबर :{' '}
                  {boyData?.boySignatureMobile ||
                    boyData?.mobileNumber ||
                    '................................'}
                </Text>
              </View>
              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  लड़के से रिश्ता :{' '}
                  {boyData?.boySignatureRelation ||
                    'पिता' ||
                    '................................'}
                </Text>
              </View>
            </View>

            {/* Center Stamp */}
            <View style={tw('w-1/5 items-center justify-center')}>
              <View style={tw('w-20 h-20')}>
                <Image
                  src="src/assets/seal.png"
                  style={tw('w-full h-full object-contain')}
                />
              </View>
            </View>

            {/* Girl's Signature */}
            <View style={tw('w-2/5')}>
              <Text style={tw('text-xs font-hindi text-center mb-1')}>
                लड़की (वधू) के हस्ताक्षर
              </Text>

              {/* Girl's Signature Image */}
              <View style={tw('h-8 mb-3 items-center justify-center')}>
                <Image
                  src={girlData?.girlSignature || 'src/assets/dummy-sign.png'}
                  style={tw('max-w-full max-h-full object-contain')}
                />
              </View>

              <Text style={tw('text-xs font-hindi font-bold mb-1')}>
                लड़की (वधू) के परिजन के हस्ताक्षर
              </Text>

              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  नाम :{' '}
                  {girlData?.girlSignatureName ||
                    girlData?.girlFatherName ||
                    '............................'}
                </Text>
              </View>
              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  मोबाइल नंबर :{' '}
                  {girlData?.girlSignatureMobile ||
                    girlData?.mobileNumber ||
                    '................................'}
                </Text>
              </View>
              <View style={tw('mb-1')}>
                <Text style={tw('text-xs font-hindi')}>
                  लड़की से रिश्ता :{' '}
                  {girlData?.girlSignatureRelation ||
                    'पिता' ||
                    '................................'}
                </Text>
              </View>
            </View>
          </View>

          {/* Bottom Notes */}
          <Text style={tw('text-xs font-hindi mt-3')}>
            <Text style={tw('font-bold')}>नोट: </Text>यह पत्र केवल राज्य, जिला
            सेवादार व नामदान केंद्र हेतु सूचनार्थ ही मान्य है, सतलोक आश्रम से
            बाहर किसी कार्य में मान्य नहीं होगा। यह पत्र अन्य किसी भी सेवादार को
            नहीं देना है।
          </Text>

          <Text style={tw('text-xs font-hindi mt-1')}>
            <Text style={tw('font-bold')}>नोट: </Text>लड़का व लड़की और माता-पिता
            का आधार कार्ड, नामदीक्षा फॉर्म की फोटो कॉपी, पूजा सर्टिफिकेट और
            दोनों की 1-1 फोटो फॉर्म के साथ लगाना अनिवार्य है।
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MarriageCertificate;
