import { Component, OnInit } from '@angular/core';

export interface GridItem {
  id: string;
  image: string;
  title: string;
  description: string;
  readMoreLink: string;
  content?: string;
  hoverText?: string;
  isVideo?: boolean;
  videoUrl?: string;
  thumbnail?: string;
  galleryImages?: string[];
}

// Export the grid items as a constant to be used in other components
export const BPO_ALLIANCE_ITEMS: GridItem[] = [
  {
    id: 'answernet-joins-gba',
    image: 'assets/answernet.jpg',
    title: 'AnswerNet Joins the GBA',
    description: 'FIFOTech as partner of GBA GLOBAL BPO',
    readMoreLink: '/bpo-alliance/answernet-joins-gba',
    content: `
      <div class="news-article">
        <h2>AnswerNet Joins Forces with Global BPO Alliance</h2>
        
        <p>AnswerNet, a leading provider of contact center and BPO services, has officially joined the Global BPO Alliance (GBA), marking a significant expansion of the alliance's capabilities in the North American market.</p>
        
        <p>As part of this strategic partnership, AnswerNet will collaborate with FIFOTech and other GBA members to deliver comprehensive call center and back-office solutions to clients worldwide. This partnership strengthens the alliance's position in the global BPO industry and enhances its service offerings across multiple languages and regions.</p>
        
        <p>"We are excited to welcome AnswerNet to the Global BPO Alliance," said a GBA spokesperson. "Their expertise in customer experience management and technical support services will be invaluable as we continue to expand our global footprint and service capabilities."</p>
        
        <p>Key benefits of this partnership include:</p>
        <ul>
          <li>Expanded service coverage in North America</li>
          <li>Enhanced multilingual support capabilities</li>
          <li>24/7 customer service coverage across multiple time zones</li>
          <li>Access to AnswerNet's advanced technology platforms and industry expertise</li>
        </ul>
        
        <p>The collaboration will enable both organizations to better serve their clients through shared resources, best practices, and innovative solutions in the BPO and contact center industry.</p>
        
        <p>With this new partnership, the Global BPO Alliance continues to strengthen its position as a leading network of BPO service providers, offering seamless, high-quality services to clients around the world.</p>
      </div>
    `,
    hoverText: 'Learn more about AnswerNet joining the Global BPO Alliance'
  },
  {
    id: 'gba-summit-2019',
    image: 'assets/Japan-1.jpg',
    title: 'GBA Summit 2019 in Tokyo, Japan',
    description: 'GBA Summit 2019 in Tokyo, Japan FIFOTech',
    readMoreLink: '/bpo-alliance/gba-summit-2019',
    content: 'GBA Summit 2019 in Tokyo, Japan',
    hoverText: 'View photos from GBA Summit 2019',
    galleryImages: [
      'assets/Japan-1.jpg',
      'assets/japan_2.jpg',
      'assets/Japan-3.jpg',
      'assets/japan-4.jpg',
      'assets/Japan-5.jpg',
      'assets/Japan-6.jpg',
      'assets/japan7.jpg'
    ]
  },
  {
    id: 'daily-sun-nov-2020',
    image: 'assets/DailySun.jpg',
    title: 'Daily Sun || 6 November, 2020',
    description: 'Bangla included in global BPO services',
    readMoreLink: '/bpo-alliance/daily-sun-nov-2020',
    content: `
      <div class="news-article">
        <h2>Bangla included in global BPO services</h2>
        <p>Bangla language has been officially included into the global arena of business process outsourcing (BPO) as a Bangladeshi firm signed up with Global BPO Call Center Alliance, an international forum of call centre service providers.</p>
        
        <p>BPO is a method of subcontracting various business-related operations to third-party vendors, especially executed on the digital platform.</p>
        
        <p>Under the agreement with GBA Platform, Bangladeshi firm Fifotech will provide call centre and back-office support globally targeting Bangla speaking people.</p>
        
        <p>GBA member companies serve customers in 28 languages through call centre and back-office services converging 60 per cent of the global population.</p>
        
        <p>Telecommunications Minister Mustafa Jabbar was the chief guest at the meeting while Asian-Oceanian Computing Industry Organization (ASOCIO) former chairman Abdullah H. Kafi was the special guest at the meeting virtually held on Thursday.</p>
        
        <p>Bangladesh Association of Call Centers and Outsourcing (BACCO) president Wahid Sharif, senior vice president Mohammad AbulKhair and general secretary Towhid Hossain, among others, joined the session.</p>
        
        <p>FIFOTech will provide call centre and back-office services to Bengali customers in Bangla language from Bangladesh living in different parts of the world and Hindi language customers from Kolkata, India. In the meeting, Telecommunications Minister Mustafa Jabbar said the Global BPO Alliance created an opportunity to provide BPO services to about 350 million Bangla-speaking people across the world.</p>
        
        <p>Global BPO Alliance (GBA) is the world's first and largest call centre alliance. GBA is working with the BPO sector in Asia, Europe and South America. Since 2002, FIFOTech has been working with utmost efficiency and reputation to meet the needs of local and international customers in the IT and ITS sector. Fifotech chief executive Towhid Hossain expressed hope that the alliance with GPA will create job opportunities along with chances to earn foreign exchanges for Bangladesh.</p>
        
        <p>GBA Alliance has been formed to provide uninterrupted service to call centre and BPO customers in different parts of the world. Currently, the alliance companies which have signed to work with GBA are FIFOTech from Bangladesh, Masterpiece Group Inc. of Japan, Beijing 95 TeleWeb Information Company Limited of China, Day Three Business Services of Malaysia-SDN BHD and other BPO ventures from different parts world.</p>
        
        <p>GBA authority will arrange work for the member companies according to their needs and language by contacting companies from different countries of the world.</p>
      </div>
    `,
    hoverText: 'Read about Bangla in global BPO services'
  },
  {
    id: 'prothom-alo-nov-2020',
    image: 'assets/Prothom-Alo.jpg',
    title: 'প্রথম আলো || ৯ নভেম্বর ২০২০',
    description: 'গ্লোবাল বিপিও অ্যালায়েন্সে বাংলাদেশি প্রতিষ্ঠান',
    readMoreLink: '/bpo-alliance/prothom-alo-nov-2020',
    content: `
      <div class="news-article">
        <p>আন্তর্জাতিক কোনো জোটের সঙ্গে যুক্ত না থাকায় কলসেন্টার ও বিপিও খাতে কাজ পেতে বেগ পেতে হতো বাংলাদেশের কলসেন্টার ও আইসিটি খাতের প্রতিষ্ঠানগুলোকে। এবারে বিশ্বের প্রথম ও সর্ববৃহৎ কলসেন্টার জোট গ্লোবাল বিপিও কল সেন্টার অ্যালায়েন্সে যুক্ত হয়েছে বাংলাদেশি কলসেন্টার সেবাদাতা প্রতিষ্ঠান ফিফোটেক।</p>
        
        <p>গতকাল বৃহস্পতিবার ঢাকায় এক ভার্চুয়াল অনুষ্ঠানে জিবিএর সদস্য হওয়ার ঘোষণা দেয় ফিফোটেক। অনুষ্ঠানে ডাক ও টেলিযোগাযোগ মন্ত্রী মোস্তাফা জব্বার বলেন, গ্লোবাল বিপিও অ্যালায়েন্সের সঙ্গে যুক্ত হওয়ায় বাংলা ভাষাভাষী প্রায় ৩৫ কোটি মানুষের জন্য বিপিও সেবা দেওয়ার সুযোগ পাওয়া যাবে। এতে বাংলাদেশের বিপিও খাত আরও সমৃদ্ধ হবে।</p>
        
        <p>বিশ্বের বিভিন্ন প্রান্তে কল সেন্টার ও বিজনেস প্রসেস আউটসোর্সং (বিপিও) খাতের গ্রাহকদের কেন্দ্রীয় ভাবে নিরবচ্ছিন্ন সেবা দেয় জিবিএ জোট। এর সঙ্গে যুক্ত হওয়ায় ফিফোটেক বিশ্বের বিভিন্ন প্রান্তের বাংলাভাষী গ্রাহকদের সেবা দিতে পারবে।</p>
        
        <p>বাংলাদেশ থেকে বাংলা ও হিন্দি ভাষার গ্রাহকদের ভারতের কলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দেওয়ার সুযোগ হবে। জিবিএর সদস্য কোম্পানিগুলো ২৮টি ভাষায় পৃথিবীর নানা প্রান্তে কল সেন্টার ও ব্যাক অফিসের সার্ভিসের মাধ্যমে গ্রাহকদের সেবা দেয়। বিশ্বের বিভিন্ন দেশের প্রতিষ্ঠানের সঙ্গে যোগাযোগ করে তাদের চাহিদা ও ভাষা অনুযায়ী সদস্য কোম্পানিগুলোকে কাজের ব্যবস্থা করে দেয় জিবিএ কর্তৃপক্ষ। এ জোটের প্রতিনিধিত্বকারী প্রতিষ্ঠানগুলোর মাধ্যমে পৃথিবীর যেকোনো দেশে বসে বিপিও ও কলসেন্টারের সেবা নিতে পারবেন গ্রাহকেরা।</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিং (বাক্কো) এর সভাপতি ওয়াহিদ শরীফ বলেন, বাংলাদেশের প্রতিষ্ঠান ফিফোটেক আন্তর্জাতিক কল সেন্টার জোট-জিবিএর সঙ্গে কাজ করবে যা দেশের জন্য গর্বের বিষয়।</p>
        
        <p>ফিফোটেকের প্রধান নির্বাহী কর্মকর্তা তৌহিদ হোসেন বলেন, বিভিন্ন প্রান্তের বাংলা ভাষার গ্রাহকদের বাংলাদেশ থেকে ও হিন্দি ভাষার গ্রাহকদের ভারতের কলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দেওয়ার সুযোগ তৈরি হচ্ছে।</p>
        
        <p>ভার্চুয়াল অনুষ্ঠানে উপস্থিত ছিলেন তথ্যপ্রযুক্তি এবং বিপিও খাতের বিভিন্ন প্রতিষ্ঠানের কর্মকর্তারা।</p>
      </div>`,
    hoverText: 'প্রথম আলোতে প্রকাশিত সম্পূর্ণ সংবাদ পড়ুন'
  },
  {
    id: 'gba-press-release',
    image: 'assets/71-TV-GBA.jpg',
    title: 'GBA-FIFOTech Press Release',
    description: '71 TV News Report || GBA-FIFOTech Press',
    readMoreLink: '/bpo-alliance/gba-press-release',
    content: 'Detailed press release content...',
    hoverText: 'Watch the press release video',
    isVideo: true,
    videoUrl: 'assets/videos/GBA-71-TV-1.mp4',
    thumbnail: 'assets/71-TV-GBA.jpg'
  },
  {
    id: 'ittefaq-nov-2020',
    image: 'assets/Ittefak.jpg',
    title: 'Daily Ittefaq || ৮ নভেম্বর, ২০২০',
    description: 'গ্লোবাল বিপিও অ্যালায়েন্সে ফিফোটেক তথ্যপ্রযুক্তি ডেস্ক বিশ্বের প্রথম',
    readMoreLink: '/bpo-alliance/ittefaq-nov-2020',
    content: `
      <div class="news-article">
        <h2>গ্লোবাল বিপিও অ্যালায়েন্সে ফিফোটেক</h2>
        <p class="author">তথ্যপ্রযুক্তি ডেস্ক</p>
        
        <p>বিশ্বের প্রথম ও বৃহত্তম কলসেন্টার জোট গ্লোবাল বিপিও অ্যালায়েন্সে (জিবিএ) যুক্ত হয়েছে দেশের অন্যতম বিপিও প্রতিষ্ঠান ফিফোটেক। গত বৃহস্পতিবার ঢাকায় এক ভার্চুয়াল কনফারেন্সে জিবিএ সদস্য হিসেবে ফিফোটেকের আনুষ্ঠানিক যাত্রার ঘোষণা দেয়া হয়।</p>
        
        <p>এতে যোগ দিয়ে ডাক ও টেলিযোগাযোগ মন্ত্রী মোস্তাফা জব্বার বলেন, গ্লোবাল বিপিও অ্যালায়েন্সের সাথে বিশ্বের বাংলা ভাষার প্রায় ৩৫ কোটি মানুষের বিপিও সেবায় বাংলাদেশের একটি কোমপানির প্রতিনিধিত্ব দারুণ খবর। ফিফোটেকের এ যাত্রায় বাংলাদেশের বিপিও খাত আরও সমৃদ্ধ হবে।</p>
        
        <p>জিবিএর সদস্য কোমপানিগুলো ২৮টি ভাষায় পৃথিবীর নানা প্রান্তে কল সেন্টার ও ব্যাক অফিসের সার্ভিসের মাধ্যমে গ্রাহকদের সেবা দিবে। পৃথিবীর মোট ভাষার ৬০ ভাগ ভাষার মানুষ জিবিএ'র মাধ্যমে কল সেন্টার ও বিপিও সেবা পাবেন। বিশ্বের বিভিন্ন দেশের কোম্পানির সাথে যোগাযোগ করে তাদের চাহিদা ও ভাষা অনুযায়ী সদস্য কোম্পানিগুলো কাজের ব্যবস্থা করে দেবে জিবিএ কর্তৃপক্ষ। যার ফলে ভবিষ্যতে এই জোটের প্রতিনিধিত্বকারী প্রতিষ্ঠানগুলোর মাধ্যমে পৃথিবীর যেকোন দেশে বসেই বিপিও ও কল সেন্টারের সেবা নিতে পারবেন গ্রাহকরা এবং সেবা দিবেন বিপিও ও কল সেন্টার এজেন্টরা। জিবিএ'র সাথে যুক্ত হয়ে আন্তর্জাতিক পরিসরে পুনরায় কাজ করতে যাচ্ছে ফিফোটেক।</p>
        
        <p>ফিফোটেকের ব্যবস্থাপনা পরিচালক ও প্রধান নির্বাহী কর্মকর্তা তৌহিদ হোসেন বলেন, জিবিএ'র সদস্য হওয়ার ফলে কল সেন্টার ও বিপিও খাতে নতুন নতুন কাজের সুযোগ সৃষ্টি হবে এবং এতে করে মানুষের কর্মসংস্থান হবে। ইতোপূর্বে আন্তর্জাতিক কোনো জোটের সাথে যুক্ত না থাকায় কলসেন্টার ও বিপিও খাতে কাজ পেতে বেগ পেতে হতো বাংলাদেশের কলসেন্টার ও আইসিটি খাতের প্রতিষ্ঠানগুলোকে। কিন্তু জিবিএ'র সাথে চুক্তিবদ্ধ হওয়ার কারণে আন্তর্জাতিক পর্যায়ে কাজের সুযোগ পাবে ফিফোটেক তথাপি বাংলাদেশের তরুণ-তরুণীরা।</p>
        
        <p>ফিফোটেক এখন বিশ্বের বিভিন্ন প্রান্তের বাংলাভাষার গ্রাহকদের বাংলাদেশ থেকে ও হিন্দি ভাষার গ্রাহকদের ভারতের কোলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দেবে জানান তিনি। অনুষ্ঠানে বাক্কোর সভাপতি ওয়াহিদ শরীফ, সিনিয়র সহ-সভাপতি মোহাম্মদ আবুল খায়ের, এশিয়ান ওশেনিয়ান কম্পিউটিং ইন্ডাষ্ট্রি অ্যাসোসিয়েশনের চেয়ারম্যান আবদুল্লাহ এইচ কাফি বক্তব্য রাখেন। জিবিএর সঙ্গে বর্তমানে বিশ্বের ১৪টি মাল্টিন্যাশনাল কোম্পানি যুক্ত হয়েছে।</p>
      </div>
    `,
    hoverText: 'দৈনিক ইত্তেফাকে প্রকাশিত সম্পূর্ণ সংবাদ পড়ুন'
  },
  {
    id: 'bangla-tribune-nov-2020',
    image: 'assets/Bangla-Tribune.jpg',
    title: 'BanglaTribune || নভেম্বর ০৫, ২০২০',
    description: 'বিশ্বের ৩৫ কোটি মানুষের জন্য কাজ করবে Fifo Tech',
    readMoreLink: '/bpo-alliance/bangla-tribune-nov-2020',
    content: `
      <div class="news-article">
        <h2>বিশ্বের ৩৫ কোটি মানুষের জন্য কাজ করবে ফিফোটেক</h2>
        
        <p>জিবিএ'র (গ্লোবাল বিপিও অ্যালায়েন্স) সঙ্গে কাজ করতে চুক্তিবদ্ধ হলো দেশের তথ্যপ্রযুক্তি প্রতিষ্ঠান ফিফোটেক। জিবিএ এশিয়া, ইউরোপ ও দক্ষিণ আমেরিকায় বিপিও খাতে কাজ করছে।</p>
        
        <p>জিবিএ জোটের সঙ্গে চুক্তিবদ্ধ হয়ে ফিফোটেক বিশ্বের বিভিন্ন প্রান্তের বাংলা ভাষার গ্রাহকদের বাংলাদেশ থেকে এবং হিন্দি ভাষার গ্রাহকদের ভারতের কলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দেবে।</p>
        
        <p>বর্তমানে জিবিএ'র সঙ্গে বাংলাদেশ থেকে ফিফোটেকসহ মোট ১৪টি মাল্টিন্যাশনাল কোম্পানি চুক্তিবদ্ধ হয়েছে।</p>
        
        <p>বৃহস্পতিবার (৫ নভেম্বর) ঢাকায় অনলাইনে আয়োজিত অনুষ্ঠানে জিবিএ'র সদস্য কোম্পানি হিসেবে ফিফোটেকের যাত্রা শুরু হয়। ভিডিও বার্তায় শুভেচ্ছা জানান ডাক ও টেলিযোগাযোগ মন্ত্রী মোস্তাফা জব্বার। তিনি বলেন, 'আমি আনন্দিত হয়েছি এই কারণে যে, গ্লোবাল বিপিও অ্যালায়েন্স'র সঙ্গে বাংলা ভাষাভাষি প্রায় ৩৫ কোটি মানুষের জন্য বাংলাদেশের একটি কোম্পানির মাধ্যমে বিপিও সেবা দেওয়ার মতো আমরা একটি সুযোগ পেয়েছি। ফিফোটেকের এই যাত্রার ফলে বাংলাদেশের বিপিও খাত আরও সমৃদ্ধ হবে।'</p>
        
        <p>এশিয়ান ওশেনিয়ান কম্পিউটিং ইন্ডাস্ট্রি অ্যাসোসিয়েশনের (অ্যাসোসিও) সাবেক চেয়ারম্যান আবদুল্লাহ এইচ কাফি বলেন, 'আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সঙ্গে বাংলাদেশের প্রতিষ্ঠান ফিফোটেক কাজ করার সুযোগ পেয়েছে। এটি আমাদের দেশের জন্য সম্মানের বিষয়।'</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিং (বাক্কো) এর সভাপতি ওয়াহিদ শরীফ ফিফোটেকের জন্য শুভ কামনা জানান।</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিংয়ের (বাক্কো) সিনিয়র সহ-সভাপতি মোহাম্মদ আবুল খায়ের বলেন, 'বাংলাদেশের প্রতিষ্ঠান ফিফোটেক আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সঙ্গে কাজ করবে, এটা আমাদের জন্য গর্বের। এর মাধ্যমে বাংলাদেশের তরুণদের জন্য কর্মসংস্থান তৈরি হবে।'</p>
        
        <p>ফিফোটেকের ব্যবস্থাপনা পরিচালক ও প্রধান নির্বাহী তৌহিদ হোসেন বলেন, 'আমরা আজ থেকে আমাদের অফিসিয়াল যাত্রা শুরু করলাম।'</p>
      </div>
    `,
    hoverText: 'বাংলা ট্রিবিউনে প্রকাশিত সম্পূর্ণ সংবাদ পড়ুন'
  },
  {  
    id: 'jugantor-nov-2020',
    image: 'assets/Jugantor.jpg',
    title: 'Jugantor || ০৫ নভেম্বর ২০২০',
    description: 'গ্লোবাল বিপিও অ্যালায়েন্সের সঙ্গে বাংলাদেশ বিশ্বের সর্ববৃহৎ কলসেন্টার',
    readMoreLink: '/bpo-alliance/jugantor-nov-2020',
    content: `
      <div class="news-article">
        <h2>গ্লোবাল বিপিও অ্যালায়েন্সের সঙ্গে বাংলাদেশ</h2>
        
        <p>বিশ্বের সর্ববৃহৎ কলসেন্টার জোট গ্লোবাল বিপিও অ্যালায়েন্সের (জিবিএ) সঙ্গে যুক্ত হলো বাংলাদেশ। বৃহস্পতিবার ঢাকায় জুম কনফারেন্সের মাধ্যমে জিবিএ'র সদস্য কোম্পানি হিসেবে বাংলাদেশে ফিফোটেকের যাত্রা শুরু হয়।</p>
        
        <p>এ সময় জুম কনফারেন্সে এক ভিডিও বার্তায় ডাক ও টেলিযোগাযোগ মন্ত্রী মোস্তাফা জব্বার বলেন, আমি আনন্দিত হয়েছি এই কারণে যে, গ্লোবাল বিপিও অ্যালায়েন্সের সাথে বাংলা ভাষাভাষী প্রায় ৩৫ কোটি মানুষের জন্য বাংলাদেশের একটি কোম্পানির মাধ্যমে বিপিও সেবা দেয়ার মতো আমরা একটি সুযোগ পেয়েছি।</p>
        
        <p>তিনি বলেন, আমি বিশ্বাস করি ফিফোটেকের যে যাত্রা সেই যাত্রার ফলে বাংলাদেশের বিপিও খাত আরও সমৃদ্ধ হবে। জিবিএ ও ফিফোটেকের একত্রে পথচলার আগামীর দিনগুলোর জন্য অনেক শুভ কামনা রইলো।</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিং (বাক্কো)-এর সিনিয়র সহ-সভাপতি মোহাম্মদ আবুল খায়ের বলেন, বাংলাদেশের প্রতিষ্ঠান ফিফোটেক আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সাথে কাজ করবে এটাই আমাদের জন্য গর্বের বিষয়। এর মাধ্যমে বাংলাদেশের তরুণদের জন্য কর্মসংস্থান তৈরি হবে।</p>
        
        <p>এশিয়ান ওশেনিয়ান কম্পিউটিং ইন্ডাস্ট্রি অ্যাসোসিয়েশনের চেয়ারম্যান আবদুল্লাহ এইচ কাফি বলেন, আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সাথে বাংলাদেশের প্রতিষ্ঠান ফিফোটেক কাজ করার সুযোগ পেয়েছে যা আমাদের জন্য অত্যন্ত আনন্দের একটি বিষয়। এটি আমাদের দেশের জন্য সম্মানের বিষয়।</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিং (বাক্কো) এর সভাপতি ওয়াহিদ শরীফ বলেন, বাংলাদেশের প্রতিষ্ঠান ফিফোটেক আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সাথে কাজ করবে, এটি দেশের জন্য গর্বের বিষয়। জিবিএ ও ফিফোটেকের প্রতি শুভ কামনা রইলো।</p>
        
        <p>জিবিএ জোটের সাথে চুক্তিবদ্ধ হবার বিষয়ে ফিফোটেকের ব্যবস্থাপনা পরিচালক ও প্রধান নির্বাহী কর্মকর্তা তৌহিদ হোসেন বলেন, মূলত ফিফোটেক বিশ্বের বিভিন্ন প্রান্তের বাংলাভাষার গ্রাহকদের বাংলাদেশ থেকে ও হিন্দি ভাষার গ্রাহকদের ভারতের কোলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দিবে। আমরা আজ থেকে আমাদের অফিসিয়াল যাত্রা শুরু করলাম। বৈদেশিক মুদ্রা আয়ের সুযোগ সৃষ্টি করবে জিবিএ জোট, এমনটাই মনে করেন তৌহিদ হোসেন।</p>
        
        <p>বিশ্বের সর্ববৃহৎ কলসেন্টার জোট জিবিএ এশিয়া, ইউরোপ ও দক্ষিণ আমেরিকার বিপিও খাতে কাজ করছে। এদিকে ২০০২ সাল থেকে আইটি ও আইটিএস খাতের স্থানীয় ও আন্তর্জাতিক গ্রাহকদের চাহিদা পূরণে কাজ করছে ফিফোটেক।</p>
        
        <p>মূলত বিশ্বের বিভিন্ন প্রান্তে কল সেন্টার ও বিপিও খাতের গ্রাহকদের কেন্দ্রীয়ভাবে নিরবচ্ছিন্ন সেবা দিতে জিবিএ জোট গঠন করা হয়েছে। জিবিএ জোটের সাথে চুক্তিবদ্ধ হয়ে ফিফোটেক বিশ্বের বিভিন্ন প্রান্তের বাংলা ভাষার গ্রাহকদের বাংলাদেশ থেকে ও হিন্দি ভাষার গ্রাহকদের ভারতের কলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দিবে।</p>
        
        <p>বর্তমানে জিবিএ'র সাথে বাংলাদেশ থেকে ফিফোটেক, জাপানের মাস্টারপিস গ্রুপ ইনক, চীনের বেইজিং-৯৫ টেলিওয়েব ইনফরমেশন কোম্পানি লিমিটেড, কলম্বিয়ার কলম্বিয়া আউটসোর্সিং সলিউশনস এসএএস, মালয়েশিয়ার ডে থ্রি বিজনেস সার্ভিসেস এসডিএন বিএইচডি, তিউনিসিয়ার নেক্সাস, রাশিয়া ও ইউক্রেনের টেলিকম এক্সপ্রেস, জার্মানির টিডিএম, ইতালির আইএনজিও এসপিএ, থাইল্যান্ডের নাইস কল কোম্পানি লিমিটেড, মিয়ানমারের মাস্টারপিস গ্রুপ কোম্পানি লিমিটেড, ফিলিপাইনের মাস্টারপিস গ্রুপ কোম্পানি লিমিটেড, বেলজিয়ামের মাল্টিকম ও ইউরোপের আইএনইটেক এর মতো ১৪টি মাল্টিন্যাশনাল কোম্পানি চুক্তিবদ্ধ হয়েছে।</p>
        
        <p>চুক্তিবদ্ধ প্রত্যেকটি কোম্পানি নিজ দেশ ও বিদেশে কাজ করার অভিজ্ঞতা রয়েছে। জিবিএ'র সদস্য কোম্পানিগুলো ২৮টি ভাষায় পৃথিবীর নানা প্রান্তে কল সেন্টার ও ব্যাক অফিসের সার্ভিসের মাধ্যমে গ্রাহকদের সেবা দিবে। পৃথিবীর মোট ভাষার ৬০ ভাগ ভাষার মানুষ জিবিএ'র মাধ্যমে কল সেন্টার ও বিপিও সেবা পাবেন।</p>
        
        <p>বিশ্বের বিভিন্ন দেশের কোম্পানির সাথে যোগাযোগ করে তাদের চাহিদা ও ভাষা অনুযায়ী সদস্য কোম্পানিগুলো কাজের ব্যবস্থা করে দেবে জিবিএ কর্তৃপক্ষ। যার ফলে ভবিষ্যতে এই জোটের প্রতিনিধিত্বকারী প্রতিষ্ঠানগুলোর মাধ্যমে পৃথিবীর যেকোনো দেশে বসেই বিপিও ও কল সেন্টারের সেবা নিতে পারবেন গ্রাহকরা এবং সেবা দিবেন বিপিও ও কল সেন্টার এজেন্টরা। জিবিএ'র সাথে যুক্ত হয়ে আন্তর্জাতিক পরিসরে পুনরায় কাজ করতে যাচ্ছে ফিফোটেক।</p>
        
        <p>জিবিএ'র সদস্য হওয়ার ফলে কল সেন্টার ও বিপিও খাতে নতুন নতুন কাজের সুযোগ সৃষ্টি হবে এবং এতে করে মানুষের কর্মসংস্থান হবে। ইতোপূর্বে আন্তর্জাতিক কোনো জোটের সাথে যুক্ত না থাকায় কলসেন্টার ও বিপিও খাতে কাজ পেতে বেগ পেতে হতো বাংলাদেশের কলসেন্টার ও আইসিটি খাতের প্রতিষ্ঠানগুলোকে।</p>
        
        <p>কিন্তু জিবিএ'র সাথে চুক্তিবদ্ধ হওয়ার কারণে আন্তর্জাতিক পর্যায়ে কাজের সুযোগ পাবে ফিফোটেক তথাপি বাংলাদেশের তরুণ-তরুণীরা।</p>
        
        <p>এ সম্পর্কে আরও বিস্তারিত জানা যাবে জিবিএর কর্পোরেট ওয়েবসাইটের এই ঠিকানায়</p>
      </div>
    `,
    hoverText: 'দৈনিক যুগান্তরে প্রকাশিত সম্পূর্ণ সংবাদ পড়ুন'
  },
  {  
    id: 'risingbd-nov-2020',
    image: 'assets/Risingbd.jpg',
    title: 'Risingbd.com || ৫ নভেম্বর ২০২০',
    description: 'বাংলা–হিন্দিতে বিশ্বজুড়ে কলসেন্টার সেবা দেবে বাংলাদেশের ফিফোটেক',
    readMoreLink: '/bpo-alliance/risingbd-nov-2020',
    content: `
      <div class="news-article">
        <h2>বাংলা–হিন্দিতে বিশ্বজুড়ে কলসেন্টার সেবা দেবে বাংলাদেশের ফিফোটেক</h2>
        
        <p>গ্লোবাল বিপিও অ্যালায়েন্স (জিবিএ) এর গ্লোবাল বিপিও কল সেন্টার অ্যালায়েন্স হচ্ছে, বিশ্বের প্রথম ও সর্ববৃহৎ কলসেন্টার জোট। বিশ্বের খ্যাতনামা ১৪টি বিপিও কোম্পানির এই জোটে একমাত্র বাংলাদেশি কোম্পানি হিসেবে ব্যবসায়িক যাত্রা শুরু করল দেশের তথ্যপ্রযুক্তি খাতের শীর্ষস্থানীয় প্রতিষ্ঠান ফিফোটেক।</p>
        
        <p>জিবিএ জোটের সঙ্গে চুক্তির ফলে ফিফোটেক বিশ্বের বিভিন্ন প্রান্তের বাংলাভাষার গ্রাহকদের বাংলাদেশ থেকে ও হিন্দি ভাষার গ্রাহকদের ভারতের কলকাতা থেকে কলসেন্টার ও ব্যাক অফিস সেবা দেবে।</p>
        
        <p>বর্তমানে জিবিএ'র সঙ্গে বাংলাদেশ থেকে ফিফোটেক, জাপানের মাস্টারপিস গ্রুপ ইনক, চীনের বেইজিং ৯৫ টেলিওয়েব ইনফরমেশন কোম্পানি লিমিটেড, কলম্বিয়ার কলম্বিয়া আউটসোর্সিং সলিউশনস এসএএস, মালয়েশিয়ার ডে থ্রি বিজনেস সার্ভিসেস এসডিএন বিএইচডি, তিউনিসিয়ার নেক্সাস, রাশিয়া ও ইউক্রেনের টেলিকম এক্সপ্রেস, জার্মানির টিডিএম, ইতালির আইএনজিও এসপিএ, থাইল্যান্ডের নাইস কল কোম্পানি লিমিটেড, মিয়ানমারের মাস্টারপিস গ্রুপ কোম্পানি লিমিটেড, ফিলিপাইনের মাস্টারপিস গ্রুপ কোম্পানি লিমিটেড, বেলজিয়ামের মাল্টিকম ও ইউরোপের আইএনইটেক এর মতো ১৪টি মাল্টিন্যাশনাল কোম্পানি চুক্তিবদ্ধ হয়েছে। জিবিএ'র সদস্য কোম্পানিগুলো ২৮টি ভাষায় পৃথিবীর নানা প্রান্তে কল সেন্টার ও ব্যাক অফিসের সার্ভিসের মাধ্যমে গ্রাহকদের সেবা দেবে।</p>
        
        <p>ইতোপূর্বে আন্তর্জাতিক কোনো জোটের সঙ্গে যুক্ত না থাকায় কলসেন্টার ও বিপিও খাতে কাজ পেতে বেগ পেতে হতো বাংলাদেশের কলসেন্টার ও আইসিটি খাতের প্রতিষ্ঠানগুলোকে। কিন্তু জিবিএ'র সঙ্গে চুক্তিবদ্ধ হওয়ার কারণে আন্তর্জাতিক পর্যায়ে কাজের সুযোগ পাবে ফিফোটেক তথাপি বাংলাদেশের তরুণ-তরুণীরা। বৈদেশিক মুদ্রা আয়ের সুযোগ সৃষ্টি করবে জিবিএ জোট, এমনটাই মনে করেন ফিফোটেক এর ব্যবস্থাপনা পরিচালক ও প্রধান নির্বাহী কর্মকর্তা তৌহিদ হোসেন।</p>
        
        <p>বৃহস্পতিবার (৫ নভেম্বর) ঢাকায় জুম কনফারেন্সের মাধ্যমে জিবিএ'র সদস্য কোম্পানি হিসেবে ফিফোটেকের যাত্রা শুরুর উদ্বোধন হয়। জুম কনফারেন্সে এক ভিডিও বার্তায় ফিফোটেক-কে জিবিএ সদস্য হিসেবে ঘোষণা করেন প্রতিষ্ঠানের প্রেসিডেন্ট ড্যানিশ গ্যাট।</p>
        
        <p>এসময় এক ভিডিও বার্তায় ডাক ও টেলিযোগাযোগ মন্ত্রী মোস্তাফা জব্বার বলেন, 'আমি আনন্দিত হয়েছি এই কারণে যে, গ্লোবাল বিপিও অ্যালায়েন্স এর সঙ্গে বাংলা ভাষাভাষি প্রায় ৩৫ কোটি মানুষের জন্য বাংলাদেশের একটি কোম্পানির মাধ্যমে বিপিও সেবা দেয়ার মতো আমরা একটি সুযোগ পেয়েছি। আমি বিশ্বাস করি ফিফোটেকের যে যাত্রা সেই যাত্রার ফলে বাংলাদেশের বিপিও খাত আরো সমৃদ্ধ হবে।'</p>
        
        <p>বাংলাদেশ অ্যাসোসিয়েশন অব কল সেন্টার অ্যান্ড আউটসোর্সিং (বাক্য) এর সভাপতি ওয়াহিদ শরীফ বলেন, 'বাংলাদেশের প্রতিষ্ঠান ফিফোটেক আন্তর্জাতিক কল সেন্টার জোট-জিবিএ'র সঙ্গে কাজ করবে, এটি দেশের জন্য গর্বের বিষয়। এর মাধ্যমে দেশের তরুণদের জন্য কর্মসংস্থান তৈরি হবে।'</p>
        
        <p>এশিয়ান-ওশেনিয়ান কম্পিউটিং ইন্ডাস্ট্রি অ্যাসোসিয়েশনের চেয়ারম্যান আবদুল্লাহ এইচ কাফি বলেন, 'আন্তর্জাতিক কল সেন্টার জোট জিবিএ'র সঙ্গে বাংলাদেশের প্রতিষ্ঠান ফিফোটেক কাজ করার সুযোগ পেয়েছে, যা আমাদের জন্য অত্যন্ত আনন্দের একটি বিষয়। এটি আমাদের দেশের জন্য সম্মানের বিষয়।'</p>
      </div>
    `,
    hoverText: 'Risingbd.com এ প্রকাশিত সম্পূর্ণ সংবাদ পড়ুন'
  }
];

@Component({
  selector: 'app-bpo-alliance',
  templateUrl: './bpo-alliance.component.html',
  styleUrls: ['./bpo-alliance.component.scss']
})
export class BpoAllianceComponent implements OnInit {
  public gridItems: GridItem[] = BPO_ALLIANCE_ITEMS;

  constructor() { }

  ngOnInit(): void {
    // Component initialization logic can go here
  }
}
