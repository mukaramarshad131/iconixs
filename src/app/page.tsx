import iconix from '@/assets/images/IconixLogo.png';
import dashboardimg from '@/assets/images/loginPageImage.jpg';
import LoginComponent from '@/components/molecules/loginComponent';
import Image from 'next/image';

const Home = () => {
  return (
    <section className="relative flex !min-h-screen !w-full !flex-row">
    <div
      className="hidden grow flex-col items-center justify-around bg-center bg-no-repeat md:flex"
      style={{
        background: '#0c2345',
      }}
    >
      <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
        <Image src={iconix} width={200} height={200} className='mt-[20px] max-w-[300px] xl:max-w-[200px]' alt='Iconix' priority/>
      </div>
      <Image src={dashboardimg} width={200} height={200} className='max-w-[400px] xl:max-w-[450px] w-[400px] xl:w-[450px]' alt='Iconix'/>
    </div>

    <div className="m-auto flex !h-screen w-full max-w-[580px] flex-col justify-center ">
        <LoginComponent/>
    </div>
  </section>
  )
}

export default Home