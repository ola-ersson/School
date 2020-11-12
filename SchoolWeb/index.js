
/* Slider */
let idx = 1;    
function sliderTimer() {
    document.getElementById('slider').classList.remove(`slider-image-${idx}`);
    idx++;
    if(idx == 5) idx = 1;
    document.getElementById('slider').classList.add(`slider-image-${idx}`)   
}
let slider = setInterval(sliderTimer, 5000);

/* Get classes */
getClasses = async () => {
  const response =  await fetch(`http://localhost:4000/api/classes`);
  const data = await response.json();
  const classContainerElement = document.querySelector('.class-container');
  let image = 1;
  let color = 'bg-info';

  data.forEach(data => {
  /* Fix date */
  let monthNumber = data.Date.substring(0, 10)
  let monthName = function(date){
    monthlist = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    return monthlist[date.getMonth()];
  };
  let month = monthName(new Date(monthNumber));
  let day = data.Date.substring(8, 10)

  /* Build classes card */
  classContainerElement.innerHTML += `
  <div class="classes d-flex flex-column flex-sm-row position-relative m-2">
    <!-- Image -->
    <img src="/SchoolWeb/images/events/events-img${image}.jpg" alt="Picture of Children" id="card-img">
    <!-- Text -->
    <div class="card-text d-flex flex-column ${color} p-4">
        <div class="display-8 heading-font mb-3">${data.Title}</div>
        <div><i class="far fa-calendar-alt mr-2 mb-2"></i>Age ${data.MinAge} to ${data.MaxAge} Years</div>
        <div><i class="far fa-clock mr-2 mb-4"></i>${data.Time}</div>
        <div class="">${data.Description}</div>
        <button class="btn btn-danger text-white text-uppercase my-1">Learn More</button> 
    </div>
    <div class="date d-flex flex-column justify-content-center align-items-center ${color} display-9 font-weight-bold">
        <div>${day}</div>
        <div>${month}</div>
    </div>`

    /* Background color */
    image < 4 ? image = image + 1 : image = 1;  
    if (color == 'bg-info') {
        color = 'bg-cozy';
    } else if (color == 'bg-cozy') {
      color = 'bg-success'
    } else if (color == 'bg-success') {
      color = 'bg-warning';
    } else if (color == 'bg-warning') {
      color = 'bg-info';
    }
  })
};

getClasses();

/* Send form */
document
  .getElementById('form')
  .addEventListener('submit', sendForm);

function convertformDataObjToJson (formData) {
  let obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return JSON.stringify(obj);
}

async function sendForm (ev) {
  ev.preventDefault();
  let contactForm = ev.target;
  let formDataObj = new FormData(contactForm);

  let jsonFormData = await convertformDataObjToJson(formDataObj);

  let header = new Headers();
  header.append('Content-type', 'application/json')
  
  let url = 'http://localhost:4000/api/contacts';
  let req = new Request(url, {
    headers: header,
    body: jsonFormData,
    method: 'POST',
    mode: 'cors'
  });

  fetch(req)
    .then(response => {
      if(response.ok) {
        return response.json;
      } else {
        throw new Error('Bad Http');
      }
    })
}









