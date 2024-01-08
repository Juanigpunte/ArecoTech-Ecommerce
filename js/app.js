/*-- PRODUCTOS DE MUESTRA PARA EL INDEX --*/
const motherboards = [
  {
    id: "mother1",
    nombre: 'Gigabyte B450M ds3h v2',
    thumbnail: 'images/Mother_Gigabyte_B450M_DS3H_V2_DDR4_AM4_22c8d45a-grn.jpg',
    desc: "Las placas base de GIGABYTE están listas para admitir los últimos procesadores AMD Ryzen™ serie 5000 y son compatibles con versiones anteriores de los procesadores AMD Ryzen™ serie 4000, 3000, 2000 y 1000. "

  },
  {
    id: "mother2",
    nombre: 'MSI H510M PRO-E',
    thumbnail: 'images/Mother_MSI_H510M_PRO-E_DDR4_LGA_1200_89a861ba-grn.jpg',
    desc: "La serie PRO ayuda a los usuarios a trabajar de manera más inteligente ofreciendo una experiencia eficiente y productiva. Con una funcionalidad estable y un montaje de alta calidad, las placas base de la serie PRO proporcionan flujos de trabajo profesionales optimizados."
  },
  {
    id: "mother3",
    nombre: 'MSI X670-P PRO WIFI',
    thumbnail: 'images/Mother_MSI_X670-P_PRO_WIFI_AM5_be20ca6c-grn.jpg',
    desc: "La serie PRO está pensada para profesionales de todos los ámbitos. La línea cuenta con un rendimiento impresionante y una alta calidad, al tiempo que tiene como objetivo proporcionar a los usuarios una experiencia increíble."
  }
];



/*-- CARDS DE MIS PRODUCTOS --*/
const Card = (motherboards) => {
  let div = document.createElement('div');
  div.setAttribute('class', 'card-index');

  div.innerHTML = `
  <div class="image-index"><img src= ${motherboards.thumbnail} alt="foto de ${motherboards.nombre}"></img></div>
    <div class="content-index">
        <span class="title-index">${motherboards.nombre}</span>
        <p class="desc-index">${motherboards.desc}</p>
        <a class="action-index" href="pages/store.html">Ver productos<span aria-hidden="true">→</span></a>
    </div>
      `;


  return div

}

/*-- CREO EL CONTENEDOR DE MIS CARDS Y LAS APENDEO CON UN FOR EACH --*/
const mothersContainer = (props) => {

  let { mothers } = props;
  let section = document.createElement('section');

  section.setAttribute('class', 'card-container')

  mothers.forEach(mother => {
    const card = Card(mother);
    section.append(card);
  });

  return section;
}

/*-- RENDERIZO MI CONTENEDOR CON LAS CARDS EN EL DOM --*/
let appMothers = document.querySelector('#mothers');
appMothers.append(mothersContainer({ mothers: motherboards }));



/*-- Traigo con fetch una api de la cotizacion del dolar --*/
fetch("https://dolarapi.com/v1/dolares/blue")
  .then(response => response.json())
  .then(data => {
    let dolarBlue = data.venta;
    dolarContainer = document.querySelector('#usd')
    dolarContainer.innerHTML = dolarBlue;
  });


  /*-- Dark mode --*/
  const toggleTheme = document.querySelector('#theme');
  toggleTheme.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     toggleTheme.classList.toggle('dark');
 
  // Guardo el tema del usuario en el local
     if (document.body.classList.contains('dark')) {
         localStorage.setItem('dark-theme' , 'true')     
     }else {
     localStorage.setItem('dark-theme' , 'false')}
 
  })

  if (localStorage.getItem('dark-theme') === 'true') {
    document.body.classList.add('dark');
 } else {
    document.body.classList.remove('dark');
 }
