import { Banner } from "./components/Banner";
import { Carousel } from "./components/Carousel";
import { Hero } from "./components/Hero";
import { ImageGallery } from "./components/ImageGallery";
import { Instagram } from "./components/Instagram";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Banner />
      <ImageGallery />
      <Carousel />
      <Instagram />
    </>
  );
};
