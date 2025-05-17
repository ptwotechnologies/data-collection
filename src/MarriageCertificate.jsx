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
  ],
});

// Create Tailwind instance
const tw = createTw({
  theme: {
    fontFamily: {
      hindi: ['NotoSansDevanagari'],
    },
    extend: {
      colors: {
        primary: '#8B0000',
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

// Radio button component
const RadioButton = ({ isSelected }) =>
  isSelected ? (
    <View
      style={tw('w-2 h-2 rounded-full border border-black bg-black mr-1')}
    />
  ) : (
    <View style={tw('w-2 h-2 rounded-full border border-black mr-1')} />
  );

// Field component for form fields
const Field = ({ label, value }) => (
  <View style={tw('flex flex-row mb-1 items-start')}>
    <Text style={tw('w-2/5 text-xs font-bold font-hindi')}>{label}</Text>
    <Text
      style={tw('w-3/5 text-xs border-b border-gray-300 pb-0.5 font-hindi')}
    >
      {value || ''}
    </Text>
  </View>
);

// Marriage Certificate Component
const MarriageCertificate = ({ boyData, girlData }) => {
  // Checkbox states
  const isAdult = boyData?.isAdult === 'Yes' && girlData?.isAdult === 'Yes';
  const isDowryFree =
    boyData?.isDowryFree === 'Yes' && girlData?.isDowryFree === 'Yes';
  const agreeWithRules =
    boyData?.agreeWithRules === 'Yes' && girlData?.agreeWithRules === 'Yes';
  const boyMarried = boyData?.isAlreadyMarried === 'Yes';
  const girlMarried = girlData?.isAlreadyMarried === 'Yes';

  return (
    <Document>
      <Page size="A4" style={tw('p-5 font-hindi')}>
        <View style={tw('border-2 border-primary p-4 h-full relative')}>
          {/* Header */}
          <View style={tw('mb-2')}>
            <Text style={tw('text-xl text-primary text-center font-bold mb-1')}>
              रमैणी (विवाह) रजिस्ट्रेशन फॉर्म
            </Text>
            <Text style={tw('text-base text-primary text-center mb-2')}>
              सतगुरु जी के विश्व कल्याण मिशन
            </Text>
          </View>

          {/* Important Notice */}
          <View
            style={tw('p-1 rounded border border-primary mb-2 bg-lightPink')}
          >
            <Text style={tw('text-xs text-center leading-tight')}>
              निवेदन: सतगुरु जी के विश्व कल्याण मिशन के अंतर्गत दहेज़-मुक्त
              विवाह की मिसाल स्थापित करने हेतु रमैणी का आयोजन समारोह के समय
              सतलोक आश्रम में ही किया जाए। केवल विशेष परिस्थितियों में ही इसका
              आयोजन नामदान केंद्र अथवा सत्संग स्थल पर किया जाए।
            </Text>
          </View>

          {/* Two Column Layout for Boy and Girl Information */}
          <View style={tw('flex flex-row')}>
            {/* Left Column - Boy Information */}
            <View style={tw('flex-1 pr-1')}>
              <Text
                style={tw(
                  'text-xs font-bold text-center text-primary mb-1 p-0.5 bg-lightPink border-b border-primary'
                )}
              >
                लड़के के परिवार की जानकारी
              </Text>

              <Field label="लड़के का नाम:" value={boyData?.boyName} />
              <Field label="जन्मतिथि:" value={formatDate(boyData?.boyDOB)} />
              <Field label="पिता का नाम:" value={boyData?.boyFatherName} />
              <Field label="माता का नाम:" value={boyData?.boyMotherName} />
              <Field label="पूरा पता:" value={boyData?.fullAddress} />
              <Field label="तहसील:" value={boyData?.tehsil} />
              <Field label="जिला:" value={boyData?.district} />
              <Field label="राज्य:" value={boyData?.state} />
              <Field label="मोबाइल नंबर:" value={boyData?.mobileNumber} />
              <Field
                label="प्रथम नाम प्राप्ति तिथि:"
                value={formatDate(boyData?.firstNameReceiptDate)}
              />
              <Field
                label="सतनाम प्राप्ति तिथि:"
                value={formatDate(boyData?.satnamReceiptDate)}
              />
              <Field
                label="सारनाम प्राप्ति तिथि:"
                value={formatDate(boyData?.dateOfNameReceipt)}
              />
              <Field
                label="सारशब्द प्राप्ति तिथि:"
                value={formatDate(boyData?.abstractReceiptDate)}
              />

              {/* Boy Photo */}
              <View style={tw('items-center mt-1')}>
                <View
                  style={tw(
                    'w-20 h-24 border border-primary items-center justify-center overflow-hidden'
                  )}
                >
                  {boyData?.boyPhoto && (
                    <Image
                      src={boyData.boyPhoto}
                      style={tw('w-full h-full object-cover')}
                    />
                  )}
                </View>
                <Text style={tw('text-xs text-center mt-0.5')}>
                  लड़के का फोटो
                </Text>
              </View>
            </View>

            {/* Right Column - Girl Information */}
            <View style={tw('flex-1 pl-1')}>
              <Text
                style={tw(
                  'text-xs font-bold text-center text-primary mb-1 p-0.5 bg-lightPink border-b border-primary'
                )}
              >
                लड़की के परिवार की जानकारी
              </Text>

              <Field label="लड़की का नाम:" value={girlData?.girlName} />
              <Field label="जन्मतिथि:" value={formatDate(girlData?.girlDOB)} />
              <Field label="पिता का नाम:" value={girlData?.girlFatherName} />
              <Field label="माता का नाम:" value={girlData?.girlMotherName} />
              <Field label="पूरा पता:" value={girlData?.fullAddress} />
              <Field label="तहसील:" value={girlData?.tehsil} />
              <Field label="जिला:" value={girlData?.district} />
              <Field label="राज्य:" value={girlData?.state} />
              <Field label="मोबाइल नंबर:" value={girlData?.mobileNumber} />
              <Field
                label="प्रथम नाम प्राप्ति तिथि:"
                value={formatDate(girlData?.firstNameReceiptDate)}
              />
              <Field
                label="सतनाम प्राप्ति तिथि:"
                value={formatDate(girlData?.satnamReceiptDate)}
              />
              <Field
                label="सारनाम प्राप्ति तिथि:"
                value={formatDate(girlData?.dateOfNameReceipt)}
              />
              <Field
                label="सारशब्द प्राप्ति तिथि:"
                value={formatDate(girlData?.abstractReceiptDate)}
              />

              {/* Girl Photo */}
              <View style={tw('items-center mt-1')}>
                <View
                  style={tw(
                    'w-20 h-24 border border-primary items-center justify-center overflow-hidden'
                  )}
                >
                  {girlData?.girlPhoto && (
                    <Image
                      src={girlData.girlPhoto}
                      style={tw('w-full h-full object-cover')}
                    />
                  )}
                </View>
                <Text style={tw('text-xs text-center mt-0.5')}>
                  लड़की का फोटो
                </Text>
              </View>
            </View>
          </View>

          {/* Declaration Section */}
          <View style={tw('mt-6 mb-2')}>
            <Text style={tw('text-xs text-justify leading-tight')}>
              हम दोनों परिवार पूर्ण सहमति से अपने बच्चों का घर विवाह (रमैणी) कर
              रहे हैं। हम यह सुनिश्चित करते हैं कि वर और वधू भारतीय विवाह
              अधिनियम, 1955 के अंतर्गत निर्धारित आयु सीमा को पूर्ण करते हैं तथा
              इस विवाह/रमैणी के लिए सभी आवश्यक कानूनी प्रक्रियाओं का पालन किया
              गया है।
            </Text>
          </View>

          {/* Divider */}
          <View style={tw('border-t border-primary my-1')} />

          {/* Checkboxes for Questions */}
          <View style={tw('mb-2 mt-2')}>
            {/* Question 1 - Adult Age */}
            <View style={tw('flex flex-row items-center mb-2')}>
              <Text style={tw('text-xs font-bold mr-2')}>
                1. क्या आपके पुत्र/पुत्री की आयु (लड़की 18 वर्ष, लड़का 21 वर्ष)
                सरकार के नियमों के अनुसार पूर्ण हो चुकी है?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <View style={tw('flex flex-row items-center mr-2')}>
                  <RadioButton isSelected={isAdult} />
                  <Text style={tw('text-xs')}>हाँ</Text>
                </View>
                <View style={tw('flex flex-row items-center')}>
                  <RadioButton isSelected={!isAdult} />
                  <Text style={tw('text-xs')}>नहीं</Text>
                </View>
              </View>
            </View>

            {/* Question 2 - Dowry Free */}
            <View style={tw('flex flex-row items-center mb-2')}>
              <Text style={tw('text-xs font-bold mr-2')}>
                2. क्या दोनों पक्षों ने अपने देश, गाँव आदि का मान रखते हुये एक
                विवाह (रमैणी) करने का निर्णय लिया है?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <View style={tw('flex flex-row items-center mr-2')}>
                  <RadioButton isSelected={isDowryFree} />
                  <Text style={tw('text-xs')}>हाँ</Text>
                </View>
                <View style={tw('flex flex-row items-center')}>
                  <RadioButton isSelected={!isDowryFree} />
                  <Text style={tw('text-xs')}>नहीं</Text>
                </View>
              </View>
            </View>

            {/* Question 3 - Agree with Rules */}
            <View style={tw('flex flex-row items-center mb-2')}>
              <Text style={tw('text-xs font-bold mr-2')}>
                3. क्या आप सतलोक आश्रम के अंतर्गत होने वाले रमैणी विवाह के
                नियमों से सहमत हैं?
              </Text>
              <View style={tw('flex flex-row items-center')}>
                <View style={tw('flex flex-row items-center mr-2')}>
                  <RadioButton isSelected={agreeWithRules} />
                  <Text style={tw('text-xs')}>हाँ</Text>
                </View>
                <View style={tw('flex flex-row items-center')}>
                  <RadioButton isSelected={!agreeWithRules} />
                  <Text style={tw('text-xs')}>नहीं</Text>
                </View>
              </View>
            </View>

            {/* Question 4 - Already Married */}
            <View style={tw('flex flex-row items-start mb-2')}>
              <Text style={tw('text-xs font-bold mr-2')}>
                4. क्या लड़का/लड़की पहले से विवाहित है?
              </Text>
              <View style={tw('flex flex-col')}>
                <View style={tw('flex flex-row items-center mb-1')}>
                  <Text style={tw('text-xs mr-1')}>लड़का:</Text>
                  <RadioButton isSelected={boyMarried} />
                  <Text style={tw('text-xs mr-2')}>हाँ</Text>
                  <RadioButton isSelected={!boyMarried} />
                  <Text style={tw('text-xs')}>नहीं</Text>
                </View>
                <View style={tw('flex flex-row items-center')}>
                  <Text style={tw('text-xs mr-1')}>लड़की:</Text>
                  <RadioButton isSelected={girlMarried} />
                  <Text style={tw('text-xs mr-2')}>हाँ</Text>
                  <RadioButton isSelected={!girlMarried} />
                  <Text style={tw('text-xs')}>नहीं</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Wedding Details */}
          <View style={tw('mb-2')}>
            <Text style={tw('text-xs')}>
              हम अपने बच्चों (उपरोक्त दी गई परिवार की जानकारी) का विवाह दिनांक:
              __________________ स्थान: नामदान केंद्र/आश्रम
              __________________________ में करना चाहते हैं।
            </Text>
          </View>

          {/* Signatures */}
          <View style={tw('flex flex-row justify-between')}>
            {/* Boy's Signature */}
            <View style={tw('w-2/5')}>
              <Text style={tw('text-xs text-center mb-1')}>
                लड़के (वर) के हस्ताक्षर
              </Text>
              {boyData?.boySignature ? (
                <Image
                  src={boyData.boySignature}
                  style={tw('h-10 w-full object-contain')}
                />
              ) : (
                <View style={tw('border-t border-black h-10 w-full')}></View>
              )}

              <Text style={tw('text-xs text-center mt-2 mb-1')}>
                लड़के (वर) के परिजन के हस्ताक्षर
              </Text>
              <Field label="नाम:" value={boyData?.boySignatureName} />
              <Field label="मोबाइल नंबर:" value={boyData?.boySignatureMobile} />
              <Field
                label="लड़के से रिश्ता:"
                value={boyData?.boySignatureRelation}
              />
            </View>

            {/* Girl's Signature */}
            <View style={tw('w-2/5')}>
              <Text style={tw('text-xs text-center mb-1')}>
                लड़की (वधू) के हस्ताक्षर
              </Text>
              {girlData?.girlSignature ? (
                <Image
                  src={girlData.girlSignature}
                  style={tw('h-10 w-full object-contain')}
                />
              ) : (
                <View style={tw('border-t border-black h-10 w-full')}></View>
              )}

              <Text style={tw('text-xs text-center mt-2 mb-1')}>
                लड़की (वधू) के परिजन के हस्ताक्षर
              </Text>
              <Field label="नाम:" value={girlData?.girlSignatureName} />
              <Field
                label="मोबाइल नंबर:"
                value={girlData?.girlSignatureMobile}
              />
              <Field
                label="लड़की से रिश्ता:"
                value={girlData?.girlSignatureRelation}
              />
            </View>
          </View>

          {/* Final Note */}
          <View style={tw('mt-2 absolute bottom-4 left-4 right-4')}>
            <Text style={tw('text-xs text-center')}>
              नोट: यह पत्र केवल राज्य, जिला मेवाद्वार व नामदान केंद्र हेतु
              सूचनार्थ ही मान्य है, सतलोक आश्रम से बाहर किसी कार्य में मान्य
              नहीं होगा। यह पत्र अन्य किसी भी मेवाद्वार को नहीं देना है।
            </Text>
            <Text style={tw('text-xs text-center mt-1')}>
              नोट: लड़का व लड़की और माता-पिता का आधार कार्ड, नामदीक्षा फॉर्म की
              फोटो कॉपी, पूजा सर्टिफिकेट और दोनों की 1-1 फोटो फॉर्म के साथ लगाना
              अनिवार्य है।
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MarriageCertificate;
