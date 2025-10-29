'use strict';

// Datos de subcategorías para cada categoría
// Por ahora todas tienen las mismas subcategorías de blanquería
const subcategoriasData = {
  blanqueria: [
    { name: 'Ver todo', link: 'categorias/blanqueria.html', isVerTodo: true },
    { name: 'Sábanas', link: 'categorias/blanqueria.html#sabanas', image: 'images/sabanas.jpg' },
    { name: 'Toallas', link: 'categorias/blanqueria.html#toallas', image: 'mages/toalla.jpg' },
    { name: 'Toallones', link: 'categorias/blanqueria.html#toallones', image: 'images/toallones.jpg' },
    { name: 'Cortinas', link: 'categorias/blanqueria.html#cortinas', image: 'images/cortinas.jpg' },
    { name: 'Acolchados', link: 'categorias/blanqueria.html#acolchados', image: 'images/acolchado.jpg' }
  ],
  electronica: [
    { name: 'Ver todo', link: 'categorias/electronica.html', isVerTodo: true },
    { name: 'Sábanas', link: 'categorias/blanqueria.html#sabanas', image: 'images/sabanas.jpg' },
    { name: 'Toallas', link: 'categorias/blanqueria.html#toallas', image: 'images/toalla.jpg' },
    { name: 'Toallones', link: 'categorias/blanqueria.html#toallones', image: 'images/toallon.jpg' },
    { name: 'Cortinas', link: 'categorias/blanqueria.html#cortinas', image: 'images/cortinas.jpg' },
    { name: 'Acolchados', link: 'categorias/blanqueria.html#acolchados', image: 'images/acolchado.jpg' }
  ],
  marroquineria: [
    { name: 'Ver todo', link: 'categorias/marroquineria.html', isVerTodo: true },
    { name: 'Sábanas', link: 'categorias/blanqueria.html#sabanas', image: 'images/sabanas.jpg' },
    { name: 'Toallas', link: 'categorias/blanqueria.html#toallas', image: 'images/toalla.jpg' },
    { name: 'Toallones', link: 'categorias/blanqueria.html#toallones', image: 'images/toallon.jpg' },
    { name: 'Cortinas', link: 'categorias/blanqueria.html#cortinas', image: 'images/cortinas.jpg' },
    { name: 'Acolchados', link: 'categorias/blanqueria.html#acolchados', image: 'images/acolchado.jpg' }
  ],
  camperas: [
    { name: 'Ver todo', link: 'categorias/camperas.html', isVerTodo: true },
    { name: 'Sábanas', link: 'categorias/blanqueria.html#sabanas', image: 'images/sabanas.jpg' },
    { name: 'Toallas', link: 'categorias/blanqueria.html#toallas', image: 'images/toalla.jpg' },
    { name: 'Toallones', link: 'categorias/blanqueria.html#toallones', image: 'images/toallon.jpg' },
    { name: 'Cortinas', link: 'categorias/blanqueria.html#cortinas', image: 'images/cortinas.jpg' },
    { name: 'Acolchados', link: 'categorias/blanqueria.html#acolchados', image: 'images/acolchado.jpg' }
  ]
};

// Datos de productos (fuente única para toda la web)
// Estructura: { id, title, titleFull?, price, image: {src, alt}, installments?: { count, interestFree } }
const productosData = [
  {
    id: 'bolso-matero-unicross',
    title: 'Bolso Matero Unicross',
    price: 17600,
    image: { src: 'images/bolso-matero-unicross.jpg', alt: 'Bolso Matero marca Unicross' },
    category: 'marroquineria',
  },
  {
    id: 'bufanda',
    title: 'Bufanda',
    price: 63300,
    image: { src: 'images/bufanda.jpg', alt: 'Bufanda' },
    category: 'blanqueria',
  },
  {
    id: 'paraguas-trendy',
    title: 'Paraguas Trendy',
    price: 63300,
    image: { src: 'images/paraguas.jpg', alt: 'Paraguas Trendy' },
    category: 'varios',
  },
  {
    id: 'billetera',
    title: 'Billetera',
    titleFull: 'Acolchado Doble Faz Love & Home color azúl',
    price: 63300,
    image: { src: 'images/billetera.jpg', alt: 'Billetera' },
    category: 'marroquineria',
  },
  {
    id: 'toalla',
    title: 'Toalla',
    price: 63300,
    image: { src: 'images/toalla.jpg', alt: 'Toalla' },
    category: 'blanqueria',
  },
  {
    id: 'manton',
    title: 'Manton',
    price: 63300,
    image: { src: 'images/manton.jpg', alt: 'Manton' },
    category: 'blanqueria',
  },
  {
    id: 'manta-plush-acanalada',
    title: 'Manta Plush Acanalada',
    price: 63300,
    image: { src: 'images/manta-plush-acanalada.jpg', alt: 'Manta Plush Acanalada' },
    category: 'blanqueria',
  },
  {
    id: 'acolchado-doble-faz',
    title: 'Acolchado Doble Faz Love & Home',
    price: 63300,
    image: { src: 'images/acolchado.jpg', alt: 'Acolchado' },
    category: 'blanqueria',
  },
];

// Favoritos (referencias por id de producto)
const favoritosData = [
  'bolso-matero-unicross',
  'billetera',
  'acolchado-doble-faz',
  'bufanda'
];
