import styled from 'styled-components'
import { useEffect, useRef, useCallback } from 'react'
import { ReactComponent as FlechaIzq } from '../images/iconmonstr-angel-left-thin.svg'
import { ReactComponent as FlechaDer } from '../images/iconmonstr-angel-right-thin.svg'

const SlideShow = ({children, controles=false, autoplay=false, velocidad="1000", intervalo="5000"}) => {

    const slideshow = useRef(null)
    const intervaloSlideshow = useRef(null)

	const siguiente = useCallback(() => {
		// Comprobamos que el slideshow tenga elementos
		if(slideshow.current.children.length > 0){
			console.log('Siguiente')

			// Obtenemos el primer elemento del slideshow.
			const primerElemento = slideshow.current.children[0];

			// Establecemos la transicion para el slideshow.
			slideshow.current.style.transition = `${velocidad}ms ease-out all`;

			const tamañoSlide = slideshow.current.children[0].offsetWidth;

			// Movemos el slideshow
			slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

			const transicion = () => {
				// Reiniciamos la posicion del Slideshow.
				slideshow.current.style.transition = 'none';
				slideshow.current.style.transform = `translateX(0)`;

				// Tomamos el primer elemento y lo mandamos al final.
				slideshow.current.appendChild(primerElemento);

				slideshow.current.removeEventListener('transitionend', transicion);
			}

			// Eventlistener para cuando termina la animacion.
			slideshow.current.addEventListener('transitionend', transicion);

		}
    }, [velocidad])

    const anterior = () => {
        if(slideshow.current.children.length > 0) {
            // Obtener el ultimo elemento del slideshow
            const index = slideshow.current.children.length - 1
            const ultimoElemento = slideshow.current.children[index]

            slideshow.current.insertBefore(ultimoElemento, slideshow.current.firstChild)

            const size = slideshow.current.children[0].offsetWidth


            slideshow.current.style.transition = 'none'
            slideshow.current.style.transform = `translateX(-${size}px)`

            setTimeout(() => {
                slideshow.current.style.transition = `${velocidad}ms ease-out all`
                slideshow.current.style.transform = `translateX(0)`

            }, 30)
        }
    }

    useEffect(() => {
        if(autoplay) {
            intervaloSlideshow.current = setInterval(() => {
            siguiente()
            }, intervalo);

            // Eliminar intervalos
            slideshow.current.addEventListener('mouseenter', () => {
                clearInterval(intervaloSlideshow.current)
            })

            // Volvemos a poner el intervalo cuando saque el cursos del slideshow
            slideshow.current.addEventListener('mouseleave', () => {
                intervaloSlideshow.current = setInterval(() => {
                    siguiente()
                }, intervalo);
            })
        }
        
    }, [autoplay, intervalo, siguiente])

    return ( 
        <ContenedorPrincipal>
            <ContenedorSlideShow ref={slideshow}>
                {children}
            </ContenedorSlideShow>
            {
                controles && (
                    <Controles>
                        <Boton
                            onClick={anterior}
                        >
                            <FlechaIzq />
                        </Boton>
                        <Boton 
                            derecho
                            onClick={siguiente}
                        >
                            <FlechaDer />
                        </Boton>
                    </Controles>
                )
            }
        </ContenedorPrincipal>
     );
}

const ContenedorPrincipal = styled.div`
	position: relative;
`

const ContenedorSlideShow = styled.div`
	display: flex;
	flex-wrap: nowrap;
`

const Slide = styled.div`
	min-width: 100%;
	overflow: hidden;
	transition: .3s ease all;
	z-index: 10;
	/* max-height: 500px; */
	position: relative;
	img {
		width: 100%;
		vertical-align: top;
	}
`

const TextoSlide = styled.div`
	background: ${props => props.colorFondo ? props.colorFondo : 'rgba(0,0,0,.3)'};
	color: ${props => props.colorTexto ? props.colorTexto : '#fff'};
	width: 100%;
	padding: 10px 60px;
	text-align: center;
	position: absolute;
	bottom: 0;
	@media screen and (max-width: 700px) {
		position: relative;
		background: #000;
	}
`

const Controles = styled.div`
	position: absolute;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 100%;
	pointer-events: none;
`

const Boton = styled.button`
	pointer-events: all;
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	width: 50px;
	height: 100%;
	text-align: center;
	position: absolute;
	transition: .3s ease all;
	/* &:hover {
		background: rgba(0,0,0,.2);
		path {
			fill: #fff;
		}
	} */
	path {
		filter: ${props => props.derecho ? 'drop-shadow(-2px 0px 0px #fff)' : 'drop-shadow(2px 0px 0px #fff)'};
	}
	${props => props.derecho ? 'right: 0' : 'left: 0'}
`
 
export {SlideShow, Slide, TextoSlide};