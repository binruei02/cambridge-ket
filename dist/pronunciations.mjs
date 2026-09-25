// Sources observed on Cambridge Dictionary pronunciation pages on 2026-09-25.
// Stream from the original source; no Cambridge audio files are redistributed.
const entries=[
 ['subject','u/uks/uksub/uksubhe003','ˈsʌb.dʒekt'],
 ['library','c/cdo/cdo01/cdo0123uklibr1319','ˈlaɪ.brər.i'],
 ['timetable','u/ukt/uktig/uktight026','ˈtaɪmˌteɪ.bəl'],
 ['practice','u/ukp/ukpr_/ukpr___008','ˈpræk.tɪs'],
 ['borrow','u/ukb/ukbor/ukborin004','ˈbɒr.əʊ'],
 ['homework','u/ukh/ukhom/ukhomel018','ˈhəʊm.wɜːk'],
 ['usually','u/uku/ukush/ukusher007','ˈjuː.ʒu.ə.li'],
 ['neighbour','u/ukn/ukneg/uknegot008','ˈneɪ.bər'],
 ['appointment','u/uka/ukapp/ukappen028','əˈpɔɪnt.mənt'],
 ['tidy','u/ukt/uktic/uktickl015','ˈtaɪ.di'],
 ['remember','u/ukr/ukrem/ukremak008','rɪˈmem.bər'],
 ['message','u/ukm/ukmes/ukmesh_006','ˈmes.ɪdʒ'],
 ['receipt','u/ukr/ukreb/ukrebui017','rɪˈsiːt'],
 ['customer','u/ukc/ukcur/ukcurta027','ˈkʌs.tə.mər'],
 ['delicious','u/ukd/ukdej/ukdejur026','dɪˈlɪʃ.əs'],
 ['enough','u/uke/ukenl/ukenliv011','ɪˈnʌf'],
 ['cheap','u/ukc/ukcha/ukchary024','tʃiːp'],
 ['menu','u/ukm/ukmen/ukmenac025','ˈmen.juː'],
 ['journey','u/ukj/ukjol/ukjolli021','ˈdʒɜː.ni'],
 ['suitcase','u/uks/uksug/uksugar013','ˈsuːt.keɪs'],
 ['platform','u/ukp/ukpla/ukplate007','ˈplæt.fɔːm'],
 ['straight','u/uks/uksto/ukstore028','streɪt'],
 ['arrive','u/uka/ukarr/ukarriv002','əˈraɪv'],
 ['ticket','u/ukt/ukthu/ukthund029','ˈtɪk.ɪt'],
 ['adventure','u/uka/ukadu/ukadult017','ədˈven.tʃər'],
 ['competition','u/ukc/ukcom/ukcompa028','ˌkɒm.pəˈtɪʃ.ən'],
 ['invite','u/uki/ukinv/ukinvig013','ɪnˈvaɪt'],
 ['hobby','u/ukh/ukhiv/ukhive_026','ˈhɒb.i'],
 ['prefer','u/ukp/ukpre/ukpredi027','prɪˈfɜːr'],
 ['concert','u/ukc/ukcon/ukconce019','ˈkɒn.sət'],
 ['forest','u/ukf/ukfor/ukfores005','ˈfɒr.ɪst'],
 ['weather','u/ukw/ukwea/ukweari008','ˈweð.ər'],
 ['island','u/uki/ukirr/ukirres026','ˈaɪ.lənd'],
 ['dangerous','u/ukd/ukdam/ukdamne021','ˈdeɪn.dʒər.əs'],
 ['cloudy','u/ukc/ukclo/ukclosu010','ˈklaʊ.di'],
 ['recycle','u/ukr/ukrec/ukrecum010','ˌriːˈsaɪ.kəl']
];
export const pronunciations=Object.fromEntries(entries.map(([word,path,ipa])=>[word,{url:`https://dictionary.cambridge.org/media/english/uk_pron/${path}.mp3`,ipa,source:`https://dictionary.cambridge.org/pronunciation/english/${word}`} ]));
export const officialAudio='https://www.cambridgeenglish.org/Images/506891-a2-key-for-schools-handbook-for-teachers-listening-audio-files.mp3';
export const officialHandbook='https://www.cambridgeenglish.org/Images/168174-cambridge-english-key-for-schools-handbook-for-teachers.pdf';
export const officialDigitalTest='https://ceq.inspera.com/player/?assessmentRunId=539334934&context=exam';
