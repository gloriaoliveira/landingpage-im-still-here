// Importa jQuery e Slick
import $ from 'jquery';
import 'slick-carousel';

// Configura o Slick Carousel
$(document).ready(() => {
  $('.carousel__track').slick({
    dots: true, // Exibe os pontos de navegação
    infinite: true, // Permite navegação infinita
    speed: 300, // Velocidade da transição
    slidesToShow: 3, // Exibe 3 itens por vez
    slidesToScroll: 1, // Scroll 1 item por vez
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2 // Exibe 2 itens em telas menores
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1 // Exibe 1 item em telas muito pequenas
        }
      }
    ]
  });
});
