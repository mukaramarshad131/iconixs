export const businessPackages = [
  {
    id: "ico-trt-initial-labs-consult-fee-USD",
    // id:"ico-mwl-sema-inj-28-USD-Every-28-days",
    // https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=ico-mwl-sema-inj-28-USD-Every-28-days&utm_source=cb-app-copy
    discount: 24,
    backgroundColor: "#1B3352",
    packageName: "Iconix TRT - Initial Labs + Consult Fee 2",
    // packageName: "Testosterone Cypionate Injection + Anastrozole - 28 days",
    originalPrice: "$149.00 USD",
    description: "Description",
  },
  // {
  //   id: "ico-trt-enclomiphene-28",
  //   discount: 24,
  //   backgroundColor: "#1B3352",
  //   packageName: "Iconix TRT Enclomiphene Subscription - 28 days",
  //   originalPrice: "$185.00 USD",
  //   description: "Description",
  // },
  // {
  //   id: "ico-trt-kyzatrex-oral-28",
  //   discount: 24,
  //   backgroundColor: "#1B3352",
  //   packageName: "Iconix TRT Kyzatrex Oral Subscription - 28 days",
  //   originalPrice: "$249.00 USD",
  //   description: "Description",
  // },
];
export const questions:any = [
  {
    name: "q1",
    label: "Do any of the following apply to you?",
    isDisabled: false,
    options: [
      "Current, or suspected prostate cancer",
      "Breast cancer",
      "Other cancer (active diagnosis, active treatment, or in remission or cancer-free for less than 5 continuous years; does not apply to non-melanoma skin cancer that was considered cured via simple excision alone)",
      "Untreated and/or severe heart failure or other heart disease",
      "Uncontrolled blood pressure (average systolic/top number ≥ 160 or average diastolic/bottom number ≥ 100)",
      "Hemoglobin > 18 g/dL, hematocrit > 50% (polycythemia) on prior lab tests or history of blood donation due to high blood counts",
      "Untreated and/or severe sleep apnea",
      "Desire to preserve fertility or have more children",
      "Known hypersensitivity to testosterone, anastrozole, clomiphene/enclomiphene or any of its ingredients",
      "None of the above",
    ],
  },
  {
    name: "q1a",
    label: "Explain (Known hypersensitivity to testosterone, anastrozole, clomiphene/enclomiphene or any of its ingredients)",
    isDisabled: false,
  },
  {
    name: "q2",
    label: "Do any of the following apply to you?",
    isDisabled: false,
    options: [
      "Decreased sexual vigor and libido",
      "Decreased energy or increased fatigue",
      "Depressed mood or depression",
      "Decreased muscle mass",
      "Decreased body hair",
      "Erectile dysfunction",
      "Hot flashes",
      "Low bone density",
      "Poor sleep",
      "Difficulty with focus/concentration",
      "Weight gain",
      "Joint pain",
      "None of the above",
    ],
  },
  {
    name: "q3",
    label: "Do any of the following conditions or situations apply to you?",
    isDisabled: false,
    options: [
      "Past prostate cancer",
      "Liver disease",
      "Brain or pituitary (region of the brain) tumor",
      "Uncontrolled adrenal disease",
      "Uncontrolled thyroid disease",
      "Blood pressure with upper number (systolic) between 140 and 159; lower number (diastolic) between 90 and 99",
      "Kidney disease",
      "Elevated cholesterol levels",
      "Controlled and treated heart failure or other heart disease",
      "Controlled and treated sleep apnea",
      "History of a blood clot ",
      "Testicular cancer",
      "Estrogen-dependent tumor ",
      "Early puberty ",
      "Gynecomastia (breast enlargement in men due to benign or non-cancerous breast tissue growth)",
      "Shrinking testicles or small testes",
      "Signs and symptoms of an enlarged prostate (increased urination at night, trouble starting urinary stream, urinating many times daily, urinary urgency, inability to pass urine, or weak urine flow)",
      "None of the above",
    ],
  },
  {
    name: "q4",
    label: "Do any of the following conditions or situations apply to you?",
    isDisabled: false,
    options: [
      "Low levels of testosterone on prior labs",
      "Current or prior diagnosis of hypogonadism or low testosterone",
      "Prior use of testosterone replacement therapy",
      "Current use of testosterone replacement therapy ",
      "None of the above",
    ],
  },
  {
    name: "q5",
    label:
      "If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?",
    isDisabled: false,
    options: [
      "Gel",
      "Cream",
      "Injection",
      "Pellet",
      "Pill",
      "hCG (human chorionic gonadotropin) ",
      "Clomiphene/enclomiphene",
      "Over the counter testosterone booster/supplement",
      "None of the above",
    ],
  },
  {
    name: "q6",
    isDisabled: false,
    label:"Please list the name, strength, and date of the last dose of testosterone (or related) replacement therapy. If you have never been on any of the above, please list ‘N/A’."},
  {
    name: "q7",
    isDisabled: false,
    label:"Please list your current prescription and over-the-counter medications. "},
  {
    name: "q8",
    isDisabled: false,
    label:"Please list your allergies to medications, dyes, foods, and any other substances." },
    // {
    //   name: "q9",
    //   isDisabled: false,
    //   label:
    //     "Preferred medication",
    //   options: [
    //     "Testosterone Cypionate Injection + Anastrozole as merited",
    //     "Testosterone Oral + Anastrozole as merited",
    //     "Enclomiphene + Anastrozole as merited",
    //     "Testosterone Transdermal Gel",
    //   ],
    // },
];


export const followUpQuestions:any = [
  {
    name: "q1",
    isDisabled: false,
    label:"What was the date of your last injection/cream/pill?"
  },
  {
    name: "q2",
    isDisabled: false,
    label:"Since your last visit, have there been any changes to your medications (prescription or over-the-counter medications) or allergies?"
  },
  {
    name: "q3",
    label: "Since your last visit, do any of the following situations apply to you?",
    isDisabled: false,
    options: [
      "Past, current, or suspected prostate cancer",
      "Breast cancer",
      "Other cancer (active diagnosis, active treatment, or in remission or ancer-free for less than 5 continuous years; does not apply to non-melanoma skin cancer that was considered cured via simple excision alone)",
      "Blood clot",
      "Heart attack",
      "Stroke",
      "Untreated and/or severe heart failure or other heart disease",
      "Uncontrolled blood pressure (average systolic/top number ≥ 140 or average diastolic/bottom number ≥ 90)",
      "Hemoglobin > 18 g/dL, hematocrit > 50% (polycythemia) on prior lab tests or history of blood donation due to high blood counts",
      "Untreated and/or severe sleep apnea",
      "Liver disease no enclomiphene",
      "Brain or pituitary (region of the brain) tumor no enclomiphene",
      "Uncontrolled adrenal disease no enclomiphene",
      "Uncontrolled thyroid disease no enclomiphene",
      "Desire to preserve fertility or have more children",
      "Severe allergic reaction to testosterone or any of its ingredients",
      "None of the above",
    ],
  },
  {
    name: "q4",
    label: "Since your last visit, have you experienced any of the following side effects?",
    isDisabled: false,
    options: [
      "Mild allergic reaction to testosterone or any of its ingredients",
      "Enlarged prostate",
      "Prolonged erection requiring medical intervention",
      "Acne",
      "Excess hair growth",
      "Hair loss",
      "Dandruff",
      "Swelling in legs",
      "Bloating",
      "Headache",
      "Anxiety",
      "Numbness or tingling in extremities",
      "Breast tissue growth (males)",
      "Weight gain",
      "Mild-moderate and/or treated sleep apnea",
      "Reduced sperm counts",
      "Hot flashes",
      "Night sweats",
      "Poor sleep",
      "Changes in erections",
      "None of the above",
    ],
  },
  // {
  //   name: "q3",
  //   label: "Do any of the following conditions or situations apply to you?",
  //   isDisabled: false,
  //   options: [
  //     "Past prostate cancer",
  //     "Liver disease",
  //     "Brain or pituitary (region of the brain) tumor",
  //     "Uncontrolled adrenal disease",
  //     "Uncontrolled thyroid disease",
  //     "Blood pressure with upper number (systolic) between 140 and 159; lower number (diastolic) between 90 and 99",
  //     "Kidney disease",
  //     "Elevated cholesterol levels",
  //     "Controlled and treated heart failure or other heart disease",
  //     "Controlled and treated sleep apnea",
  //     "History of a blood clot ",
  //     "Testicular cancer",
  //     "Estrogen-dependent tumor ",
  //     "Early puberty ",
  //     "Gynecomastia (breast enlargement in men due to benign or non-cancerous breast tissue growth)",
  //     "Shrinking testicles or small testes",
  //     "Signs and symptoms of an enlarged prostate (increased urination at night, trouble starting urinary stream, urinating many times daily, urinary urgency, inability to pass urine, or weak urine flow)",
  //     "None of the above",
  //   ],
  // },
  // {
  //   name: "q4",
  //   label: "Do any of the following conditions or situations apply to you?",
  //   isDisabled: false,
  //   options: [
  //     "Low levels of testosterone on prior labs",
  //     "Current or prior diagnosis of hypogonadism or low testosterone",
  //     "Prior use of testosterone replacement therapy",
  //     "Current use of testosterone replacement therapy ",
  //     "None of the above",
  //   ],
  // },
  // {
  //   name: "q5",
  //   label:
  //     "If you have previously been or currently are on testosterone (or related) replacement therapy, which form were or are you on?",
  //   isDisabled: false,
  //   options: [
  //     "Gel",
  //     "Cream",
  //     "Injection",
  //     "Pellet",
  //     "Pill",
  //     "hCG (human chorionic gonadotropin) ",
  //     "Clomiphene/enclomiphene",
  //     "Over the counter testosterone booster/supplement",
  //     "None of the above",
  //   ],
  // },
  // {
  //   name: "q8",
  //   isDisabled: false,
  //   label:"Please list your allergies to medications, dyes, foods, and any other substances." },
    // {
    //   name: "q9",
    //   isDisabled: false,
    //   label:
    //     "Preferred medication",
    //   options: [
    //     "Testosterone Cypionate Injection + Anastrozole as merited",
    //     "Testosterone Oral + Anastrozole as merited",
    //     "Enclomiphene + Anastrozole as merited",
    //     "Testosterone Transdermal Gel",
    //   ],
    // },
];
