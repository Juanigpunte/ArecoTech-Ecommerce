/*-- PRODUCTOS DE MUESTRA PARA EL INDEX --*/
const motherboards = [
    {
    id: "mother1",
    nombre: 'Gigabyte B450M ds3h v2',
    price: 153,
    thumbnail: 'images/Mother_Gigabyte_B450M_DS3H_V2_DDR4_AM4_22c8d45a-grn.jpg',
    
},
{
    id: "mother2",
    nombre: 'MSI H510M PRO-E',
    price: 165,
    thumbnail:'images/Mother_MSI_H510M_PRO-E_DDR4_LGA_1200_89a861ba-grn.jpg',
},
{
    id: "mother3",
    nombre: 'MSI X670-P PRO WIFI',
    price: 190,
    thumbnail:'images/Mother_MSI_X670-P_PRO_WIFI_AM5_be20ca6c-grn.jpg',
}
];



/*-- CARDS DE MIS PRODUCTOS --*/
const Card = (props) => {
    let { id, nombre, price, thumbnail } = props;
    let div = document.createElement('div');
    div.setAttribute('class', 'card-content');
  
    div.innerHTML = `
      <img src= ${thumbnail} alt="foto de ${nombre}"></img>
     <div class="card-body">
      <h2 class="text-center" id="name">${nombre}</h2>
      <a href="pages/store.html">VER PRODUCTOS</a>
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
appMothers.append(mothersContainer({mothers: motherboards}));



/*-- Traigo con fetch una api de la cotizacion del dolar --*/
fetch("https://dolarapi.com/v1/dolares/blue")
  .then(response => response.json())
  .then(data => {
    let dolarBlue = data.venta;
    dolarContainer = document.querySelector('#usd')
    dolarContainer.innerHTML = dolarBlue;
  } );