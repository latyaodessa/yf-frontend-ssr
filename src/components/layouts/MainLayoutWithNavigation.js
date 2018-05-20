import Head from 'next/head'
import Navbar from '../core/navbar'


const MainLayoutWithNavigation = (props) => (
    <div>
        <style jsx global>{`
        h1 {
          position: relative;
          font-weight: 600;
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          overflow: hidden;



          &:before {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            width: 4em;

            //background-color: $color-black;
            animation: slide-in 1s ease-in both 0.5s;
          }

          &.no-underscore{
            &:before{
              display: none;
            }
          }
        }
        .child-container {
              display: flex;
              min-height: 100vh;
              flex-direction: column;
              margin-top: 5px;
              margin-bottom: 5px;
              align-items: center;
            }

        `}</style>

        <Head>
            <title>test title</title>
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.1/css/swiper.min.css"/>
            <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.2/build/grids-responsive-min.css"/>
        </Head>
        <Navbar/>
        {props.children}
    </div>
);

export default MainLayoutWithNavigation;
