# MIXINS en SASS

Un mixin es una función reutilizable que permite agrupar un conjunto de reglas CSS. Podemos además añadirle parámetros.

Vamos a agrupar todos nuestros mixins en un solo archivo `_mixins` en la carpeta base.

Empezaremos creando mixins para nuestras media queries:

```scss
@use 'variables' as v;
//creamos un mixin para cada una de las mediaqueries, el content, será reemplazado por lo que pongamos al hacer el @include del mixin.
@mixin telefono {
   @media (min-width: v.$telefono) {
       @content;
   }
}
@mixin tablet {
   @media (min-width: v.$tablet) {
       @content;
   }
}
@mixin desktop {
   @media (min-width: v.$desktop) {
       @content;
   }
}
```

El content será reemplazado por lo que pongamos al hacer el @include del mixin.

Vemos cómo quedarían estos mixins en el `_header.scss`. Para ello debo añadir la siguiente línea al archivo:
```scss
@use 'base/mixins' as m;
```

Después los include:
```scss
//Incluyo los mixins de mediaqueries. Fijarse en el anidamiento que sí me permite SASS. La mediaquery está dentro de la clase .header.
   @include m.telefono {
       padding: 4rem;
   }
   @include m.tablet {
       padding: 3rem;
   }
   @include m.desktop {
       padding: 2rem;
   }
```

Como voy a usar estos mixins para las media queries mucho, voy a crear un snippet en el que le diremos para qué tamaño y qué es lo que queremos que tenga la media query.

Pulsando Command + Shift + P, seleccionamos Configure Snippets, y decimos de tipo scss.

Se nos crea el archivo scss.json:
```json
"media query telefono": {
       "prefix": "mq",
       "body": [
           "@include m.$1 { \n\t$2 \n}"
       ]
   }
```

FINALMENTE BORRAMOS LOS MIXINS QUE HABÍAMOS CREADO EN `_header.scss`, YA QUE ERAN SÓLO DE EJEMPLO. Dejamos la línea del @use "base/mixins" as m; porque los vamos a necesitar más adelante.

# MODIFICANDO LA APARIENCIA DE NUESTRO HEADER
Vamos a hacer el header de nuestra página responsive.

SASS permite crear proyectos escalables con una estructura modular y reutilizable.
Facilita el uso de componentes, gracias a partials, @use, mixins y variables.
Mejora la mantenibilidad del código, permitiendo hacer cambios sin afectar toda la estructura.

Voy a crear un nuevo partial dentro de la carpeta header `_barra.scss`, de esta forma puedo ir separando por componentes.

Antes de que se me olvide debo añadir el comando @forward barra al index de la carpeta header.

```scss
@use "base/mixins" as m;
// recordar que estamos siguiendo una metodología de diseño mobile-first, por lo que pongo el display
//flex en columnas para que vaya de arriba a abajo en dispositivos pequeños.
.barra {
   display: flex;
   flex-direction: column;
   //añado la media query para que en tablet se ponga en fila.
   @include m.tablet {
       flex-direction: row;
       justify-content: space-between; //para que los elementos se separen a los extremos.
       align-items: center; //centrar verticalmente.
   }
   .logo {
       width: 50%;
       margin: 0 auto; //centrar el logo horizontalmente.
       @include m.tablet {
           width: 20rem;
           margin: 0; //quitar el margin que le puse para centrar en dispositivos pequeños.
       }
   }
}
```

Ahora vamos a dar formato a la barra de navegación para que quede mejor quitando el color azul de los enlaces, haciendo que cambie la apariencia de los elementos del menú al pasar sobre ellos. Para ello iremos al partial `_navegacion`. Si contiene algo de las pruebas anteriores lo borramos.

Antes de nada voy a modificar el archivo variables.scss para poner los colores que realmente voy a usar en mi sitio web:

```scss
//Colores
$primario: #5e311e;
$secundario: #c39c63;
$negro: #000;
$blanco: #fff;
$grisClaro: #eceeef;
$cafeClaro: #ebe7de;
```

Como vamos a querer que en la navegación aparezca de color café el enlace en el que nos encontramos, tengo que poner en el index.html, que en principio el primer enlace es el que está activo:
```html
<a class="activo" href="index.html">Inicio</a>
```

```scss
@use 'base/mixins' as m;
@use 'base/variables' as v;

.nav-principal {
   display: flex;
   flex-direction: column;
   margin-top: 5rem; //para que no se pegue el logo a la barra de navegación.
   @include m.tablet { //para tablet y superior
       flex-direction: row;
       gap: 1rem; //para que los enlaces no estén pegados.
       margin-top: 0; // para deshacer el margin que le puse en dispositivos pequeños.
   }
   a {
       text-align: center;
       color: v.$blanco;
       font-size: 2rem;
       text-transform: uppercase;
       font-weight: 700;
       margin-bottom: 1rem; // para que también estén separados cuando estén en columna.
       @include m.tablet {
           margin-bottom: 0;  
       }
       &:hover {
           color: v.$secundario; //cuando pase el mouse por encima.
       }
       &.activo {
           color: v.$secundario; //Para marcar cuál es el enlace de la página activa.
       }
   }
}
```

Ya solo nos falta para terminar con el header darle estilos al texto "Disfruta de una deliciosa taza de café". Cambiamos color, tamaño, mayúsculas, añadimos espacio, y hacemos la imagen de fondo más alta.

Tenemos que ir al contenedor .contenido-header que es donde se encuentra el texto.

Añadimos la siguiente regla para h1:

```scss
h1 {
     text-align: center;
     color: v.$blanco;
     text-transform: uppercase;
     margin-top: 5rem; //Para separar el h1 del contenido superior en dispositivos pequeños.
     @include m.tablet {
       min-height: 10rem;// en dispositivos más grandes la separación debe ser aún mayor.
     }
   }
```

Y para la clase header añadimos el mixin siguiente:

```scss
@include m.tablet {
   min-height: 70rem; //Para que la imagen de fondo sea más grande en tablet o superior.  
}
```

# CONTENIDO PRINCIPAL

Seguimos añadiendo contenido en el index.html:

```html
<main class="contenedor contenido-principal"> <!-- contenido-principal para poder seleccionarlo con CSS -->
     <h2><span>Conoce más</span>sobre nosotros</h2> <!-- span para poner diferentes tamaños -->
     <p>
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, quisquam
       quidem libero blanditiis facilis corporis harum, labore dignissimos
       delectus vero aut deleniti quo eius laborum! Ipsam facilis neque modi.
       Facere. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta
       fuga provident culpa quibusdam officiis, dolores optio animi corporis
       sint facere hic porro iusto explicabo, maiores qui velit! Distinctio,
       incidunt iste.
     </p>
</main>
```

Ahora escribiremos el CSS para la sección anterior para ello debemos crear la carpeta inicio, que tendrá los archivos `_index.scss` y `_contenido.scss`.

El archivo `_index.scss` como hemos venido haciendo hasta ahora tendrá el forward a todos los partials que tenga la carpeta.

A su vez no debemos olvidar, que como acabamos de crear una carpeta nueva, también deberemos añadir al archivo app.scss el @use a la nueva carpeta. Recordar que el archivo app.scss tiene los @use a todas las carpetas que vayamos creando en nuestro proyecto. 

La sección a la que vamos a ir dando formato tiene un color de fondo café claro, pero antes debemos poner el color de fondo de las páginas del sitio en general, por lo que vamos a volver al archivo `_globales.scss` de la carpeta base y ponemos en las reglas del body:

```scss
body {
   font-family: v.$fuente_principal; //la importo de variables.scss
   font-size: 1.6rem;
   background-color: v.$cafe-claro;
}
```

Por ahora `_contenido.scss` quedaría así:

```scss
@use 'base/variables' as v;
@use 'base/mixins' as m;

.contenido-principal {
   background-color: v.$blanco;
   padding: 2rem;

   @include m.tablet {
       padding: 10rem; //para dispositivos más grandes necesitamos más padding
       margin-top: -10rem;// negativo porque queremos que la sección con el texto se superponga a la imagen.
       position: relative;//para que la sección con el texto aparezca delante de la imagen.  
   }
}
```

Al ir dando formato a la página veo que la fuente de los párrafos es muy grande y las líneas aparecen demasiado juntas, por lo que voy a ir a globales y voy a hacer la fuente un poco más pequeña y pondré un interlineado:

```scss
p {
   color: v.$negro;
   font-size: 1.6rem;
   line-height: 2; //Interlineado de 2 líneas para que las separe un poco más.
}
```

Por último vamos a ver cómo utilizar las utilidades que creamos en el archivo `_utilidades.scss` de la carpeta base. Veamos cuál era el contenido de este archivo:

```scss
@use 'variables' as v;

.text-center {
   text-align: center;
}
.bg-primary {
   background-color: v.$primario;
}
```

La utilidad text-center me va a servir para centrar el contenido de un contenedor. Para ello sólo debo volver al index.html y en la sección con la que estoy, que es el contenedor-principal, añadir la utilidad como si fuera una clase:

```html
<main class="contenedor contenido-principal text-center">
```

Añadiendo imágenes (la imagen del grano de café) a los Heading. 

Voy a recolocar algunas de las reglas CSS que he ido haciendo hasta ahora.
Empezaré creando el archivo `_tipografia.scss` en la carpeta base. (No olvidar añadir el @forward en el `_index.html` de la carpeta, veo que se me había olvidado añadir el forward de mixins).

Me voy a `_globales` y corto todo lo referente a tipografía h1, h2, h3... y lo pego en `_tipografia.scss`, y como voy a usar variables tengo que poner al inicio del archivo el @use.

Además voy a añadir más reglas:
```scss
@use 'variables' as v;

h1, h2, h3 {
   margin: 0 0 v.$separacion 0; // separación entre los títulos
   font-family: v.$fuente_principal;
   text-transform: uppercase;
   text-align: center;
   line-height: 1.5;
}

h1 {
   font-size: 4rem;
}

h2 {
   font-size: 3.6rem;
   color: v.$primario;
   span {
       color: v.$secundario;
       font-size: 1.8rem;
       display: block; // para que fuerce un salto de línea. Ya no se usa <br> 
   }
   // la imagen del grano de café va a continuación del h2.
   &::after {
       content: ''; // para que se pueda usar la propiedad background-image
       display: block; // poder darle un ancho y alto
       width: 10rem;
       height: 10rem;
       margin: 0 auto; // centrar la imagen
       background-image: url('../img/cafe.svg'); //cuidado con la ruta relativa
       background-size: 10rem; //Porque si no me corta la imagen
   }
}

h3 {
   font-size: 3.2rem;
}
```

Ya tengo la imagen con el grano de café donde quería y los títulos formateados.

Al ver cómo queda la página para todos los dispositivos con la aplicación ResponsivelyApp, veo que en móviles, el título CONOCE MÁS SOBRE NOSOTROS aparece muy pegado a la imagen, por lo que voy a modificar el padding para que se vea bien en estos dispositivos. Para ello me voy a `_contenido.scss` y lo modifico dándole más padding arriba y abajo y poniendo también a los lados:

```scss
.contenido-principal {
   background-color: v.$blanco;
   padding: 5rem 2rem; // lo he aumentado

   @include m.tablet {
       padding: 10rem; //para dispositivos más grandes necesitamos más padding
       margin-top: -10rem;// negativo porque queremos que la sección con el texto se superponga a la imagen.
       position: relative;//para que la sección con el texto aparezca delante de la imagen.  
   }
}
```
