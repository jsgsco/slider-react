import { SlideShow, Slide, TextoSlide } from './components/SlideShow'
import styled from 'styled-components'
import img1 from './images/1.png'
import img2 from './images/2.png'
import img3 from './images/3.png'

const App = () => {
  return ( 
      <main>
        <Titulo>Viajes Destacados en Brower Travel</Titulo>
        <SlideShow controles={true} autoplay={true} velocidad="2500" intervalo="10000">
                <Slide>
                    <a href="!#">
                        <img src={img1} alt=""/>
                    </a>
                    <TextoSlide>
                        <p>15% de descuento en destino a Cancun - Mexico</p>
                    </TextoSlide>
                </Slide>
                <Slide>
                    <a href="!#">
                        <img src={img2} alt=""/>
                    </a>
                    <TextoSlide>
                        <p>20% de descuento en destino a Rio de Jainero - Brasil</p>
                    </TextoSlide>
                </Slide>
                <Slide>
                    <a href="!#">
                        <img src={img3} alt=""/>
                    </a>
                    <TextoSlide>
                        <p>15% de descuento en destino a Santa Marta - Colombia</p>
                    </TextoSlide>
                </Slide>
        </SlideShow>
      </main>
   );
}

const Titulo = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`
 
export default App;