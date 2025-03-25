// Importa jQuery e Slick
import $ from 'jquery';
import 'slick-carousel';

// Configura o Slick Carousel
$(document).ready(() => {
  $('.carousel__track').slick({
    dots: true, // Exibe os pontos de navegação
    infinite: true,
    speed: 300,
    slidesToShow: 4, // Mostra 4 itens no desktop
    slidesToScroll: 1,
    arrows: true, // Mostra setas de navegação
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          dots: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.5, // Mostra 2.5 itens para indicar scroll
          centerMode: true,
          centerPadding: '40px'
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3, // Mostra 1 item + parte do próximo
          centerMode: true,
          centerPadding: '30px',
          arrows: false // Esconde setas em mobile
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1.1,
          centerPadding: '20px'
        }
      }
    ]
  });
});