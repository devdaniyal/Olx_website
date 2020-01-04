
var db = firebase.firestore();
/* sign up email pass*/
function drnUser() {

  let Suemail = document.getElementById('suEmail').value;
  let Supass = document.getElementById('suPass').value;

  firebase.auth().createUserWithEmailAndPassword(Suemail, Supass).then((data) => {
    // console.log('sss',Suemail);
    console.log('sss',Supass);
    // console.log("TCL: signUpFunc -> then", data.user.uid);
    var obj = {
      email: data.user.email,
      uid: data.user.uid
    }
    saveUser(obj);
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("TCL: signUpFunc -> errorMessage", errorMessage)
    // ...
  });
}

/* sign in email pass*/
function SignInuser() {

  var Siemail = document.getElementById('siEmail').value;
  var Sipass = document.getElementById('siPass').value;

  firebase.auth().signInWithEmailAndPassword(Siemail, Sipass)
    .then((data) => {
    console.log('sign in email', Siemail);
    console.log('sign in pass', Sipass);
    alert("login succ with this email " + data.user.email)
    var obj = {
      email: data.user.email,
      uid: data.user.uid
  }

  localStorage.setItem("user", JSON.stringify(obj))

  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ...
  });
}

saveUser = (data) => {
  console.log("TCL: saveUser -> data", "data");


  db.collection("user").doc(data.uid).set(data)
    .then(() => {
      console.log("TCL: saveUser -> data", 'then');
    })
    .catch((err) => {
      console.log("TCL: saveUser -> data", err);
    })
}

getUserData = () => {
    var user = localStorage.getItem("user");
    var userObj = JSON.parse(user);

    console.log("TCL: getUserData -> userObj", userObj);
    // console.log("TCL: getUserData -> user", user);

    db.collection("user").doc(userObj.uid).get()
        .then((doc) => {
            // console.log("TCL: getUserData -> doc", doc)
            console.log("TCL: getUserData -> data", doc.data())

        }).catch((err) => {
            console.log("TCL: getUserData -> err", err)

        })
}

var storageRef = firebase.storage().ref();

sellForm = (e) => {
  e.preventDefault();
  var proName = document.getElementById('product_name').value;
  var proDescrp = document.getElementById('product_desp').value;
  var proPrice = document.getElementById('product_price').value;
  var proLocation = document.getElementById('product_location').value;
  var proDate = document.getElementById('product_date').value;
  var proImage = document.getElementById('product_Image').files[0];

  // sending file in object
  storageRef.child(`image/${proImage.name}`).put(proImage).then(()=>{
    console.log('image saved !!')
  } )

  // getting file downloaded URl
  storageRef.child(`image/${proImage.name}`).getDownloadURL().then((url)=>{
    // console.log(url,'url');

    let sellObj = {
      productName : proName,
      productDescription : proDescrp,
      productPrice : proPrice,
      productLocation : proLocation,
      productDate : proDate,
      productImage: url
   }
   
   console.log(sellObj,'sellobj');

   db.collection("product").add(sellObj)
   .then((doc) => {
     alert('Your Product has been uploaded'); 
     console.log("then.", doc);
   }).catch((err) => {
     console.log("Catch error", err);
   })

  })
  // .getDownloadUrl()
    
    
    
    // const userId = JSON.parse(localStorage.getItem('user'));
  // document.daniyal.reset();.
//  console.log(sellObj,'sellobj');
}

createCard = async () => {
  
  var adsProduct = [];
  var respond = await db.collection("product").get();
  
  respond.forEach((doc) =>{
    adsProduct.push(doc.data());
  });

  // console.log('product data',adsProduct);

  for( var i = 0; i < adsProduct.length; i++ ){
    
    // console.log('ads[]: ', adsProduct[i].productImage);
    
      var main = document.getElementById('throwProducts');
    
      var mainTwo = document.createElement('div');
          mainTwo.setAttribute('class','forchild1');
    
      var mainThree = document.createElement('div');
          mainThree.setAttribute('class','borderProduct');
      
          mainTwo.appendChild(mainThree);
      
      var div_drnMain1 = document.createElement('div');  
          div_drnMain1.setAttribute('class','drnmain');
      
          mainThree.appendChild(div_drnMain1);
          
      var divIndrnM1 = document.createElement('div');
          divIndrnM1.setAttribute('class','drn1');
          
          div_drnMain1.appendChild(divIndrnM1);
          
      var divIndrnM2 = document.createElement('div');
          divIndrnM2.setAttribute('class','drn2');   
          
      var img = document.createElement('img');
          img.setAttribute("src", adsProduct[i].productImage);
          img.setAttribute("class", "productImge");
          
          divIndrnM2.appendChild(img);
          
          div_drnMain1.appendChild(divIndrnM2);
          
      var divIndrnM3 = document.createElement('div');
          divIndrnM3.setAttribute('class','drn3'); 

      var icon = document.createElement('i');
          icon.setAttribute('class','fa fa-heart-o');
          
          divIndrnM3.appendChild(icon);
          
          div_drnMain1.appendChild(divIndrnM3);
          
      var div_drnMain2 = document.createElement('div');  
          div_drnMain2.setAttribute('class','drnmain');
          
          mainThree.appendChild(div_drnMain2);
          
      var divInM1 = document.createElement('div');  
          divInM1.setAttribute('class','drnm0');    
          
          div_drnMain2.appendChild(divInM1);
          
      var divInM2 = document.createElement('div');  
          divInM2.setAttribute('class','drnm1'); 
          
      var p1 = document.createElement('p');
          p1.setAttribute('class','spaceinTitle');
          p1.innerHTML = adsProduct[i].productName;
          
          divInM2.appendChild(p1);
          
      var p2 = document.createElement('p');
          p2.setAttribute('class','price_card');
          p2.innerHTML = 'Rs.'+ adsProduct[i].productPrice;
          
          divInM2.appendChild(p2);
          
      var p3 = document.createElement('p');
          p3.setAttribute('class','spaceincard');
          p3.innerHTML = adsProduct[i].productDescription;
          
          divInM2.appendChild(p3);
          
          div_drnMain2.appendChild(divInM2);
          
      var div_drnMain3 = document.createElement('div');  
          div_drnMain3.setAttribute('class','drnmain');
          
          mainThree.appendChild(div_drnMain3);
          
      var divInM30 = document.createElement('div');  
          divInM30.setAttribute('class','drnm30'); 
          
          div_drnMain3.appendChild(divInM30);

      var divInM31 = document.createElement('div');  
          divInM31.setAttribute('class','drnm31'); 

      var p1inM3 = document.createElement('p');
          p1inM3.setAttribute('class','card_location');
          p1inM3.innerHTML = adsProduct[i].productLocation;

          divInM31.appendChild(p1inM3);

          div_drnMain3.appendChild(divInM31);

      var divInM32 = document.createElement('div');  
          divInM32.setAttribute('class','drnm32'); 
      
      var p2inM3 = document.createElement('p');
          p2inM3.setAttribute('class','date_card');
          p2inM3.innerHTML = adsProduct[i].productDate;

          divInM32.appendChild(p2inM3);

          div_drnMain3.appendChild(divInM32);

          main.appendChild(mainTwo);    
  }
}

createCard();