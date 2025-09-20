<script>
  // აქ არ გვჭირდება რთული ლოგიკა, რადგან ეს სტატიკური კონტენტია.
  // თუმცა, თუ დაგჭირდებათ ინტერაქტიულობა (მაგალითად, თითოეული ეტაპის დასაკეცი/გასაშლელი),
  // აქ დავამატებდით შესაბამის ცვლადებს და ფუნქციებს.
</script>

<style>
  .roadmap-container {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }

  h2 {
    color: #34495e;
    margin-top: 25px;
    margin-bottom: 15px;
    font-size: 1.8em;
  }

  h3 {
    color: #3498db;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 1.4em;
    border-left: 4px solid #3498db;
    padding-left: 10px;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  ul li {
    background-color: #ecf0f1;
    margin-bottom: 8px;
    padding: 10px 15px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  ul ul li {
    background-color: #f8f9fa;
    padding-left: 25px;
    border-left: 2px solid #bdc3c7;
    font-size: 0.95em;
  }

  .section-description {
    font-style: italic;
    color: #7f8c8d;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 2px solid #bdc3c7;
  }

  .tips {
    margin-top: 40px;
    padding: 20px;
    background-color: #e8f6f3;
    border-left: 5px solid #2ecc71;
    border-radius: 8px;
  }

  .tips h2 {
    color: #2ecc71;
    border-bottom: none;
    padding-bottom: 0;
  }

  .tips ul li {
    background-color: #e8f6f3;
    box-shadow: none;
    margin-bottom: 5px;
    padding: 5px 0;
  }

  .greeting {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.1em;
    color: #555;
  }

  .image-placeholder {
    display: block;
    margin: 20px auto;
    width: 100%;
    max-width: 600px; /* ან თქვენი სურვილისამებრ */
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f0f0f0; /* Placeholder color */
    text-align: center;
    line-height: 200px; /* ცენტრში ტექსტისთვის */
    color: #888;
    font-size: 1.2em;
    border: 1px dashed #ccc;
  }
</style>

<div class="roadmap-container">
  <p class="greeting">
    გამარჯობა! მოხარული ვარ, რომ დამეხმარები მონაცემთა მეცნიერების (Data Science) ამაღელვებელ სამყაროში მოგზაურობის დაწყებაში. ეს არის ძალიან მოთხოვნადი და დინამიური სფერო. მოდით, შევქმნათ დეტალური და კარგად ორგანიზებული roadmap, რომელიც ეტაპობრივად გაჩვენებთ გზას მონაცემთა მეცნიერების ექსპერტობამდე.
  </p>

  <h1>მონაცემთა მეცნიერის Roadmap: ეტაპობრივი გზამკვლევი</h1>

  <!-- `<img>` tag for the visual roadmap -->
  <img src="https://via.placeholder.com/600x300?text=Data+Science+Roadmap+Image" alt="Data Science Roadmap Visual" class="image-placeholder"/>
  <!-- აქ შეგიძლიათ ჩაანაცვლოთ placeholder სურათი რეალური Roadmap-ის გამოსახულებით -->

  <h2>ეტაპი 1: საფუძვლების ათვისება (Fundamental Skills)</h2>
  <p class="section-description">
    ეს არის ნებისმიერი მონაცემთა მეცნიერის საყრდენი. ამ ეტაპზე დაეუფლებით იმ ძირითად უნარებს, რომლებიც აუცილებელია მონაცემების გასაგებად, დასამუშავებლად და ანალიზისთვის.
  </p>
  <ul>
    <li>
      <h3>მათემატიკა და სტატისტიკა:</h3>
      <ul>
        <li>**ხაზოვანი ალგებრა:** ვექტორები, მატრიცები, ტრანსფორმაციები (აუცილებელია მანქანური სწავლის ალგორითმების გასაგებად).</li>
        <li>**გამოთვლითი სტატისტიკა:** ალბათობის თეორია, განაწილებები, ჰიპოთეზის ტესტირება, რეგრესიის ანალიზი (მონაცემებიდან დასკვნების გამოსატანად).</li>
      </ul>
    </li>
    <li>
      <h3>პროგრამირების ენა (Python ან R):</h3>
      <ul>
        <li>**Python:** ყველაზე პოპულარული არჩევანი მონაცემთა მეცნიერებაში. ისწავლეთ საფუძვლები, მონაცემთა სტრუქტურები, ფუნქციები და ობიექტზე ორიენტირებული პროგრამირება (OOP).
          <ul>
            <li>**ბიბლიოთეკები:** `NumPy` (რიცხვითი ოპერაციები), `Pandas` (მონაცემთა მანიპულირება და ანალიზი).</li>
          </ul>
        </li>
        <li>**R:** შესანიშნავია სტატისტიკური ანალიზისა და ვიზუალიზაციისთვის, განსაკუთრებით აკადემიურ და კვლევით სფეროებში.</li>
      </ul>
    </li>
    <li>
      <h3>მონაცემთა ბაზები (SQL):</h3>
      <ul>
        <li>**SQL (Structured Query Language):** მონაცემთა ბაზებიდან ინფორმაციის მოძიების, მანიპულირებისა და მართვის ძირითადი ენა. აუცილებელია მონაცემთა ამოღებისთვის.</li>
      </ul>
    </li>
  </ul>

  <h2>ეტაპი 2: მონაცემთა დამუშავება და ანალიზი (Data Processing & Analysis)</h2>
  <p class="section-description">
    ამ ეტაპზე ისწავლით, როგორ მოამზადოთ, გაასუფთაოთ და გამოიკვლიოთ მონაცემები, რათა მათგან ღირებული ინფორმაცია მიიღოთ.
  </p>
  <ul>
    <li>
      <h3>მონაცემთა შეგროვება და გაწმენდა (Data Collection & Cleaning):</h3>
      <ul>
        <li>სხვადასხვა წყაროდან მონაცემების მოპოვება (APIs, ვებ-სქრეიპინგი, ფაილები).</li>
        <li>`Missing values`-ების დამუშავება, დუბლიკატების ამოღება, არასწორი მონაცემების კორექტირება.</li>
      </ul>
    </li>
    <li>
      <h3>მონაცემთა გამოკვლევითი ანალიზი (Exploratory Data Analysis - EDA):</h3>
      <ul>
        <li>მონაცემთა ნაკრებში ტენდენციების, შაბლონებისა და ანომალიების აღმოჩენა სტატისტიკური მეთოდებით და ვიზუალიზაციით.</li>
      </ul>
    </li>
    <li>
      <h3>მონაცემთა ვიზუალიზაცია (Data Visualization):</h3>
      <ul>
        <li>**Python ბიბლიოთეკები:** `Matplotlib`, `Seaborn` (სტატიკური გრაფიკები).</li>
        <li>**ინტერაქტიული ვიზუალიზაცია:** `Plotly`, `Dash`, `Tableau` (მონაცემების ეფექტურად წარსადგენად).</li>
      </ul>
    </li>
  </ul>

  <h2>ეტაპი 3: მანქანური სწავლა (Machine Learning)</h2>
  <p class="section-description">
    ეს არის მონაცემთა მეცნიერების გული, სადაც ისწავლით მოდელების აგებას, რომლებიც მონაცემებიდან სწავლობენ და პროგნოზებს აკეთებენ.
  </p>
  <ul>
    <li>
      <h3>მანქანური სწავლის საფუძვლები:</h3>
      <ul>
        <li>**სწავლების ტიპები:** ზედამხედველობითი (Supervised), ზედამხედველობის გარეშე (Unsupervised), გაძლიერებითი (Reinforcement) სწავლა.</li>
        <li>**შეფასების მეტრიკები:** სიზუსტე (Accuracy), სიზუსტე (Precision), გახსენება (Recall), F1-ქულა, RMSE, R-squared.</li>
      </ul>
    </li>
    <li>
      <h3>ზედამხედველობითი სწავლა (Supervised Learning):</h3>
      <ul>
        <li>**რეგრესია:** ხაზოვანი რეგრესია, ლოგისტიკური რეგრესია (რიცხვითი მნიშვნელობების პროგნოზირება).</li>
        <li>**კლასიფიკაცია:** გადაწყვეტილების ხეები, შემთხვევითი ტყეები, Support Vector Machines (SVM), K-Nearest Neighbors (KNN) (კატეგორიების პროგნოზირება).</li>
      </ul>
    </li>
    <li>
      <h3>ზედამხედველობის გარეშე სწავლა (Unsupervised Learning):</h3>
      <ul>
        <li>**კლასტერიზაცია:** K-Means, იერარქიული კლასტერიზაცია (მსგავსი მონაცემების დაჯგუფება).</li>
        <li>**განზომილების შემცირება:** PCA (Principal Component Analysis) (მონაცემთა სირთულის შემცირება).</li>
      </ul>
    </li>
    <li>
      <h3>მანქანური სწავლის ბიბლიოთეკები:</h3>
      <ul>
        <li>**`Scikit-learn`:** ყველაზე ფართოდ გამოყენებული ბიბლიოთეკა მანქანური სწავლის მოდელების ასაგებად.</li>
      </ul>
    </li>
  </ul>

  <h2>ეტაპი 4: გაღრმავებული თემები და სპეციალიზაცია (Advanced Topics & Specialization)</h2>
  <p class="section-description">
    მას შემდეგ, რაც საფუძვლებს დაეუფლებით, შეგიძლიათ გადახვიდეთ უფრო რთულ თემებზე და აირჩიოთ სპეციალიზაციის სფერო.
  </p>
  <ul>
    <li>
      <h3>ღრმა სწავლა (Deep Learning):</h3>
      <ul>
        <li>**ხელოვნური ნერვული ქსელები (ANNs):** საფუძვლები, აქტივაციის ფუნქციები, უკუგავრცელება (Backpropagation).</li>
        <li>**კონვოლუციური ნერვული ქსელები (CNNs):** გამოსახულების დამუშავება (Computer Vision).</li>
        <li>**რეკურენტული ნერვული ქსელები (RNNs):** ტექსტის დამუშავება, დროითი სერიები (Natural Language Processing - NLP).</li>
        <li>**ბიბლიოთეკები:** `TensorFlow`, `Keras`, `PyTorch`.</li>
      </ul>
    </li>
    <li>
      <h3>ბუნებრივი ენის დამუშავება (Natural Language Processing - NLP):</h3>
      <ul>
        <li>ტექსტის ანალიზი, სენტიმენტების ანალიზი, თემატური მოდელირება, ჩატბოტები.</li>
        <li>**ბიბლიოთეკები:** `NLTK`, `SpaCy`, `Hugging Face Transformers`.</li>
      </ul>
    </li>
    <li>
      <h3>დიდი მონაცემები (Big Data):</h3>
      <ul>
        <li>**ინსტრუმენტები:** Apache Hadoop, Apache Spark (დიდი მოცულობის მონაცემების დასამუშავებლად).</li>
        <li>**Cloud პლატფორმები:** AWS, Google Cloud Platform (GCP), Microsoft Azure.</li>
      </ul>
    </li>
  </ul>

  <h2>ეტაპი 5: პრაქტიკა და პორტფოლიო (Practice & Portfolio)</h2>
  <p class="section-description">
    თეორიული ცოდნა უმნიშვნელოა პრაქტიკის გარეშე. ეს ეტაპი გადამწყვეტია რეალური სამუშაოს მისაღებად.
  </p>
  <ul>
    <li>
      <h3>პროექტები (Projects):</h3>
      <ul>
        <li>დაიწყეთ მცირე პროექტებით `Kaggle`-ზე ან `UCI Machine Learning Repository`-დან აღებული მონაცემთა ნაკრებებით.</li>
        <li>გააკეთეთ რეალური სამყაროს პრობლემების ანალიზი და გადაჭრა.</li>
        <li>შეეცადეთ შექმნათ end-to-end პროექტები (მონაცემების შეგროვებიდან მოდელის დეპლოიმდე).</li>
      </ul>
    </li>
    <li>
      <h3>პორტფოლიო (Portfolio):</h3>
      <ul>
        <li>შეაგროვეთ თქვენი საუკეთესო პროექტები `GitHub`-ზე.</li>
        <li>თითოეულ პროექტს დაურთეთ დეტალური აღწერა, კოდი, გამოყენებული მეთოდები და მიღებული შედეგები.</li>
        <li>პორტფოლიო არის თქვენი სავიზიტო ბარათი პოტენციური დამსაქმებლებისთვის.</li>
      </ul>
    </li>
    <li>
      <h3>ქსელების შექმნა (Networking) და უწყვეტი სწავლა:</h3>
      <ul>
        <li>დაესწარით ვებინარებს, კონფერენციებს, შეუერთდით ონლაინ საზოგადოებებს.</li>
        <li>გამოიწერეთ ბლოგები და პუბლიკაციები (მაგ. Towards Data Science).</li>
        <li>მონაცემთა მეცნიერება მუდმივად ვითარდება, ამიტომ უწყვეტი სწავლა აუცილებელია.</li>
      </ul>
    </li>
  </ul>

  <div class="tips">
    <h2>რჩევები:</h2>
    <ul>
      <li>**დაიწყეთ მცირედით:** არ ეცადოთ ყველაფრის ერთდროულად სწავლას.</li>
      <li>**იყავით მოთმინებით:** ეს გრძელი გზაა, მაგრამ საინტერესო.</li>
      <li>**იპოვეთ მენტორი ან შეუერთდით საზოგადოებას:** მხარდაჭერა და რჩევები ძალიან დაგეხმარებათ.</li>
      <li>**ფოკუსირება გააკეთეთ პრობლემების გადაჭრაზე:** მონაცემთა მეცნიერება არის პრობლემების გადაჭრის ხელოვნება მონაცემების გამოყენებით.</li>
    </ul>
  </div>

  <p class="greeting" style="margin-top: 30px;">
    წარმატებებს გისურვებთ ამ საინტერესო გზაზე! თუ რაიმე კითხვა გექნებათ კონკრეტულ ეტაპთან ან თემასთან დაკავშირებით, თამამად მკითხეთ.
  </p>
</div>