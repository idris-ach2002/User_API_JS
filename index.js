const apiLink = "https://randomuser.me/api/?results=24";

let userData = [];

const fetchUser = async () => {
    await fetch(apiLink)
    .then((res) => res.json())
    .then((data) => userData = data.results);

    console.log(userData[0]);
}

const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString
    (
        "fr-FR"
        , {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
    );
    return newDate;
}


const dayCalc = date => {
    let toDay = new Date();
    let toDayTimeStamp = Date.parse(toDay);
    //timeStamp nbr ms écoulés depuis 1 janvier 1970 à cette heure
    let dateTimeStamp = Date.parse(date);

    return Math.ceil((toDayTimeStamp - dateTimeStamp)/8.64e7);
}

const userDisplay = async () => {
    await fetchUser();
    const container = document.querySelector('.user-container');
    
   
    container.innerHTML = '';

   
    container.innerHTML += userData
    .map((obj) => 
    `
    <div class="card">
        <p><img src="${obj.picture.large}" alt="photo de ${obj.name.last}" /></p>
        <h3>${obj.name.first}</h3>
        <p>${obj.location.city}, ${dateParser(obj.dob.date)}</p>
        <em>Membre depui ${dayCalc(obj.registered.date)} jours</em>
    </div>
    `
    ).join("");
}

userDisplay();
