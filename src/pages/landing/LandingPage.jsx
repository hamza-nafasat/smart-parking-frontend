/* eslint-disable react/prop-types */
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import parkImg from "../../assets/images/landing-page/park.png";
import airportImg from "../../assets/images/landing-page/airport.png";
import shoppingImg from "../../assets/images/landing-page/shopping.png";
import downtownImg from "../../assets/images/landing-page/downtown.png";
import reviewImg from "../../assets/images/landing-page/review-img.jpeg";
import reviewImgTwo from "../../assets/images/landing-page/review-img-2.png";
import asif from "../../assets/images/landing-page/asif.png";
import footerLogo from "../../assets/images/landing-page/footer-logo.png";
import benefitsSideImg from "../../assets/images/landing-page/benefits-side-img.png";
import Button from "../../components/shared/small/Button";
import {
  AddIcon,
  BeIcon,
  CitiesIcon,
  ConvenienceIcon,
  FacebookIcon,
  GuaranteedIcon,
  IncreasedIcon,
  LinkedInIcon,
  MinusIcon,
  OperationalIcon,
  ParkingIcon,
  RevenueIcon,
  SavingsIcon,
  ServiceIcon,
  TimeSavingIcon,
  UsersIcon,
} from "../../assets/svgs/Icon";
import Slider from "react-slick/lib/slider";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <HeaderHero />
      <ParkingCarousel />
      <BenefitsSection />
      <ManagerSection />
      <Testimonials />
      <FaqSection />
      <Form />
      <Footer />
    </div>
  );
};

export default LandingPage;

const HeaderHero = () => {
  return (
    <div className="w-full md:h-screen bg-[url('/src/assets/images/landing-page/hero-bg.png')] bg-no-repeat bg-bottom bg-cover flex flex-col">
      <Header />
      <Hero />
    </div>
  );
};

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-4 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <a className="flex items-center gap-[2px]" href="/">
        <img src={logo} alt="" className="w-[53px]" />
        <h6 className="text-base sm:text-lg md:text-xl text-white font-extrabold italic !leading-none">
          Smart <br /> Parking
        </h6>
      </a>
      <div className="flex w-full sm:w-auto items-center justify-between gap-4">
        <Link to="/login">
          <Button text="Login" width="w-20 sm:w-[110px]" />
        </Link>
        <Link to="/register">
          <Button
            text="Register"
            width="w-20 sm:w-[110px]"
            bg="bg-[#00000045] hover:bg-primary hover:text-white"
            color="text-primary"
          />
        </Link>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="container px-4 mx-auto grid place-items-center gap-6 flex-1 text-white">
      {/* hero content */}
      <div className="py-8">
        <h1 className="text-2xl md:text-[38px] lg:text-[44px] font-bold text-white font-lato text-center">
          FIND <span className="text-primary">PARKING</span> IN ONE CLICK
        </h1>
        <h6 className="text-base md:text-xl text-white font-semibold text-center my-4">
          SIMPLE, SECURED & SMART
        </h6>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <Button text="Get Started" width="w-[215px]" />
          <Link to="/register">
            <Button
              text="Register as a Manager"
              width="w-[215px]"
              bg="bg-[#00000045] hover:bg-primary hover:text-white"
              color="text-primary"
            />
          </Link>
        </div>
      </div>
      {/* widgets */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full lg:w-[60%]">
        <HeroCard
          title="Parking Spaces"
          value="6,00,000+"
          icon={<ParkingIcon />}
        />
        <HeroCard
          title="Parking Spaces"
          value="6,00,000+"
          icon={<UsersIcon />}
        />
        <HeroCard
          title="Parking Spaces"
          value="6,00,000+"
          icon={<CitiesIcon />}
        />
      </div>
    </section>
  );
};

const HeroCard = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 md:px-7 rounded-[28px] bg-primary min-h-[190px] w-[70%] md:w-auto">
      {icon}
      <h6 className="text-white text-lg md:text-2xl font-bold mt-4 !leading-none">
        {value}
      </h6>
      <p className="text-base md:text-lg font-semibold text-white">{title}</p>
    </div>
  );
};

const ParkingCarousel = () => {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-[30px] md:py-[60px] px-4 container mx-auto">
      <h2 className="text-20px md:text-[36px] font-bold bg-text-gradient bg-clip-text text-transparent text-center">
        Our Top Parking Solutions
      </h2>
      <p className="text-sm md:text-base text-[#484848] mt-1 font-medium text-center">
        Discover our efficient and affordable online parking services. Reserve
        your spot with ease and convenience today!
      </p>
      <div className="mt-5">
        <Slider {...settings}>
          <ParkingCard img={parkImg} title="Parking Near Parks" />
          <ParkingCard img={airportImg} title="Airport Parking" />
          <ParkingCard img={shoppingImg} title="Shopping Center Parking" />
          <ParkingCard img={downtownImg} title="Downtown Parking" />
          <ParkingCard img={parkImg} title="Parking Near Parks" />
          <ParkingCard img={airportImg} title="Airport Parking" />
          <ParkingCard img={shoppingImg} title="Shopping Center Parking" />
          <ParkingCard img={downtownImg} title="Downtown Parking" />
        </Slider>
      </div>
    </section>
  );
};

const ParkingCard = ({ img, title }) => {
  return (
    <div className="relative w-full md:w-[320px] h-[350px] sm:h-[320px] rounded-[18px]">
      <img
        src={img}
        alt="image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <h6 className="text-white font-lato text-lg md:text-2xl font-extrabold absolute bottom-[6%] left-[50%] transform -translate-x-[50%] text-nowrap">
        {title}
      </h6>
    </div>
  );
};

const BenefitsSection = () => {
  return (
    <section className="w-full bg-primary lg:bg-[url('/src/assets/images/landing-page/benefits-bg.png')] bg-no-repeat bg-left lg:bg-center bg-cover py-10 xl:py-0 my-[30px] lg:my-[40px]">
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-[40px]">
        <img src={benefitsSideImg} className="w-full h-auto" alt="side-img" />
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl md:text-[38px] lg:text-[44px] font-extrabold text-white leading-none">
            Benefits from our online Smart Parking
          </h4>
          <div className="mt-4 md:mt-8">
            <IconBox
              icon={<ConvenienceIcon />}
              title="Convenience"
              value1="Book Anytime, Anywhere: Reserve your parking spot from the comfort of your home or on the go using your smartphone or computer."
              value2="Skip the Hassle: Avoid driving around looking for a parking spot, especially in busy areas."
            />
            <IconBox
              icon={<TimeSavingIcon />}
              title="Time-Saving"
              value1="Quick Reservations: Secure a parking spot in just a few clicks."
              value2="Immediate Availability: Know exactly where you'll park upon arrival, reducing the time spent searching for a spot."
            />
            <IconBox
              icon={<SavingsIcon />}
              title="Cost Savings"
              value1="Access Discounts: Take advantage of special online rates and promotions."
              value2="Compare Prices: Easily compare prices from different parking facilities to find the best deal."
            />
            <IconBox
              icon={<GuaranteedIcon />}
              title="Guaranteed Parking Spot"
              value1="Peace of Mind: Ensure a parking spot is reserved for you, eliminating the stress of finding parking, especially during peak times or events."
              value2="Avoid Full Lots: No need to worry about lots being full when you arrive."
            />
          </div>
        </div>
      </section>
    </section>
  );
};

const ManagerSection = () => {
  return (
    <div className="w-full bg-none lg:bg-[url('/src/assets/images/landing-page/building-manager-bg.png')] bg-no-repeat bg-right bg-contain">
      <section className="container mx-auto py-[30px] lg:py-[60px] px-4 grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 lg:col-span-8">
          <h4 className="text-2xl md:text-[38px] lg:text-[44px] font-extrabold text-primary leading-none">
            Become a Building Manager
          </h4>
          <p className="text-sm md:text-base font-medium text-[#3A4745]">
            Connect with us to digitize your parking operations. Easily manage
            bookings and payments online, enhancing efficiency and revenue.
            Provide a seamless experience for your customers. Join us today to
            streamline your parking management and maximize your potential.
          </p>
          <div className="mt-4 md:mt-6">
            <IconBox
              icon={<IncreasedIcon />}
              color="text-[#152220]"
              listColor="text-[#4B5654]"
              title="Increased Occupancy:"
              value1="Optimize space usage by ensuring more spots are reserved and utilized."
              value2="Attract more customers who prefer the convenience of online booking. "
            />
            <IconBox
              icon={<RevenueIcon />}
              color="text-[#152220]"
              listColor="text-[#4B5654]"
              title="Revenue Management:"
              value1="Implement dynamic pricing strategies to maximize revenue based on demand."
              value2="Offer special promotions and discounts to attract more customers during off-peak hours."
            />
            <IconBox
              icon={<ServiceIcon />}
              color="text-[#152220]"
              listColor="text-[#4B5654]"
              title="Better Customer Service:"
              value1="Provide a seamless and hassle-free parking experience for customers."
              value2="Enhance customer satisfaction and loyalty."
            />
            <IconBox
              icon={<OperationalIcon />}
              color="text-[#152220]"
              listColor="text-[#4B5654]"
              title="Operational Efficiency:"
              value1="Reduce the workload of on-site staff by handling bookings and payments online."
              value2="Gain insights into parking usage patterns and customer preferences through data analytics."
            />
          </div>
          <div className="mt-4">
            <Button text="Click Here to Apply" width="w-full sm:w-[215px]" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4"></div>
      </section>
    </div>
  );
};

const IconBox = ({ icon, title, value1, value2, color, listColor }) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mt-4 md:mt-5">
      <div className="w-[70px]">{icon}</div>
      <div>
        <h6
          className={`${
            color ? color : "text-white"
          } font-lato text-lg md:text-2xl font-bold`}
        >
          {title}
        </h6>
        <ul
          className={`${
            listColor ? listColor : "text-white"
          } text-xs font-semibold ml-4`}
        >
          <li className="list-disc">{value1}</li>
          <li className="list-disc mt-[2px]">{value2}</li>
        </ul>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="container mx-auto px-4 py-[30px] md:py-[60px]">
      <h4 className="text-2xl md:text-[38px] lg:text-[44px] font-extrabold text-primary text-center leading-none">
        Customer & Manager Testimonials
      </h4>
      <p className="text-sm md:text-base font-medium text-[#3A4745] text-center mt-3">
        Discover what our satisfied users and building managers have to say
        about their experience with our platform. See how we&lsquo;ve made
        parking management easier and more efficient for everyone.
      </p>
      <div className="py-2 sm:py-8 testimonial">
        <Slider {...settings}>
          <TestimonialCard
            name="Emily Johnson"
            icon={reviewImg}
            review="Booking a parking spot online has never been easier! I save so much time and no longer worry about finding a place to park. Highly recommend this service!"
          />
          <TestimonialCard
            name="Wahid Ahmad"
            icon={asif}
            review="Booking a parking spot online has never been easier! I save so much time and no longer worry about finding a place to park. Highly recommend this service!"
          />
          <TestimonialCard
            name="Azka Munawar"
            icon={reviewImgTwo}
            review="Booking a parking spot online has never been easier! I save so much time and no longer worry about finding a place to park. Highly recommend this service!"
          />
          <TestimonialCard
            name="Asif Zulfiqar"
            icon={asif}
            review="Booking a parking spot online has never been easier! I save so much time and no longer worry about finding a place to park. Highly recommend this service!"
          />
        </Slider>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, icon, review }) => {
  return (
    <div className="py-4 md:py-8 pr-4 min-h-[200px] flex flex-col justify-center border-[4px] border-primary rounded-[15px] bg-white relative mt-12 sm:mt-0 sm:ml-20">
      <p className="text-lg md:text-xl font-semibold text-[#263230] pt-10 sm:pt-0 pl-4 sm:pl-[100px]">
        {review}
      </p>
      <h6 className="flex justify-end mt-4 md:mt-8 text-xl md:text-[22px] font-medium">
        -{name}
      </h6>
      <div className="absolute w-24 h-24 sm:w-[148px] sm:h-[148px] rounded-full top-[-20%] left-[50%] sm:top-[50%] sm:left-[0%] transform -translate-x-[50%] sm:-translate-y-[50%]">
        <img
          src={icon}
          alt="img"
          className="w-24 h-24 sm:w-[148px] sm:h-[148px] rounded-full border-[5px] border-primary"
        />
      </div>
    </div>
  );
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionHandler = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 py-[30px] md:py-[60px] xl:px-[200px]">
      <h4 className="text-2xl md:text-[38px] lg:text-[44px] font-extrabold text-primary text-center leading-none">
        FAQs for Users & Managers
      </h4>
      <p className="text-sm md:text-base font-medium text-[#3A4745] text-center mt-3">
        Explore answers to commonly asked questions tailored for both users and
        managers of our Smart Parking application. Find solutions on booking
        processes, payment methods, managing parking spaces, and more.
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {accordionList.map((faq, index) => (
          <Faq
            key={index}
            title={faq.title}
            value={faq.value}
            accordionHandler={() => accordionHandler(index)}
            accordion={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
};

const Faq = ({ title, value, accordionHandler, accordion }) => {
  return (
    <div className={`bg-primary p-4 md:p-5 rounded-xl flex flex-col`}>
      <div
        className={`flex items-center justify-between gap-4 md:gap-6 cursor-pointer transition-all duration-500`}
        onClick={accordionHandler}
      >
        <h6 className="text-base md:text-xl font-semibold text-white">
          {title}
        </h6>
        {accordion ? (
          <div className="w-[21px]">
            <MinusIcon />
          </div>
        ) : (
          <div className="w-[21px]">
            <AddIcon />
          </div>
        )}
      </div>
      <p
        className={`text-sm text-white font-medium overflow-hidden transition-all duration-500 ${
          accordion ? "max-h-[500px] opacity-100 pt-4" : "max-h-0 opacity-0"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

const Form = () => {
  return (
    <section className="container px-4 mx-auto pt-[30px] xl:px-[300px] pb-[30px] lg:pb-0 relative z-10 lg:mb-[-8rem]">
      <div className="border-2 border-primary bg-white rounded-[14px] py-4 md:py-8 px-4 md:px-12">
        <h2 className="text-primary text-xl md:text-[28px] lg:text-[36px] font-extrabold font-lato text-center">
          Get in Touch!
        </h2>
        <p className="text-sm md:text-base font-medium text-[#3A4745]  mt-3 text-center">
          Have a question, concern, or need assistance? Drop us a message using
          the form below, and we&lsquo;ll get back to you promptly.
        </p>
        <input
          type="email"
          className="border border-primary px-4 md:px-8 py-4 rounded-md w-full mt-4 focus:outline-none"
          placeholder="Email"
        />
        <textarea
          placeholder="Message"
          rows={3}
          className="border border-primary px-4 md:px-8 py-4 rounded-md w-full mt-4 focus:outline-none"
        ></textarea>
        <Button
          type="submit"
          text="Submit"
          width="w-full sm:w-[230px] mx-auto mt-2"
        />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <section className="w-full bg-primary lg:bg-transparent lg:bg-[url('/src/assets/images/landing-page/footer-bg.png')] bg-no-repeat bg-cover bg-top">
      <section className="container mx-auto px-4 pt-[30px] lg:pt-[150px] pb-[30px] md:pb-[60px] grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-8">
          <a href="/">
            <img src={footerLogo} alt="logo" className="w-[160px]" />
          </a>
          <p className="text-white text-sm sm:text-base md:text-lg font-semibold my-4 w-full lg:w-[50%]">
            Transforming parking management with ease and efficiency. Book, pay,
            and manage parking seamlessly with our innovative platform.
          </p>
          <div className="flex items-center gap-4">
            <a href="/">
              <BeIcon />
            </a>
            <a href="/">
              <LinkedInIcon />
            </a>
            <a href="/">
              <FacebookIcon />
            </a>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2">
          <h6 className="text-white text-lg md:text-2xl font-extrabold">
            Support
          </h6>
          <div className="mt-4 flex flex-col gap-4 md:gap-5">
            <a
              href="#"
              className="text-white text-base md:text-lg font-medium font-lato"
            >
              Help Center
            </a>
            <a
              href="#"
              className="text-white text-base md:text-lg font-medium font-lato"
            >
              Tweet @ Us
            </a>
            <a
              href="#"
              className="text-white text-base md:text-lg font-medium font-lato"
            >
              Feedback
            </a>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-2">
          <h6 className="text-white text-lg md:text-2xl font-extrabold">
            Contact Us
          </h6>
          <div className="mt-4 flex flex-col gap-4 md:gap-5">
            <a
              href="tel:91765432154"
              className="text-white text-base md:text-lg font-medium font-lato"
            >
              (91) 765 432 154
            </a>
            <a
              href="mailto:info@smartparking.com"
              className="text-white text-base md:text-lg font-medium font-lato"
            >
              info@smartparking.com
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};

var accordionList = [
  {
    title: "How do I book a parking spot using the Smart Parking app?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
  {
    title: "What payment methods are accepted?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
  {
    title: "How do I book a parking spot using the Smart Parking app?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
  {
    title: "How do I manage my parking space?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
  {
    title: "How do I book a parking spot using the Smart Parking app?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
  {
    title: "How do I manage my parking space?",
    value:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum nam dicta cupiditate voluptate. Iste ipsum totam accusamus veritatis magni dolore quam tempore. Repellendus dignissimos molestias officiis eius impedit unde laboriosam?",
  },
];
